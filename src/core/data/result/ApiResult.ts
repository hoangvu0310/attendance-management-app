import { AppError, handleError, NetworkError, UnknownError } from '@/src/core/data/errors/AppError'
import { AxiosError } from 'axios'
import { useAppSelector } from '@src/presentation/hook/useAppSelector'
import { store } from '@src/presentation/redux/store'

export type ApiResult<T> = SuccessResult<T> | ErrorResult

export class SuccessResult<T> {
	constructor(public data: T) {}
}

export class ErrorResult {
	constructor(public error: AppError) {}
}

export async function runAsynchronousCall<T, E>(
	request: () => Promise<T>,
	map: (response: T) => E,
): Promise<ApiResult<E>> {
	const { isConnected } = store.getState().network
	if (!isConnected) {
		return new ErrorResult(new NetworkError())
	}

	try {
		const response = await request()
		return new SuccessResult(map(response))
	} catch (error) {
		if (error instanceof AxiosError) {
			return new ErrorResult(handleError(error))
		}
		return new ErrorResult(new UnknownError())
	}
}
