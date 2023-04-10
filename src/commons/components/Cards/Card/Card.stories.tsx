import CardComponent from "./Card.component";
import {Meta} from "@storybook/react";
import '../../../../theme/variables.css'
import './Card.module.css'
import {IonButton} from "@ionic/react";

const meta: Meta<typeof CardComponent> = {
    title: 'Components/Card',
    component: CardComponent,
    tags: ['autodocs'],
    argTypes: {
        title: {
            control: 'text',
            defaultValue: 'Titre',
            description: 'Titre de la carte',
            required: true
        },
        subtitle: {
            control: 'text',
            defaultValue: 'Sous-titre',
            description: 'optionnel : Sous-titre de la carte',
        },
        content: {
            control: 'text',
            defaultValue: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquet nisl, eget aliquam nisl nisl eget nisl.',
            description: 'Composant React du contenu de la carte'
        },
        actions: {
            control: 'text',
            defaultValue: <IonButton className="green">Exemple</IonButton>,
            description: 'Composant contenant les actions de la carte'
        },
        alert: {
            control: 'boolean',
            defaultValue: false,
            description: 'Affiche une alerte sur la carte'
        },
        collapsible: {
            control: 'boolean',
            defaultValue: false,
            description: 'Permet de replier la carte. Par défaut à false'
        },
        tiny: {
            control: 'boolean',
            defaultValue: false,
            description: 'Version petite de la carte. Par défaut à false'
        },
    }
};

export default meta;

export const Classique: (args: any) => JSX.Element = (args: any) => {

    return <CardComponent
        {...args}
        title={args.title || 'Titre'}
        subtitle={args.subtitle || 'Sous-titre'}
content={args.content || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquet nisl, eget aliquam nisl nisl eget nisl.'}
        actions={args.actions || <IonButton className="green">Exemple</IonButton>}
        alert={args.alert || false}
        collapsible={args.collapsible || false}
        tiny={args.tiny || false}
    />
};