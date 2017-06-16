

Liste des états :

	Walking : 
		Le penguin marche vers le tableau suivant.
		Lorsqu'il atteind le tableau, il s'arrete devant et passe à l'était waiting.

	Waiting :
		Le penguin attend le joueur:
			- Si le joueur s'approche du penguin, il retourne dans l'était walking et va vers le tableau suivant.
			- Si le joueur met plus de 10 sec à s'approcher, le penguin passe dans l'état angry.
	
	Angry:
		Le penguin est énnervé, jusqu'à ce que le joueur s'approche.
		Lorsque que le joueur est proche du penguin, il retourne dans l'état walking et passe au tableau suivant.

	End:
		Lorsque le penguin atteint le dernier tableau, il passe dans l'état end et recommence à parcourir les tableaux.
