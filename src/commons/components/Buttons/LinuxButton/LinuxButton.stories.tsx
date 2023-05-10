
import {Meta} from "@storybook/react";
import LinuxButtonComponent from "./LinuxButton.component";

const meta: Meta<typeof LinuxButtonComponent> = {
    title: 'Components/Buttons/LinuxButton',
    component: LinuxButtonComponent,
    tags: ['autodocs'],
    argTypes: {
        color: {
            control: 'radio',
            options: ["red", "yellow", "green"],
            defaultValue: "",
            description: 'Couleur du bouton'
        },
        hidden: {
            control: 'boolean',
            defaultValue: false,
        }

    }
}

export default meta;

export const Classique: (args: any) => JSX.Element = (args: any) => {

        return <LinuxButtonComponent
            {...args}
        />
}