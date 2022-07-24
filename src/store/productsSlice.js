import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, docs, getDoc, setDoc, getFirestore, where, query, orderBy, getDocs, limit, onSnapshot, startAt, startAfter } from "firebase/firestore"; 
import '../fireBase';

const firestore = getFirestore();

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',


    async function queryForDocuments({ queryTitle, queryLimit, queryStart, queryOrder, queryFilterRules }, {rejectWithValue}) {
        try {
            const productsQuery = query(
                collection(firestore, `${'categories/' + queryTitle + '/products'}`),
                orderBy(queryOrder.orderBy, queryOrder.orderType),
                limit(queryLimit),
                // startAt(queryStart),
            );

            const querySnapshot = await getDocs(productsQuery);
            
            function allDocs() {
                let data = [];
                
                querySnapshot.forEach((snap) => {
                    // console.log(`Document ${snap.id} contains ${JSON.stringify(snap.data())}`);
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
        }
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
    console.log(state.error);
}

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        count: 0,
        products: [],
        status: null,
        error: null,
        queryParams: {
            queryTitle: 'Сalico',
            queryLimit: 4,
            // queryStart: 1,
            queryOrder: {
                orderBy: 'id',
                orderType: 'asc'
            }
        },
        filterRules: [
            {filterBy: "age", comparator: "Дитячий"},
            // {filterBy: "size", comparator: "Полуторний"}
        ]
    },
    reducers: {
        setQueryParams(state, action) {
            action.payload.queryTitle ? state.queryParams.queryTitle = action.payload.queryTitle : state.queryParams.queryTitle = state.queryParams.queryTitle;
            action.payload.queryLimit ? state.queryParams.queryLimit = action.payload.queryLimit : state.queryParams.queryLimit = state.queryParams.queryLimit;
            action.payload.queryStart ? state.queryParams.queryStart = action.payload.queryStart : state.queryParams.queryStart = state.queryParams.queryStart;
            action.payload.queryOrder ? state.queryParams.queryOrder = action.payload.queryOrder : state.queryParams.queryOrder = state.queryParams.queryOrder;
            action.payload.queryFilterRules ? state.queryParams.queryFilterRules = action.payload.queryFilterRules : state.queryParams.queryFilterRules = state.queryParams.queryFilterRules;
        },
        setFilterRules(state, action) {
            if(action.payload.filterRule) state.filterRules.push(action.payload.filterRule);
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
})

export const { setQueryParams, setFilterRules } = productsSlice.actions;
export default productsSlice.reducer;
// export const { increment } = productsSlice.actions;