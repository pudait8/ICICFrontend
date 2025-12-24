import React from 'react'
import { Modal, Button, Row, Col, Alert } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import OtpInput from 'react-otp-input'
import { CheckIcon } from '../CustomIcons'
import { PropTypes } from 'prop-types'

const OtpModal = props => {

	const {
		visible,
		title,
		otp,
		onClose,
		onOtpChange,
		onVerify,
		verifyBtnLoading,
		displayError,
		errorMessage,
		resendOtpBtnType,
		resendOtpCountDown,
		onResendOtp
	} = props


	const handleCloseBtnClick = () => {
		onClose()
	}

	const handleOtpChange = (otp) => {
		onOtpChange(otp)
	}

	const handleVerifyOtpClick = () => {
		onVerify()
	}

	const handleResendOtpClick = () => {
		onResendOtp()
	}

	const RenderAlert = () => {
		if (displayError) {
			return (
				<div className="error-box">
					<Alert message={errorMessage} type="error" showIcon />
				</div>
			)
		}

		return null
	}

	const RenderResendBtn = () => {
		if (resendOtpBtnType === "allow_send" && resendOtpCountDown === 0) {
			return (
				<Button type="link" onClick={handleResendOtpClick} >Resend OTP</Button>
			)
		}

		if (resendOtpBtnType === "allow_send" && resendOtpCountDown > 0) {
			return (
				<Button type="link" disabled >Resend OTP {resendOtpCountDown}</Button>
			)
		}

		if (resendOtpBtnType === "sending") {
			return (
				<Button type="link" disabled >Sending...</Button>
			)
		}

		if (resendOtpBtnType === "not_allow") {
			return (
				<Button type="link" disabled >3 attemp done</Button>
			)
		}

		return null
	}


	return (
		<Modal
			visible={visible}
			title={null}
			footer={null}
			closable={false}
			className="otp-modal"
			centered={true}
		>
			<div className="title-container">
				<div className="center-item">{title}</div>
				<div className="right-item">
					<Button type="text" onClick={handleCloseBtnClick} ><CloseOutlined /></Button>
				</div>
			</div>
			<div className="input-container">
				<OtpInput
					value={otp}
					onChange={handleOtpChange}
					numInputs={6}
					shouldAutoFocus={true}
					focusStyle={{ border: "none" }}
				/>
			</div>
			<RenderAlert />
			<div className="button-container">
				<Row>
					<Col span={3} offset={6}>
						<Button
							type="primary"
							onClick={handleVerifyOtpClick}
							loading={verifyBtnLoading}
							shape="round"
							className="primary-blue"
							icon={<CheckIcon className="check-icon" />}
						>
							VERIFY
						</Button>
					</Col>
					<Col span={3} offset={3}>
						<RenderResendBtn />
					</Col>
				</Row>
			</div>
		</Modal>
	)
}

OtpModal.propTypes = {
	visible: PropTypes.bool,
	title: PropTypes.string,
	otp: PropTypes.string,
	onClose: PropTypes.func,
	onOtpChange: PropTypes.func,
	onVerify: PropTypes.func,
	verifyBtnLoading: PropTypes.bool,
	displayError: PropTypes.bool,
	errorMessage: PropTypes.string,
	resendOtpBtnType: PropTypes.string, //"allow_send","sending","not_allow", "count_down"
	resendOtpCountDown: PropTypes.string,
	onResendOtp: PropTypes.func,
}

OtpModal.defaultProps = {
	visible: false,
	title: "",
	otp: "",
	onClose: () => { return },
	onOtpChange: () => { return },
	onVerify: () => { return },
	verifyBtnLoading: false,
	displayError: false,
	errorMessage: "",
	resendOtpBtnType: "",
	resendOtpCountDown: "",
	onResendOtp: () => { return },
}


export default OtpModal