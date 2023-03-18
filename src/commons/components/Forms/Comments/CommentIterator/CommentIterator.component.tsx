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

export const CommentIteratorComponent = (props: CommentIteratorProps) => {
    const [newComment, setNewComment] = useState("" as string);

    useEffect(() => {
        setNewComment("");
        props.setComments && props.setComments(props.comments || []);
    }, [])

    const addComment = () => {
        if (newComment.trim().length === 0) {
            return;
        }
        props.setComments && props.setComments([...props.comments!, {content: newComment} as ComputerComment])
        setNewComment("");
    }

    const removeComment = (index: number) => {
        props.setComments && props.setComments(props.comments!.filter((_, i) => i !== index))
    }

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