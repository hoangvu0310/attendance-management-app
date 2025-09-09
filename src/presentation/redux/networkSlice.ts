import { createSlice } from '@reduxjs/toolkit'

const networkSlice = createSlice({
	name: 'network',
	initialState: { isConnected: false },
	reducers: {
		setIsConnected: (state, action) => {
			state.isConnected = action.payload
		},
	},
})

export const { setIsConnected } = networkSlice.actions
export default networkSlice.reducer
