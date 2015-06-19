---
layout: page-col
title: Bullit SMS (Android)
description: Application Android gratuite. La solution la plus simple et rapide pour mettre en place votre grabber SMS
category: docs
permalink: /docs/bullit-sms/
---

__Prérequis:__ `mobile Android`

<img src="http://img.bullit.io/screenshots/bullit-sms_200.png" class="img-responsive pull-left" style="margin-right: 15px;" />

Bullit SMS est une petite application pour Android gratuite qui vous permet de capter les SMS envoyés par vos utilisateurs.

Pour l'installer, le plus simple est de vous rendre à l'adresse suivante avec votre mobile en ayant préalablement autorisé le téléchargement et l'installation de sources externes :

[Télécharger Bullit SMS](http://img.bullit.io/apk/Bullit.66.apk)

L'installation devrait se faire sans douleur. Une fois installée et démarrée vous devriez voir apparaître l'interface ci-contre.

<hr/>

## Configuration

L'interface vous propose 3 champs que vous devrez renseigner avant de pouvoir lancer la captation

- __N° Phone__

    Ce paramètre est optionnel. Il agit comme un filtre et permet de cibler le wall sur lequel vous désirez envoyer les messages. Il correspond au n° de téléphone du mobile que vous utilisez.

    Si vous ne le spécifiez pas, les SMS reçus seront postés sur tous vos walls même si vous avez indiqué un N° de téléphone pour un de vos walls dans l'admin.

    Par contre, si vous indiquez un numéro dans Bullit SMS ainsi que dans la configuration d'un de vos walls alors les SMS ne seront reçus que sur ce dernier.

    Cela permet d'avoir plusieurs n° de téléphone pointant sur différents walls à peu de frais.

- __host:port__

    Il s'agit de l'adresse du serveur de votre installation.

    Pour une installation sur Heroku ou sur un serveur disposant d'un nom de domaine vous pourrez saisir ce dernier sans vous préoccuper du port: `monbullit.herokuapp.com`

    Pour une installation locale vous indiquerez une adresse du type : `192.168.0.1:8080`. L'adresse de votre serveur doit pour cela [être accessible sur le réseau](#config)


- __Token__

    Ce paramètre sert à sécuriser la communication entre votre téléphone mobile et le serveur. Il vous faudra le faire correspondre au token que vous aurez au préalable ajouté dans votre fichier de configuration sous l’appellation __PHONE_TOKEN__

Une fois ces paramètres renseignés, vous pouvez lancer le grabber en tapant sur le gros bouton ON/OFF et en envoyant un premier SMS de test

Tout en bas, vous disposez d'un compteur qui s'incrémentera tout au long de votre session. Vous pouvez le remettre à zéro quand vous le désirez en appuyant sur le petit bouton à sa droite.

---

{% include _docs/ip_server.md %}



