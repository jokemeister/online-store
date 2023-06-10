import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, setDoc, getFirestore, query, orderBy, getDocs, limit, deleteDoc } from "firebase/firestore"; 
import '../fireBase';

const firestore = getFirestore();

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',

  async function queryForDocuments({ queryLimit, queryOrder }, {rejectWithValue}) {
    try {
      console.log("queryLimit, queryOrder", { queryLimit, queryOrder });
      const productsQuery = query(
        collection(firestore, "/cars"),
        orderBy(queryOrder.orderBy, queryOrder.orderType),
        limit(queryLimit),
      );

      console.log("productsQuery", productsQuery);

      const querySnapshot = await getDocs(productsQuery);

      console.log("querySnapshot", querySnapshot);
            
      function allDocs() {
        const data = [];
                
        querySnapshot.forEach((snap) => {
          console.log(snap.data());
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

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',

  async function(productId, {rejectWithValue, dispatch}) {
    console.log("productId", productId);
    try {
      await deleteDoc(doc(firestore, 'cars', `${productId}`));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',

  async function({rejectWithValue, dispatch}) {
    const product = {
      id: 7,
      title: "Якась тачка",
      body: "Дуже крута тачка за свої гроші",
      year: 2022,
      hp: 380,
      engine: 2.4,
      manufacturer: "Volkswagen",
      images: [
        "assets/images/categories/calico/products/adults/AC0005/2.jpg",
        "assets/images/categories/calico/products/adults/AC0005/3.jpg",
      ],
      color: "синій",
      price: 10000,
    };
    try {
      await setDoc(doc(firestore, 'cars/', product.id), product);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.error = action.payload;
  state.status = 'rejected';
};

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    count: 0,
    products: [],
    filteredProducts: [],
    searchedProducts: [],
    status: null,
    error: null,
    queryParams: {
      queryOrder: {
        orderBy: 'id',
        orderType: 'asc'
      }
    },
    filterRules: [],
    rowLength: 3,
    moreLimiter: 3,
    moreCounter: 1
  },
  reducers: {
    setQueryParams(state, action) {
      if (action.payload.queryTitle) state.queryParams.queryTitle = action.payload.queryTitle;
      else state.queryParams.queryTitle = null;
      if (action.payload.queryLimit) state.queryParams.queryLimit = action.payload.queryLimit;
      if (action.payload.queryStart) state.queryParams.queryStart = action.payload.queryStart;
      if (action.payload.queryOrder) state.queryParams.queryOrder = action.payload.queryOrder;
    },
    setFilterRules(state, action) {
      state.filterRules = [];
      if (action.payload.length > 0) {
        action.payload.forEach(filterRule => state.filterRules.push(filterRule));
      }
    },
    filterProducts(state) {
      state.filteredProducts = state.products;
      if(state.filterRules.length > 0) state.filterRules.forEach(filterRule => state.filteredProducts = state.filteredProducts.filter(product => product[filterRule.filterBy] === filterRule.comparator));
      else return;
    },
    searchProducts(state, action) {
      state.searchedProducts = action.payload;
    },
    deleteProduct(state, action) {
       console.log(action.payload);
    },
    moreCounterIncrement(state) {
      state.moreCounter += 1;
    },
    increaseLimiter(state) {
      state.moreLimiter = state.moreCounter * state.rowLength;
    }
  },
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
      state.status = "resolved";
    },
    [fetchProducts.rejected]: setError
  }
});

export const { setQueryParams, setFilterRules, filterProducts, moreCounterIncrement, increaseLimiter, searchProducts } = productsSlice.actions;
export default productsSlice.reducer;