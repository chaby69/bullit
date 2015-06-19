## Réception des SMS par le serveur
<a name="config"></a>
Pour pouvoir recevoir des SMS l'adresse IP du serveur de votre application doit être accessible depuis une autre machine (LAN, serveur distant, Heroku, ...) Le grabber, quel qu'il soit, doit être en mesure d'envoyer les SMS reçus au serveur, cela ne pourra donc pas marcher avec une adresse IP du type `127.0.0.1`

Pour tester en local avec Werkzeug, vous devrez passer des paramètres au lanceur `run.py` et spécifier l'adresse IP et le port que vous désirez utiliser:

{% highlight bash %}
(env) ~/bullit $ python run.py -b 192.168.0.11
{% endhighlight %}

N'oubliez pas d'adapter le paramètre `__SERVER_CONFIG__` dans votre fichier de configuration en conséquence.