import React, {useEffect, useState} from 'react';
import {act, render, screen} from '@testing-library/react';
import {ionFireEvent, ionFireEvent as fireEvent, mockIonicReact, waitForIonicReact} from '@ionic/react-test-utils';


import {CommentIteratorComponent} from "./CommentIterator.component";

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
        render(<CommentIteratorComponent
            comments={[{content: "Comment 1"}, {content: "Comment 2"}]}/>);
        await waitForIonicReact();


        const firstComment = screen.getByTestId('input-1');
        const secondComment = screen.getByTestId('input-2');

        expect(firstComment).toHaveValue("Comment 1");
        expect(secondComment).toHaveValue("Comment 2");

    });

    it('should add a comment', async () => {
        const setComments = jest.fn();
        render(<CommentIteratorComponent
            setComments={setComments}
            comments={[{content: "Comment 1"}, {content: "Comment 2"}]}/>);
        await waitForIonicReact();


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
        render(<CommentIteratorComponent {...props} />);
        await waitForIonicReact();


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
        render(<CommentIteratorComponent
            setComments={setComments}
            comments={[{content: "Comment 1"}, {content: "Comment 2"}]}/>);
        await waitForIonicReact();


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
        render(<CommentIteratorComponent {...props} />);
        await waitForIonicReact();

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