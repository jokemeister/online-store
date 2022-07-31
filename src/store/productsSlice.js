import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, setDoc, getFirestore, query, orderBy, getDocs, limit } from "firebase/firestore"; 
import '../fireBase';

const firestore = getFirestore();

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',


  async function queryForDocuments({ queryTitle, queryLimit, queryOrder }, {rejectWithValue}) {
    try {
      const productsQuery = query(
        collection(firestore, `${'categories/' + queryTitle + '/products'}`),
        orderBy(queryOrder.orderBy, queryOrder.orderType),
        limit(queryLimit),
      );

      const querySnapshot = await getDocs(productsQuery);
            
      function allDocs() {
        const data = [];
                
        querySnapshot.forEach((snap) => {;
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

export const addProduct = createAsyncThunk(
  'products/addProduct',

  async function(queryTitle, {rejectWithValue, dispatch}) {
    const product = {
      id: 6,
      title: "Лаванда",
      body: "Крутий класний комплект прям такий, що аж спати в ньому хочеться і день, і ніч, і ніч, і день, і навіть не з кимось, а самому, адже таким золотом просто не хочеться ділитися ні з ким. Це просто вау комплект - рекомендую всім",
      tag: "AC0006",
      material: "Бязь",
      size: "Двоспальний",
      age: "Дорослий",
      img: "/assets/images/categories/calico/products/adults/AC0005/1.jpg",
      images: [
        "assets/images/categories/calico/products/adults/AC0005/2.jpg",
        "assets/images/categories/calico/products/adults/AC0005/3.jpg",
      ],
      sale: "true",
      available: "true"
    };
    try {
      await setDoc(doc(firestore, `${'categories/' + queryTitle + '/products'}`, product.tag), product);
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
      queryTitle: 'Сalico',
      queryOrder: {
        orderBy: 'id',
        orderType: 'asc'
      }
    },
    filterRules: [],
    rowLength: 4,
    moreLimiter: 4,
    moreCounter: 1
  },
  reducers: {
    setQueryParams(state, action) {
      if (action.payload.queryTitle) state.queryParams.queryTitle = action.payload.queryTitle;
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