import { useSelector } from 'react-redux'
import { AppRootState } from '@/src/presentation/redux/store'

export const useAppSelector = useSelector.withTypes<AppRootState>()
