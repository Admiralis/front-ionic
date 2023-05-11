import SettingsPage from "./Settings.page";
import {render, screen} from "@testing-library/react";
import {ionFireEvent, waitForIonicReact} from "@ionic/react-test-utils";

describe('SettingsPage', () => {

    let useStateMock: jest.SpyInstance;

    beforeEach(() => {
        jest.spyOn(require('react'), 'useEffect')
            .mockImplementation(f => jest.fn());

        useStateMock = jest.spyOn(require('react'), 'useState')
            .mockImplementation(f => [f, jest.fn()]) // setIp
            .mockImplementationOnce(f => ['AAAAAAA', jest.fn()]) // setIp
            .mockImplementationOnce(f => [true, jest.fn()]) // setLoanStatus
            .mockImplementationOnce(f => [true, jest.fn()]) // setCourseStatus
            .mockImplementationOnce(f => [true, jest.fn()]) // setComputerStatus

        jest.spyOn(window, 'fetch')
            .mockReturnValue(Promise.resolve({ status: 200 }) as Promise<Response>)

        jest.spyOn(console, 'error').mockImplementation(() => {});
    })

    it('should render successfully', () => {
        const { baseElement } = render(<SettingsPage />);
        expect(baseElement).toBeTruthy();
    });

    it('shold update ip',  () => {
        render(<SettingsPage />);
        const input = screen.getByTestId('input-IP');
        ionFireEvent.change(input, { target: { value: 'BBBBBBB' } });
        expect(input).toHaveValue('BBBBBBB');
        ionFireEvent.ionChange(input, 'BBBBBBB')
        expect(useStateMock).toHaveBeenCalled();
    });

    it('should have an IP if localStorage has one', async () => {
        jest.spyOn(window.localStorage.__proto__, 'getItem')
            .mockReturnValueOnce('AAAAAAA');
        render(<SettingsPage />);

        await waitForIonicReact();
        expect(screen.getByTestId('input-IP')).toHaveValue('AAAAAAA');
    });

    it('should update localStorage when submitting', async () => {
        render(<SettingsPage />);
        const input = screen.getByTestId('input-IP');
        ionFireEvent.change(input, { target: { value: 'BBBBBBB' } });
        const button = screen.getByTestId('button-submit');
        ionFireEvent.click(button);
        await waitForIonicReact();
        expect(window.localStorage.__proto__.getItem).toHaveBeenCalled();
    });

    it('should test the connection if localStorage has one', async () => {
        jest.spyOn(window.localStorage.__proto__, 'getItem')
            .mockReturnValueOnce(undefined);
        render(<SettingsPage />);

        await waitForIonicReact();

        // update localstorage
        const input = screen.getByTestId('input-IP');
        ionFireEvent.change(input, { target: { value: 'BBBBBBB' } });
        const button = screen.getByTestId('button-submit');

        ionFireEvent.click(button);

        expect(window.fetch).toHaveBeenCalled();
    });

});