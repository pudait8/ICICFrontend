import React, { useEffect, useState } from "react"
import { PlusOutlined } from '@ant-design/icons'
import PropsTypes from "prop-types"
import { message, Progress, Tooltip } from "antd"
import ImgCrop from 'antd-img-crop'

//components
import { Xupload } from '../Xcomponents'
import { UploadContainer, UploadWrapper, UploadArea, SuccessContainer, ErrorContainer } from './FileUploadStyle'


const FileUpload = props => {


    // variables
    const [uploadStatus, setUploadStatus] = useState("empty")
    const [fileProgress, setFileProgress] = useState(0)
    const [fileUploaded, setFileUploaded] = useState(false)

    const uploadIcon = (
        <UploadContainer>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </UploadContainer>
    )

    const loadingIcon = (
        <UploadContainer>
            <Progress type="circle" percent={fileProgress.toFixed(0)} width={60} />
        </UploadContainer>
    )

    const successIcon = (
        <SuccessContainer>
            <Progress type="circle" percent={100} width={60} />
        </SuccessContainer>
    )

    const errorIcon = (
        <Tooltip title="Try Again">
            <ErrorContainer>
                <Progress type="circle" percent={100} width={60} status="exception" />
            </ErrorContainer>
        </Tooltip>
    )


    // callbacks


    // functions
    const beforeUpload = (file) => {
        const validFileType = props.allowedFileTypes.includes(file.type)
        if (!validFileType) {
            message.error(props.fileTypeValidationMessage, 5);
        }
        const validFileSize = file.size / 1024 < props.allowedFileSizeInKb;
        if (!validFileSize) {
            message.error('Allowed filed size is ' + props.allowedFileSizeInKb + 'KB', 5);
        }
        if (validFileType && validFileSize) {
            setUploadStatus("loading")
            setFileProgress(0)
        }
        return validFileType && validFileSize
    }

    const handleFileProgress = (percent) => {
        setFileProgress(percent)
    }

    const handleFileOnSuccess = (info, idx) => {
        setUploadStatus("success")
        setFileUploaded(true)
        props.onSuccess(info)
    }

    const handleFileOnError = (info, idx) => {
        setUploadStatus("error")
    }

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    }

    return (
        <UploadWrapper>
            <UploadArea>
                {props.crop &&
                    <ImgCrop rotate>
                        <Xupload
                            action={encodeURI(props.action)}
                            name={props.name}
                            listType="picture-card"
                            showUploadList={false}
                            beforeUpload={(file => beforeUpload(file))}
                            onProgress={(info) => handleFileProgress(info.percent)}
                            onSuccess={(info) => handleFileOnSuccess(info)}
                            onError={(info) => handleFileOnError(info)}
                            key={props.key}
                            headers={props.headers}
                            multiple={false}
                            // ref={inputFileRef}
                            className={props.displayFileValidation && props.required && !fileUploaded ? "display-validation" : "textcls"}
                            onPreview={onPreview}
                        >
                            {uploadStatus === "empty" &&
                                uploadIcon}
                            {uploadStatus === "loading" &&
                                loadingIcon}
                            {uploadStatus === "success" &&
                                successIcon}
                            {uploadStatus === "error" &&
                                errorIcon}
                        </Xupload>
                    </ImgCrop>}

                {!props.crop &&
                    <Xupload
                        action={encodeURI(props.action)}
                        name={props.name}
                        listType="picture-card"
                        showUploadList={false}
                        beforeUpload={(file => beforeUpload(file))}
                        onProgress={(info) => handleFileProgress(info.percent)}
                        onSuccess={(info) => handleFileOnSuccess(info)}
                        onError={(info) => handleFileOnError(info)}
                        key={props.key}
                        headers={props.headers}
                        multiple={false}
                        // ref={inputFileRef}
                        className={props.displayFileValidation && props.required && !fileUploaded ? "display-validation" : "textcls"}
                    >
                        {uploadStatus === "empty" &&
                            uploadIcon}
                        {uploadStatus === "loading" &&
                            loadingIcon}
                        {uploadStatus === "success" &&
                            successIcon}
                        {uploadStatus === "error" &&
                            errorIcon}
                    </Xupload>}

            </UploadArea>
            <p className="title"> {props.name}</p>
            {!props.displayFileValidation
                ? null
                : [
                    props.required
                        ? [
                            fileUploaded
                                ? null
                                : <p style={{ color: "red" }}>Required</p>
                        ]
                        : null
                ]
            }
        </UploadWrapper>

    )
}
FileUpload.propsTypes = {
    action: PropsTypes.string,
    name: PropsTypes.string,
    key: PropsTypes.string,
    headers: PropsTypes.object,
    allowedFileTypes: PropsTypes.array,
    allowedFileSizeInKb: PropsTypes.number,
    displayFileValidation: PropsTypes.bool,
    required: PropsTypes.bool,
    onSuccess: PropsTypes.func,
    crop: PropsTypes.bool,
    fileTypeValidationMessage: PropsTypes.string,
}

FileUpload.defaultProps = {
    action: "",
    name: "",
    key: "",
    headers: {},
    allowedFileTypes: ["image/jpg", "image/jpeg"],
    allowedFileSizeInKb: 1000,
    displayFileValidation: false,
    required: false,
    onSuccess: () => { return },
    crop: false,
    fileTypeValidationMessage: "File type is not allowed!",
}

export default FileUpload