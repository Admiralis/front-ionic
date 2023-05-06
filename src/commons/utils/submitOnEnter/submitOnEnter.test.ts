import submitOnEnter from "./submitOnEnter";

// const submitOnEnter = (e: any) => {
//     const submitButton = document.querySelector("ion-button[type='submit']");
//     if (e.keyCode === 13) {
//         e.preventDefault();
//         submitButton?.dispatchEvent(new Event("click"));
//     }
// }
describe("submitOnEnter", () => {
    it('should call preventDefault if keyCode is 13', () => {
        const preventDefault = jest.fn();
        const submitButton = document.createElement("ion-button");
        submitButton.setAttribute("type", "submit");
        document.body.appendChild(submitButton);
        const e = {
            keyCode: 13,
            preventDefault
        };
        submitOnEnter(e);
        expect(preventDefault).toHaveBeenCalled();
    });
    it('should not call preventDefault if keyCode is not 13', () => {
        const preventDefault = jest.fn();
        const submitButton = document.createElement("ion-button");
        submitButton.setAttribute("type", "submit");
        document.body.appendChild(submitButton);
        const e = {
            keyCode: 14,
            preventDefault
        };
        submitOnEnter(e);
        expect(preventDefault).not.toHaveBeenCalled();
    });
});