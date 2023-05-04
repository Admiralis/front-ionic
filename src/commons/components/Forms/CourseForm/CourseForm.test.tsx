import React from 'react';
import {act, render, screen} from '@testing-library/react';
import {ionFireEvent, ionFireEvent as fireEvent, mockIonicReact, waitForIonicReact} from '@ionic/react-test-utils';
import {setupIonicReact} from '@ionic/react';

import CourseFormComponent from "./CourseForm.component";
import {Course} from "../../../models";
import userEvent from "@testing-library/user-event";
import {AsciiDatePickerComponent} from "../Inputs/AsciiDate/AsciiDate.component";

// import {Course} from "../../../models";
// import {AsciiInputComponent} from "../Inputs/AsciiInput/AsciiInput.component";
// import {AsciiDatePickerComponent} from "../Inputs/AsciiDate/AsciiDate.component";
// import React from "react";
//
// const CourseFormComponent = (props: CourseFormComponentProps) => {
//     const {newCourseInfo = {} as Course, setNewCourseInfo} = props
//
//     return <>
//         <AsciiInputComponent label="Intitulé" value={newCourseInfo.label || ""}
//                              onIonChange={(e: any) => {
//                                  setNewCourseInfo({
//                                      ...newCourseInfo,
//                                      label: e.detail.value!
//                                  })
//                              }}
//                              required
//         />
//         <AsciiDatePickerComponent
//             label="Début"
//             value={newCourseInfo.startDate}
//             onChange={(e) => {
//                 setNewCourseInfo({
//                     ...newCourseInfo,
//                     startDate: new Date(e.detail.value?.slice(0, 10) as string)
//                 })
//             }}
//             required
//         />
//         <AsciiDatePickerComponent
//             label="Fin"
//             min={newCourseInfo.startDate && newCourseInfo.startDate.toISOString()}
//             max={new Date(new Date(newCourseInfo.startDate && newCourseInfo.startDate.toISOString()).setFullYear(new Date().getFullYear() + 3)).toISOString()}
//             value={newCourseInfo.endDate}
//             onChange={(e) => {
//                 setNewCourseInfo({
//                     ...newCourseInfo,
//                     endDate: new Date(e.detail.value?.slice(0, 10) as string)
//                 })
//             }}
//         />
//         <AsciiInputComponent label="Lieu" value={newCourseInfo.place || ""}
//                              onIonChange={(e: any) => {
//                                  setNewCourseInfo({
//                                      ...newCourseInfo,
//                                      place: e.detail.value!
//                                  })
//                              }}
//         />
//
//     </>;
// };

describe('CourseFormComponent', () => {
    let props: any;
    beforeEach(() => {
        setupIonicReact();
        mockIonicReact();
        const setNewCourseInfo = jest.fn();
        props = {
            newCourseInfo: {},
            setNewCourseInfo: setNewCourseInfo
        };
    });

    it('should render successfully', async () => {
        const {baseElement} = render(<CourseFormComponent {...props} />);
        expect(baseElement).toBeTruthy();
    });

    it('should have all fields', async () => {
        render(<CourseFormComponent {...props} />);
        await act(async () => {
            await waitForIonicReact();
        });
        expect(screen.getByText('Intitulé')).toBeTruthy();
        expect(screen.getByText('Début')).toBeTruthy();
        expect(screen.getByText('Fin')).toBeTruthy();
        expect(screen.getByText('Lieu')).toBeTruthy();
    });

    it('should have all fields with correct values', async () => {
        props.newCourseInfo = {
            label: 'label',
            startDate: new Date('2021-01-01'),
            endDate: new Date('2021-01-02'),
            place: 'place'
        } as Course;
        render(<CourseFormComponent {...props} />);
        await waitForIonicReact();
        expect(screen.getByTestId('input-Intitulé')).toBeTruthy();
        expect(screen.getByTestId('input-Intitulé').getAttribute('value')).toEqual('label');
        expect(screen.getByTestId('input-Début')).toBeTruthy();
        expect(screen.getByTestId('input-Début').getAttribute('value')).toEqual('01/01/2021');
        expect(screen.getByTestId('input-Fin')).toBeTruthy();
        expect(screen.getByTestId('input-Fin').getAttribute('value')).toEqual('02/01/2021');
        expect(screen.getByTestId('input-Lieu')).toBeTruthy();
    });

    it('should change the course label if the input is changed', async () => {
        render(<CourseFormComponent {...props} />);
        fireEvent.ionChange(screen.getByTestId('input-Intitulé'), 'BBBBBBB');
        await act(async () => {
            expect(props.setNewCourseInfo).toHaveBeenCalledWith({label: 'BBBBBBB'});
        });
    });

    it('should change the place if the input is changed', async () => {
        render(<CourseFormComponent {...props} />);
        fireEvent.ionChange(screen.getByTestId('input-Lieu'), 'BBBBBBB');
        await act(async () => {
            expect(props.setNewCourseInfo).toHaveBeenCalledWith({place: 'BBBBBBB'});
        });
    });

});
