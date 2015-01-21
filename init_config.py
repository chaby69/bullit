# -*- coding: utf-8 -*-
DEBUG = False
DESIGNER = False
PERMANENT_SESSION_LIFETIME = 86400
SESSION_REFRESH_EACH_REQUEST = False
UPLOAD_FOLDER = 'app/themes/'
ALLOWED_EXTENSIONS = set(['jpg','png']) 
APP_CONFIG = {
	'title': 'Bullit',
	'desc': "<p>Créez vos propres murs contributifs, gérez l'affichage temps réel de messages SMS et autres tweets sur de multiples supports: Vidéo-projection, TV connectée, Chromecast, appareils Android, et autres objets connectés (Arduino, SparkCore, ...)</p>\n\n<div class=\"well\">\n    <h1>Veuillez patienter, <small>un GM va vous prendre en main...</small></h1>\n    <p>Vous êtes dans une zone d'attente, veuillez patienter, un Gentil Modo va (peut-être) vous prendre en charge et vous rediriger vers un wall valide</p>\n</div>( si vous êtes le Gentil Modo, <a href=\"/admin/\">connectez-vous à votre dashboard</a>. )",
    'msg_pause': "<p>Le wall est en pause ...</p>\n\n<p><strong>Retrouvez-nous dès 12h !</strong></p>\n\n<p>Les messages envoyés pendant cette interruption n'apparaîtront pas, à plus tard !</p>",
    'modal': 'large',
    'bubble_timeout': 8,
    'retweet': 1
}

PUBLIC_CONFIG = {
    'title': 'Nom de votre wall',
    'desc': 'Description de votre wall',
    'hashtag': '',
    'steps': [],
    'status': 'stopped',
    'avatar': 1,
    'phone_number': 'Le 06 pour les SMS',
    'visible': 1,
    'theme': 'default'
}