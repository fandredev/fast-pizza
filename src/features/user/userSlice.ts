

import { createSlice } from "@reduxjs/toolkit"

import '../../utils/geolocation'
import { fetchAddress } from "../../utils/geolocation"

const INITIAL_STATE = {
  username: '',
  status: 'idle',
  position: {
    latitude: 0,
    longitude: 0
  },
  error: '',
  address: ''
}

type ActionsUser = {
  type: string,
  payload: string
}

export const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    updateName: (state, action: ActionsUser) => {
      state.username = action.payload
    }
  },

  // Add extraReducers to handle the fetchAddress action from Redux Thunk Toolkit
  extraReducers: (builder) => {
   builder.addCase(fetchAddress.pending, (state) => {
      state.status = 'loading'
   }).addCase(fetchAddress.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.position = action.payload.position
      state.address = action.payload.address
   }).addCase(fetchAddress.rejected, (state, action) => {
      state.status = 'error'
      state.error = action.error.message || 'Error to get your geolocation'
   })
  }
})

export const { updateName } = userSlice.actions
export default userSlice.reducer