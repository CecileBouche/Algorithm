let app = {
  
  // Définition du nbre de lignes de la grille
  totalRow: 10,
  // Définition du nbre de colonnes de la grille
  totalCol: 10,
  // Initialisation de la case de départ
  startPointRow: 1,
  startPointCol: 1,
  // Initialisation de la case finale
  endPointRow: 1,
  endPointCol: 1,
  // Initialisation du curseur et de la direction
  cursorRow: 1,
  cursorCol: 1,
  cursorDir: "",

  init: function() {
    // Placement aléatoire de la case de départ
    app.startPointRow = app.getRandomStartRow(1, app.totalRow);
    app.startPointCol = app.getRandomStartCol(1, app.totalCol);
    // Placement aléatoire de la case finale
    app.endPointRow = app.getRandomEndRow(1, app.totalRow);
    app.endPointCol = app.getRandomEndCol(1, app.totalCol);
    // Placement du curseur sur la case de départ    
    app.cursorRow = app.startPointRow;
    app.cursorCol = app.startPointCol;
    app.cursorDir = "right";   
    // Affichage initial de la grille
    app.drawBoard();
    // Ajout d'un écouteur d'évènement sur le bouton "Lancer le script"
    document.querySelector("#launchScript").addEventListener('click', app.handleLaunchScriptButton);
  },
  
  getRandomStartRow(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min +1)) + min;
  },
    
  getRandomStartCol(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
  },
    
  getRandomEndRow(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
  },
    
  getRandomEndCol(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
  },

  drawBoard: function() {
    //* Définition du node DOM auquel accrocher les div row 
    let boardNode = document.getElementById("board");
    //! Première boucle avec pour chaque ligne, création d'une div avec classe = 'cellRow' et id = 'row' + n°itération
    for (let r = 1; r <= app.totalRow; r += 1) {
      // Création d'un élément de type div
      let rowDivElement = document.createElement("div");
      // Affectation de la classe 'cellRow' et d'un id 'row + n° row' à cet élément
      rowDivElement.className = "cellRow";
      let rowId = "row" + r;
      rowDivElement.id = rowId;
      // Accrochage de l'élément dans le DOM
      boardNode.appendChild(rowDivElement);
      // Définition du node DOM auquel accrocher les div col
      let rowDivNode = document.getElementById(rowId);
      //! Deuxième boucle avec pour chaque colonne, création d'une div avec classe = 'cell'
      for (let c = 1; c <= app.totalCol; c += 1) {
        // Création d'un élément de type div
        let colDivElement = document.createElement("div");
        // Affectation de la classe 'cell' à cet élément
        colDivElement.className = "cell";
        //! Affichage des cases de départ et d'arrivée
        // Si cette case est celle de départ alors ajout classe = cellStart
        if (r == app.startPointRow && c == app.startPointCol) {
          colDivElement.classList.add("cellStart");
        };
        // Si cette case est celle d'arrivée alors ajout classe = cellEnd
        if (r == app.endPointRow && c == app.endPointCol) {
          colDivElement.classList.add("cellEnd");
        };
        //! Affichage du curseur
        // Si le curseur est bien positionné à l'intérieur de la grille
        // ajout des classes permettant son affichage
        // sinon message d'alerte et arrêt script
        if(app.checkCursor(app.cursorRow, app.cursorCol)) {
        // Si cette case est celle du curseur alors
        // ajout des classes "cellCurrent" et "cellCurrent-direction"
          if (r == app.cursorRow && c == app.cursorCol) {
            colDivElement.classList.add("cellCurrent");
            //* Gestion de la direction du curseur
            // Si cursorDir = bottom alors ajout classe = cellCurrent-bottom
            if (app.cursorDir === "bottom") {
              colDivElement.classList.add("cellCurrent-bottom");
            };
            // Si cursorDir = right alors ajout classe = cellCurrent-right
            if (app.cursorDir === "right") {
              colDivElement.classList.add("cellCurrent-right");
            };
            // Si cursorDir = left alors ajout classe = cellCurrent-left
            if (app.cursorDir === "left") {
              colDivElement.classList.add("cellCurrent-left");
            };
            // Si cursorDir = top alors ajout classe = cellCurrent-top
            if (app.cursorDir === "top") {
              colDivElement.classList.add("cellCurrent-top");
            };
          };
          // Accrochage de l'élément dans le DOM
          rowDivNode.appendChild(colDivElement);
        }
        else {
          alert("Vous êtes sorti de la grille !")
          return;
        }
      }
    }
  },

  moveForward:function() {
    //* Si le curseur est orienté vers la droite => c++
    if (app.cursorDir === "right") {
      app.cursorCol += 1;
    }
    //* Si le curseur est orienté vers la bas => r++
    else if (app.cursorDir === "bottom") {
      app.cursorRow += 1;
    }
    //* Si le curseur est orienté vers la gauche => c--
    else if (app.cursorDir === "left") {
      app.cursorCol -= 1;
    }
    //* Si le curseur est orienté vers le haut => r--
    else if (app.cursorDir === "top") {
      app.cursorRow -= 1;
    }
  },

  turnRight:function() {
    //* Si le curseur est orienté vers la droite => "bottom"
    if (app.cursorDir === 'right') {
      app.cursorDir = "bottom";
    }
    //* Si le curseur est orienté vers le bas => "left"
    else if (app.cursorDir === 'bottom') {
      app.cursorDir = "left";
    }
    //* Si le curseur est orienté vers la gauche => "top"
    else if (app.cursorDir === 'left') {
      app.cursorDir = "top";
    }
    //* Si le curseur est orienté vers le haut => "right"
    else if (app.cursorDir === 'top') {
      app.cursorDir = "right";
    }
  },

  turnLeft:function() {
    //* Si le curseur est orienté vers le bas => "right"
    if (app.cursorDir === 'bottom') {
      app.cursorDir = "right";
    }
    //* Si le curseur est orienté vers la droite => "top"
    else if (app.cursorDir === 'right') {
      app.cursorDir = "top";
    }
    //* Si le curseur est orienté vers le haut => "left"
    else if (app.cursorDir === 'top') {
      app.cursorDir = "left";
    }
    //* Si le curseur est orienté vers la gauche => "bottom"
    else if (app.cursorDir === 'left') {
      app.cursorDir = "bottom";
    }
  },
  
  handleLaunchScriptButton: function() {
    // Récupération du code tapé par le joueur
    let codeLines = document.querySelector("#userCode").value.split("\n");
    window.setTimeout(function() {
      app.codeLineLoop(codeLines, 0);
    }, 2000);
  },

  codeLineLoop: function(codeLines, index) {
    // Récupération de la ligne de code
    let currentLine = codeLines[index];
    // Suppression de la grille existante
    let boardNode = document.getElementById("board");
    while (boardNode.firstChild) {
      boardNode.removeChild(boardNode.firstChild);
    }
    // Execution de la commande correspondante à la ligne de code
    if(currentLine === "move forward") {
      app.moveForward();
    } 
    else if (currentLine === "turn right") {
      app.turnRight();
    }
    else if (currentLine === "turn left") {
      app.turnLeft();
    } 
    else {
      alert('"' + currentLine + '" est une commande inconnue !');
      return app.drawBoard();
    } 
    // Affichage de la grille
    app.drawBoard();
    // Incrementation de l'index
    index++;
    // Si la ligne de code n'est pas la dernière du tableau
    // Rappel de la fonction
    // Sinon vérification de la position finale du curseur
    if (index < codeLines.length) {
      // Recall same method (=> make a loop)
      window.setTimeout(function() {
        app.codeLineLoop(codeLines, index);
      }, 1000);
    } else {
      window.setTimeout(function() {
        app.checkSuccess();
      }, 1000);
    }
  },

  checkSuccess: function() {
    // Si curseur sur case finale, message => 'you win' sinon 'you loose'
    if (app.cursorRow === app.endPointRow && app.cursorCol === app.endPointCol) {
      alert("You win !");
    } 
    else {
      alert("You loose !");
    }
    // Suppression de la grille existante
    let boardNode = document.getElementById("board");
    while (boardNode.firstChild) {
      boardNode.removeChild(boardNode.firstChild);
    }
    // Réaffichage de la grille de départ
    app.init();
    // Suppression du code tapé par le joueur
    document.querySelector("#userCode").value ="";
  },

  checkCursor(row, column) {
    // Vérification que le curseur est bien positionné dans la grille
    if (app.cursorRow < 1 || app.cursorRow > app.totalRow) {
      return false;
    }
    else if (app.cursorCol < 1 || app.cursorCol > app.totalCol) {
      return false;
    }
    else {
      return true;
    }
  }
};

document.addEventListener('DOMContentLoaded', app.init);
