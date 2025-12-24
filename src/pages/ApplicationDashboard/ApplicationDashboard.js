import React, { useEffect, useState } from 'react';
import { Collapse, Skeleton } from 'antd';
import { connect } from "react-redux";
import { Table, Tabs, Button, Popover } from 'antd';

// Component
import { Container, LeftSection, ServiceBar, RightSection, ServiceName, BlankSpace, TableColumnName, ApplicationDashboardTable } from './ApplicationDashboardStyle';
import { BackIcon } from '../../components/CustomIcons';

// Actions
import { Link } from 'react-router-dom';
import { getOrgId } from '../../utils';
import { getApplicationDashboard, getApplicationDashboardResetState } from '../../actions/getApplicationDashboardAction';


const ApplicationDashboard = (props) => {
    const OrgId = getOrgId();
    const { getApplicationDashboard, getApplicationDashboardState, getApplicationDashboardResetState } = props;
    const [tableData, setTableData] = useState([]);
    const columns = [
        {
            title: <TableColumnName>#</TableColumnName>,
            dataIndex: 'key',
            key: 'key',
            // width: 10,
        },
        {
            title: <h3 style={{
                fontFamily: 'Helvetica',
                fontWeight: 'bold',
                fontSize: '1em',
                color: 'rgb(0 ,0 ,0 , 1)',
            }}>Application Type</h3>,
            dataIndex: 'ServiceName',
            width: 300,
            key: 'ServiceName',
        },
        {
            title: <TableColumnName>Total Applications recevied since 1st May 2021</TableColumnName>,
            dataIndex: 'ApplReceivedSinceMay2021',
            key: 'ApplReceivedSinceMay2021',
            // width: 150,
            align: 'center'
        },
        {
            title: <TableColumnName>Total Applications Disposed off since 1st May 2021</TableColumnName>,
            dataIndex: 'ApplDisposedSinceMay2021',
            key: 'ApplDisposedSinceMay2021',
            // width: 150,
            align: 'center'
        },
        {
            title: <TableColumnName>Applications Under Process</TableColumnName>,
            dataIndex: 'ApplUnderProcess',
            key: 'ApplUnderProcess',
            // width: 150,
            align: 'center'
        },
        {
            title: <TableColumnName>Applications Received Today</TableColumnName>,
            dataIndex: 'ApplReceivedToday',
            key: 'ApplReceived',
            // width: 150,
            align: 'center'
        },
        {
            title: <TableColumnName>Applications Disposed off Today</TableColumnName>,
            dataIndex: 'ApplDisposedToday',
            key: 'ApplDisposedToday',
            // width: 150,
            align: 'center'
        },
        {
            title: <TableColumnName>Applications Pending with Applicant</TableColumnName>,
            dataIndex: 'ApplPendingAtApplicant',
            key: 'ApplPendingAtApplicant',
            // width: 150,
            align: 'center'
        },
    ];


    useEffect(() => {
        return () => {
            getApplicationDashboardResetState()
        }
    }, [])

    useEffect(() => {
        getApplicationDashboard(OrgId);
    }, []);
    console.log(getApplicationDashboardState);
    useEffect(() => {
        if (getApplicationDashboardState.apiState === 'success') {
            let tableData = [];

            getApplicationDashboardState.list.ServiceList.map((data, index) => {
                tableData.push({
                    key: ++index,
                    ServiceName: data.ServiceName,
                    ApplReceivedSinceMay2021: data.ApplReceivedSinceMay2021,
                    ApplDisposedSinceMay2021: data.ApplDisposedSinceMay2021,
                    ApplUnderProcess: data.ApplUnderProcess,
                    ApplReceivedToday: data.ApplReceivedToday,
                    ApplDisposedToday: data.ApplDisposedToday,
                    ApplPendingAtApplicant: data.ApplPendingAtApplicant,
                })
            })
            setTableData(tableData);
        }
    }, [getApplicationDashboardState]);

    return (
        <Container>
            {getApplicationDashboardState.apiState === "loading" &&
                <>
                    <Skeleton active />
                </>
            }
            {getApplicationDashboardState.apiState === "success" &&
                <>
                    <ServiceBar>
                        <LeftSection>
                            <Link to="/" >
                                <BackIcon style={{ marginTop: 5 }} />
                            </Link>
                        </LeftSection>
                        <RightSection>
                            <ServiceName>Application Dashboard</ServiceName>
                        </RightSection>
                    </ServiceBar>
                    <BlankSpace />
                    <ApplicationDashboardTable columns={columns} dataSource={tableData} pagination={false} />
                </>
            }
        </Container>
    )
};

const mapStateToProps = (state) => ({
    getApplicationDashboardState: state.getApplicationDashboard,
});

const mapDispatchToProps = (dispatch) => ({
    getApplicationDashboard: (params) => dispatch(getApplicationDashboard(params)),
    getApplicationDashboardResetState: () => dispatch(getApplicationDashboardResetState())
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationDashboard);