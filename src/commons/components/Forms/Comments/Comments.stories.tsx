import {CommentsComponent} from "./Comments.component";
import {Meta} from "@storybook/react";
import ComputerComment from "../../../models/computer/ComputerComment";

const meta: Meta<typeof CommentsComponent> = {
    title: 'Components/Forms/Comments',
    component: CommentsComponent,
    tags: ['autodocs'],
}

export default meta;

export const Classique: (args: any) => JSX.Element = (args: any) => {

    const comments: ComputerComment[] = [
        {
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquet nisl, eget aliquam nisl nisl eget nisl.',
        },
        {
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquet nisl, eget aliquam nisl nisl eget nisl.',
        }
    ]

        return <CommentsComponent
            comments={comments}
            {...args}
        />
}