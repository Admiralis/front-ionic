import React, {useEffect, useState} from 'react';
import {act, render, screen} from '@testing-library/react';
import {ionFireEvent, ionFireEvent as fireEvent, mockIonicReact, waitForIonicReact} from '@ionic/react-test-utils';
import {setupIonicReact} from '@ionic/react';

import {CommentIteratorComponent} from "./CommentIterator.component";
import ComputerComment from "../../../../models/computer/ComputerComment";
import styles from "./CommentIterator.module.css";
import {AsciiInputComponent} from "../../Inputs/AsciiInput/AsciiInput.component";
import CommentsButtonsComponent from "../../../Buttons/CommentButtons/CommentsButtons.component";

// interface CommentIteratorProps {
//     comments?: ComputerComment[]
//     setComments?: (comments: ComputerComment[]) => void;
// }
//
// /**
//  * Composant affichant les commentaires d'un ordinateur et permettant d'en ajouter
//  * @param props?.comments Liste des commentaires
//  * @param props?.setComments Fonction permettant de modifier la liste des commentaires
//  * @constructor
//  */
// export const CommentIteratorComponent = (props: CommentIteratorProps) => {
//     const [newComment, setNewComment] = useState("" as string);
//
//     useEffect(() => {
//         setNewComment("");
//         props.setComments && props.setComments(props.comments || []);
//     }, [])
//
//     /**
//      * Permet d'ajouter un commentaire à la liste
//      */
//     const addComment = () => {
//         if (newComment.trim().length === 0) {
//             return;
//         }
//         props.setComments && props.setComments([...props.comments!, {content: newComment} as ComputerComment])
//         setNewComment("");
//     }
//
//     /**
//      * Permet de supprimer un commentaire de la liste
//      * @param index Index du commentaire à supprimer
//      */
//     const removeComment = (index: number) => {
//         props.setComments && props.setComments(props.comments!.filter((_, i) => i !== index))
//     }
//
//     /**
//      * Permet d'ajouter un commentaire lorsqu'on quitte le champ de texte
//      * Le commentaire sera ajouté seulement si le champ n'est pas vide
//      */
//     const handleBlur = () => {
//         if (newComment.trim().length === 0) {
//             return;
//         }
//         addComment();
//     }
//
//     return (
//         <>
//             {
//                 props.comments && props.comments.map((comment, index) => {
//                     return (
//                         <div key={index} className={styles.commentBox}>
//                             <AsciiInputComponent
//                                 label=""
//                                 value={comment.content}
//                                 smallText
//                                 disabled
//                             />
//                             <CommentsButtonsComponent
//                                 action="remove"
//                                 onClick={() => removeComment(index)}
//                             />
//                         </div>
//                     )
//                 })
//             }
//             <div className={styles.commentBox}>
//                 <AsciiInputComponent label="" value={newComment}
//                                      onIonChange={(e: any) => setNewComment(e.target.value)}
//                                      smallText
//                                      onBlur={handleBlur}
//                 />
//                 <CommentsButtonsComponent
//                     action="add"
//                     onClick={() => addComment()}
//                 />
//             </div>
//         </>
//     )
// };

describe('CommentIteratorComponent', () => {

    const props = {
        comments: [{content: "Comment 1"}, {content: "Comment 2"}],
        setComments: jest.fn()
    }

    it('should render', async () => {
        const {container} = render(<CommentIteratorComponent/>);
        await waitForIonicReact();
        expect(container).toBeDefined();
    });

    it('should render with comments', async () => {
        const {container} = render(<CommentIteratorComponent
            comments={[{content: "Comment 1"}, {content: "Comment 2"}]}/>);
        await waitForIonicReact();
        expect(container).toBeDefined();
    });

    it('should render the comments', async () => {
        const {container} = render(<CommentIteratorComponent
            comments={[{content: "Comment 1"}, {content: "Comment 2"}]}/>);
        await waitForIonicReact();
        expect(container).toBeDefined();

        const firstComment = screen.getByTestId('input-1');
        const secondComment = screen.getByTestId('input-2');

        expect(firstComment).toHaveValue("Comment 1");
        expect(secondComment).toHaveValue("Comment 2");

    });

    it('should add a comment', async () => {
        const setComments = jest.fn();
        const {container} = render(<CommentIteratorComponent
            setComments={setComments}
            comments={[{content: "Comment 1"}, {content: "Comment 2"}]}/>);
        await waitForIonicReact();
        expect(container).toBeDefined();

        let newCommentInput = screen.getByTestId('input') as Element;
        // eslint-disable-next-line testing-library/no-node-access
        const button = screen.getByTestId("comment-add-button").parentElement as Element;
        await act(async () => {
            ionFireEvent.change(newCommentInput, {target: {value: "Comment 3"}});
            await waitForIonicReact();
        })


        await expect(newCommentInput.getAttribute('value')).toBe("Comment 3");


        ionFireEvent.click(button);

        expect(setComments).toHaveBeenCalled();
        expect(setComments).toHaveBeenCalledWith([{content: "Comment 1"}, {content: "Comment 2"}, {content: "Comment 3"}])
    });

    it('should not add a comment if the input is empty', async () => {
        const setComments = jest.fn();
        const {container} = render(<CommentIteratorComponent {...props} />);
        await waitForIonicReact();
        expect(container).toBeDefined();

        let newCommentInput = screen.getByTestId('input') as Element;
        // eslint-disable-next-line testing-library/no-node-access
        const button = screen.getByTestId("comment-add-button").parentElement as Element;
        await act(async () => {
            ionFireEvent.change(newCommentInput, {target: {value: " "}});
            await waitForIonicReact();
        })

        expect(newCommentInput.getAttribute('value')).toBe(" ");

        ionFireEvent.click(button);

        expect(props.comments).toHaveLength(2);
        expect(setComments).not.toHaveBeenCalled();
    });

    it('should add the comment on blur', async () => {
        const setComments = jest.fn();
        const {container} = render(<CommentIteratorComponent
            setComments={setComments}
            comments={[{content: "Comment 1"}, {content: "Comment 2"}]}/>);
        await waitForIonicReact();
        expect(container).toBeDefined();

        let newCommentInput = screen.getByTestId('input') as Element;
        await act(async () => {
            ionFireEvent.change(newCommentInput, {target: {value: "Comment 3"}});
            await waitForIonicReact();
        })

        expect(newCommentInput.getAttribute('value')).toBe("Comment 3");

        ionFireEvent.blur(newCommentInput);

        expect(setComments).toHaveBeenCalled();
        expect(setComments).toHaveBeenCalledWith([{content: "Comment 1"}, {content: "Comment 2"}, {content: "Comment 3"}])
    });

    it('should not add the comment on blur if the input is empty', async () => {
        const setComments = jest.fn();
        const {container} = render(<CommentIteratorComponent {...props} />);
        await waitForIonicReact();
        expect(container).toBeDefined();

        let newCommentInput = screen.getByTestId('input') as Element;
        await act(async () => {
            ionFireEvent.change(newCommentInput, {target: {value: " "}});
            await waitForIonicReact();
        })

        expect(newCommentInput.getAttribute('value')).toBe(" ");

        ionFireEvent.blur(newCommentInput);

        expect(props.comments).toHaveLength(2);
        expect(setComments).not.toHaveBeenCalled();
    });

});