import { MutationCache, onlineManager, QueryCache, QueryClient } from '@tanstack/react-query'
import NetInfo from '@react-native-community/netinfo'

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5,
			retry: 3,
			refetchOnReconnect: 'always',
			refetchOnMount: true,
			refetchOnWindowFocus: false,
		},
		mutations: {
			retry: 1,
		},
	},
	queryCache: new QueryCache({
		onError: (error, query) => {
			console.log(`Query Error [${query.queryKey}]:`, error)
		},
		onSuccess: (_, query) => {
			console.log(`Query Success [${query.queryKey}]`)
		},
	}),
	mutationCache: new MutationCache({
		onError: (error, variables, context, mutation) => {
			console.log(`Mutation Error [${mutation.options.mutationKey}]:`, error)
		},
		onSuccess: (data, variables, context, mutation) => {
			console.log(`Mutation Success [${mutation.options.mutationKey}]`)
		},
		onMutate: (variables, mutation) => {
			console.log(`Mutation Started [${mutation.options.mutationKey}]`)
		},
	}),
})

onlineManager.setEventListener((setOnline) => {
	return NetInfo.addEventListener((state) => {
		setOnline(state.isConnected ?? false)
	})
})
