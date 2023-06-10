import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, setDoc, getFirestore, query, orderBy, getDocs, deleteDoc} from "firebase/firestore"; 
import '../fireBase';

const firestore = getFirestore();

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',

  async function queryForDocuments(currentUser, {rejectWithValue}) {
    try {
      const cartQuery = query(
        collection(firestore, `${'cart/' + currentUser + '/products'}`),
        orderBy('id', 'asc')
      );

      const querySnapshot = await getDocs(cartQuery);
            
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

export const createUserCart = createAsyncThunk(
  'cart/createUserCart',

  async function(ip, {rejectWithValue}) {
    try {
      await setDoc(doc(firestore, 'cart', ip), {ip_address: ip});
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',

  async function({product, currentUser}, {rejectWithValue}) {
    try {
      await setDoc(doc(firestore, `${'cart/' + currentUser + '/products'}`, String(product.id)), product);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',

  async function({product, currentUser}, {rejectWithValue}) {
    try {
      await deleteDoc(doc(firestore, `${'cart/' + currentUser + '/products'}`, String(product.id)));
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

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    user: '103.227.87.140',
    cartProducts: [],
    status: null,
    error: null,
  },
  reducers: {
    setCurrentUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: {
    [fetchCart.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchCart.fulfilled]: (state, action) => {
      state.cartProducts = action.payload;
      state.status = "resolved";
    },
    [fetchCart.rejected]: setError
  }
});

export const { setCurrentUser } = cartSlice.actions;
export default cartSlice.reducer;