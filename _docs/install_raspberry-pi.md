---
layout: page-col
title: Installation Raspberry Pi
description: Installation complète de Bullit et d'une base de données MongoDB sur une Raspberry Pi
category: docs
permalink: /docs/raspberrypi/
---

__Prérequis:__ `Raspberry Pi`

<p class="bg-info-box">
{{ page.description }}
</p>

Téléchargement et flashage de la dernière Raspbian en suivant les tutoriaux officiels: <http://www.raspberrypi.org/documentation/installation/installing-images/README.md>

Une fois la carte SD flashée vous pouvez l'insérer dans votre Raspberry Pi et alimenter l'engin pour la démarrer.

Pour mémoire, voici le login/password par défaut:

{% highlight bash %}
login par défaut: pi
password par défaut: raspberry
{% endhighlight %}

N'oubliez pas de les changer rapidement surtout si vous envisagez d'ouvrir votre Raspberry Pi sur un réseau public.

---

## raspi-config

raspi-config est un script qui se lancera automatiquement au démarrage et qui vous accompagnera dans la configuration de votre Raspberry Pi. 

__Avant de commencer:__

Veillez à bien configurer les Locales ET le clavier avant de rebooter, vous pourriez vous retrouver avec un clavier QWERTY (par défaut) et vous aurez du mal vous logguer...

Naviguez dans les différents menus avec les flèches du clavier, validez avec Entrée et sélectionnez avec la barre d'espace (pour les locales et le clavier)

- Etendre la carte SD pour que nous ayons le maximum de place pour installer MongoDB
- Internationalisation:
    + Ajouter la Locale FR
    + Dans le doute, laisser la Locale EN pour le système
    + Keyboard à passer en FR
    + Timezone à passer sur Paris
- Advanced:
    + On autorise SSH
    + on défini un hostname si on veut
    + on overscan ou pas en fonction de l'écran branché sur la Raspberry. Si vous voyez des bandes noires, changez la config actuelle
    + memory split ? on verra à l'usage, @todo
- Overclocking ? on verra à l'usage, @todo

---

## Connexion SSH à la Raspberry Pi

pas obligatoire, si on fait toute la démarche branché à la Raspi, ptet pas de soucis ...

Sinon, création de clé : `ssh-keygen -t rsa -C pi@raspi`

---

## Installation de MongoDB

L'installation manuelle sur une Raspberry Pi n'est pas des plus aisées, heureusement [Mongo4Pi](https://github.com/svvitale/mongo4pi.git) est là pour nous soulager d'un bon nombre de ligne de commande !

Nous allons donc cloner ou télécharger mongo4pi puis lancer le script d'installation qui nous est offert:

{% highlight bash %}
$ git clone https://github.com/svvitale/mongo4pi.git
$ cd mongo4pi
mongo4pi/ $ ./install.sh
...
{% endhighlight %}

L'installation devrait se passer sans douleur...

Note: Si Mongo ne démarre pas tout seul:

{% highlight bash %}
/opt/mongo/bin/mongod --dbpath /var/lib/mongodb --logpath /var/log/mongodb/mongodb.log run --config /etc/mongodb.conf
{% endhighlight %}

---

## Python et ses amis

Python est déjà installé sur votre Raspberry Pi, il nous reste à installer les autres outils nécessaires :

Installation de python-dev et de Pip avec Virtualenv que nous allons installer globalement depuis les sources. Pensez à modifier les `X.X.X` par version actuelle (<https://pypi.python.org/pypi/virtualenv>)

{% highlight bash %}
$ sudo apt-get install python-dev
$ curl -O https://pypi.python.org/packages/source/v/virtualenv/virtualenv-X.X.X.tar.gz
$ tar xvfz virtualenv-X.X.X.tar.gz
$ cd virtualenv-X.X.X
$ sudo python setup.py install
{% endhighlight %}

---

{% include _docs/clone_repos.html %}

{% include _docs/env_install.md %}

{% include _docs/config.md %}

{% include _docs/start_app.md %}

@todo

topo sur les Thèmes 

Vous pouvez vous lancer dans l'install des outils front-end qui vous permettront de customiser les Thèmes depuis votre navigateur. Mais sachez que la Raspberry atteint rapidement ses limites, et même si ca marche (testé !) c'est lent, très lent ... La compilation LESS surtout (exploiter less côté browser serait bcp plus judicieux ici)
