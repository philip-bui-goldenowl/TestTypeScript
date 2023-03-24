import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus } from '@/constants';
import { User } from '@/types/user';


export interface AuthInitialState {
  user: User,
  loading: string,
}
const authInitialState: AuthInitialState = {
  loading: RequestStatus.idle,
  user: {
    name: '',
    email: '',
    phone: 0,
    id: undefined,
    avatar: '',
    birthday: ''
  }
}
const slice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setInfoUser(state, action: PayloadAction<User>) {
      const user = action.payload
      state.user = user
    },
    clearAuth: (state) => {
      state.user = authInitialState.user
    },
  },
});
export const { setInfoUser, clearAuth } = slice.actions
export default slice.reducer;
