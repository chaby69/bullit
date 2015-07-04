---
layout: page-col
title: IFTTT (Android)
description: Une recette IFTTT de captation de SMS pour Android.
category: docs
permalink: /docs/ifttt/
---

__Prérequis:__ `Android`

<p class="bg-info-box">
Création d'une recette IFTTT pour recueillir les SMS des utilisateurs et les transférer vers le serveur Bullit. 
</p>

<img src="/assets/recipe_big.png" class="img-responsive center-block img-rounded" alt="Recette IFTTT" />

## C'est quoi IFTTT ?

[IFTTT](https://ifttt.com/) est une application qui permet de brancher 2 services ensemble: lorsqu'il se passe un événement sur le service A, le service B réagit automatiquement en effectuant une tache que vous avez défini.

IFTTT veut dire "If THIS Then THAT", que l'on pourrait traduire assez librement par: si il se passe ceci alors fait cela. Nous allons donc définir un événement déclencheur (THIS) qui provoquera l'exécution d'une action (THAT). Notre événement est la réception de SMS et notre action sera de transférer ce message vers Bullit.

__Avertissement:__ IFTT est une application Android ET iphone. Malheureusement il semblerait que les fonctionnalités de déclenchement liées à la réception de SMS ne soient pas disponible avec les iphones ... Ceci ne demande qu'à être contredit ! Si vous connaissez la marche à suivre n'hésitez pas à nous la communiquer!

Pour commencer vous devrez [créer un compte sur IFTTT](https://ifttt.com/) et [installer leur application IF](https://ifttt.com/products#if) en fonction de votre mobile.

## If this then that

Lors de votre première connection une petite démo vous montrera comment va se dérouler la suite des événements. Une fois ceci fait, vous aller créer une recette dédiée à Bullit en vous rendant dans la rubrique "My recipes" puis en cliquant sur le gros bouton "Create a recipe" (<https://ifttt.com/myrecipes/personal/new>).

Toute la phase de création de votre recette se passera sur cette page. Comme lors de la démo, la phrase "if this then that" vous accompagnera au fil des différentes étapes. <strong>Cliquez sur `this`</strong>

## 1 - Choose Trigger Channel

Nous allons mettre en place notre événement déclencheur, la réception sur votre mobile d'un SMS. Une liste impressionante de services apparait avec une barre de recherche au dessus.

Dans la barre de recherche des triggers saisissez "sms" et choisissez le channel `Android SMS`

## 2 - Choose a Trigger step

Plusieurs type de déclencheur vous sont proposés, cliquez sur `Any new SMS received`. 

## 3 - Complete Trigger Fields

il suffit de cliquer sur `Create Trigger`

## 4 - Choose Action Channel

Comme lors de l'étape 2, tous les services disponible sont listés. Nous allons sélectionner le service `Maker` puis connecter ce service. Il vous suffit de valider la connexion.

## 5 - Choose an Action

Une seule action est disponible mais qui permet toutes les excentricités: `Make a web request`

## 6 - Complete Action Fields

La création de notre action est sans doute la plus importante. Il vous faudra remplir le formulaire comme sur la capture d'écran, en adaptant le champ `URL` et le champ `Body` à votre installation Bullit

<img src="/assets/step_6a.png" class="img-responsive center-block img-rounded" alt="Recette IFTTT" />

__URL:__ Il s'agit de l'adresse public permettant de poster des messages à notre application. Dans notre exemple il s'agit d'une installation sur le service Heroku. Vous n'avez que le nom de domaine à modifier. Si votre bullit n'a pas de nom de domaine propre, vous pourrez renseigner l'adresse IP et le port que vous avez défini lors de l'installation de votre Bullit:

```
http://252.252.252.252:8080/messages/sms/
```

__Method:__ Sélectionnez la méthode `POST`

__Content type:__ Choisissez `application/json`

__Body:__ 

{% highlight bash %}
{"text":"{{Text}}", "sender":"{{FromNumber}}", "grabber":"0606060606", "tag":"VotreTokenAutogénéréParHerokuOuQueVousAvezDéfiniVousMeme"}
{% endhighlight %}

Le champ `Body` contient toutes les informations au format JSON du SMS que nous allons envoyer à Bullit. Vous devez impérativement adapter les paramètres `grabber` et `tag` à votre installation:

- __grabber:__ Il s'agit du n° de téléphone du mobile qui qui sert à la captation et qui permet de cibler sur quel Wall les SMS reçus apparaitront
- __tag:__ Il correspond au paramètre __PHONE_TOKEN__ que vous avez défini dans votre fichier de configuration `config.py`. Si votre Bullit a été installé en mode automatique sur Heroku, ce token a été auto-généré et vous pourrez le retrouver dans les settings de votre dashboard Heroku.


## 7 - Create and connect

Dernière étape de notre recette: lui trouver un nom :)

Vous pouvez aussi décider ou pas de recevoir une notification à chaque fois que l'action est déclenchée. Il est préférable de décocher cette option une fois que votre recette fonctionne. Elle fait double emploi avec la réception des SMS et vous pouvez vous en passer.

Enfin, vous pouvez cliquer sur `Create recipe` pour finaliser la création.


## Utilisation

Une fois votre recette créée il faudra vous assurer que celle ci est active sur votre mobile (il vous faudra [installer l'application](https://ifttt.com/products#if) et vous connecter à votre compte préalablement)

---

{% include _docs/ip_server.md %}