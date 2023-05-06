
/**
 * Soumet le formulaire si la touche "Entrée" est pressée
 * @param e
 */
const submitOnEnter = (e: any) => {
    const submitButton = document.querySelector("ion-button[type='submit']");
    if (e.keyCode === 13) {
        e.preventDefault();
        submitButton?.dispatchEvent(new Event("click"));
    }
}

export default submitOnEnter;