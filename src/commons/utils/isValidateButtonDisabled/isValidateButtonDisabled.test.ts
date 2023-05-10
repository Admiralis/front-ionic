import isValidateButtonDisabled from "./isValidateButtonDisabled";


// const isValidateButtonDisabled = (serial: string, min: number) => {
//     if (!serial) {
//         return true;
//     }
//     return serial.length < min;
// }
describe("isValidateButtonDisabled", () => {
    it('should return true if serial is empty', () => {
        const serial = "";
        const min = 7;
        const result = isValidateButtonDisabled(serial, min);
        expect(result).toBe(true);
    });

    it('should return true if serial is less than X characters', () => {
        const serial = "123456";
        const min = 7;
        const result = isValidateButtonDisabled(serial, min);
        expect(result).toBe(true);
    });

});