import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/src/presentation/redux/store'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
