import React from 'react'
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom'
import "antd/dist/antd.less"

// others
import { setGeoLocation, setOrgId } from './utils'
import conf from './config'
import { Provider } from "react-redux"
import store from "./store"
import { ThemeProvider } from 'styled-components'
import theme from './theme'

// components
import NotFound from './components/NotFound'
import { Container, Content } from "./AppStyle"
import Header from './components/Header/Header'
import HeaderWithoutMenu from './components/HeaderWithoutMenu/HeaderWithoutMenu'
import ArchitectHeader from './components/ArchitectHeader/ArchitectHeader'

// pages
import HomePage from './pages/HomePage/HomePage'
import ServiceDetailPage from './pages/ServiceDetailPage/ServiceDetailPage'
import ServiceDetailsPrivatePropertiesPage from './pages/ServiceDetailsPrivateProperties/ServiceDetailsPrivatePropertiesPage'
import SetOrgIdPage from './pages/SetOrgIdPage'
import NdcDetails from './pages/NdcDetails/NdcDetails'
import SelectAuthority from './pages/SelectAuthority/SelectAuthority'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import SetNewPassword from './pages/SetNewPassword/SetNewPassword'
import PrintAcknowledgement from './pages/PrintAcknowledgement/PrintAcknowledgement'
import GetUpn from './pages/GetUpn/GetUpn'
import LinkMobileNumber from './pages/LinkMobileNumber/LinkMobileNumber'
import PropertyDetail from './pages/PropertyDetail/PropertyDetail'
import Faq from './pages/Faq/Faq'
import GetNoc from './pages/GetNoc/GetNoc'
import EditApplication from './pages/EditApplication/EditApplication'
import ServiceDetailOfEmpanellmentPage from './pages/ServiceDetailOfEmpanellmentPage/ServiceDetailOfEmpanellmentPage'
import ServiceDetailOfEstateAgentPage from './pages/ServiceDetailOfEstateAgentPage/ServiceDetailOfEstateAgentPage'
import ArchitectLogin from './pages/ArchitectLogin/ArchitectLogin'
import ArchitectDashboard from './pages/ArchitectDashboard/ArchitectDashboard'
import ServiceDetailOfLOI from './pages/ServiceDetailOfLOI/ServiceDetailOfLOI'
import ECLU from './pages/ECLU/ECLU'
import Grievance from './pages/Grievance/Grievance'
import GrievanceDetails from './pages/GrievanceDetails/GrievanceDetails'
import Colonies from './pages/Colonies/Colonies'
import PayWaterBill from './pages/PayWaterBill/PayWaterBill'
import WaterBillPaymentStatus from './pages/WaterBillPaymentStatus/WaterBillPaymentStatus'
import BuildingDetailsPrivatePropertiesPage from './pages/BuildingDetailsPrivateProperties/BuildingDetailsPrivatePropertiesPage'
import ApplicationDashboard from './pages/ApplicationDashboard/ApplicationDashboard'

const App = () => {

    setGeoLocation()

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Router basename={conf.basename} >
                    <Switch>
                        <Route path={["/"]} exact>
                            <Container>
                                <Header />
                                <ArchitectHeader width="950" />
                                <Content>
                                    <Switch>
                                        <Route exact path="/" component={HomePage} />
                                    </Switch>
                                </Content>
                            </Container>
                        </Route>

                        <Route path={[
                            "/service-details/:id",
                            "/service-details-private-properties/:id",
                            "/service-details-empanellment/:id",
                            "/service-details-estate-agent/:id",
                            "/set-org-id/:id",
                            "/ndc-details/:id",
                            "/application-detail/:id",
                            "/forgot-password",
                            "/get-upn",
                            "/link-mobile",
                            "/property-details/:id",
                            "/faq",
                            "/applicationDashboard",
                            "/colonies",
                            "/pay-water-bill",
                            "/water-bill-payment-status",
                            "/get-noc-by-upn",
                            "/edit-application/:ApplicationId",
                            "/architect-login/:id",
                            "/service-details-loi/:id",
                            "/eclu/:id",
                            "/grievance",
                            "/grievance-details/:OrgId/:GrievanceNo",
                            "/building-details-private-properties/:id"
                        ]} exact>
                            <Container>
                                <HeaderWithoutMenu />
                                <ArchitectHeader width="950" />
                                <Content>
                                    <Switch>
                                        <Route path="/service-details/:id" component={ServiceDetailPage} />
                                        <Route path="/building-details-private-properties/:id" component={BuildingDetailsPrivatePropertiesPage} />
                                        <Route path="/service-details-private-properties/:id" component={ServiceDetailsPrivatePropertiesPage} />
                                        <Route path="/service-details-empanellment/:id" component={ServiceDetailOfEmpanellmentPage} />
                                        <Route path="/service-details-estate-agent/:id" component={ServiceDetailOfEstateAgentPage} />
                                        <Route path="/set-org-id/:id" component={SetOrgIdPage} />
                                        <Route path="/ndc-details/:id" component={NdcDetails} />
                                        <Route path="/application-detail/:id" component={NdcDetails} />
                                        <Route path="/forgot-password" component={ForgotPassword} />
                                        <Route path="/set-new-password" component={SetNewPassword} />
                                        <Route path="/get-upn" component={GetUpn} />
                                        <Route path="/get-noc-by-upn" component={GetNoc} />
                                        <Route path="/link-mobile" component={LinkMobileNumber} />
                                        <Route path="/property-details/:id" component={PropertyDetail} />
                                        <Route path="/faq" component={Faq} />
                                        <Route path="/applicationDashboard" component={ApplicationDashboard}/>
                                        <Route path="/colonies" component={Colonies} />
                                        <Route path="/pay-water-bill" component={PayWaterBill} />
                                        <Route path="/water-bill-payment-status" component={WaterBillPaymentStatus} />
                                        <Route path="/edit-application/:ApplicationId" component={EditApplication} />
                                        <Route path="/architect-login/:id" component={ArchitectLogin} />
                                        <Route path="/service-details-loi/:id" component={ServiceDetailOfLOI} />
                                        <Route path="/eclu/:id" component={ECLU} />
                                        <Route path="/grievance" component={Grievance} />
                                        <Route path="/grievance-details/:OrgId/:GrievanceNo" component={GrievanceDetails} />
                                    </Switch>
                                </Content>
                            </Container>
                        </Route>

                        <Route path={[
                            "/architect-dashboard"
                        ]} exact>
                            <Container>
                                <HeaderWithoutMenu />
                                <ArchitectHeader width="1050" hideDashboardButton={true} />
                                <Content>
                                    <Switch>
                                        <Route path="/architect-dashboard" component={ArchitectDashboard} />
                                    </Switch>
                                </Content>
                            </Container>
                        </Route>


                        <Route path={["/print-acknowledgement/:ApplicationId"]} exact>
                            <Switch>
                                {/* <Route path="/download-ndc-certificate" component={DownloadNdc} /> */}
                                <Route path="/print-acknowledgement/:ApplicationId" component={PrintAcknowledgement} />
                            </Switch>
                        </Route>

                        <Route path={["/select-authority"]} exact>
                            <Container>
                                <Header />
                                <Content>
                                    <Switch>
                                        <Route exact path="/select-authority" component={SelectAuthority} />
                                    </Switch>
                                </Content>
                            </Container>
                        </Route>



                        <Route path="*" component={NotFound} status={404} />
                    </Switch>
                </Router>
            </ThemeProvider>
        </Provider >
    )
}

export default App
