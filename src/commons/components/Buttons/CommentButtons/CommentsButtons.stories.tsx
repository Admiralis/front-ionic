import {Meta} from "@storybook/react";
import CommentsButtonsComponent from "./CommentsButtons.component";

const meta: Meta<typeof CommentsButtonsComponent> = {
    title: 'Components/Buttons/CommentsButtons',
    component: CommentsButtonsComponent,
    tags: ['autodocs'],
    argTypes: {
        action: {
            control: 'radio',
            options: ['add', 'remove'],
            defaultValue: 'add',
            description: 'Action du bouton'
        },
    }
}

export default meta;

export const Classique: (args: any) => JSX.Element = (args: any) => {

        return <CommentsButtonsComponent
            action={args.action || 'add'}
            {...args}
        />
}