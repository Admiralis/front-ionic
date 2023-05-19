import NotFoundPage from "./NotFound.page";
import {render} from "@testing-library/react";

describe('NotFoundPage', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<NotFoundPage />);

        expect(baseElement).toBeTruthy();
    });
});