import React, { useEffect } from 'react'
import { connect } from "react-redux"
import { Collapse, Skeleton } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'
import ScrollBox from '../../components/ScrollBox'

// Component
import { Container, LeftSection, ServiceBar, RightSection, ServiceName, } from './FaqStyle'
import { Xcollapse } from '../../components/Xcomponents'
// Actions
import { getFaqList } from '../../actions/getFaqListAction'
import { BackIcon } from '../../components/CustomIcons'
import { Link } from 'react-router-dom'

const { Panel } = Collapse;
const Faq = props => {
    // Variables

    const {
        getFaqList, getFaqListState,
        TranslatorState,
    } = props

    // Callback
    useEffect(() => {
        window.scrollTo(0, 2)
        getFaqList()
    }, [])

    const createMarkup = (processContent) => {
        return { __html: processContent };
    }
    return (

        <Container>
            <ScrollBox>
                {getFaqListState.apiState === "loading" &&
                    <>
                        <Skeleton active />
                    </>
                }
                {getFaqListState.apiState === "success" &&
                    <>
                        <ServiceBar>
                            <LeftSection>
                                <Link to="/" >
                                    <BackIcon style={{ marginTop: 5 }} />
                                </Link>
                            </LeftSection>
                            <RightSection>
                                <ServiceName>FAQ</ServiceName>
                            </RightSection>
                        </ServiceBar>
                        <Xcollapse accordion ghost
                            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                        >
                            {getFaqListState.list.map((list) => {
                                return (
                                    <Xcollapse.Panel header={list.GroupName} key={list.GroupId}>
                                        <Collapse accordion>
                                            {list.FAQ.map((faq) => {
                                                return (
                                                    <Panel header={faq.Question} key={faq.Id}>
                                                        {faq.Answer !== null &&
                                                            <div dangerouslySetInnerHTML={createMarkup(faq.Answer)} >
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
    getFaqListState: state.getFaqList,
    TranslatorState: state.Translator
});

const mapDispatchToProps = (dispatch) => ({
    getFaqList: () => dispatch(getFaqList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Faq)

