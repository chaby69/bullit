## Démarrage de l'application

A la racine de votre projet, avec l'environnement activé, lancez la commande suivante pour démarrer l'application :

{% highlight bash %}
(env) bullit/ $ python run.py
{% endhighlight %}

Vous pouvez vous rendre à l'adresse <http://127.0.0.1:8080> 

Au premier démarrage de l'application, vous pourrez créer le compte d'administration qui vous permettra de vous connecter à Bullit. Cliquez sur le bouton `Administrez vos walls` en haut à droite sur la page d'accueil, ou rendez-vous à l'adresse <http://127.0.0.1:8080/admin> 

@todo: lien vers la doc d'utilisation de Bullit
@todo: doc d'utilisation de Bullit :/

Cette solution conviendra si vous affichez vos walls depuis cette machine (avec un vidéo projecteur par exemple), mais vous ne pourrez pas accèder à Bullit depuis une autre machine.

Pour pouvoir accéder à Bullit sur le réseau local nous allons stopper l'application (Ctrl/C) et la relancer cette fois-ci en utilisant `Gunicorn` que nous avons déjà installé. Adaptez la ligne de commande ci-dessous pour que l'adresse IP corresponde à votre installation sur le réseau local:

{% highlight bash %}
(env) bullit/ $ gunicorn app:app --debug --worker-class=socketio.sgunicorn.GeventSocketIOWorker -t 5000 -b 192.168.X.X:8080
{% endhighlight %}

Maintenant depuis une autre machine vous pouvez ouvrir un navigateur sur cette adresse !

---