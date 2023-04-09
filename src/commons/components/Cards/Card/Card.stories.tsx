import CardComponent from "./Card.component";
import {Meta, StoryObj} from "@storybook/react";
import '../../../../theme/variables.css'
import './Card.module.css'
import {IonButton} from "@ionic/react";

const meta: Meta<typeof CardComponent> = {
    title: 'Components/Card',
    component: CardComponent,
    argTypes: {
        title: {control: 'text'},
        subtitle: {control: 'text'},
        content: {control: 'text'},
        actions: {control: 'text'},
        alert: {control: 'boolean'},
        collapsible: {control: 'boolean'},
        tiny: {control: 'boolean'},
    }
};

export default meta;

export const Classique: (args: any) => JSX.Element = (args: any) => {

    return <CardComponent
        {...args}
        title={args.title || 'Titre'}
        subtitle={args.subtitle || 'Sous-titre'}
        content={args.content || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquet nisl, eget aliquam nisl nisl eget nisl.'}
        actions={
            <>
                <IonButton className="green">Exemple</IonButton>
            </>
        }
    />
};