---
layout: page-col
title: Installation manuelle Heroku
description: Installation de Bullit sur un compte gratuit <a href="https://www.heroku.com/" target="_blank">Heroku</a> et utilisation du service <a href="https://mongolab.com/" target="_blank">MongoLab</a> pour gérer simplement et toujours gratuitement votre base de donnée MongoDB.
categories: ['installation']
permalink: /docs/install_heroku/
---

__Prérequis:__ `Git`, `Toolbelt Heroku`

<p class="bg-info-box">
{{ page.description }}
</p>

---

__Heroku, MongoDB, compte verifié et carte bleue ...__

MongoLab va nous permettre d'accéder à une base de donnée MongoDB hébergée par leur soin. C'est un service tiers qui propose différents plans plus ou moins couteux en fonction de leur capacité. Nous utiliserons la "sandbox" qui est une offre de découverte du service [MongoLab](https://addons.heroku.com/mongolab) et donc GRATUITE. 

Il vous sera demandé malgré tout de confirmer votre compte Heroku en saisissant un numéro de carte bleue ... Mais il n'y aura pas de débit effectué dans le cadre d'une "sandbox" tant que vous ne dépasserez pas le quota gratuit autorisé (. Il est préférable de confirmer votre compte suite à sa création ainsi vous pourrez suivre le tutorial sans interruption désagréable :)

Vous pouvez utiliser Bullit sur Heroku sans utiliser un de ces services. Il faudra dans ce cas configurer une base MongoDB sur un autre serveur et renseigner la variable d'environnement `MONGODB_URI` avec l'url de votre serveur MongoDB

---

{% include _docs/clone_repos.html %}

## Création de l'application sur Heroku

Toujours dans votre terminal, rendez-vous à la racine de votre projet:

{% highlight bash %}
$ cd socket-wall
socket-wall/ $ 
{% endhighlight %}

Nous allons ensuite créer l'application sur Heroku à l'aide du Toolbelt. Remplacez `<monapp>` par le nom que vous désirez utiliser.

{% highlight bash %}
socket-wall/ $ heroku create <monapp>
{% endhighlight %}

Si tout se passe comme prévu, vous devriez avoir une réponse de ce type:

{% highlight bash %}
Creating <monapp>... done, stack is cedar-14
https://<monapp>.herokuapp.com/ | git@heroku.com:<monapp>.git
Git remote heroku added
{% endhighlight %}

En vous rendant dans la section [Personal Apps](https://dashboard.heroku.com/apps) de votre compte Heroku vous devriez y voir votre nouvelle application <monapp>

---

## MongoDB

Ajout de l'addon MongoLab à notre application:

{% highlight bash %}
socket-wall/ $ heroku addons:add mongolab:sandbox
{% endhighlight %}

Si vous avez bien confirmé votre compte, vous devriez avoir ce message vous annoncant la disponibilité imminente de votre base de donnée:

{% highlight bash %}
Adding mongolab:sandbox on <monapp>... done, v3 (free)
Welcome to MongoLab.  Your new subscription is being created and will be available shortly.  Please consult the MongoLab Add-on Admin UI to check on its progress.
Use `heroku addons:docs mongolab` to view documentation.
{% endhighlight %}

Dans le cas contraire, vous aurez droit à ce message d'erreur :

{% highlight bash %}
Adding mongolab:sandbox on <monapp>... failed
 !    Please verify your account to install this add-on plan (please enter a credit card)
 !    For more information, see https://devcenter.heroku.com/categories/billing
 !    Verify now at https://heroku.com/verify
{% endhighlight %}

---

## Variables d'environnement

Nous allons maintenant renseigner un certains nombres de paramètres pour configurer l'application en utilisant le Toolbelt.

Vous pouvez à tout moment vérifier la bonne saisie de vos paramètres en lançant la commande `heroku config`. Vous constaterez la présence de la var `MONGOLAB_URI` qui a été renseignée automatiquement à l'installation de l'addon MongoLab.

_Pas très à l'aise en ligne de commande ? Vous pouvez aussi ajoutez ou modifier ces variables sur la page Settings de votre appli directement sur l'interface web d'Heroku._

__Les 3 commandes suivantes sont à saisir sans modification :__

{% highlight bash %}
heroku config:set BUILDPACK_URL=https://github.com/ddollar/heroku-buildpack-multi.git
heroku config:set HEROKU=1
heroku config:set DESIGNER=True
heroku config:set PATH=/usr/local/bin:/usr/bin:/bin:/app/vendor/phantomjs/bin
{% endhighlight %}

__Les commandes suivantes doivent être personnalisées avec vos propres paramètres de configuration__: (Remplacer les `<votre_xxx>` par vos propres paramètres.)

{% highlight bash %}
heroku config:set SECRET_KEY=ChangeThisKey-NonMaisVraiment
heroku config:set PHONE_TOKEN=_S0m3thiNg$D1FfiCuLt#T0R3memb3r-ToModify_
heroku config:set SERVER_CONFIG='{"host":"<monapp>.herokuapp.com","port":""}'
{% endhighlight %}

A ce stade, il est possible de [lancer l'application](#run), toutes les variables requises sont renseignés et en configurant un grabber SMS vous pourriez déjà utiliser Bullit... Mais ce serait dommage de se priver du stream Twitter non ? Continuons donc sur notre lancée :)

---

## Twitter
_(optionnel mais franchement conseillé)_

Plus d'info pour [créer votre application Twitter]({{ "/docs/settings/#twitter" | prepend: site.baseurl }})

{% highlight bash %}
heroku config:set API_KEY=<votre_api_key_twitter>
heroku config:set API_SECRET=<votre_api_secret_twitter>
heroku config:set ACCESS_TOKEN=<votre_access_token_twitter>
heroku config:set ACCESS_TOKEN_SECRET=<votre_access_token_secret_twitter>
{% endhighlight %}

## Embedly 
_(optionnel)_

{% highlight bash %}
heroku config:set EMBEDLY_KEY=<votre_key_embedly>
{% endhighlight %}

## Amazon AWS S3
_(optionnel)_

{% highlight bash %}
heroku config:set S3_BUCKET_NAME='<nom_de_votre_bucket>'
heroku config:set S3_BUCKET_DOMAIN='s3-eu-west-1.amazonaws.com'
heroku config:set AWS_ACCESS_KEY_ID='<votre_access_key>'
heroku config:set AWS_SECRET_ACCESS_KEY='<votre_secret_access_key>'
{% endhighlight %}

<a name="run"></a>

---

## Lancement de Bullit

Notre future application est désormais configurée, il ne reste plus qu'à pousser le code de notre appli sur Heroku :

{% highlight bash %}
/socket-wall/ $ git push heroku master
{% endhighlight %}

Vous pourrez suivre l'évolution de l'installation qui peut durer quelques minutes. Une fois celle-ci terminée vous pouvez vous rendre sur [https://<monapp>.herokuapp.com/uer/welcome](https://<monapp>.herokuapp.com/uer/welcome) pour créer votre compte administrateur. Une fois ceci fait, vous pouvez vous connecter à votre dashboard et créer votre premier wall !


---


### Idling 

Après une heure d'inactivité, votre application Heroku se mettra en sommeil. C'est normal (<https://blog.heroku.com/archives/2013/6/20/app_sleeping_on_heroku>)

Cela impacte actuellement les thèmes qui seront réinitialisés lorsque vous réveillerez votre application. Si vous avez édité votre thème lors de la session précédente il sera donc remis à zéro. Pour vous prémunir de cet effet indésirable vous pouvez vous tourner dans un premier temps vers des services comme Kaffeine (<https://blog.heroku.com/archives/2013/6/20/app_sleeping_on_heroku>) qui 'pingera' votre application à interval régulier.

