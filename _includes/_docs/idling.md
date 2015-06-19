### Idling 

Après une heure d'inactivité, votre application Heroku se mettra en sommeil. C'est normal (<https://blog.heroku.com/archives/2013/6/20/app_sleeping_on_heroku>)

Cela impacte actuellement les thèmes qui seront réinitialisés lorsque vous réveillerez votre application. Si vous avez édité votre thème lors de la session précédente il sera donc remis à zéro. Pour vous prémunir de cet effet indésirable vous pouvez vous tourner dans un premier temps vers des services comme Kaffeine (<https://blog.heroku.com/archives/2013/6/20/app_sleeping_on_heroku>) qui 'pingera' votre application à interval régulier.