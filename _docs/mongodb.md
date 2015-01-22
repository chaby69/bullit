---
layout: page-col
title: MongoDB
description: 
category: docs
permalink: /docs/mongodb/
---

## Installer MongoDB

Pour un Bullit "en local" ou sur un serveur dédié MongoDB peut être installé sur la machine en question sans trop de soucis:

- [OSX](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/)
- [Windows](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/)
- Linux ([Ubuntu](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/), [Debian](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-debian/), [Red Hat](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-red-hat-centos-or-fedora-linux/), [Autres](http://docs.mongodb.org/manual/tutorial/install-mongodb-on-linux/))

Pour une installation sur un serveur distant, votre base de donnée MongoDB peut avoir été installée par vos soins sur un serveur dédié mais vous pouvez aussi utiliser un des services partenaires proposés par Heroku comme MongoLab ou Compose.io.

Plus d'info sur MongoDB dans [les paramètres de configuration]({{ "/docs/settings/#mongodb" | prepend: site.baseurl }})

---

## Pourquoi MongoDB ?

MongoDB est une base de donnée documentaire NoSql rapide et évolutive. Ce qui veut dire pour Bullit qu'elle est idéale pour stocker des messages avec des référentiels différents très rapidement et de manière concurrentielle.

En gros, un tweet, un SMS ou un message provenant d'une Arduino n'ont pas les mêmes schémas de données. Ils pourront malgré tout être stockés indifférement dans la même collection et ceci sans collision en écriture dans la base de donnée si des événements ont lieu simultanément.

D'autre part, MongoDB est open-source