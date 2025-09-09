import { configureStore } from '@reduxjs/toolkit'
import networkReducer from './networkSlice'

export const store = configureStore({
	reducer: {
		network: networkReducer,
	},
})

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
