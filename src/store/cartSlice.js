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
                let data = [];
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

export const createUserCart = createAsyncThunk(
    'cart/createUserCart',

    async function(ip, {rejectWithValue, dispatch}) {
        const user = {
            ip_address: ip
        }
        console.log(ip);
        try {
            await setDoc(doc(firestore, `${'cart/'}`, ip), user);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addToCart = createAsyncThunk(
    'cart/addToCart',

    async function({product, currentUser}, {rejectWithValue}) {
        try {
            await setDoc(doc(firestore, `${'cart/' + currentUser + '/products'}`, product.tag), product);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',

    async function({product, currentUser}, {rejectWithValue}) {
        console.log('product on slice', product);
        console.log('user on slice', currentUser);
        try {
            await deleteDoc(doc(firestore, `${'cart/' + currentUser + '/products'}`, product.tag));
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

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        user: '109.227.87.143',
        products: [],
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
            state.products = action.payload;
            state.status = "resolved";
        },
        [fetchCart.rejected]: setError
    }
})

export const { setCurrentUser } = cartSlice.actions;
export default cartSlice.reducer;