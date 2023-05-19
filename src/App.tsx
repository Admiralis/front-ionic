import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact} from '@ionic/react';
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

/* Constants */
import PATHS from "commons/constants/PATHS";
import NotFoundPage from "./features/404/NotFound.page";

/* Icons */
import {CodebarIconComponent, ComputerIconComponent, WheelIconComponent} from "./commons/components/Icons";

/* Wrapper and pages */
import WrappedPages from "./features/pages.wrapper";
import SettingsPage from "./features/settings/Settings.page";

setupIonicReact();


const App: React.FC = () => {

    return (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>

                        <Route exact path={PATHS.SCAN.root} component={WrappedPages.scanMenu}/>

                        <Route exact path={PATHS.SCAN.newComputer} component={WrappedPages.addComputer}/>
                        <Route exact path={PATHS.COMPUTERS.new} component={WrappedPages.editComputer}/>

                        <Route exact path={PATHS.SCAN.editComputer} component={WrappedPages.findComputer}/>
                        <Route exact path={PATHS.COMPUTERS.detail + ":id"} component={WrappedPages.editComputer}/>

                        <Route exact path={PATHS.SCAN.newCourse} component={WrappedPages.addComputer}/>
                        <Route exact path={PATHS.LOANS.newCollective} component={WrappedPages.createCollectiveLoan}/>

                        <Route exact path={PATHS.SCAN.endLoan} component={WrappedPages.findComputer}/>
                        <Route exact path={PATHS.LOANS.end + ":id"} component={WrappedPages.endLoan}/>


                        <Route exact path={PATHS.SCAN.newIndividualLoan}
                               component={WrappedPages.createIndividualLoan}/>
                        <Route exact path={PATHS.LOANS.confirmIndividual}
                               component={WrappedPages.editIndividualLoan}/>

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
