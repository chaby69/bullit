---
layout: page-col
title: Divers
description: Commandes diverses
categories: ['installation']
permalink: /docs/divers/
---

_en cours..._

### Fabric

Ces commandes vous permettent d'exporter certaines données de la base Mongo

Activer le env et se mettre à la racine du projet

__Lister les walls (Races) :__
```
(env) ~/bullit $ fab list_races
```

__Dump de tous les entrées de la collection `messages` :__ 

```
(env) ~/bullit $ fab export_all_messages
```

__Dump d'un wall et de ses messages :__ 

Avec passage de l'id de la Race en param
```
(env) ~/bullit $ fab export_race_messages:<_id_d_une_race>
```

__Création d'un compte administrateur :__

Lancez la commande Fabric suivante, puis saisissez vos login, password et email pour générer votre compte: 
```
(env) $ cd bullit
(env) ~/bullit $ fab register_admin
```
