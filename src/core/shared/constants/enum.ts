export enum IssueTag {
	ALL = 'Tất cả',
	DISMISS = 'Xin nghỉ',
	LATE = 'Đi muộn',
	LEAVE_EARLY = 'Về sớm',
	LATE_AND_LEAVE_EARLY = 'Đến muộn, về sớm',
	ONSITE = 'Onsite',
	BUSINESS = 'Đi công tác',
	CONFERENCE = 'Đi học, hội thảo',
	MEETING = 'Đi họp',
	CUSTOMER = 'Đi gặp khách hàng',
	OTHER = 'Vắng mặt khác',
}

export enum CheckinStatus {
	NOT_CHECKIN = 'Không chấm công',
	FULFILLED = 'Đủ công',
}

export enum IssueStatus {
	ALL = 'Tất cả',
	DRAFT = 'Lưu nháp',
	WAIT_FOR_APPROVAL = 'Chờ duyệt',
	APPROVED = 'Đã duyệt',
	DENIED = 'Từ chối',
	DENIED_CANCEL = 'Từ chối hủy',
	WAIT_FOR_CANCEL_APPROVAL = 'Chờ hủy',
	CANCEL_APPROVED = 'Đã duyệt hủy',
}

export enum RequestHistoryAction {
	CREATE = 'Khởi tạo',
	SEND = 'Gửi',
	UPDATE = 'Đã cập nhật',
	RETRIEVE = 'Thu hồi',
	REJECT = 'không được phê duyệt',
	APPROVE = 'đã được phê duyệt',
	CANCEL = 'Xin hủy',
	CANCEL_APPROVE = 'đã được phê duyệt hủy',
	REJECT_CANCEL = 'không được phê duyệt hủy',
}
