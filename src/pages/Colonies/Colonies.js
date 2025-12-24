import React, { useEffect } from 'react'
import { connect } from "react-redux"
import { Collapse, Skeleton } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'
import ScrollBox from '../../components/ScrollBox'

// Component
import { Container, LeftSection, ServiceBar, RightSection, ServiceName, } from './ColoniesStyle'
import { Xcollapse } from '../../components/Xcomponents'
// Actions
import { getColoniesList } from '../../actions/getColoniesListAction'
import { BackIcon } from '../../components/CustomIcons'
import { Link } from 'react-router-dom'
import { getOrgId } from '../../utils'

const { Panel } = Collapse;
const Colonies = props => {
    // Variables
    const OrgId = getOrgId()
    const {
        getColoniesList, getColoniesListState,
    } = props

    // Callback
    useEffect(() => {
        window.scrollTo(0, 2)
        // console.log("hello")
        getColoniesList({
            OrgId: OrgId
        })
    }, [])

    const createMarkup = (processContent) => {
        return { __html: processContent };
    }
    return (

        <Container>
            <ScrollBox>
                {getColoniesListState.apiState === "loading" &&
                    <>
                        <Skeleton active />
                    </>
                }
                {getColoniesListState.apiState === "success" &&
                    <>
                        <ServiceBar>
                            <LeftSection>
                                <Link to="/" >
                                    <BackIcon style={{ marginTop: 5 }} />
                                </Link>
                            </LeftSection>
                            <RightSection>
                                <ServiceName>List of Colonies</ServiceName>
                            </RightSection>
                        </ServiceBar>
                        <Xcollapse accordion ghost
                            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                        >
                            {getColoniesListState.list.map((list) => {
                                return (
                                    <Xcollapse.Panel header={list.GroupName} key={list.GroupId}>
                                        <Collapse accordion>
                                            {list.FAQ.map((Colonies) => {
                                                return (
                                                    <Panel header={Colonies.Question} key={Colonies.Id}>
                                                        {Colonies.Answer !== null &&
                                                            <div dangerouslySetInnerHTML={createMarkup(Colonies.Answer)} >
                                                            </div>
                                                        }
                                                    </Panel>
                                                )
                                            })
                                            }
                                        </Collapse>
                                    </Xcollapse.Panel>
                                )
                            })
                            }
                        </Xcollapse>
                    </>
                }
            </ScrollBox>
        </Container>
    )
}

const mapStateToProps = (state) => ({
    getColoniesListState: state.getColoniesList,
    TranslatorState: state.Translator
});

const mapDispatchToProps = (dispatch) => ({
    getColoniesList: (params) => dispatch(getColoniesList(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Colonies)

