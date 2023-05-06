import React, {useEffect} from 'react';
import {act, render, renderHook, screen} from '@testing-library/react';
import {mockIonicReact, waitForIonicReact} from '@ionic/react-test-utils';
import {NewComputer} from "../../../../commons/models";
import {EditComputerComponent} from "./EditComputer.component";

// interface AddComputerFormConfirmComponentProps {
//     newComputerInfo: Computer;
//     setNewComputerInfo: (newComputerInfo: NewComputer | Computer) => void;
// }
//
//
// export const EditComputerComponent = (props: AddComputerFormConfirmComponentProps) => {
//
//     useEffect(() => {
//
//     }, [props])
//
//     return (
//         <>
//             <div className="container">
//                 <ComputerFormComponent newComputerInfo={props.newComputerInfo}
//                                        setNewComputerInfo={props.setNewComputerInfo}/>
//                 <AsciiInputComponent
//                     value={props.newComputerInfo.serialNumber || ''}
//                     label="SerialNumber"
//                 />
//             </div>
//             <CommentsComponent comments={props.newComputerInfo.comments}
//                                setComments={(comments) => props.setNewComputerInfo(
//                                    {
//                                        ...props.newComputerInfo,
//                                        comments: comments
//                                    }
//                                )}
//             />
//         </>
//     )
// }

describe('EditComputerComponent', () => {

    const newComputerInfoMock: NewComputer = {
        category: 'Laptop',
        comments: [],
        condition: 'Good',
        processor: 'i5',
        ram: '8',
        serialNumber: '1234567',
    }

    const setNewComputerInfoMock = jest.fn((newComputerChange: NewComputer) => {
        return newComputerChange;
    });

    beforeEach(() => {
        mockIonicReact();
    });

    it('should render', async () => {
        const {container} = await render(<EditComputerComponent newComputerInfo={newComputerInfoMock} setNewComputerInfo={setNewComputerInfoMock}/>);
        await waitForIonicReact()
        await act(async () => {
            expect(container).toBeDefined();
        });
    });

});