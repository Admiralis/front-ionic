import ComputerComment from "../../../models/computer/ComputerComment";
import TinyCardComponent from "../../Cards/TinyCard/TinyCard.component";
import React from "react";
import {CommentIteratorComponent} from "./CommentIterator/CommentIterator.component";
import {CardComponent} from "../../Cards";

interface CommentsComponentProps {
    comments?: ComputerComment[]
    setComments?: (comments: ComputerComment[]) => void;
}

/**
 * Composant permettant d'afficher le composant commentaires dans une carte
 * @param props
 * @constructor
 */
export const CommentsComponent = (props: CommentsComponentProps) => {
    return (
        <CardComponent
            tiny
            title={"Commentaires"}
            content={
            <CommentIteratorComponent
                comments={props.comments}
                setComments={props.setComments}
            />}
        />
    )
}