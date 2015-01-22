---
layout: page-col
title: Captation SMS
description: Solutions possibles pour publier des SMS sur Bullit 
category: docs
permalink: /docs/grabbers/
---

<p class="bg-info-box">
Sont regroupées ici des solutions connues et testées pour recevoir des SMS et les envoyer au serveur Bullit
</p>

## Android + Bullit SMS (version alpha !)

Réalisé avec Tasker, Bullit SMS est une appli Android minimale qui une fois installée écoutera en permanence l'arrivée de nouveau SMS et les enverra instantanément à votre serveur Bullit

[Téléchargez Bullit SMS](http://www.sms-wall.org/wp-content/uploads/2014/12/Bullit.23.apk_.zip)

Après la décompression de l'archive et installation du fichier Bullit.23.apk sur votre téléphone, envoyez-vous un premier SMS pour lancer la configuration:

- L'app vous demandera de saisir le __PHONE_TOKEN__ que vous avez renseigné dans votre fichier de configuration
- Ensuite, l'adresse du serveur où il devra envoyer les messages.
- Et pour finir le numéro de téléphone de du mobile en question

Il faudra aussi spécifier ce numéro de téléphone dans l'admin de Bullit pour au moins un de vos walls, sinon les SMS n'apparaitront nul part... 

__Mise en garde:__ Cette application est plus un test qu'autre chose ! Il n'y a pas d'interface sur le téléphone, pas de notification, pas de bouton start/stop, rien :) Ce n'est qu'un processus qui est lancé en tache de fond et que vous ne voyez pas ... Il faudra donc manuellement stopper ce processus dans le gestionnaire d'application de votre mobile pour arreter la captation de SMS.


---

## Android + Tasker

Un téléphone mobile récent sous Android et l'achat de l'application Tasker (2.99€) sont les seules contraintes techniques pour cette méthode. 

[Tasker](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm) est une application d'automatisation pour Android qui permet de lancer des actions sur le téléphone lors d'événement prédéterminés. Dans le cadre de Bullit nous allons créer un `profil` dans Tasker qui à la réception de chaque SMS sera en charge d'encoder le message et de le poster avec les autorisations nécessaires sur notre serveur Bullit.

@todo: tut à reprendre de l'actuel sms-wall

---

## Windows + clé 3G + SmsEnabler

Pour autoriser votre clé 3G + SmsEnabler à poster les SMS reçus sur le serveur nous devons sécuriser un minimum la transaction en ajoutant un paramètre qui sera connu de vous seul, il s'agit de la clé `PHONE_TOKEN` de votre fichier de configuration


## Réception des SMS par le serveur

Pour pouvoir recevoir des SMS l'adresse IP du serveur de votre application doit être accessible depuis une autre machine (LAN, serveur distant, Heroku, ...) Le grabber, quel qu'il soit, doit être en mesure d'envoyer les SMS reçus au serveur, cela ne pourra donc pas marcher avec une adresse IP du type `127.0.0.1`

Pour tester en local avec Wekzeug, vous devrez passer des paramètres au lanceur `run.py` et spécifier l'adresse IP et le port que vous désirez utiliser:

```
(env) ~/bullit $ python run.py -b 192.168.0.11
```

N'oubliez pas d'adapter le paramètre `__SERVER_CONFIG__` dans votre fichier de configuration en conséquence.

