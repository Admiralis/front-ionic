import ComputerComment from "../../../models/computer/ComputerComment";
import TinyCardComponent from "../../Cards/TinyCard/TinyCard.component";
import React from "react";
import {CommentIteratorComponent} from "./CommentIterator/CommentIterator.component";

interface CommentsComponentProps {
    comments?: ComputerComment[]
    setComments?: (comments: ComputerComment[]) => void;
}

export const CommentsComponent = (props: CommentsComponentProps) => {
    return (
        <TinyCardComponent
            title={"Commentaires"}
            content={
            <CommentIteratorComponent
                comments={props.comments}
                setComments={props.setComments}
            />}
        />
    )
}