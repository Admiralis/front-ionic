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
import ScanMenuPage from "./features/computer/ScanMenu/ScanMenu.page";
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

setupIonicReact();

function ComputerIconComponent() {
    return <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="1" width="39" height="39" rx="19.5" fill="#193549" stroke="#CCCCCC"/>
        <path
            d="M26.6667 14.5C27.1087 14.5 27.5326 14.658 27.8452 14.9393C28.1577 15.2206 28.3333 15.6022 28.3333 16V23.5C28.3333 24.3325 27.5917 25 26.6667 25H30V26.5H10V25H13.3333C12.8913 25 12.4674 24.842 12.1548 24.5607C11.8423 24.2794 11.6667 23.8978 11.6667 23.5V16C11.6667 15.1675 12.4083 14.5 13.3333 14.5H26.6667ZM26.6667 16H13.3333V23.5H26.6667V16ZM20 20.5C21.8417 20.5 23.3333 21.175 23.3333 22V22.75H16.6667V22C16.6667 21.175 18.1583 20.5 20 20.5ZM20 16.75C20.442 16.75 20.8659 16.908 21.1785 17.1893C21.4911 17.4706 21.6667 17.8522 21.6667 18.25C21.6667 18.6478 21.4911 19.0294 21.1785 19.3107C20.8659 19.592 20.442 19.75 20 19.75C19.075 19.75 18.3333 19.0825 18.3333 18.25C18.3333 17.4175 19.0833 16.75 20 16.75Z"
            fill="#CCCCCC"/>
    </svg>;
}

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

function WheelIconComponent() {
    return <svg width="40" height="41" viewBox="0 0 40 41" fill="none"
                xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="1" width="39" height="39" rx="19.5" fill="#193549" stroke="#CCCCCC"/>
        <path
            d="M10.9091 19.5684L12.7727 19.6616C12.8829 18.6419 13.1983 17.6567 13.699 16.7683C14.1997 15.88 14.8749 15.1077 15.6818 14.5005L14.6636 12.8981C14.4182 12.451 14.5455 11.8827 15 11.6218C15.4545 11.3703 15.9909 11.5194 16.2455 11.9665L17.0909 13.662C18.0099 13.2572 18.9997 13.0484 20 13.0484C21.0003 13.0484 21.9901 13.2572 22.9091 13.662L23.7545 11.9665C24.0091 11.5194 24.5455 11.3703 25 11.6218C25.4545 11.8827 25.5818 12.451 25.3364 12.8981L24.3182 14.5005C25.1251 15.1077 25.8003 15.88 26.301 16.7683C26.8017 17.6567 27.1171 18.6419 27.2273 19.6616L29.0909 19.5684C29.332 19.5684 29.5632 19.6665 29.7337 19.8413C29.9042 20.016 30 20.2529 30 20.5C30 20.7471 29.9042 20.984 29.7337 21.1587C29.5632 21.3335 29.332 21.4316 29.0909 21.4316L27.2273 21.3384C27.1171 22.3581 26.8017 23.3433 26.301 24.2317C25.8003 25.12 25.1251 25.8923 24.3182 26.4995L25.3364 28.1019C25.5818 28.549 25.4545 29.1173 25 29.3782C24.5455 29.6297 24.0091 29.4806 23.7545 29.0335L22.9091 27.338C21.9901 27.7428 21.0003 27.9516 20 27.9516C18.9997 27.9516 18.0099 27.7428 17.0909 27.338L16.2455 29.0335C15.9909 29.4806 15.4545 29.6297 15 29.3782C14.5455 29.1173 14.4182 28.549 14.6636 28.1019L15.6818 26.4995C14.8749 25.8923 14.1997 25.12 13.699 24.2317C13.1983 23.3433 12.8829 22.3581 12.7727 21.3384L10.9091 21.4316C10.668 21.4316 10.4368 21.3335 10.2663 21.1587C10.0958 20.984 10 20.7471 10 20.5C10 20.2529 10.0958 20.016 10.2663 19.8413C10.4368 19.6665 10.668 19.5684 10.9091 19.5684ZM17.3364 19.8945C17.4545 19.3262 17.7545 18.8231 18.1818 18.4412L16.6727 16.0749C15.5322 16.9719 14.7838 18.2947 14.5909 19.7547L17.3364 19.8945ZM20 17.7052C20.2909 17.7052 20.5636 17.7518 20.8182 17.8356L22.0727 15.3296C21.4364 15.0594 20.7364 14.9104 20 14.9104C19.2636 14.9104 18.5636 15.0594 17.9273 15.3296L19.1818 17.8356C19.4364 17.7518 19.7091 17.7052 20 17.7052ZM22.6636 19.8945L25.4091 19.7547C25.2162 18.2947 24.4678 16.9719 23.3273 16.0749L21.8182 18.4412C22.2455 18.8231 22.5455 19.3262 22.6636 19.8945ZM22.6636 21.1055C22.5455 21.6738 22.2455 22.1769 21.8182 22.5588L23.3273 24.9251C24.4678 24.028 25.2162 22.7053 25.4091 21.2453L22.6636 21.1055ZM20 23.2948C19.7091 23.2948 19.4364 23.2482 19.1727 23.1644L17.9273 25.6704C18.5636 25.9406 19.2636 26.0896 20 26.0896C20.7364 26.0896 21.4364 25.9406 22.0727 25.6704L20.8273 23.1644C20.5636 23.2482 20.2909 23.2948 20 23.2948ZM17.3364 21.1055L14.5909 21.2453C14.7909 22.7358 15.5545 24.0494 16.6727 24.9251L18.1818 22.5588C17.7545 22.1769 17.4545 21.6738 17.3364 21.1055Z"
            fill="#CCCCCC"/>
    </svg>;
}

const App: React.FC = () => {

    return (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>

                        <Route exact path={PATHS.SCAN.root} component={ScanMenuPage}/>

                        <Route exact path={PATHS.SCAN.newComputer} component={AddComputerPage}/>
                        <Route exact path={PATHS.COMPUTERS.new} component={EditComputerPage}/>

                        <Route exact path={PATHS.SCAN.editComputer} component={FindComputerPage}/>
                        <Route exact path={PATHS.COMPUTERS.detail + ":id"} component={EditComputerPage}/>

                        <Route exact path={PATHS.SCAN.newCourse} component={AddCoursePage}/>
                        <Route exact path={PATHS.LOANS.newCollective} component={CreateCollectiveLoanPage}/>

                        <Route exact path={PATHS.SCAN.endLoan} component={FindComputerPage}/>
                        <Route exact path={PATHS.LOANS.end + ":id"} component={EndLoanPage}/>


                        <Route exact path={PATHS.SCAN.newIndividualLoan} component={CreateIndividualLoanPage}/>
                        <Route exact path={PATHS.LOANS.confirmIndividual} component={EditIndividualLoanPage}/>

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
