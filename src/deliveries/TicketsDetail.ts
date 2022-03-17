import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit"
import httpRequest from "../config/HttpRequest";

const GET_DETAILS = 'TICKERS/GET_TICKETS';

type Pagination = {
    page: number,
    pageSize: number
}

type TicketDetailsResponse = {
    data: TicketDetails[];
    page: number;
    totalRecords: number;
}

type TicketDetails = {
    id: string;
    deliveryPriority: string;
    deliveryDetails: {
        customerType: string;
        deliveryStatus: string;
        expectedDeliveryTime: string
    }
}

export const getTicketDetails = createAsyncThunk(
    GET_DETAILS,
    async (payload: Pagination) => getTickets(payload)
)

function getTickets(values: Pagination): Promise<TicketDetailsResponse> {
    const url = `/tickets`;
    const params = { ...values };
    try {
        return httpRequest.request({
            url,
            method: 'GET',
            params
        });
    } catch (error) {
        throw new Error(error as string)
    }
}

const initialState: {
    tickets: TicketDetails[] | [], total: number, pageNumber: number,
    loading: boolean, error?: SerializedError, success: boolean
} = {
    tickets: [],
    total: 0,
    pageNumber: 0,
    loading: false,
    error: undefined,
    success: false
};

const slice = createSlice({
    name: "ticketDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTicketDetails.fulfilled, (state, action) => {
            state.tickets = action.payload.data;
            state.total = action.payload.totalRecords;
            state.pageNumber = action.payload.page;
            state.loading = false;
        }).addCase(getTicketDetails.pending, (state) => {
            state.loading = true;
        }).addCase(getTicketDetails.rejected, (state, action) => {
            state.tickets = initialState.tickets;
            state.total = initialState.total;
            state.pageNumber = initialState.pageNumber;
            state.loading = false;
            state.error = action.error
        });
    }
})

export default slice.reducer;