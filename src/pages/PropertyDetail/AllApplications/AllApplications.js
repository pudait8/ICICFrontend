import React, { useState, useEffect, useCallback } from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import { SearchOutlined, PlusCircleFilled } from '@ant-design/icons'
import debounce from "lodash/debounce"
import Lottie from 'react-lottie'
import { Tag } from "antd"



import { getPropertyAllApplications } from '../../../actions/getPropertyAllApplicationsAction'
import { Container } from './AllApplicationsStyle'
import RowList from '../../../components/RowList/RowList'
import StatusCard from '../../../components/StatusCard/StatusCard'
import { AnimatedSearch, OrangeButton, Xpagination } from '../../../components/Xcomponents'
import RowListSkeleton from '../../../components/RowListSkeleton/RowListSkeleton'
import AdminSubHeader2 from '../../../components/AdminSubHeader2/AdminSubHeader2'
import ScrollBox from '../../../components/ScrollBox'
import FlexBar from '../../../components/FlexBar/FlexBar'
import manThumbUpAnimation from '../../../Lottie/man-showing-thumb-up'
import strings from '../../../strings.json'

const AllApplications = props => {

    const { getPropertyAllApplicationsState, getPropertyAllApplications } = props

    const [pagination, setPagination] = useState({
        currentPage: 1,
        recordsPerPage: 10
    })

    const [searchTerm, setSearchTerm] = useState("")

    const setDebouncedSearchTerm = useCallback(
        debounce(q => setSearchTerm(q), 500), []
    )

    const handlePaginationPageChange = (page, pageSize) => {
        setPagination({ ...pagination, ["currentPage"]: page, ["recordsPerPage"]: pageSize })
    }

    useEffect(() => {
        getPropertyAllApplications({
            PropertyRefId: props.id,
            CurrentPageNumber: pagination.currentPage,
            PageSize: pagination.recordsPerPage,
            OrgId: props.org,
            SearchText: searchTerm,
            SortOrder: "",
            AuthToken: props.AuthToken,
            AuthTokenKey: props.AuthTokenKey
        })
    }, [pagination, searchTerm])

    let randomColors = ["#c4e56d", "#e59b6d", "#b1e7ff"]
    const RenderList = props => {
        return (
            props.list.map(item => {
                let link = `/application-detail/${item.ApplicationId}?property=${item.PropertyRefId}&service=${item.ApplicationTypeId}&org=${item.OrgId}`
                if (item.ApplicationStatus === "Draft" && [20, 21].includes(item.ApplicationTypeId)) {
                    link = `/permission-for-sale-application-form/${item.ApplicationTypeId}?property=${item.PropertyRefId}&org=${item.OrgId}&ApplicationId=${item.ApplicationId}`
                }
                if (item.ApplicationStatus === "Draft" && [1509, 26, 1508].includes(item.ApplicationTypeId)) {
                    link = `/change-of-ownership-death-case-form/${item.ApplicationTypeId}?property=${item.PropertyRefId}&org=${item.OrgId}&ApplicationId=${item.ApplicationId}&upn=${item.UPN}`
                }
                if (item.ApplicationStatus === "Draft" && [25, 32].includes(item.ApplicationTypeId)) {
                    link = `/change-of-ownership-form/${item.ApplicationTypeId}?property=${item.PropertyRefId}&org=${item.OrgId}&ApplicationId=${item.ApplicationId}&upn=${item.UPN}`
                }
                return <Link to={link} >
                    <RowList
                        img={<img src={`${process.env.PUBLIC_URL}/images/${item.ImageSrc}`} width="30" alt={item.ApplicationType} />}
                        iconBg={randomColors[~~(randomColors.length * Math.random())]}
                        title={item.ApplicationType}
                        status={<Tag color={strings.ApplicationStatusColors[item.ApplicationStatus] && strings.ApplicationStatusColors[item.ApplicationStatus].badgeColor || ""}>{item.ApplicationStatus}</Tag>}
                        subTitles={[
                            "Diary No.: " + item.DiaryNo,
                            "Applied: " + item.ApplicationDate,
                            "Property : " + item.PropertyNo + ", " + item.SchemeName,
                        ]}
                    />
                </Link>
            })
        )
    }

    const animationOptions = {
        loop: true,
        autoplay: true,
        animationData: manThumbUpAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }

    return (
        <>
            <AdminSubHeader2>
                <FlexBar
                    leftContent={<AnimatedSearch placeholder="Search" prefix={<SearchOutlined />} onChange={e => setDebouncedSearchTerm(e.target.value)} allowClear />}
                    rightContent={<Link to="/"><OrangeButton icon={<PlusCircleFilled />}>New Application</OrangeButton></Link>}
                    spacingX="0.8rem"
                    spacingY="0.5rem"
                />
            </AdminSubHeader2>
            <ScrollBox>
                {
                    getPropertyAllApplicationsState.uiState === "loading" &&
                    <RowListSkeleton rows={10} />
                }

                {
                    getPropertyAllApplicationsState.uiState === "ideal" &&
                    <>
                        <RenderList list={getPropertyAllApplicationsState.list} />
                        <Xpagination
                            pageSizeOptions={['2', '10', '15', '25', '50']}
                            showSizeChanger
                            onChange={handlePaginationPageChange}
                            current={pagination.currentPage}
                            defaultPageSize={pagination.recordsPerPage}
                            total={getPropertyAllApplicationsState.totalRecords}
                            showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                            hideOnSinglePage={true}
                        />
                    </>
                }

                {
                    getPropertyAllApplicationsState.uiState === "error" &&
                    <StatusCard title="Something is not right" />
                }

                {
                    getPropertyAllApplicationsState.uiState === "notFound" &&
                    <StatusCard title="Record not found" />
                }

                {
                    getPropertyAllApplicationsState.uiState === "empty" &&
                    <StatusCard
                        title="No application submitted yet!"
                        description="You can submit an application by clicking the button below."
                        graphics={<Lottie
                            options={animationOptions}
                            width={250}
                            height={250}
                        />}
                        action={<Link to="/"><OrangeButton icon={<PlusCircleFilled />}>New Application</OrangeButton></Link>}
                    />
                }
            </ScrollBox>
        </>
    )
}

const mapStateToProps = (state) => ({ getPropertyAllApplicationsState: state.getPropertyAllApplications })

const mapDispatchToProps = (dispatch) => ({
    getPropertyAllApplications: (params) => dispatch(getPropertyAllApplications(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllApplications)