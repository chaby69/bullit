---
layout: page-col
title: Captation SMS - Tasker
description: Captation de SMS 
category: docs
permalink: /docs/grabbers/tasker/
---

<p class="bg-info-box">
Ce tutorial vous permettra de mettre en place un ‘grabber’ de SMS à l’aide d’un téléphone sous Android et de l’application Tasker (Version pour Android >= 4.0).
</p>

Vous pouvez aussi importer directement [grabber.xml](https://raw.githubusercontent.com/assobug/smswall/master/tasker/grabber.xml) dans Tasker et modifier les différents paramètres en fonction de votre utilisation.

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

Nous nous retrouvons sur un écran vierge où nous allons créer plusieurs actions qui seront exécutées à chaque réception de SMS.

<p class="bg-info-box">
<strong>Note:</strong> nous décidons ici d’envoyer le contenu du message en GET sur une adresse http public dans le cadre d’une installation de type SmsWall. En fonction de votre utilisation, vos besoins ne seront pas forcément les mêmes, les actions seront différentes. N’hésitez pas à consulter la documentation et le wiki de Tasker en cas de besoin !
</p>

### 1 - Affectation de variable :

Tasker accède pour vous aux variables locales du système de votre téléphone. La date, l’heure, l’état du téléphone ou bien encore le contenu du dernier SMS reçu sont donc disponible.

Nous allons créer notre propre variable pour y stocker le corps du message contenu dans le SMS pour pouvoir par la suite l’utiliser à notre compte :

Commencez par créer une nouvelle action en cliquant sur le bouton `+` en bas de l’écran, puis :

- Choisissez la catégorie : `Variable`
- Choisissez ensuite l’action à effectuer avec cette variable : `Affecter une variable`

Dans la page d’édition de l’action :

- Choisissez un nom. Celui-ci doit impérativement commencer par un %. Par exemple : `%BODY`
- Dans le deuxième champ `A` nous allons choisir le contenu à affecter à notre variable. Vous pouvez cliquer sur l’icone à droite du champ pour choisir dans la liste complète de toutes les variables locales disponibles (La liste est longue …). Choisissez `Texte – Corps`. Le champ doit s’être automatiquement rempli avec la chaîne de caractère `%SMSRB`
- Validez en cliquant sur le logo Tasker en haut à gauche

### 2 - Encodage de la variable

Avant de pouvoir envoyer la variable nous devons l’urlencoder. Tasker nous permet de manipuler les variables à notre convenance :

- Créez une nouvelle action
- Choisissez la catégorie : `Variable`
- Choisissez ensuite l’action `Conversion de variable`

Dans la page d’édition de l’action :

- Saisissez le nom de votre variable créée précédemment (`%BODY` dans notre exemple)
- Ensuite choisissez `URL Encode` dans la liste du champ Fonction
- Validez en cliquant sur le logo Tasker en haut à gauche

### 3 - Envoi au serveur

- Créez une nouvelle action
- Choisissez la catégorie : `Réseau`
- Choisissez ensuite l’action `Post HTTP`


Dans la page d’édition de l’action :

- Serveur:Port : `www.nomdomaine.com` ou `192.168.0.X:8080`
- Chemin : `/messages/sms/`
- Attributs : 
{% highlight bash %}
text=%BODY
{% endhighlight %}

Tous les autres champs sont laissés vide par défaut puis validez en cliquant sur le logo Tasker en haut à gauche

## Activation de la tâche :

Une fois le profil et la tâche associée créés, révenez à l’onglet principal `Profils` et vérifiez que votre profil est activé.

## Activation de Tasker

Pour que Tasker soit actif en tâche de fond sur votre mobile il faut l’activer, ce qui n’est pas encore forcément le cas. Vérifiez que l’icône Tasker en haut à gauche de l’écran est en couleur (l’éclair du logo doit être jaune / orange). Si le logo est monochrome, appuyez longuement sur le logo. Un message devrait vous indiquer ‘Enabled’ et le logo devrait se colorer …

Il ne vous reste plus qu’à tester le bon fonctionnement de la tâche en vous envoyant à vous même un SMS avec votre serveur Bullit en marche.

