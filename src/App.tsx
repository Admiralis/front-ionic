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
import ScanMenuPage from "./pages/scan/ScanMenu/ScanMenu.page";
import AddComputerPage from "./pages/scan/AddComputer/AddComputer.page";
import AddComputerConfirmPage from "./pages/scan/AddComputerConfirm/AddComputerConfirm.page";
import FindComputerPage from "./pages/scan/FindComputer/FindComputer.page";

setupIonicReact();

const App: React.FC = () => (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route exact path="/scan" component={ScanMenuPage}/>
                        <Route exact path="/scan/add" component={AddComputerPage}/>
                        <Route exact path="/scan/add/confirm" component={AddComputerConfirmPage} />
                        <Route exact path="/scan/edit" component={FindComputerPage} />
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
