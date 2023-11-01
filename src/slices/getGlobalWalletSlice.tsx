import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/httpService";
import { toast } from "react-toastify";

interface Savings {
    id: string;
    user_id: string;
    total_amount: number;
    type: string;
    total_group_savings: number;
    total_personal_savings: number;
    total_income: number;
}

export interface InitialState {
    globalSavings: Savings;

    error: string;
}

const initialState: InitialState = {
    globalSavings: {
        id: "",
        user_id: "",
        total_amount: 0,
        type: "",
        total_group_savings: 0,
        total_personal_savings: 0,
        total_income: 0,
    },

    error: "",
};

export const getGlobalSavings = createAsyncThunk(
    "globalSavings/getGlobal",

    async (_, thunkAPI) => {
        try {
            //  const groupId = localStorage.getItem('groupId');

            const response = await axios.get("/users/global-wallet");
            return response.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            } else if (error.request) {
                return thunkAPI.rejectWithValue("Network Error");
            } else {
                return thunkAPI.rejectWithValue(error.message);
            }
        }
    }
);

const getGlobalWalletSlice = createSlice({
    name: "globalSavings",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getGlobalSavings.pending, (state) => {
                state.error = "";
            })
            .addCase(getGlobalSavings.fulfilled, (state, action) => {
                state.globalSavings = action.payload.data;
                toast(action.payload.message);
            })
            .addCase(getGlobalSavings.rejected, (state, action) => {
                state.error = action.payload as string;
                toast(action.payload as string);
            });
    },
});

export default getGlobalWalletSlice.reducer;