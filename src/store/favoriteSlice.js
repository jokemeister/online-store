import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, setDoc, getFirestore, query, orderBy, getDocs, deleteDoc} from "firebase/firestore"; 
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

export const createUserFavorite = createAsyncThunk(
    'favorite/createUserFavorite',

    async function(ip, {rejectWithValue, dispatch}) {
        const user = {
            ip_address: ip
        }
        console.log(ip);
        try {
            await setDoc(doc(firestore, `${'favorite/'}`, ip), user);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addToFavorite = createAsyncThunk(
    'favorite/addToFavorite',

    async function({product, currentUser}, {rejectWithValue}) {
        try {
            await setDoc(doc(firestore, `${'favorite/' + currentUser + '/products'}`, product.tag), product);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const removeFromFavorite = createAsyncThunk(
    'favorite/removeFromFavorite',

    async function({product, currentUser}, {rejectWithValue}) {
        console.log('product on slice', product);
        console.log('user on slice', currentUser);
        try {
            await deleteDoc(doc(firestore, `${'favorite/' + currentUser + '/products'}`, product.tag));
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

const favoriteSlice = createSlice({
    name: 'favorite',
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
        [fetchFavorite.pending]: (state) => {
            state.status = "loading";
            state.error = null;
        },
        [fetchFavorite.fulfilled]: (state, action) => {
            state.products = action.payload;
            state.status = "resolved";
        },
        [fetchFavorite.rejected]: setError
    }
})

export const { setCurrentUser } = favoriteSlice.actions;
export default favoriteSlice.reducer;