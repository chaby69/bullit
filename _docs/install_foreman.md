---
layout: page-col
title: Installation locale pour Foreman
description: L'intérêt de Foreman est de faire tourner votre application dans le même contexte que lorsqu'elle sera hébergée sur les serveurs d'Heroku
category: docs
permalink: /docs/install_foreman/
---

__Prérequis:__ `Git`, `Python et Virtualenv`, `Toolbelt Heroku`

Si vous désirez faire tourner {{ site.appname }} sur votre machine locale avec Foreman vous devrez installer le ToolBelt d'Heroku. ToolBelt est disponible pour toutes les plateformes. Vous pourrez le télécharger et l'installer facilement en suivant [l'étape de setup d'Heroku](https://devcenter.heroku.com/articles/getting-started-with-python#set-up)

---

{% include _docs/clone_repos.html %}

{% include _docs/env_install.md %}

## Configuration

Copiez le fichier `config.sample.py` et renommez-le `config.py`.

Ensuite ouvrez-le et [modifiez les paramètres]({{ "/docs/settings/" | prepend: site.baseurl }}) en fonction de votre configuration. 

Créez un nouveau fichier nommé `.env`. Ce fichier est lu au chargement par Foreman et permet de se mettre à peu près dans les mêmes conditions que sur Heroku en chargeant notre configuration dans les variables d'environnement

Collez les deux lignes suivantes dans le fichier `.env` nouvellement créé:
{% highlight bash %}
HEROKU=1
CONF=/path/local/to/config_heroku.py
{% endhighlight %}

- `HEROKU` est juste un flag pour signaler que l'appli va tourner sur Heroku ou avec Foreman
- `CONF` est le chemin vers `config.py`. Foreman l'utilisera pour charger automatiquement nos paramètres de configuration dans l'environnement.

## Lancement de Bullit

Ensuite, il suffit de lancer Foreman d'un simple 

{% highlight bash %}
(env) socket-wall/ $ foreman start
{% endhighlight %}

