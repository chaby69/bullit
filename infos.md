---
layout: page-col
title: Infos
permalink: /infos/
category: infos
---

{% include description.html %}

---

## Fonctionnalités

- gestion de plusieurs recherches Twitter différentes simultanément avec un seul compte Twitter
- administration principale (le dashboard) organisée en colonnes pour piloter facilement plusieurs walls simultanément
- sans inscription pour les utilisateurs: récupération et affichage de SMS
- mise en valeur des messages, photos, vidéos et autres médias de vos réseaux sociaux
- thèmes personnalisables:
    - directement depuis le navigateur avec mise à jour en temps réel des écrans connectés
    - édition manuelle: template HTML, CSS, LESS
    - export en cloud et partage (en cours)
- pilotage à distance des différents écrans en temps réel:
    - modification des infos générales
    - changement de Wall en cours de session
    - attribution de Thèmes à distance
- possibilité d'utiliser plusieurs grabber SMS: un numéro par wall ou un numéro global
- décompression des liens internes et affichage des médias trouvés via [Embed.ly](http://embed.ly)
- modération des messages à priori ou à postériori, favoris, ...
- compatible Chromecast
- ...


---

## Exemples d'utilisation

- Affichez en live sur grand écran les questions de vos visiteurs envoyées par SMS ou Twitter lors de votre évènement public: conférence, réunion, débat, ...
- Rendez plus interactif vos concerts et autres soirées en affichant les messages, photos et vidéos de votre public.
- En vitrine de votre magasin, Bullit pourra diffuser les messages de votre communauté de fans et mettra en valeur vos offres promotionnelles en temps réel 
- Accueillez vos visiteurs en affichant les messages de votre communauté ou votre veille professionnelle sur une borne ou une TV connectée
- ...

---

## Description technique

Bullit est une application serveur en Python développée sous Flask avec une base de donnée MongoDB servant une API RESTful aux clients, les Walls, votre admin ou tout autre application utilisant l'API. Les clients sont authentifiés auprès du serveur et communiquent avec l'application via l'API ainsi qu'en mode asynchrone temps réel grâce aux websockets (Socket.io)

Les walls publics et le dashboard sont des web apps développées sous Backbone / MarionetteJs, RequireJs, socket.io, pour ne citer qu'eux. 

