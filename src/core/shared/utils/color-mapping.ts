import { IssueStatus, IssueTag } from '@src/core/shared/constants/enum'
import { COLORS } from '@src/core/shared/constants'

export const statusColorMapping = (status: IssueStatus) => {
	switch (status) {
		case IssueStatus.APPROVED:
		case IssueStatus.CANCEL_APPROVED:
			return COLORS.green['600']
		case IssueStatus.DENIED:
		case IssueStatus.DENIED_CANCEL:
			return COLORS.red['500']
		case IssueStatus.WAIT_FOR_APPROVAL:
		case IssueStatus.WAIT_FOR_CANCEL_APPROVAL:
			return COLORS.yellow['500']
		case IssueStatus.DRAFT:
		default:
			return COLORS.gray['700']
	}
}

export const issueTagColorMapping = (tag: IssueTag) => {
	switch (tag) {
		case IssueTag.DISMISS:
			return COLORS.green['600']
		case IssueTag.LATE:
		case IssueTag.LEAVE_EARLY:
		case IssueTag.LATE_AND_LEAVE_EARLY:
			return COLORS.yellow['500']
		case IssueTag.CONFERENCE:
		case IssueTag.OTHER:
		case IssueTag.CUSTOMER:
		case IssueTag.MEETING:
		case IssueTag.BUSINESS:
		case IssueTag.ONSITE:
			return COLORS.purple['500']
		default:
	}
}
