import React from 'react';
import {render} from '@testing-library/react';

import CodeScannerComponent from "./CodeScanner.component";
import {mockIonicReact, waitForIonicReact} from "@ionic/react-test-utils";
import * as IonicReact from "@ionic/react";

describe('CodeScannerComponent', () => {

    const props: any = {
        setComputerSerial: jest.fn(),
        setSanning: jest.fn((value: boolean) => {
            return value
        }),
        scanning: false,
        setAutoSubmit: jest.fn(),
    }

    let mockIsPlatform: (key: string) => boolean;


    beforeEach(() => {
        mockIonicReact();
        jest.spyOn(require('react'), 'useState')
            .mockImplementation((initialState: any) => {
                return [initialState, jest.fn((newState: any) => {
                    return newState
                })]
            })
    })

    it('should render successfully', async () => {
        mockIsPlatform = jest.fn().mockReturnValue(true);
        jest.spyOn(IonicReact, 'isPlatform').mockImplementation(mockIsPlatform);
        const {container} = render(<CodeScannerComponent {...props}  />);
        await waitForIonicReact()
        expect(container).toBeTruthy();
    });

    it('should not display the button if the platform is not android', async () => {
        mockIsPlatform = jest.fn().mockReturnValue(false);
        jest.spyOn(IonicReact, 'isPlatform').mockImplementation(mockIsPlatform);
        const {container} = render(<CodeScannerComponent {...props}  />);
        await waitForIonicReact()
        // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
        expect(container.querySelector('ion-button')).toBeFalsy();
    });
});