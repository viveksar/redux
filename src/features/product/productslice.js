import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
const initialState={
    products:[],
    page:1,
    product_detail_id:'',
    product_details:"",
    product_details_loading:false,
    product_detail_error:""
}

export let fetchProductDetail=createAsyncThunk("product/fetchProductDetail",async(pid,thunkAPI)=>{
    const response = await fetch(
            `https://fakestoreapi.com/products/${pid}`
        );
        console.log("thunk before:",thunkAPI.getState())
        thunkAPI.dispatch(setProductDetailid(pid))
        console.log("thunk after:",thunkAPI.getState())
        if (!response.ok) {
            // throw new Error("Failed to fetch users");
            return thunkAPI.rejectWithValue("not good")
        }

        const data = await response.json();

        return data;
})

export const productSlice=createSlice({
    name:"products",
    initialState,
    reducers:{
        nextpage:(state)=>{
            state.page+=1
        },
        prevpage:(state)=>{
            if (state.page>1){
                state.page-=1
            }
        },
        updateAllProducts:(state,action)=>{
            state.products=action.payload
        },
        resetProducts:(state)=>{
            state.products=[]
            state.page=1
        },
        setProductDetailid:(state,action)=>{
            state.product_detail_id=action.payload
            // fetchProductDetail(action.payload)
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProductDetail.pending,(state,action)=>{
            console.log("here is the pending state of the reducer:",action)
            state.product_details_loading=true
            state.product_detail_error=null
        }).addCase(fetchProductDetail.fulfilled,(state,action)=>{
            state.product_details_loading=false
            state.product_details=action.payload
        }).addCase(fetchProductDetail.rejected,(state,action)=>{
            state.product_details_loading=false
            state.product_details=null
            state.product_detail_error="Error Occured!Enter correct product id "+ action.error.message
            console.log("here is the action for error:",action)
        })
    }
})

export const {nextpage,prevpage,updateAllProducts,resetProducts,setProductDetailid}=productSlice.actions

export default productSlice.reducer