---
layout: page-col
title: Bullit en local
description: Installation de Bullit pour une utilisation monoposte ou sur votre réseau local.
category: docs
permalink: /docs/install_local_rapide/
---

__Prérequis:__ [`Python et Virtualenv`]({{ "/docs/python/" | prepend: site.baseurl }}), [`MongoDB`]({{ "/docs/mongodb/" | prepend: site.baseurl }})

<p class="bg-info-box">
{{ page.description }}
</p>

---

{% include _docs/clone_repos.html %}

{% include _docs/env_install.md %}

## MongoDB

Vous avez la possibilité soit d'utiliser un service externe soit d'installer MongoDB sur votre machine locale. Dans les deux cas il faudra reporter l'uri de connexion au serveur MongoDB dans votre fichier de configuration à l'étape suivante

Plus d'info sur MongoDB dans [les paramètres de configuration]({{ "/docs/settings/#mongodb" | prepend: site.baseurl }}) et [la section MongoDB]({{ "/docs/mongodb/" | prepend: site.baseurl }})

---

{% include _docs/config.md %}

{% include _docs/start_app.md %}

## Ils sont où les Thèmes ?

Par défaut, Bullit n'est pas configuré en 'mode designer'. Vous n'aurez pas accès au menu `Thèmes` dans l'interface d'administration et ne pourrez créer ou modifier des thèmes que manuellement.

Pour bénéficier de l'interface d'admin, vous devrez tout d'abord configurer l'environnement de développement front-end. Voir doc [Mode Designer]({{ "/docs/frontend" | prepend: site.baseurl }})

