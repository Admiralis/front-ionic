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
import paths from "commons/constants/paths";

setupIonicReact();

const App: React.FC = () => (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>

                        <Route exact path={paths.scan.root} component={ScanMenuPage} />

                        <Route exact path={paths.scan.newComputer} component={AddComputerPage} />
                        <Route exact path={paths.computers.new} component={EditComputerPage} />

                        <Route exact path={paths.scan.editComputer} component={FindComputerPage} />
                        <Route exact path={paths.computers.detail} component={EditComputerPage} />

                        <Route exact path={paths.scan.newCourse} component={AddCoursePage} />
                        <Route exact path={paths.loans.newCollective} component={CreateCollectiveLoanPage} />

                        <Route exact path={paths.scan.endLoan} component={FindComputerPage} />
                        <Route exact path={paths.loans.end} component={EndLoanPage} />

                        <Redirect exact from="/" to={paths.scan.root} />

                        {/*<Route exact path="/scan" component={ScanMenuPage}/>*/}

                        {/*<Route exact path="/scan/add" component={AddComputerPage}/>*/}
                        {/*<Route exact path="/scan/add/confirm" component={EditComputerPage} />*/}

                        {/*<Route exact path="/scan/edit" component={FindComputerPage} />*/}
                        {/*<Route exact path="/scan/edit/:id" component={EditComputerPage} />*/}

                        {/*<Route exact path="/scan/course" component={AddCoursePage} />*/}
                        {/*<Route exact path="/scan/course/confirm" component={CreateCollectiveLoanPage} />*/}

                        {/*<Route exact path="/scan/stock" component={FindComputerPage} />*/}
                        {/*<Route exact path="/scan/stock/:id" component={EndLoanPage} />*/}

                    </IonRouterOutlet>
                    <IonTabBar slot="bottom">
                        <IonTabButton tab="tab1" href="/tab1">
                            <IonIcon aria-hidden="true" icon={laptop}/>
                            <IonLabel>Parc</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="scan" href="/scan">
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
