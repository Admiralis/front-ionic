import ComputerComment from "commons/models/computer/ComputerComment";
import React from "react";
import {CommentIteratorComponent} from "./CommentIterator/CommentIterator.component";
import {CardComponent} from "commons/components/Cards";

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