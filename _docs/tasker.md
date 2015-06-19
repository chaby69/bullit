---
layout: page-col
title: Tasker (Android)
description: Tutoriel de création d'une tache Tasker (payant) de captation des SMS
category: docs
permalink: /docs/tasker/
---

__Prérequis:__ `mobile Android`, `CB`

<p class="bg-info-box">
Ce tutoriel vous permettra de mettre en place un ‘grabber’ de SMS à l’aide d’un téléphone sous Android et de l’application Tasker (Version pour Android >= 4.0).
</p>

## Présentation de Tasker :

Tasker est une application Android qui vous permet de créer et d’exécuter des taches sur votre mobile en fonction d’un ou de plusieurs contextes particuliers. C’est une véritable trousse à outil pour personnaliser et automatiser votre mobile très finement et qui peut remplacer avantageusement une multitude de petites applications qui ne font pas toujours exactement ce qu’on leur demande et finissent par polluer plus qu’autre chose votre téléphone.

Tasker est un application payante (2,99€) mais qui vous rendra bien des services en dehors du grabber de SMS. Il existe aussi une version d’évaluation qui ne semble pas limitée dans ses fonctionnalités mais qui expire au bout de 7 jours, ce qui peut être largement suffisant pour vous convaincre de payer la licence :)

- Google Store : <https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm>
- Site web : <http://tasker.dinglisch.net/>
- Guide, how-to : <http://www.pocketables.com/2013/03/overview-of-pocketables-tasker-articles.html>

Une fois installée sur votre mobile, lançons nous dans le vif du sujet !


## Création du profil :

Commencez par créer un nouveau profil en cliquant sur le gros bouton + en bas de l’écran d’accueil de Tasker. Suivant la version de l’application (dépendante de votre version d’Android), on vous demandera de nommer votre tâche soit au début du processus de création, soit à la fin. Quand on vous le demandera, donnez lui un nom simple et générique, par exemple: « Réception de SMS »

Ensuite il faut spécifier le contexte principal. Nous voulons que le téléphone réagisse à l’arrivée de chaque SMS. Nous allons donc choisir `Evénement` comme premier contexte puis dans la catégorie `Téléphone` nous sélectionnons le type d’évènement : `SMS reçu`

Dans la page d’édition de l’évènement, vérifiez bien que le champ Type est configuré sur `Tous` ou éventuellement `SMS` puisque les MMS ne sont actuellement pas traités.

__Enfin, pour valider puis revenir à l’écran principal, cliquez sur le logo Tasker en haut à gauche.__ Une précision qui s'impose la démarche n'étant pas des plus intuitives.


## Création de la tâche :

Tasker vous invitera ensuite à choisir ou à créer une nouvelle Tâche. Nous allons donc choisir `Nouvelle tâche`, lui choisir un nom ( « Grabber » par exemple ) puis valider.

Nous nous retrouvons sur un écran vierge où nous allons créer une simple action qui sera exécutée à chaque réception de SMS. Cette action sera en charger d'envoyer le contenu du SMS reçu au serveur Bullit.

Tasker accède pour vous aux variables locales du système de votre téléphone. Parmi toutes celles que nous avons à notre disposition, nous utiliserons le contenu du dernier SMS reçu ainsi que le numéro de téléphone de l'expéditeur (ce dernier sera chiffré par Bullit).

__Commencez par créer une nouvelle action en cliquant sur le bouton `+` en bas de l’écran, puis :__

- Choisissez la catégorie : `Réseau`
- Choisissez ensuite l’action à effectuer : `Post HTTP`

__Dans la page d’édition de l’action :__

- Serveur:Port : `www.nomdomaine.com` ou `192.168.0.X:8080`
- Chemin : `/messages/sms/`
- Données / Fichier: 
{% highlight bash %}
text=%SMSRB
sender=%SMSRF
grabber=<06XXXXXXXX>
tag=<votre_phone_token>
{% endhighlight %}

Nous créons ici 4 paramètres contenant les informations relatives au SMS reçu. Les deux premiers, `text` et `sender` repésentent respectivement le contenu et l'expéditeur du message. Nous les alimentons avec des variables locales du système généreusement mise à notre disposition par Tasker.

Les deux paramètres suivants sont à renseigner par vos soins: `grabber` correspond au numéro de téléphone de votre mobile (pas de variable système fiable) et `tag` est à renseigner avec la variable __PHONE_TOKEN__ de votre fichier de configuration. Ce token sert à assurer un minimum de sécurité.

Tous les autres champs sont laissés vide par défaut puis validez en cliquant sur le logo Tasker en haut à gauche

## Activation de la tâche :

Une fois le profil et la tâche associée créés, revenez à l’onglet principal `Profils` et vérifiez que votre profil est activé.

## Activation de Tasker

Pour que Tasker soit actif en tâche de fond sur votre mobile il faut l’activer, ce qui n’est pas encore forcément le cas. Vérifiez que l’icône Tasker en haut à gauche de l’écran est en couleur (l’éclair du logo doit être jaune / orange). Si le logo est monochrome, appuyez longuement sur le logo. Un message devrait vous indiquer ‘Enabled’ et le logo devrait se colorer …

Il ne vous reste plus qu’à tester le bon fonctionnement de la tâche en vous envoyant à vous même un SMS avec votre serveur Bullit en marche.

---

{% include _docs/ip_server.md %}