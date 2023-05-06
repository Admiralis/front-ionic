import React, {useEffect, useState} from 'react';
import {act, render, screen} from '@testing-library/react';
import {ionFireEvent, mockIonicReact, waitForIonicReact} from '@ionic/react-test-utils';

import AddComputerPage from "../../computer/AddComputer/AddComputer.page";
import CourseService from "../../../commons/services/course/Course.service";
import {Computer, Course} from "../../../commons/models";
import {ComputerService} from "../../../commons/services/computer";

// const AddCoursePage = () => {
//
//     const [course, setCourse] = React.useState({} as Course)
//     const [computerSerial, setComputerSerial] = React.useState("");
//     const [autoSubmit, setAutoSubmit] = useState<boolean>(false);
//     const [open, setOpen] = useState<boolean>(false);
//     const [scanning, setScanning] = useState<boolean>(false);
//
//
//     const location = useLocation<{ serialNumber: string, comeFrom: string }>();
//     const {autoScan} = useAutoRescan();
//     const router = useHistory();
//     const {addCourse, courses} = useCourses();
//
//     useEffect(() => {
//         setScanning(autoScan);
//     }, [autoScan])
//
//     useEffect(() => {
//         setCourse({
//             ...course,
//             startDate: new Date(),
//         } as Course)
//     }, [])
//
//     useEffect(() => {
//         // Met le numéro de série en toute majuscule
//         // La double dépendance assure le bon rafraichissement des données
//         computerSerial && setComputerSerial(computerSerial.toUpperCase());
//     }, [computerSerial]);
//
//     useEffect(() => {
//         // Soumet automatiquement le formulaire si un code a été scanné
//         if (autoSubmit) {
//             Simulate.submit(document.querySelector('form') as HTMLFormElement)
//             setScanning(false);
//             setAutoSubmit(false)
//         }
//     }, [autoSubmit])
//
//     /**
//      * Créé un cours s'il n'exista pas déjà, sinon le récupère puis redirige vers la page de confirmation si le matériel existe bien
//      * @param event
//      */
//     const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         CourseService.saveCourse(course).then((createdCourse) => {
//             setCourse({
//                 ...createdCourse,
//                 id: createdCourse.id,
//                 startDate: new Date(createdCourse.startDate),
//                 endDate: createdCourse.endDate ? new Date(createdCourse.endDate) : null
//             })
//         })
//
//         ComputerService.findComputerBySerial(computerSerial).then((computer) => {
//             router.push(PATHS.LOANS.newCollective, {
//                 computer: computer,
//                 course: course,
//                 comeFrom: location.pathname
//             })
//             setComputerSerial('');
//         }).catch(() => {
//             setOpen(true)
//         })
//     }
//     return (
//         <IonPage>
//             <IonContent>
//                 <form className="flex-container" onSubmit={handleSubmit} onKeyDown={submitOnEnter}>
//                     <CardComponent
//                         title="Prêt collectif"
//                         content={<AddCourseComponent newCourseInfo={course}
//                                                      setNewCourseInfo={setCourse}
//                                                      computerSerial={computerSerial}
//                                                      setComputerSerial={setComputerSerial}/>}
//                         actions={
//                             <IonButton className="green" type="submit"
//                                        disabled={isValidateButtonDisabled(computerSerial, 7) || (!course.label || course.label.length < 3) }>
//                                 Valider
//                             </IonButton>}
//
//                     />
//                 </form>
//             </IonContent>
//             <UnknownComputerModalComponent
//                 open={open}
//                 setIsOpen={setOpen}
//                 onComputerAdd={() => {
//                     router.push(PATHS.COMPUTERS.new, {
//                         computer: {serialNumber: computerSerial},
//                         course: course,
//                         comeFrom: router.location.pathname
//                     });
//                     setOpen(false);
//                 }
//                 }
//                 onCancel={() => {
//                     setOpen(false);
//                     setComputerSerial('');
//                 }}
//             />
//         </IonPage>
//     );
// };


describe('AddComputerPage', () => {

    let useLocation: jest.SpyInstance;
    let useState: jest.SpyInstance;
    let useHistory: jest.SpyInstance;
    let saveCourse: jest.SpyInstance;
    let findComputerBySerial: jest.SpyInstance;

    beforeEach(() => {
        mockIonicReact();
        useLocation = jest.spyOn(require('react-router'), 'useLocation');
        useLocation.mockReturnValue({
            pathname: '/courses/new',
            state: {comeFrom: '/courses/new', serialNumber: 'TESTEST'}
        });

        // const [course, setCourse] = React.useState({} as Course)
        //     const [computerSerial, setComputerSerial] = React.useState("");
        //     const [autoSubmit, setAutoSubmit] = useState<boolean>(false);
        //     const [open, setOpen] = useState<boolean>(false);
        //     const [scanning, setScanning] = useState<boolean>(false);
        useState = jest.spyOn(require('react'), 'useState');
        useState
            .mockReturnValue([{id: 1, label: 'TEST', startDate: new Date(), endDate: null}, jest.fn((newState) => {
                return newState
            })])
            .mockReturnValueOnce(['TESTEST', jest.fn((newState) => {
                return newState
            })])
            .mockReturnValueOnce([false, jest.fn((newState) => {
                return newState
            })])
            .mockReturnValueOnce([false, jest.fn((newState) => {
                return newState
            })])
            .mockReturnValueOnce([false, jest.fn((newState) => {
                return newState
            })])

        useHistory = jest.spyOn(require('react-router'), 'useHistory');
        useHistory.mockReturnValue({push: jest.fn()});

        saveCourse = jest.spyOn(CourseService, 'saveCourse')
            .mockImplementation((newCourse: Course) => {
                return Promise.resolve(newCourse)
            });

        findComputerBySerial = jest.spyOn(ComputerService, 'findComputerBySerial')
            .mockImplementation((serialNumber) => {
                return Promise.resolve({serialNumber: serialNumber} as Computer)
            })
    });

    it('should render', async () => {
        const {container} = await render(<AddComputerPage/>);
        await waitForIonicReact()
        expect(container).toBeDefined();
    });

    it('should not submit form if the course has no label and startdate', async () => {
        const {container} = await render(<AddComputerPage/>);
        await waitForIonicReact()
        // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
        const form = container.querySelector('form');
        await act(() => {
            ionFireEvent.submit(form as HTMLFormElement);
        });
        expect(saveCourse).not.toHaveBeenCalled();
        expect(findComputerBySerial).toHaveBeenCalled();
    });

});