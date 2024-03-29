import React from 'react';

interface CommentsButtonsComponentProps {
    action: 'add' | 'remove';
    onClick?: () => void;
}

/**
 * Composant bouton d'ajout ou de suppression de commentaire
 * @param props action: 'add' | 'remove' : action à effectuer. Change l'apparence du bouton
 * @param props onClick?: () => void : fonction à exécuter au clic
 * @constructor
 */
const CommentsButtonsComponent = (props: CommentsButtonsComponentProps) => {

    const {action, onClick = () => {}} = props;

    const handleClick = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
        onClick()
    }

    return (
        <button onClick={handleClick} style={{marginTop: "4%", marginLeft: '3%'}} >
            {action === 'remove' &&
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-testid="comment-rm-button" >
                    <path
                        d="M18.9767 9C18.9767 13.9706 14.9339 18 9.94675 18C4.95962 18 0.916748 13.9706 0.916748 9C0.916748 4.02944 4.95962 0 9.94675 0C14.9339 0 18.9767 4.02944 18.9767 9Z"
                        fill="#EB4B4D"/>
                    <path
                        d="M12.6045 8.55664C12.7594 8.55664 12.8688 8.5931 12.9326 8.66602C13.001 8.73438 13.0352 8.85286 13.0352 9.02148C13.0352 9.1901 13.001 9.31087 12.9326 9.38379C12.8688 9.45215 12.7594 9.48633 12.6045 9.48633H7.39551C7.24056 9.48633 7.12891 9.45215 7.06055 9.38379C6.99674 9.31087 6.96484 9.1901 6.96484 9.02148C6.96484 8.85286 6.99674 8.73438 7.06055 8.66602C7.12891 8.5931 7.24056 8.55664 7.39551 8.55664H12.6045Z"
                        fill="white"/>
                </svg>
            }
            {
                action === 'add' &&
                (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-testid="comment-add-button" >
                        <path
                            d="M18.9767 9C18.9767 13.9706 14.9339 18 9.94675 18C4.95962 18 0.916748 13.9706 0.916748 9C0.916748 4.02944 4.95962 0 9.94675 0C14.9339 0 18.9767 4.02944 18.9767 9Z"
                            fill="#43BC3D"/>
                        <path
                            d="M10 5.98633C10.1686 5.98633 10.2871 6.02051 10.3555 6.08887C10.4284 6.15267 10.4648 6.26204 10.4648 6.41699V8.55664H12.6045C12.7594 8.55664 12.8688 8.5931 12.9326 8.66602C13.001 8.73438 13.0352 8.85286 13.0352 9.02148C13.0352 9.1901 13.001 9.31087 12.9326 9.38379C12.8688 9.45215 12.7594 9.48633 12.6045 9.48633H10.4648V11.626C10.4648 11.7809 10.4284 11.8926 10.3555 11.9609C10.2871 12.0247 10.1686 12.0566 10 12.0566C9.83138 12.0566 9.71061 12.0247 9.6377 11.9609C9.56934 11.8926 9.53516 11.7809 9.53516 11.626V9.48633H7.39551C7.24056 9.48633 7.12891 9.45215 7.06055 9.38379C6.99674 9.31087 6.96484 9.1901 6.96484 9.02148C6.96484 8.85286 6.99674 8.73438 7.06055 8.66602C7.12891 8.5931 7.24056 8.55664 7.39551 8.55664H9.53516V6.41699C9.53516 6.26204 9.56934 6.15267 9.6377 6.08887C9.71061 6.02051 9.83138 5.98633 10 5.98633Z"
                            fill="white"/>
                    </svg>
                )
            }
        </button>
    )

};

export default CommentsButtonsComponent;