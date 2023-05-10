[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Admiralis_front-ionic&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Admiralis_front-ionic)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=Admiralis_front-ionic&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=Admiralis_front-ionic)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=Admiralis_front-ionic&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=Admiralis_front-ionic)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=Admiralis_front-ionic&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=Admiralis_front-ionic)
[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=Admiralis_front-ionic)](https://sonarcloud.io/summary/new_code?id=Admiralis_front-ionic)

---

# Admiralis - Front

[![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/file/PiMB3FU3OJfZZK9bdgXQIP/Maquette-Admiralis?node-id=5%3A56&t=d4sRuKOOl4Ix2w54-1)
[![Jira](https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jira&logoColor=white)](https://admiralis.atlassian.net/jira/software/projects/ADMIRALIS/boards/1)
[![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Admiralis)

Front-end du projet Admiralis.

## Dépendances

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Ionic](https://img.shields.io/badge/Ionic-3880FF?style=for-the-badge&logo=ionic&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)


## Installation


![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)

### Prérequis

Si vous souhaitez afficher la version android, vous devez installer android studio et configurer un émulateur.
Le projet peut aussi être lancé en version web.

```bash
npm install
```

## Lancement

### Développement

Pour démarrer le projet en mode développement : 

- Clonez le backend du projet : `git clone https://github.com/Admiralis/backend --recurse`
- Démarrez le backend en suivant les instructions du README.md

- Clonez la gateway du projet : `git clone https://github.com/Admiralis/dev_stack`
- Démarrez la gateway en suivant les instructions du README.md

- Clonez le front du projet : `git clone https://github.com/Admiralis/front-ionic`
- Démarrez le front PWA avec `npm run dev` ou le web uniquement avec `npm start`

Le projet sera alors accessible sur `localhost:80`
Le backend sera accessible sur `localhost:80/api`


### Production

> Le projet est en cours de développement, il n'est pas encore prêt pour la production.

A terme : Un repository 'admiralis' sera créé, contenant un docker-compose.yml permettant de lancer le projet en production.
