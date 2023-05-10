/**
 * Est à true si le numéro de série est plus petit que 7 caractères
 */
const isValidateButtonDisabled = (serial: string, min: number) => {
    if (!serial) {
        return true;
    }
    return serial.length < min;
}

export default isValidateButtonDisabled;