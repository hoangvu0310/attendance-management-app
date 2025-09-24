import SafeAreaScreen from '@src/presentation/components/SafeAreaScreen'
import { useLocalSearchParams } from 'expo-router'

import { IssueTag } from '@src/core/shared/constants/enum'
import CreateRequestForm from '@src/presentation/components/form/CreateRequestForm'

export default function CreateRequest() {
	const { type } = useLocalSearchParams<{ type: IssueTag }>()

	return (
		<SafeAreaScreen title={'Xin phép'}>
			<CreateRequestForm type={type} />
		</SafeAreaScreen>
	)
}
