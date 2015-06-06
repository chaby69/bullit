---
layout: page-col
title: Mode Designer
description: Outils pour les Thèmes - installation de NodeJs, NPM, Grunt, PhantomJS, Less
category: docs
permalink: /docs/frontend/
---

Vous pouvez créer et modifier manuellement des Thèmes sans en passer par l'installation complète des outils front end décrite ci-dessous. docs à venir...

_Test d'installation ok pour Ubuntu, Debian et Raspbian_

## CSS ou LESS ?

Si Less ne vous dit rien, vous pouvez modifier vos thèmes en éditant les fichiers css se trouvant dans le dossier `app/themes/<nomdutheme>/static/` directement sans vous soucier de l'installation qui suit. 

Par contre si vous désirez bénéficier des avantages de la compilation less, vous pouvez modifier les fichiers se trouvant dans le dossier `app/themes/<nomdutheme>/less/` et compiler vos styles en utilisant la commande `grunt` (voir ce qui suit)

---

## Installation NodeJs, NPM

Copie et fix du script présent ici: <https://gist.github.com/isaacs/579814#file-node-and-npm-in-30-seconds-sh>

L'install est propre: ne se fait pas dans /usr/local mais dans un dossier ~/local dans la home de l'utilisateur (pas besoin de faire des `sudo`)

{% highlight bash %}
echo 'export PATH=$HOME/local/bin:$PATH' >> ~/.bashrc
. ~/.bashrc
mkdir ~/local
mkdir ~/node-latest-install
cd ~/node-latest-install
curl http://nodejs.org/dist/node-latest.tar.gz | tar xz --strip-components=1
./configure --prefix=~/local
make install # ok, fine, this step probably takes more than 30 seconds...
curl -Lv https://www.npmjs.org/install.sh | sh
{% endhighlight %}

Cette opération est longue, c'est normal (jusqu'à 3h sur une Raspberry Pi). Une fois terminé, Node et npm sont installés sur votre machine.

---

On passe ensuite à l'installation de Grunt, Bower ainsi que des dépendances de Bullit.

__Install de Grunt en global__
{% highlight bash %}
$ npm install -g grunt-cli
{% endhighlight %}

__Install de Bower en global__
{% highlight bash %}
$ npm install -g bower
{% endhighlight %}

__Install des deps pour Grunt__
{% highlight bash %}
~ $ cd bullit
~/bullit $ npm install
{% endhighlight %}

__Installe les paquets complets pour l'appli puis filtre et extrait les sources utiles__
{% highlight bash %}
~/bullit $ grunt install
{% endhighlight %}

---

## Installation de PhantomJs

PhantomJs est un outil de capture d'écran. C'est lui qui est sollicité lorsque vous modifiez un Thème et qu'une nouvelle capture d'écran apparait automatiquement dans votre admin.

<http://phantomjs.org/download.html>

En fonction de votre machine installez le paquet adéquat. Par exemple, sur une Ubuntu 64bits on part sur du classique depuis la doc officielle

{% highlight bash %}
$ wget https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-1.9.8-linux-x86_64.tar.bz2
$ bunzip2 *.bz2 && tar xf *.tar
{% endhighlight %}

Pour une Raspberry Pi partir là dessus : 
https://github.com/aeberhardo/phantomjs-linux-armv6l

{% highlight bash %}
$ cd /tmp
$ wget https://github.com/aeberhardo/phantomjs-linux-armv6l/archive/master.zip
$ unzip master.zip
$ cd phantomjs-linux-armv6l-master
$ bunzip2 *.bz2 && tar xf *.tar
{% endhighlight %}

Une fois décompressé, vous pouvez récupérer le fichier binaire et le rendre accessible à notre application.

@todo: Seulement donné à titre d'exemple mais surement pas ce qu'il y a de plus propre surtout si c'est pour une installation pérenne:

Création d'un lien symbolique dans le dossier local utilisé par npm pour ses installations de paquets pointant sur le binaire de PhantomJs :

{% highlight bash %}
~/local/bin $ ln -s ~/src/phantomjs-linux-armv6l-master/phantomjs-1.9.0-linux-armv6l/bin/phantomjs phantomjs
{% endhighlight %}


Tous les outils étant désormais installés et fonctionnels, vous devez décommenter la ligne `# DESIGNER = True` de votre fichier `config.py` pour que les fonctionnalités de theming de l'interface web soient disponibles. Vous devrez redémarrer l'application pour que les modifications prennent effet.

---


# Utilisation des outils front-end

__Compilation des fichiers .less en CSS et export vers les statics__

__Admin__

```
~/bullit $ grunt
```

La commande `grunt` par défaut est dédié aux fichiers statics de l'admin de l'application. Cette commande lance la compilation des fichiers LESS en CSS puis minifie ces fichiers et les exporte dans le dossier `static` principal. Une fois cette tache exécutée le script se mettra en mode `watch` et relancera la compilation à chaque modification des fichiers concernés sans que vous ayez à vous en occuper.

__Thèmes__

Pour lancer la compilation poncutelle de tous les thèmes, sans watcher :
```
~/bullit $ grunt compilethemes
```


Pour compiler un thème en particulier :
```
~/bullit $ grunt theme --theme=default
```

Cette commande va lancer la compilation d'un thème spécifique (le thème `default`). Sans lancer de watcher en fin d'exécution.

Pour lancer un watcher :
```
~/bullit $ grunt watch:themes
```
Attention, cette commande lancera la compilation systématique de tous les thèmes, et pas seulement de celui que vous venez de modifier


__Screenshot__

Pour faire une capture d'écran:
```
~/bullit $ grunt snap --url=http://X.X.X.X:8080/wall/<id_de_votre_wall> --theme=<nomtheme> --width=1920 --height=1080
```


