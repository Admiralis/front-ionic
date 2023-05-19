import {Redirect, Route} from 'react-router-dom';
import {
    IonApp,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    setupIonicReact
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import React from "react";

/* Pages */
import AddComputerPage from "./features/computer/AddComputer/AddComputer.page";
import EditComputerPage from "./features/computer/EditComputer/EditComputer.page";
import FindComputerPage from "./features/computer/FindComputer/FindComputer.page";
import AddCoursePage from "./features/course/AddCourse/AddCourse.page";
import CreateCollectiveLoanPage from "./features/loan/CreateCollectiveLoan/CreateCollectiveLoan.page";
import EndLoanPage from "./features/loan/EndLoan/EndLoan.page";
import CreateIndividualLoanPage from "./features/loan/CreateIndividualLoan/CreateIndividualLoan.page";
import EditIndividualLoanPage from "./features/loan/EditIndividualLoan/EditIndividualLoan.page";
import SettingsPage from "./features/settings/Settings.page";

/* Constants */
import PATHS from "commons/constants/PATHS";
import NotFoundPage from "./features/404/NotFound.page";
import useCheckApiConnection from "./commons/hooks/connection/useCheckApiConnection";
import scanMenuPage from "./features/computer/ScanMenu/ScanMenu.page";
import {CodebarIconComponent, ComputerIconComponent, WheelIconComponent} from "./commons/components/Icons";

setupIonicReact();






const withConnectionStatus = (Component: React.FC) => (props: any) => {

    const {isLoanApiConnected} = useCheckApiConnection();

    console.log('Connected ?', isLoanApiConnected);

    // if (!isLoanApiConnected) return <SettingsPage/>;
    if (!isLoanApiConnected) return <Redirect to={PATHS.SETTINGS.root}/>;
    return <Component {...props}/>;

}

const WrappedRoutes = withConnectionStatus(scanMenuPage);

const App: React.FC = () => {

    return (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>

                        <Route exact path={PATHS.SCAN.root} component={WrappedRoutes}/>

                        <Route exact path={PATHS.SCAN.newComputer} component={AddComputerPage}/>
                        <Route exact path={PATHS.COMPUTERS.new} component={EditComputerPage}/>

                        <Route exact path={PATHS.SCAN.editComputer} component={FindComputerPage}/>
                        <Route exact path={PATHS.COMPUTERS.detail + ":id"} component={EditComputerPage}/>

                        <Route exact path={PATHS.SCAN.newCourse} component={AddCoursePage}/>
                        <Route exact path={PATHS.LOANS.newCollective} component={CreateCollectiveLoanPage}/>

                        <Route exact path={PATHS.SCAN.endLoan} component={FindComputerPage}/>
                        <Route exact path={PATHS.LOANS.end + ":id"} component={EndLoanPage}/>


                        <Route exact path={PATHS.SCAN.newIndividualLoan}
                               component={CreateIndividualLoanPage}/>
                        <Route exact path={PATHS.LOANS.confirmIndividual}
                               component={EditIndividualLoanPage}/>

                        <Route exact path={PATHS.SETTINGS.root} component={SettingsPage}/>

                        <Redirect exact path="/" to={PATHS.SCAN.root}/>

                        <Route component={NotFoundPage}/>
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom">
                        <IonTabButton tab="stock" href="/stock">
                            <ComputerIconComponent/>

                        </IonTabButton>
                        <IonTabButton tab="scan" href={PATHS.SCAN.root}>
                            <CodebarIconComponent/>

                        </IonTabButton>
                        <IonTabButton tab="settigns" href={PATHS.SETTINGS.root}>
                            <WheelIconComponent/>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </IonApp>
    );
};

export default App;
