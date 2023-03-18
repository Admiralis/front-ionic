import ComputerComment from "../../../../models/computer/ComputerComment";
import React, {useEffect, useRef, useState} from "react";
import {LinuxButtonComponent} from "../../../Buttons";
import {AsciiInputComponent} from "../../Inputs/AsciiInput/AsciiInput.component";
import styles from "./CommentIterator.module.css";
import {ellipse} from "ionicons/icons";

interface CommentIteratorProps {
    comments?: ComputerComment[]
    setComments?: (comments: ComputerComment[]) => void;
}

/**
 * Composant affichant les commentaires d'un ordinateur et permettant d'en ajouter
 * @param props?.comments Liste des commentaires
 * @param props?.setComments Fonction permettant de modifier la liste des commentaires
 * @constructor
 */
export const CommentIteratorComponent = (props: CommentIteratorProps) => {
    const [newComment, setNewComment] = useState("" as string);

    useEffect(() => {
        setNewComment("");
        props.setComments && props.setComments(props.comments || []);
    }, [])

    /**
     * Permet d'ajouter un commentaire à la liste
     */
    const addComment = () => {
        if (newComment.trim().length === 0) {
            return;
        }
        props.setComments && props.setComments([...props.comments!, {content: newComment} as ComputerComment])
        setNewComment("");
    }

    /**
     * Permet de supprimer un commentaire de la liste
     * @param index Index du commentaire à supprimer
     */
    const removeComment = (index: number) => {
        props.setComments && props.setComments(props.comments!.filter((_, i) => i !== index))
    }

    /**
     * Permet d'ajouter un commentaire lorsqu'on quitte le champ de texte
     * Le commentaire sera ajouté seulement si le champ n'est pas vide
     */
    const handleBlur = () => {
        if (newComment.trim().length === 0) {
            return;
        }
        addComment();
    }

    return (
        <>
            {
                props.comments && props.comments.map((comment, index) => {
                    return (
                        <div key={index} className={styles.commentBox}>
                            <AsciiInputComponent
                                label=""
                                value={comment.content}
                                smallText
                                disabled
                            />
                            <LinuxButtonComponent
                                color="red"
                                small
                                onClick={() => removeComment(index)}
                            />
                        </div>
                    )
                })
            }
            <div className={styles.commentBox}>
                <AsciiInputComponent label="" value={newComment}
                                     onIonChange={(e: any) => setNewComment(e.target.value)}
                                     smallText
                                     onBlur={handleBlur}
                />
                <LinuxButtonComponent
                    small
                    onClick={() => addComment()}
                />
            </div>
        </>
    )
};