import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getFirestore, query, orderBy, getDocs, limit } from "firebase/firestore"; 
import '../fireBase';

const firestore = getFirestore();

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',

  async function queryForDocuments(_, {rejectWithValue}) {
    try {
      const categoriesQuery = query(
        collection(firestore, 'categories'),
        orderBy('id', "desc"),
        limit(5)
      );

      const querySnapshot = await getDocs(categoriesQuery);
            
            
      function allDocs() {
        const data = [];
        querySnapshot.forEach((snap) => {
          data.push(snap.data());
          return data;
        });
        if (querySnapshot.empty) {
          throw new Error();
        }
        return data;
      }
      return allDocs();
    } catch (error) {
      return rejectWithValue(error.message);
    }

  }
);

const setError = (state, action) => {
  state.error = action.payload;
  state.status = 'rejected';
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    count: 0,
    categories: [],
    status: null,
    error: null
  },
  reducers: {
  },
  extraReducers: {
    [fetchCategories.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
      state.status = "resolved";
    },
    [fetchCategories.rejected]: setError
  }
});

export default categoriesSlice.reducer;
// export const { increment } = categoriesSlice.actions;