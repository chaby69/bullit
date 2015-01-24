---
layout: page-col
title: Configuration
description: Détail des différents paramètres modifiables du fichier `config.py`
category: docs
permalink: /docs/settings/
---

<p class="bg-info-box">
{{ page.description }}
</p>

Vous retrouverez ces paramètres dans votre fichier <code>config.py</code> ou dans vos variables d'environnement pour Heroku. Vous pouvez les modifier en éditant le fichier en question puis en redémarrant Bullit.
<br/><br/>
Si il s'agit d'une instance de Bullit sur Heroku, vous pourrez les modifier en vous rendant dans les Settings de votre application et en éditant vos Config Variables

---

## Application Flask - requis

`SECRET_KEY` : La `SECRET_KEY` est requise par Flask pour sécuriser l'application dans son ensemble.

`SERVER_CONFIG` : Un objet qui permet de renseigner les clients sur l'origine du serveur. Il est à adapter en fonction de votre configuration (adresse IP, nom de domaine)

<a name="mongodb"></a>

---

## Base de donnée MongoDB - requis

`MONGODB_URI` : Vous utiliserez `MONGODB_URI` si vous définissez vous même votre base de donnée (installation manuelle)

`MONGOLAB_URI` : Si vous utilisez l'addon Heroku c'est la variable `MONGOLAB_URI` qui sera automatiquement settée et vous n'aurez donc pas à vous en soucier

Dans les 2 cas la valeur associée est un format standard qui devrait correspondre à ce schéma :

{% highlight bash %}
mongodb://username:password@nomdedomaine:port/database
{% endhighlight %}

Pour une installation locale de MongoDB par défaut, sans authentification, le schéma sera un peu différent, `MONGODB_URI` vaudrait `mongodb://localhost:27017/bullit`

---

## Grabber SMS - requis

Pour autoriser [votre grabber]({{ "/docs/grabbers/" | prepend: site.baseurl }}) à envoyer les SMS reçus sur le serveur nous devons sécuriser un minimum la transaction en ajoutant un paramètre qui ne sera connu que du serveur et du grabber:

`PHONE_TOKEN` 

Il s'agit d'une clé que vous devrez personnaliser pour la rendre unique et qui permettra d'authentifier [le grabber SMS]({{ "/docs/grabbers/" | prepend: site.baseurl }}) auprès du serveur. 

Lors d'une installation Heroku automatique, cette clé sera générée automatiquement par Heroku et vous devrez la reporter dans votre grabber.

<a name="twitter"></a>

---

## API Twitter

`API_KEY` `API_SECRET` `ACCESS_TOKEN` `ACCESS_TOKEN_SECRET`

Pour afficher des tweets, streamer un flux en temps réel, Bullit doit pouvoir se connecter à l'[API Twitter](https://dev.twitter.com/overview/documentation). Pour cela vous devez commencer par créer une application Twitter en vous rendant dans le centre de développement : <https://dev.twitter.com/apps>

Une fois créée vous pourrez récupérer les paramètres de connexions à l'API et les reporter dans votre fichier de configuration ou vos variables d'environnement selon votre installation.

Lors de la première connexion de Bullit au serveur de Twitter il faudra autoriser votre application. Surveillez les messages de logs dans votre terminal...

---

## Embed.ly

`EMBEDLY_KEY`

[Embed.ly](http://embed.ly) est un service qui permet d'explorer le contenu d'une adresse internet et d'en retourner les contenus riches (articles, photos, vidéos, pdf, etc). 

En vous créant un compte sur [Embed.ly](http://embed.ly) vous pourrez explorer et afficher le contenu des URLs présentent dans les messages pour les ouvrir directement sur vos walls


---

## Amazon AWS S3

Utilisation avancée, en cours de dev

Permet l'archivage des Thèmes sur un espace de stockage de type S3 (Amazon, DreamObjects, Swift) pour leur restauration ulterieure ou pour faciliter le partage de Thème entre instance de Bullit. 

`S3_BUCKET_NAME` `S3_BUCKET_DOMAIN` `AWS_ACCESS_KEY_ID` `AWS_SECRET_ACCESS_KEY`


