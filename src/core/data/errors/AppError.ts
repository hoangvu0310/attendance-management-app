import { AxiosError } from 'axios'

export abstract class AppError extends Error {
	protected constructor(message: string) {
		super(message)
		this.message = message
	}

	public message: string
}

export class UnknownError extends AppError {
	constructor() {
		super('error.unknown')
	}
}

export class NetworkError extends AppError {
	constructor() {
		super('error.network')
	}
}

export class ServerError extends AppError {
	constructor() {
		super('error.server')
	}
}

export class ApiCallError extends AppError {
	constructor(message: string) {
		super(message)
		this.message = message
	}

	public message: string
}

export function handleError(error: any): AppError {
	if (error instanceof AxiosError) {
		if (error.response && error.response.data) {
			const responseErrorMessage = error.response.data.message
			return new ApiCallError(responseErrorMessage)
		} else if (error.request) {
			return new ServerError()
		}
		return new UnknownError()
	}
	return new UnknownError()
}
