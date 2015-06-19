---
layout: page-col
title: SmsEnabler (clé 3G + Windows)
description: Captation de SMS avec SmsEnabler (payant) sous Windows à l'aide d'une clé 3G
category: docs
permalink: /docs/smsenabler/
---

__Prérequis:__ `Windows`, `Clé 3G`, `CB`

<p class="bg-info-box">
Vous allez dédier un ordinateur à la captation des contenus. Nous avons utilisé un vieux PC sous windows XP. La partie de captation des SMS se fera grâce à un logiciel nommé SmsEnabler.
</p>

[SmsEnabler](http://smsenabler.com/) va nous permettre d'utiliser le réseau téléphonique non pas pour nous connecter ou pour émettre, mais simplement pour recevoir les sms. Nous renverrons ensuite ceux-ci via internet en passant par le wifi ou un cable ethernet. Le coût de communication induit par le dispositif est donc nul...

La captation des SMS se fera par le biais de la clé USB 3G.

## Choix de la clé usb 3G.

<img src="/assets/huawei-cle-3g.jpg" class="img-responsive pull-left" style="margin-right: 10px;" />

Nous recommandons l'usage de la clé USB 3G huwei (notamment déployée par SFR). Mais l'essentiel est de pouvoir connecter une carte SIM sur le PC. Théoriquement il est possible de monter le dispositif en reliant votre portable au PC par bluetooth mais l'expérience montre que cela est loin d'être simple.

Avec un bundle sur clé USB 3G les drivers de chargent tous seuls lors de la première insertion de la clé. Une fois la clé installée, ne pas lancer de logiciel de pilotage de la clé.

---

## Installation du logiciel de captation des SMS

Télécharger et installer [SmsEnabler](http://smsenabler.com/). Ce logiciel est très intéressant puisqu'il permet, à la carte :

- de stocker en local les SMS reçus (nous désactiverons cette fonction par souci de protection des données personnelles, dans l'onglet "settings".
- de rediriger des SMS par mail vers une boîte de votre choix
- de rediriger des SMS via http vers le web et donc vers une page de notre choix. C'est cette dernière option que nous utiliserons.

La version gratuite de SmsEnabler ne transmet que 12 caractères mais elle est bien suffisante pour vous permettre de tester l'envoi de SMS sur votre mur. Une fois la chaîne de fonctionnement validée vous pouvez procéder à l'achat de la clé logicielle permettant de relayer tout le contenu texte du message. Pour cela, une fois l'achat effectué sur le site officiel, vouis recevrez un e-mail avec un lien de téléchargement d'une clé logicielle. Il faudra la copier dans le répertoire contenant le programme smsenabler à côté du .exe, puis redémarrer la machine.

<img src="/assets/schema.gif" class="img-responsive thumbnail" style="margin: auto;" />

---

## Paramétrage du logiciel SMSENABLER

- Ouvrir le logiciel.
- Cliquez sur Settings.
- Choisir `http`.

Saisir l'adresse absolue de la page de captation des sms : `http://mondomaine.com/messages/sms/`. Puis bouton "OK".

<img src="/assets/http_request.jpg" class="img-responsive" style="margin: auto;" alt="Paramétrage de l'url cible pour les SMS" />

Désactiver le log des sms dans le logiciel afin de ne garder aucun enregistrement des numéros de téléphone des appelants : `settings`, `text files`, décocher `saved received messages to a text file`. Puis bouton "OK".

<img src="/assets/nolog.jpg" class="img-responsive" style="margin: auto;" alt="Désactivation des logs des SMS reçus" />

Pour sécuriser les échanges entre notre grabber SMS et le serveur Bullit nous allons utiliser le paramètre optionnel `tag` de SmsEnabler. Toujours dans l'onglet `settings`, saisissez la clé `PHONE_TOKEN` de votre fichier de configuration `config.py`. Cette clé est auto-générée lors d'une installation rapide Heroku, mais pour tous les autres type installation il vous faudra impérativement personnaliser cette clé.

Cliquez ensuite sur l'onglet `connection` et sélectionnez votre clé 3G dans la liste. Nous n'avons pas touché aux paramètres avancés et cela a toujours bien fonctionné. Puis bouton "OK".

Vous n'avez plus qu'à cliquer sur le bouton `Start` situé en haut à gauche de la fenêtre principale de SMSenabler : il est à l'écoute.

## Test

Envoyez un sms au numéro de téléphone correspondant à la carte SIM.
SmsEnabler vous affiche le sms reçu dans une fenêtre à l'écran.
Si les paramétrages sont corrects SMS enabler retransmet le texte du SMS au serveur Bullit qui procède au chiffrement du n° de téléphone et à l'enregistrement du message.

---

{% include _docs/ip_server.md %}
