import React from 'react';
import {act, render, screen} from '@testing-library/react';
import {mockIonicReact, waitForIonicReact} from '@ionic/react-test-utils';

import SimpleModalComponent from "./SimpleModal.component";
describe('SimpleModalComponent', () => {

    let props: any;
    const setIsOpenMock = jest.fn();


    beforeEach(() => {
        mockIonicReact();
        props = {
            isOpen: true,
            setIsOpen: setIsOpenMock,
            title: 'title',
            height: '500px'
        }
    });

    it('should render', async () => {
        const {baseElement} = render(<SimpleModalComponent {...props} />);
        await act(async () => {
            await waitForIonicReact();
            await expect(baseElement).toBeTruthy();
        });
    });

    it('should have a title', async () => {
        render(<SimpleModalComponent {...props} />);
        await act(async () => {
            await waitForIonicReact();
            await expect(screen.getByText('title')).toBeTruthy();
        });
    });

    it('should have a content', async () => {
        render(<SimpleModalComponent {...props} content={<p>content</p>}/>);

        await act(async () => {
            await waitForIonicReact();
        });
        await expect(screen.getByText('content')).toBeTruthy();
    });

    it('should have a actions', async () => {
        render(<SimpleModalComponent {...props} actions={<p>footer</p>}/>);

        await act(async () => {
            await waitForIonicReact();
        });
        await expect(screen.getByText('footer')).toBeTruthy();
    });

});