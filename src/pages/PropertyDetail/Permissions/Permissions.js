import React, { useState, useEffect } from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import { Skeleton } from 'antd'
import Lottie from 'react-lottie'
import { PlusCircleFilled } from '@ant-design/icons'

import { getPropertyPermissionsDetail } from '../../../actions/getPropertyPermissionsDetailAction'
import { Container } from './PermissionsStyle'
import RowList from '../../../components/RowList/RowList'
import StatusCard from '../../../components/StatusCard/StatusCard'
import { Xpagination, OrangeButton } from '../../../components/Xcomponents'
import RowListSkeleton from '../../../components/RowListSkeleton/RowListSkeleton'
import ScrollBox from '../../../components/ScrollBox'
import emptyAnimation from '../../../Lottie/empty-animation.json'

const Permissions = props => {

    const { getPropertyPermissionsDetailState, getPropertyPermissionsDetail } = props

    const [pagination, setPagination] = useState({
        currentPage: 1,
        recordsPerPage: 10
    })

    const handlePaginationPageChange = (page, pageSize) => {
        setPagination({ ...pagination, ["currentPage"]: page, ["recordsPerPage"]: pageSize })
    }

    const emptyAnimationOptions = {
        loop: true,
        autoplay: true,
        animationData: emptyAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }

    useEffect(() => {
        getPropertyPermissionsDetail({
            PropertyId: props.id,
            CurrentPageNumber: pagination.currentPage,
            PageSize: pagination.recordsPerPage,
            OrgId: props.org,
            AuthToken: props.AuthToken,
            AuthTokenKey: props.AuthTokenKey
        })
    }, [pagination])

    let randomColors = ["#c4e56d", "#e59b6d", "#b1e7ff"]
    const RenderList = props => {
        return (
            props.list.map(item => {
                return <RowList
                    img={<img src={`${process.env.PUBLIC_URL}/images/${item.ImageSrc}`} width="30" alt=" " />}
                    iconBg={randomColors[~~(randomColors.length * Math.random())]}
                    title={item.PermissionType}
                    subTitles={[
                        "Applied " + item.ApplicationReceiptDate,
                        "#" + item.DispatchPermissionNumber,
                    ]}
                    displayContentOnHover={false}
                />

            })
        )
    }

    return (
        <ScrollBox>
            {
                getPropertyPermissionsDetailState.uiState === "loading" &&
                <RowListSkeleton rows={10} />
            }

            {
                getPropertyPermissionsDetailState.uiState === "ideal" &&
                <>
                    <RenderList list={getPropertyPermissionsDetailState.list} />
                    <Xpagination
                        pageSizeOptions={['2', '10', '15', '25', '50']}
                        showSizeChanger
                        onChange={handlePaginationPageChange}
                        current={pagination.currentPage}
                        defaultPageSize={pagination.recordsPerPage}
                        total={getPropertyPermissionsDetailState.totalRecords}
                        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                        hideOnSinglePage={true}
                    />
                </>
            }

            {
                getPropertyPermissionsDetailState.uiState === "error" &&
                <StatusCard title="Something is not right" />
            }

            {
                getPropertyPermissionsDetailState.uiState === "empty" &&
                <StatusCard
                    graphics={
                        <Lottie
                            options={emptyAnimationOptions}
                            height={300}
                            width={300}
                        />
                    }
                    title="No permission issued for this property!"
                // action={<Link to="/"><OrangeButton icon={<PlusCircleFilled />} >New Application</OrangeButton></Link>}
                />
            }
        </ScrollBox>
    )
}

const mapStateToProps = (state) => ({ getPropertyPermissionsDetailState: state.getPropertyPermissionsDetail })

const mapDispatchToProps = (dispatch) => ({
    getPropertyPermissionsDetail: (params) => dispatch(getPropertyPermissionsDetail(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Permissions)