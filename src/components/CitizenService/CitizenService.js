import React, { useEffect, useState, useCallback } from "react"
import { connect } from "react-redux"
import { Row, Col } from 'antd'
import { Link, Redirect } from "react-router-dom"
import debounce from 'lodash/debounce'

// components
import {
    SearchInput, TopBar, TopBarLeft, TopBarRight,
    SeriveContainer, SeriveRow, ServiceName
} from './CitizenServiceStyle'
import { ZoomGlassIcon } from '../CustomIcons'
import { DynamicSkeleton } from "../Xcomponents"

// actions
import { getServiceList } from '../../actions/getServiceListAction'
import { getOrgId } from '../../utils'

const CitizenService = props => {
    // variables
    const { getServiceList, getServiceListState } = props
    const [searchText, setSearchText] = useState("")
    const setDebouncedSearchText = useCallback(
        debounce(q => setSearchText(q), 500), []
    )
    const [serviceUrl, setServiceUrl] = useState("")
    const [redirect, setRedirect] = useState(false)
    const OrgId = getOrgId()
    // callbacks
    useEffect(() => {
        getServiceList({
            OrgId: OrgId,
            SearchText: searchText
        })
    }, [searchText])

    // Function
    const gotToSerive = (id) => {
        if (id === 1679 || id === 1710 || id === 1727) { // 1679, 1710 and 1727 id reserved for Empanellment of Architect
            setServiceUrl(`/service-details-empanellment/${id}`)
        }
        else if (id === 28 || id === 29 || id === 1721 || id === 1726) { // 1721 and 1726 id reserved for Plumber
            setServiceUrl(`/service-details-estate-agent/${id}`)
        }
        else if (id === 27 || id === 951 || id === 1729 || id === 1730 || id === 1731 || id === 1732 || id === 951) {
            setServiceUrl(`/architect-login/${id}`)
        }
        else if (id === 2000) {
            setServiceUrl(`/service-details-loi/${id}`)
        }
        else if (id === 1626 || id === 1625) {
            setServiceUrl(`/service-details-private-properties/${id}`)
        }
        else {
            setServiceUrl(`/service-details/${id}`)
        }
        setRedirect(true)
    }
    return (
        <>
            {redirect &&
                <Redirect to={serviceUrl} />
            }
            <TopBar>
                <TopBarLeft>
                    <h3 style={{ fontWeight: "bold", fontSize: 20, margin: 0 }} >List of Citizen Services</h3>
                </TopBarLeft>
                <TopBarRight>
                    <SearchInput
                        placeholder="Search by Service Name"
                        suffix={<ZoomGlassIcon size="18" />}
                        onChange={(e) => setDebouncedSearchText(e.target.value)}
                    />
                </TopBarRight>
            </TopBar>
            <SeriveContainer>
                {getServiceListState.apiState === "loading" &&
                    <ol style={{ marginTop: 16 }} >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
                            <SeriveRow>
                                <Row>
                                    {/* <Col span="2">
                                        <div style={{ height: 30, width: 30 }} >
                                            <DynamicSkeleton w="100%" h="100%" active />
                                        </div>
                                    </Col> */}
                                    <Col span="22">
                                        <span style={{ fontSize: 18, marginLeft: 8 }} >
                                            <DynamicSkeleton w="100%" h="100%" active />
                                        </span>
                                    </Col>
                                </Row>
                            </SeriveRow>
                        ))}
                    </ol>
                }

                {getServiceListState.apiState === "success" &&
                    <>
                        {getServiceListState.data &&
                            <ol style={{ marginTop: 16 }} >
                                {getServiceListState.data.map(service => (
                                    <>
                                        {service.Services.map(item => (
                                            <SeriveRow>
                                                <Link onClick={() => gotToSerive(item.Id)} style={{ display: 'flex' }} >
                                                    <Row>
                                                        <Col>
                                                            <ServiceName >{item.Name}</ServiceName>
                                                        </Col>
                                                    </Row>
                                                </Link>
                                                {/* <Link to={item.Id === 1679 ? `/service-details-empanellment/${item.Id}` : (item.Id === 28 || item.Id === 29) ? `/service-details-estate-agent/${item.Id}` : (item.Id === 27 || item.Id === 951) ? `/architect-login` : `/service-details/${item.Id}`} style={{ display: 'flex' }} >
                                                    <Row>
                                                        <Col>
                                                            <ServiceName >{item.Name}</ServiceName>
                                                        </Col>
                                                    </Row>
                                                </Link> */}
                                            </SeriveRow>
                                        ))}
                                    </>
                                ))}
                            </ol>
                        }

                        {getServiceListState.data.length === 0 &&
                            <h4>No services found</h4>
                        }
                    </>
                }
            </SeriveContainer>
        </>
    )
}

const mapStateToProps = (state) => ({
    getServiceListState: state.getServiceList,
})
const mapDispatchToProps = (dispatch) => ({
    getServiceList: (params) => dispatch(getServiceList(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CitizenService)