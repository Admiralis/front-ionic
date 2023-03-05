import ComputerComment from "../../../../models/computer/ComputerComment";
import React, {useState} from "react";
import {LinuxButtonComponent} from "../../../Buttons";
import {AsciiInputComponent} from "../../Inputs/AsciiInput/AsciiInput.component";
import styles from "./CommentIterator.module.css";

interface CommentIteratorProps {
    comments?: ComputerComment[]
    setComments?: (comments: ComputerComment[]) => void;
}

export const CommentIteratorComponent = (props: CommentIteratorProps) => {
    const [newComment, setNewComment] = useState("" as string);

    const addComment = (comment: string) => {
        props.setComments && props.setComments([...props.comments!, {content: comment}])
        console.log("New comment", comment)
        console.log("Comments", props.comments)
    }

    const removeComment = (index: number) => {
        props.setComments && props.setComments(props.comments!.filter((_, i) => i !== index))
    }

    return (
        <>
            {
                props.comments && props.comments.map((comment, index) => {
                    return (
                        <span key={index} className={styles.commentBox}>
                        <p>{comment.content}</p>
                        <LinuxButtonComponent color="red" small/>
                    </span>
                    )
                })
            }
            <div className={styles.commentBox}>
                <AsciiInputComponent label="Commentaire" value={newComment}
                                     onIonChange={(e: any) => setNewComment(e.target.value)}/>
                <LinuxButtonComponent
                    small
                    onClick={() => addComment(newComment)}
                />
            </div>
        </>
    )
};