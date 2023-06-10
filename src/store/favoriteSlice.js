import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, setDoc, getFirestore, query, orderBy, getDocs, deleteDoc } from "firebase/firestore"; 
import '../fireBase';

const firestore = getFirestore();

export const fetchFavorite = createAsyncThunk(
  'favorite/fetchFavorite',

  async function queryForDocuments(currentUser, {rejectWithValue}) {
    try {

      const favoriteQuery = query(
        collection(firestore, `${'favorite/' + currentUser + '/products'}`),
        orderBy('id', 'asc')
      );

      const querySnapshot = await getDocs(favoriteQuery);
            
      function allDocs() {
        const data = [];
        querySnapshot.forEach((snap) => {
          data.push(snap.data());
          return data;
        });
        if (querySnapshot.empty) {
          return data;
        }
        return data;
      }

      return allDocs();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createUserFavorite = createAsyncThunk(
  'favorite/createUserFavorite',

  async function(ip, {rejectWithValue}) {
    try {
      await setDoc(doc(firestore, 'favorite', ip), {ip_address: ip});
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addToFavorite = createAsyncThunk(
  'favorite/addToFavorite',

  async function({product, currentUser}, {rejectWithValue}) {
    console.log(product.id, currentUser);
    console.log(`${'favorite/' + currentUser + '/products'}`);
    try {
      await setDoc(doc(firestore, `${'favorite/' + currentUser + '/products'}`, String(product.id)), product);
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromFavorite = createAsyncThunk(
  'favorite/removeFromFavorite',

  async function({product, currentUser}, {rejectWithValue}) {
    try {
      await deleteDoc(doc(firestore, `${'favorite/' + currentUser + '/products'}`, String(product.id)));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.error = action.payload;
  state.status = 'rejected';
  console.log(state.error);
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: {
    favoriteProducts: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [fetchFavorite.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchFavorite.fulfilled]: (state, action) => {
      state.favoriteProducts = action.payload;
      state.status = "resolved";
    },
    [fetchFavorite.rejected]: setError
  }
});

export default favoriteSlice.reducer;