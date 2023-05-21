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


});