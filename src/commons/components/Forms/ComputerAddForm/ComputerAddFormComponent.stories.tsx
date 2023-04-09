import {Meta} from "@storybook/react";
import {ComputerAddFormComponent} from "./ComputerAddFormComponent";

const meta : Meta<typeof ComputerAddFormComponent> = {
    title: 'Components/Forms/ComputerAddForm',
    component: ComputerAddFormComponent,
    tags: ['autodocs'],
}

export default meta;

export const Classique: (args: any) => JSX.Element = (args: any) => {

    return <ComputerAddFormComponent
        computerSerial={args.computerSerial || '123456789'}
        newComputerInfo={args.newComputerInfo || {
            serial: '123456789',
            category: 'PC',
            ram: '8',
            processor: 'Intel Core i5',
            condition: 'Neuf',
            comments: [
                {
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquet nisl, eget aliquam nisl nisl eget nisl.',
                }
            ]
        }}
        {...args}
    />
}