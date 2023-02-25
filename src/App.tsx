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
import Tab1 from './pages/Tab1';
import Tab3 from './pages/Tab3';

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

setupIonicReact();

const App: React.FC = () => (
    <IonApp>
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                    <Route exact path="/tab1">
                        <Tab1/>
                    </Route>
                    <Route exact path="/scan" component={ScanMenuPage} />
                    <Route path="/tab3" component={Tab3} />
                    <Route exact path="/" component={Tab1} />
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
);

export default App;
