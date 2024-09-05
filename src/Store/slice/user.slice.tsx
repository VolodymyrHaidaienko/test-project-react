import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { userService } from "../../services/UserService";
import  { AxiosError } from 'axios';



type Options = { [key: string]: string | number | boolean | null };

export interface UserModel {
  id: string | number,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string,
  company: Options,
  address: {
    city: string,
    geo: Options,
    suite: string,
    zipcode: string
  }
}
export interface FilterUserModel {
  name: string,
  username: string,
  email: string,
  phone: string
}

interface IssuesState {
  usersList: UserModel[];
  searchUsersLists: FilterUserModel[];
  status: null | string;
  error: null | string
}


const initialState: IssuesState = {
  usersList: [],
  searchUsersLists: [],
  status: null,
  error: null

}

export const getAllUser = createAsyncThunk(
    'user/getAllUser',
    async (_, { rejectWithValue }: any) => {
        try {
          const response = await userService.getAll()
            return response
        } catch (error) {
          return rejectWithValue(error);
        }

    }
)

const usersSlice = createSlice({
    name: 'user',
    initialState,
  reducers: {
    changeUserList: (state, action: PayloadAction<FilterUserModel[]>) => {
            state.searchUsersLists = action.payload
        }
    
    },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.pending, (state) => {
      state.status = 'pending'
      
      })
      .addCase(getAllUser.fulfilled, (state, { payload }) => {
        state.status = 'fulfilled'
        state.usersList = payload
      
    })
    .addCase(getAllUser.rejected, (state, { payload }) => {
      state.status = 'rejected'
      const error = payload as AxiosError;
       state.error = error.message;
    })

    }
});
export const { changeUserList } = usersSlice.actions;
const userReducer = usersSlice.reducer;
export default userReducer;
