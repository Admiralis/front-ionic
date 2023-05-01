import {Redirect, Route} from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    setupIonicReact
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {barcode, laptop, settings} from 'ionicons/icons';

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
import ScanMenuPage from "./features/computer/ScanMenu/ScanMenu.page";
import AddComputerPage from "./features/computer/AddComputer/AddComputer.page";
import EditComputerPage from "./features/computer/EditComputer/EditComputer.page";
import FindComputerPage from "./features/computer/FindComputer/FindComputer.page";
import AddCoursePage from "./features/course/AddCourse/AddCourse.page";
import CreateCollectiveLoanPage from "./features/loan/CreateCollectiveLoan/CreateCollectiveLoan.page";
import EndLoanPage from "./features/loan/EndLoan/EndLoan.page";

/* Constants */
import PATHS from "commons/constants/PATHS";
import CreateIndividualLoanPage from "./features/loan/CreateIndividualLoan/CreateIndividualLoan.page";

setupIonicReact();

const App: React.FC = () => (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>

                        <Route exact path={PATHS.SCAN.root} component={ScanMenuPage} />

                        <Route exact path={PATHS.SCAN.newComputer} component={AddComputerPage} />
                        <Route exact path={PATHS.COMPUTERS.new} component={EditComputerPage} />

                        <Route exact path={PATHS.SCAN.editComputer} component={FindComputerPage} />
                        <Route exact path={PATHS.COMPUTERS.detail + ":id"} component={EditComputerPage} />

                        <Route exact path={PATHS.SCAN.newCourse} component={AddCoursePage} />
                        <Route exact path={PATHS.LOANS.newCollective} component={CreateCollectiveLoanPage} />

                        <Route exact path={PATHS.SCAN.endLoan} component={FindComputerPage} />
                        <Route exact path={PATHS.LOANS.end + ":id"} component={EndLoanPage} />

                        <Route exact path={PATHS.SCAN.newIndividualLoan} component={CreateIndividualLoanPage} />
                        {/* TODO : <Route exact path={paths.loans.newIndividual} component={EditIndividualLoanPage} />*/}

                        <Redirect exact from="/" to={PATHS.SCAN.root} />

                    </IonRouterOutlet>
                    <IonTabBar slot="bottom">
                        <IonTabButton tab="tab1" href="/tab1">
                            <IonIcon aria-hidden="true" icon={laptop}/>
                            <IonLabel>Parc</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="scan" href={PATHS.SCAN.root}>
                            <IonIcon aria-hidden="true" icon={barcode}/>
                            <IonLabel>Scanner</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="tab3" href="/tab3">
                            <IonIcon aria-hidden="true" icon={settings}/>
                            <IonLabel>Paramètres</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </IonApp>
    )
;

export default App;
