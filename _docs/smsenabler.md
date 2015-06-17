---
layout: page-col
title: Captation SMS: SmsEnabler
description: Captation de SMS avec SmsEnabler sous Windows
category: docs
permalink: /docs/grabbers/smsenabler/
---

# SmsEnabler + clé 3G (Windows)

Vous allez dédier un ordinateur à la captation des contenus. Nous avons utilisé un vieux PC sous windows XP. La partie de captation des SMS se fera grâce à un logiciel nommé SMSENABLER.

SMSENABLER va nous permettre d'utiliser le réseau téléphonique non pas pour nous connecter ou pour émettre, mais simplement pour recevoir les sms. Nous renverrons ensuite ceux-ci via internet en passant par le wifi ou un cable ethernet. Le coût de communication induit par le dispositif est donc nul...

La captation des SMS se fera par le biais de la clé USB 3G.

## installation de la clé 3G.

1- Choix de la clé usb 3G.

Nous recommandons l'usage de la clé USB 3G huwei (notamment déployée par SFR). Mais l'essentiel est de pouvoir connecter une carte SIM sur le PC. Théoriquement il est possible de monter le dispositif en reliant votre portable au PC par bluetooth mais l'expérience montre que cela est loin d'être simple.

La clé utilisée lors de l'opération TRANSLIVE


Avec un bundle sur clé USB 3G les drivers de chargent tous seuls lors de la première insertion de la clé. Une fois la clé installée, ne pas lancer de logiciel de pilotage de la clé.

2- Installation du logiciel de captation des SMS

Télécharger et installer SMSENABLER. Ce logiciel est très intéressant puisqu'il permet, à la carte :

- de stocker en local les SMS reçus (nous désactiverons cette fonction par souci de protection des données personnelles, dans l'onglet "settings".
- de rediriger des SMS par mail vers une boîte de votre choix
- de rediriger des SMS via http vers le web et donc vers une page de notre choix...

La version gratuite de SMSENABLER ne transmet que 12 caractères mais elle est bien suffisante pour vous permettre de tester l'envoi de SMS sur votre mur. Une fois la chaîne de fonctionnement validée vous pouvez procéder à l'achat de la clé logicielle permettant de relayer tout le contenu texte du message. Pour cela, une fois l'achat effectué sur le site officiel, vouis recevrez un e-mail avec un lien de téléchargement d'une clé logicielle. Il faudra la copier dans le répertoire contenant le programme smsenabler à côté du .exe, puis redémarrer la machine.
Image source Smsenabler.

3- paramétrage du logiciel SMSENABLER

Ouvrir le logiciel.
Cliquez sur Settings.
Choisir "http".


Saisir l'adresse absolue de la page de captation des sms : http://mondomaine.com/smswall/admin/registersms.php. Puis bouton "OK".

Paramétrage de l'url cible pour les SMS

Désactiver le log des sms dans le logiciel afin de ne garder aucun enregistrement des numéros de téléphone des appelants : "settings", "text files", décocher "saved received messages to a text file". Puis bouton "OK".

Désactivation des logs des SMS reçus

Cliquez ensuite sur l'onglet "connection" et sélectionnez votre clé 3G dans la liste. Nous n'avons pas touché aux paramètres avancés et cela a toujours bien fonctionné. Puis bouton "OK".

Vous n'avez plus qu'à cliquer sur le bouton "Start" situé en haut à gauche de la fenêtre principale de SMSenabler : il est à l'écoute.

4- test

Envoyez un sms au numéro de téléphone correspondant à la carte SIM.
SMS enabler vous affiche le sms reçu dans une fenêtre à l'écran.
Si les paramétrages sont corrects SMS enabler retransmet le texte du SMS à la page php qui procède à l'enregistrement du message.