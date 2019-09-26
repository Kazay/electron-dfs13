# Validation Electron DFS13 - Czaja Kevin

## Installation :

La lib gm requiert une installation de ImageMagick 6.x
> https://legacy.imagemagick.org/

Si votre version est ImageMagick 7.x+,
> https://imagemagick.org/

il faut modifier la ligne :

```
var fs = require('fs')
  , gm = require('gm').subClass({imageMagick: true});
```

par:

```
var fs = require('fs')
  , gm = require('gm').subClass({imageMagick: 7+});
```

Pour finir :
> npm install && npm start

## NB : 

Pour le moment, l'app ne fonctionne que sur des images au format paysage et carré, pas le format portrait.

Pas de border-radius ni de couleur de BG, prise en main compliquée de la lib gm mais les paramètres sont quand mêmes passés dans le main juste avant le rendu de l'image.
Avec une meilleure compréhension de la lib, on a donc les données prêtes pour avoir ces modifications.