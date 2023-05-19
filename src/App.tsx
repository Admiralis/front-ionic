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
import {ComputerIconComponent, WheelIconComponent} from "./commons/components/Icons";

setupIonicReact();



function CodebarIconComponent() {
    return <svg width="40" height="41" viewBox="0 0 40 41" fill="none"
                xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="1" width="39" height="39" rx="19.5" fill="#193549" stroke="#CCCCCC"/>
        <g clipPath="url(#clip0_401_2644)">
            <path
                d="M10 11.125C10 10.9592 10.0658 10.8003 10.1831 10.6831C10.3003 10.5658 10.4592 10.5 10.625 10.5H14.375C14.5408 10.5 14.6997 10.5658 14.8169 10.6831C14.9342 10.8003 15 10.9592 15 11.125C15 11.2908 14.9342 11.4497 14.8169 11.5669C14.6997 11.6842 14.5408 11.75 14.375 11.75H11.25V14.875C11.25 15.0408 11.1842 15.1997 11.0669 15.3169C10.9497 15.4342 10.7908 15.5 10.625 15.5C10.4592 15.5 10.3003 15.4342 10.1831 15.3169C10.0658 15.1997 10 15.0408 10 14.875V11.125ZM25 11.125C25 10.9592 25.0658 10.8003 25.1831 10.6831C25.3003 10.5658 25.4592 10.5 25.625 10.5H29.375C29.5408 10.5 29.6997 10.5658 29.8169 10.6831C29.9342 10.8003 30 10.9592 30 11.125V14.875C30 15.0408 29.9342 15.1997 29.8169 15.3169C29.6997 15.4342 29.5408 15.5 29.375 15.5C29.2092 15.5 29.0503 15.4342 28.9331 15.3169C28.8158 15.1997 28.75 15.0408 28.75 14.875V11.75H25.625C25.4592 11.75 25.3003 11.6842 25.1831 11.5669C25.0658 11.4497 25 11.2908 25 11.125ZM10.625 25.5C10.7908 25.5 10.9497 25.5658 11.0669 25.6831C11.1842 25.8003 11.25 25.9592 11.25 26.125V29.25H14.375C14.5408 29.25 14.6997 29.3158 14.8169 29.4331C14.9342 29.5503 15 29.7092 15 29.875C15 30.0408 14.9342 30.1997 14.8169 30.3169C14.6997 30.4342 14.5408 30.5 14.375 30.5H10.625C10.4592 30.5 10.3003 30.4342 10.1831 30.3169C10.0658 30.1997 10 30.0408 10 29.875V26.125C10 25.9592 10.0658 25.8003 10.1831 25.6831C10.3003 25.5658 10.4592 25.5 10.625 25.5ZM29.375 25.5C29.5408 25.5 29.6997 25.5658 29.8169 25.6831C29.9342 25.8003 30 25.9592 30 26.125V29.875C30 30.0408 29.9342 30.1997 29.8169 30.3169C29.6997 30.4342 29.5408 30.5 29.375 30.5H25.625C25.4592 30.5 25.3003 30.4342 25.1831 30.3169C25.0658 30.1997 25 30.0408 25 29.875C25 29.7092 25.0658 29.5503 25.1831 29.4331C25.3003 29.3158 25.4592 29.25 25.625 29.25H28.75V26.125C28.75 25.9592 28.8158 25.8003 28.9331 25.6831C29.0503 25.5658 29.2092 25.5 29.375 25.5ZM15 15.5H16.25V16.75H15V15.5Z"
                fill="#CCCCCC"/>
            <path
                d="M18.75 13H12.5V19.25H18.75V13ZM13.75 14.25H17.5V18H13.75V14.25ZM16.25 24.25H15V25.5H16.25V24.25Z"
                fill="#CCCCCC"/>
            <path
                d="M18.75 21.75H12.5V28H18.75V21.75ZM13.75 23H17.5V26.75H13.75V23ZM23.75 15.5H25V16.75H23.75V15.5Z"
                fill="#CCCCCC"/>
            <path
                d="M21.25 13H27.5V19.25H21.25V13ZM22.5 14.25V18H26.25V14.25H22.5ZM20 20.5V23H21.25V24.25H20V25.5H22.5V23H23.75V25.5H25V24.25H27.5V23H23.75V20.5H20ZM22.5 23H21.25V21.75H22.5V23ZM27.5 25.5H26.25V26.75H23.75V28H27.5V25.5ZM22.5 28V26.75H20V28H22.5Z"
                fill="#CCCCCC"/>
            <path d="M25 21.75H27.5V20.5H25V21.75Z" fill="#CCCCCC"/>
        </g>
        <defs>
            <clipPath id="clip0_401_2644">
                <rect width="20" height="20" fill="white" transform="translate(10 10.5)"/>
            </clipPath>
        </defs>
    </svg>;
}



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
