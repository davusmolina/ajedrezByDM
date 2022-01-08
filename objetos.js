//import  main.js;
//Comprueba si un numero x esta en un rango dado

function range(x, min, max)
{
  return x>=min && x<=max;
}

//Determina la fila en la que esta el parametro de entrada
function determinarFila(px)
{
  if (range(px, 0, 7))
  {
    return 0;
  }
  else if (range(px, 8, 15))
  {
    return 1;
  }
  else if (range(px, 16, 23))
  {
    return 2;
  }
  else if (range(px, 24, 31))
  {
    return 3;
  }
  else if (range(px, 32, 39))
  {
    return 4;
  }
  else if (range(px, 40, 47))
  {
    return 5;
  }
  else if (range(px, 48, 55))
  {
    return 6;
  }
  else if (range(px, 56, 63))
  {
    return 7;
  }
}
//Determina la columna en la que esta el parametro de entrada
function determinarColumna(px)
{
  if (px==0 || px==8 || px==16 || px==24 || px==32 || px==40 || px==48 || px==56)
  {
    return 0;
  }
  else if (px==1 || px==9 || px==17 || px==25 || px==33 || px==41 || px==49 || px==57)
  {
    return 1;
  }
  else if (px==2 || px==10 || px==18 || px==26 || px==34 || px==42 || px==50 || px==58)
  {
    return 2;
  }
  else if (px==3 || px==11 || px==19 || px==27 || px==35 || px==43 || px==51 || px==59)
  {
    return 3;
  }
  else if (px==4 || px==12 || px==20 || px==28 || px==36 || px==44 || px==52 || px==60)
  {
    return 4;
  }
  else if (px==5 || px==13 || px==21 || px==29 || px==37 || px==45 || px==53 || px==61)
  {
    return 5;
  }
  else if (px==6 || px==14 || px==22 || px==30 || px==38 || px==46 || px==54 || px==62)
  {
    return 6;
  }
  else if (px==7 || px==15 || px==23 || px==31 || px==39 || px==47 || px==55 || px==63)
  {
    return 7;
  }
}
//Obtiene las casillas de la tabla
var nodos =document.getElementsByTagName("td");

//crea las variables universales que van cambiando por cada movimiento
var seleccion = 0;
var posicionI;
var posicionF;
var turno = 0;

function crearCapaSeleccion() 
{
  var imagen= document.createElement("p");
  imagen.style.backgroundColor = "black";
  imagen.textContent = "hpñña"
  imagen.style.gridColumn = " 1";
  imagen.style.gridRow = " 1";
  // imagen.style.opacity = "1";
  // imagen.style.position = absolute;
  return imagen;
}
nodos[0].appendChild(crearCapaSeleccion());
//Verifica si hay alguna pieza en medio de la posicion i y la posicion f
function comprobarPiezaArriba(nI)
{
  var idNi=nodos[nI].getAttribute("id");
  var alFrente = nI;
  for (var i = 0; i < 8; i++)
  {
    alFrente +=8;
    if (alFrente<64 && isNaN(nodos[alFrente].getAttribute("id")) && verificarColor(nodos[alFrente].getAttribute("id"))==verificarColor(idNi))
    {
      return alFrente;
    }
    else if (alFrente<64 && isNaN(nodos[alFrente].getAttribute("id")) && verificarColor(nodos[alFrente].getAttribute("id"))!=verificarColor(idNi))
    {
      alFrente=alFrente+8;
      return alFrente;
    }
  }
}
function comprobarPiezaAbajo(nI)
{
  var idNi=nodos[nI].getAttribute("id");
  var abajo = nI;
  for (var i = 0; i < 8; i++)
  {
    abajo -=8;
    if (abajo>=0 && isNaN(nodos[abajo].getAttribute("id")) && verificarColor(nodos[abajo].getAttribute("id"))==verificarColor(idNi))
    {
      return abajo;
    }
    else if (abajo>7 && isNaN(nodos[abajo].getAttribute("id")) && verificarColor(nodos[abajo].getAttribute("id"))!=verificarColor(idNi))
    {
      abajo=abajo-8;
      return abajo;
    }
  }
}
function comprobarPiezaIzquierda(nI)
{
  var idNi=nodos[nI].getAttribute("id");
  var izquierda = nI;
  var fila=determinarFila(nI);
  for (var i = 0; i < 8; i++)
  {
    izquierda -=1;
    if (izquierda>=0 && isNaN(nodos[izquierda].getAttribute("id")) && determinarFila(izquierda)==fila&& verificarColor(nodos[izquierda].getAttribute("id"))==verificarColor(idNi))
    {
      return izquierda;
    }
    else if (izquierda>=0 && isNaN(nodos[izquierda].getAttribute("id")) && determinarFila(izquierda)==fila && verificarColor(nodos[izquierda].getAttribute("id"))!=verificarColor(idNi))
    {
      return izquierda-1;
    }
  }
}
function comprobarPiezaDerecha(nI)
{
  var idNi=nodos[nI].getAttribute("id");
  var derecha = nI;
  var fila=determinarFila(nI);
  for (var i = 0; i < 8; i++)
  {
    derecha +=1;
    if (derecha<64 && isNaN(nodos[derecha].getAttribute("id")) && determinarFila(derecha)==fila && verificarColor(nodos[derecha].getAttribute("id"))==verificarColor(idNi))
    {
      return derecha;
    }
    else if (derecha<64 && isNaN(nodos[derecha].getAttribute("id")) && determinarFila(derecha)==fila && verificarColor(nodos[derecha].getAttribute("id"))!=verificarColor(idNi))
    {
      return derecha+1;
    }

  }
}
function comprobarPiezaDiagonalAbajoIz(nI)
{
  var diagonalAbajo = nI;
  var fila=determinarFila(nI);
  for (var i = 0; i < 8; i++)
  {
    diagonalAbajo -=9;
    if ( diagonalAbajo<64 && diagonalAbajo>=0 && isNaN(nodos[diagonalAbajo].getAttribute("id")) && verificarColor(nodos[diagonalAbajo].getAttribute("id"))==verificarColor(nodos[nI].getAttribute("id")))
    {
      return diagonalAbajo;
    }
    else if (diagonalAbajo<64 && diagonalAbajo>=9 && isNaN(nodos[diagonalAbajo].getAttribute("id")) && verificarColor(nodos[diagonalAbajo].getAttribute("id"))!=verificarColor(nodos[nI].getAttribute("id")))
    {
      diagonalAbajo-=9;
      return diagonalAbajo;
    }
  }
}
function comprobarPiezaDiagonalAbajoDe(nI)
{
  var diagonalAbajo = nI;
  var fila=determinarFila(nI);
  for (var i = 0; i < 8; i++)
  {
    diagonalAbajo -=7;
    if ( diagonalAbajo<64 && diagonalAbajo>=0 && isNaN(nodos[diagonalAbajo].getAttribute("id")) && verificarColor(nodos[diagonalAbajo].getAttribute("id"))==verificarColor(nodos[nI].getAttribute("id")))
    {
      return diagonalAbajo;
    }
    else if ( diagonalAbajo<64 && diagonalAbajo>=0 && isNaN(nodos[diagonalAbajo].getAttribute("id")) && verificarColor(nodos[diagonalAbajo].getAttribute("id"))!=verificarColor(nodos[nI].getAttribute("id")))
    {
      diagonalAbajo-=7;
      return diagonalAbajo;
    }
  }
}
function comprobarPiezaDiagonalArribaIz(nI)
{
  var diagonalAbajo = nI;
  var fila=determinarFila(nI);
  for (var i = 0; i < 8; i++)
  {
    diagonalAbajo +=7;
    if ( diagonalAbajo<64 && diagonalAbajo>=0 && isNaN(nodos[diagonalAbajo].getAttribute("id")) && verificarColor(nodos[diagonalAbajo].getAttribute("id"))==verificarColor(nodos[nI].getAttribute("id")))
    {
      return diagonalAbajo;
    }
    else if ( diagonalAbajo<64 && diagonalAbajo>=0 && isNaN(nodos[diagonalAbajo].getAttribute("id")) && verificarColor(nodos[diagonalAbajo].getAttribute("id"))!=verificarColor(nodos[nI].getAttribute("id")))
    {
      diagonalAbajo+=7;
      return diagonalAbajo;
    }
  }
}
function comprobarPiezaDiagonalArribaDe(nI)
{
  var diagonalAbajo = nI;
  var fila=determinarFila(nI);
  for (var i = 0; i < 8; i++)
  {
    diagonalAbajo +=9;
    if ( diagonalAbajo<64 && diagonalAbajo>=0 && isNaN(nodos[diagonalAbajo].getAttribute("id")) && verificarColor(nodos[diagonalAbajo].getAttribute("id"))==verificarColor(nodos[nI].getAttribute("id")))
    {
      console.log("hay uno en la diagonal arriba derecha: " + diagonalAbajo);
      return diagonalAbajo;
    }
    else if ( diagonalAbajo<64 && diagonalAbajo>=0 && isNaN(nodos[diagonalAbajo].getAttribute("id")) && verificarColor(nodos[diagonalAbajo].getAttribute("id"))!=verificarColor(nodos[nI].getAttribute("id")))
    {
      diagonalAbajo+=9;
      console.log("hay uno en la diagonal arriba derecha 2: " + diagonalAbajo);
      return diagonalAbajo;
    }
  }
}
// nodos[62].appendChild(nuevaCapa);
function casillasInfluenciaDiagonales(colorInfluencia, atributo, colorRey, llamadoPorRey, posF)
{
    //Si el llamado a la funcion lo hace el rey entonces la posicion desde la que empieza a asignar influencia seria la posF
    var piezaDiaAbajoDerF  = posF;
    var piezaDiaAbajoIzqF = posF;
    var piezaDiaArribaDerF = posF;
    var piezaDiaArribaIzqF = posF;
    var piezaDiaAbajoDerI  = posicionI;
    var piezaDiaAbajoIzqI = posicionI;
    var piezaDiaArribaDerI = posicionI;
    var piezaDiaArribaIzqI = posicionI;

    var noMasBDi= 0;
    var noMasBIi= 0;
    var noMasADi= 0;
    var noMasAIi= 0;
    if (llamadoPorRey==false)
    {
      //Si el llamado a la funcion lo hace una pieza distinta al rey entonces la posicion desde la que empieza a asignar influencia seria la posicionF
      var piezaDiaAbajoDerF  = posicionF;
      var piezaDiaAbajoIzqF = posicionF;
      var piezaDiaArribaDerF = posicionF;
      var piezaDiaArribaIzqF = posicionF;

      for (var i = 0; i < 8; i++)
      {
        //quitar influencua
        if (piezaDiaAbajoDerI>6 && noMasBDi==0)
        {
          var filaI= determinarFila(piezaDiaAbajoDerI);
          var columnaI= determinarColumna(piezaDiaAbajoDerI);
          piezaDiaAbajoDerI-=7;
          var columnaF= determinarColumna(piezaDiaAbajoDerI);
          var filaF= determinarFila(piezaDiaAbajoDerI);
          if (filaI-filaF == columnaF-columnaI)
          {
            if (isNaN(nodos[piezaDiaAbajoDerI].getAttribute("id")))
            {
              nodos[piezaDiaAbajoDerI].setAttribute(atributo, "sinInfluencia");
              noMasBDi=1;
            }
            else
            {
              nodos[piezaDiaAbajoDerI].setAttribute(atributo, "sinInfluencia");
            }
          }

        }
        if (piezaDiaAbajoIzqI>8 && noMasBIi==0)
        {
          var filaI= determinarFila(piezaDiaAbajoIzqI);
          var columnaI= determinarColumna(piezaDiaAbajoIzqI);
          piezaDiaAbajoIzqI-=9;
          var columnaF= determinarColumna(piezaDiaAbajoIzqI);
          var filaF= determinarFila(piezaDiaAbajoIzqI);
          if (filaI-columnaI==filaF-columnaF)
          {
            if (isNaN(nodos[piezaDiaAbajoIzqI].getAttribute("id")))
            {
              nodos[piezaDiaAbajoIzqI].setAttribute(atributo, "sinInfluencia");
              noMasBIi=1;
              console.log("quito influencia y salio");
            }
            else
            {
              console.log("quito influencia ");
              nodos[piezaDiaAbajoIzqI].setAttribute(atributo, "sinInfluencia");
            }
          }
        }

        if (piezaDiaArribaDerI<55 &&  noMasADi==0)
        {
          var filaI= determinarFila(piezaDiaArribaDerI);
          var columnaI= determinarColumna(piezaDiaArribaDerI);
          piezaDiaArribaDerI+=9;
          var columnaF= determinarColumna(piezaDiaArribaDerI);
          var filaF= determinarFila(piezaDiaArribaDerI);
          if (filaF-filaI == columnaF-columnaI)
          {
            if (isNaN(nodos[piezaDiaArribaDerI].getAttribute("id")))
            {
              nodos[piezaDiaArribaDerI].setAttribute(atributo, "sinInfluencia");
              noMasADi=1;
            }
            else
            {
              nodos[piezaDiaArribaDerI].setAttribute(atributo, "sinInfluencia");
            }
          }
        }

        if (piezaDiaArribaIzqI<57 && noMasAIi==0 )
        {
          var filaI= determinarFila(piezaDiaArribaIzqI);
          var columnaI= determinarColumna(piezaDiaArribaIzqI);
          piezaDiaArribaIzqI+= 7;
          var columnaF= determinarColumna(piezaDiaArribaIzqI);
          var filaF= determinarFila(piezaDiaArribaIzqI);
          if (filaF-filaI==columnaI-columnaF)
          {
            if (isNaN(nodos[piezaDiaArribaIzqI].getAttribute("id")))
            {
              nodos[piezaDiaArribaIzqI].setAttribute(atributo, "sinInfluencia");
              noMasAIi=1;
            }
            else
            {
              nodos[piezaDiaArribaIzqI].setAttribute(atributo, "sinInfluencia");
            }
          }
        }
      }
    }
    // {// for (var i = 0; i < 8; i++)
    // {
    //   //quitar influencua
    //   if (piezaArribaI<56 && noMasAi==0)
    //   {
    //     piezaArribaI+=8;
    //     if (isNaN(nodos[piezaArribaI].getAttribute("id")))
    //     {
    //       nodos[piezaArribaI].setAttribute(atributo, "sinInfluencia");
    //       noMasAii=1;
    //     }
    //     else
    //     {
    //       nodos[piezaArribaI].setAttribute(atributo, "sinInfluencia");
    //     }
    //   }
    //   if (piezaAbajoI>7 && noMasBi==0)
    //   {
    //     piezaAbajoF-=8;
    //     if (isNaN(nodos[piezaAbajoI].getAttribute("id")))
    //     {
    //       nodos[piezaAbajoI].setAttribute(atributo, "sinInfluencia");
    //       noMasBi=1;
    //     }
    //     else
    //     {
    //       nodos[piezaAbajoI].setAttribute(atributo, "sinInfluencia");
    //     }
    //   }
    //
    //   if (piezaDerechaI<63 && filaI==determinarFila(piezaDerechaI) && noMasDi==0)
    //   {
    //     piezaDerechaI+=1;
    //     if (isNaN(nodos[piezaDerechaI].getAttribute("id")))
    //     {
    //       nodos[piezaDerechaI].setAttribute(atributo, "sinInfluencia");
    //       noMasDi=1;
    //     }
    //     else
    //     {
    //       nodos[piezaDerechaI].setAttribute(atributo, "sinInfluencia");
    //     }
    //   }
    //
    //   if (piezaIzquierdaI>0 && filaI==determinarFila(piezaIzquierdaI) && noMasIi==0)
    //   {
    //
    //     piezaIzquierdaI-= 1;
    //     if (isNaN(nodos[piezaIzquierdaI].getAttribute("id")))
    //     {
    //       nodos[piezaIzquierdaI].setAttribute(atributo, "sinInfluencia");
    //
    //       noMasIi=1;
    //     }
    //     else
    //     {
    //       nodos[piezaIzquierdaI].setAttribute(atributo, "sinInfluencia");
    //     }
    //   }
    //
  // }

    var noMasBDF= 0;
    var noMasBIF= 0;
    var noMasADF= 0;
    var noMasAIF= 0;
    for (var i = 0; i < 8; i++)
    {
      //ponerinfluencua
      if (piezaDiaAbajoDerF>6 && noMasBDF==0)
      {
        var filaI= determinarFila(piezaDiaAbajoDerF);
        var columnaI= determinarColumna(piezaDiaAbajoDerF);
        piezaDiaAbajoDerF-=7;
        var columnaF= determinarColumna(piezaDiaAbajoDerF);
        var filaF= determinarFila(piezaDiaAbajoDerF);
        if (filaI-filaF == columnaF-columnaI)
        {
          if (isNaN(nodos[piezaDiaAbajoDerF].getAttribute("id")))
          {
            nodos[piezaDiaAbajoDerF].setAttribute(atributo, colorInfluencia);
            noMasBDF=1;
          }
          else
          {
            nodos[piezaDiaAbajoDerF].setAttribute(atributo, colorInfluencia);
          }
        }

      }
      if (piezaDiaAbajoIzqF>8 && noMasBIF==0)
      {
        var filaI= determinarFila(piezaDiaAbajoIzqF);
        var columnaI= determinarColumna(piezaDiaAbajoIzqF);
        piezaDiaAbajoIzqF-=9;
        var columnaF= determinarColumna(piezaDiaAbajoIzqF);
        var filaF= determinarFila(piezaDiaAbajoIzqF);
        if (filaI-columnaI==filaF-columnaF)
        {
          if (isNaN(nodos[piezaDiaAbajoIzqF].getAttribute("id")))
          {
            nodos[piezaDiaAbajoIzqF].setAttribute(atributo, colorInfluencia);
            noMasBIF=1;
          }
          else
          {
            nodos[piezaDiaAbajoIzqF].setAttribute(atributo, colorInfluencia);
          }
        }
      }

      if (piezaDiaArribaDerF<55 &&  noMasADF==0)
      {
        var filaI= determinarFila(piezaDiaArribaDerF);
        var columnaI= determinarColumna(piezaDiaArribaDerF);
        piezaDiaArribaDerF+=9;
        var columnaF= determinarColumna(piezaDiaArribaDerF);
        var filaF= determinarFila(piezaDiaArribaDerF);
        if (filaF-filaI == columnaF-columnaI)
        {
          if (isNaN(nodos[piezaDiaArribaDerF].getAttribute("id")))
          {
            nodos[piezaDiaArribaDerF].setAttribute(atributo, colorInfluencia);
            noMasADF=1;
          }
          else
          {
            nodos[piezaDiaArribaDerF].setAttribute(atributo, colorInfluencia);
          }
        }
      }

      if (piezaDiaArribaIzqF<57 && noMasAIF==0 )
      {
        var filaI= determinarFila(piezaDiaArribaIzqF);
        var columnaI= determinarColumna(piezaDiaArribaIzqF);
        piezaDiaArribaIzqF+= 7;
        var columnaF= determinarColumna(piezaDiaArribaIzqF);
        var filaF= determinarFila(piezaDiaArribaIzqF);
        if (filaF-filaI==columnaI-columnaF)
        {
          if (isNaN(nodos[piezaDiaArribaIzqF].getAttribute("id")))
          {
            nodos[piezaDiaArribaIzqF].setAttribute(atributo, colorInfluencia);
            noMasAIF=1;
          }
          else
          {
            nodos[piezaDiaArribaIzqF].setAttribute(atributo, colorInfluencia);
          }
        }
      }
    }
  }

function casillasInfluenciaLatVer( colorInfluencia, atributo, colorRey, llamadoPorRey, posF)
{
  //Si el llamado a la funcion lo hace el rey entonces la posicion desde la que empieza a asignar influencia seria la posF
  var piezaAbajoF  = posF;
  var piezaDerechaF = posF;
  var piezaArribaF = posF;
  var piezaIzquierdaF = posF;
  var piezaAbajoI  = posicionI-8;
  var piezaDerechaI = posicionI+1;
  var piezaArribaI = posicionI+8;
  var piezaIzquierdaI = posicionI-1;
  var filaI=determinarFila(posicionI);
  var filaF=determinarFila(posicionF);

  var noMasDi= 0;
  var noMasIi= 0;
  var noMasAi= 0;
  var noMasBi= 0;
  if (llamadoPorRey==false)
  {
    //Si el llamado a la funcion lo hace una pieza distinta al rey entonces la posicion desde la que empieza a asignar influencia seria la posicionF
    var piezaAbajoF  = posicionF-8;
    var piezaDerechaF = posicionF+1;
    var piezaArribaF = posicionF+8;
    var piezaIzquierdaF = posicionF-1;
    for (var i = 0; i < 8; i++)
    {
      //quitar influencua
      if (piezaArribaI<56 && noMasAi==0)
      {
        piezaArribaI+=8;
        if (isNaN(nodos[piezaArribaI].getAttribute("id")))
        {
          nodos[piezaArribaI].setAttribute(atributo, "sinInfluencia");
          noMasAi=1;
        }
        else
        {
          nodos[piezaArribaI].setAttribute(atributo, "sinInfluencia");
        }
      }
      if (piezaAbajoI>7 && noMasBi==0)
      {
        piezaAbajoF-=8;
        if (isNaN(nodos[piezaAbajoI].getAttribute("id")))
        {
          nodos[piezaAbajoI].setAttribute(atributo, "sinInfluencia");
          noMasBi=1;
        }
        else
        {
          nodos[piezaAbajoI].setAttribute(atributo, "sinInfluencia");
        }
      }

      if (piezaDerechaI<63 && filaI==determinarFila(piezaDerechaI) && noMasDi==0)
      {
        piezaDerechaI+=1;
        if (isNaN(nodos[piezaDerechaI].getAttribute("id")))
        {
          nodos[piezaDerechaI].setAttribute(atributo, "sinInfluencia");
          noMasDi=1;
        }
        else
        {
          nodos[piezaDerechaI].setAttribute(atributo, "sinInfluencia");
        }
      }

      if (piezaIzquierdaI>0 && filaI==determinarFila(piezaIzquierdaI) && noMasIi==0)
      {

        piezaIzquierdaI-= 1;
        if (isNaN(nodos[piezaIzquierdaI].getAttribute("id")))
        {
          nodos[piezaIzquierdaI].setAttribute(atributo, "sinInfluencia");

          noMasIi=1;
        }
        else
        {
          nodos[piezaIzquierdaI].setAttribute(atributo, "sinInfluencia");
        }
      }
    }
  }
  // for (var i = 0; i < 8; i++)
  // {
  //   //quitar influencua
  //   if (piezaArribaI<56 && noMasAi==0)
  //   {
  //     piezaArribaI+=8;
  //     if (isNaN(nodos[piezaArribaI].getAttribute("id")))
  //     {
  //       nodos[piezaArribaI].setAttribute(atributo, "sinInfluencia");
  //       noMasAii=1;
  //     }
  //     else
  //     {
  //       nodos[piezaArribaI].setAttribute(atributo, "sinInfluencia");
  //     }
  //   }
  //   if (piezaAbajoI>7 && noMasBi==0)
  //   {
  //     piezaAbajoF-=8;
  //     if (isNaN(nodos[piezaAbajoI].getAttribute("id")))
  //     {
  //       nodos[piezaAbajoI].setAttribute(atributo, "sinInfluencia");
  //       noMasBi=1;
  //     }
  //     else
  //     {
  //       nodos[piezaAbajoI].setAttribute(atributo, "sinInfluencia");
  //     }
  //   }
  //
  //   if (piezaDerechaI<63 && filaI==determinarFila(piezaDerechaI) && noMasDi==0)
  //   {
  //     piezaDerechaI+=1;
  //     if (isNaN(nodos[piezaDerechaI].getAttribute("id")))
  //     {
  //       nodos[piezaDerechaI].setAttribute(atributo, "sinInfluencia");
  //       noMasDi=1;
  //     }
  //     else
  //     {
  //       nodos[piezaDerechaI].setAttribute(atributo, "sinInfluencia");
  //     }
  //   }
  //
  //   if (piezaIzquierdaI>0 && filaI==determinarFila(piezaIzquierdaI) && noMasIi==0)
  //   {
  //
  //     piezaIzquierdaI-= 1;
  //     if (isNaN(nodos[piezaIzquierdaI].getAttribute("id")))
  //     {
  //       nodos[piezaIzquierdaI].setAttribute(atributo, "sinInfluencia");
  //
  //       noMasIi=1;
  //     }
  //     else
  //     {
  //       nodos[piezaIzquierdaI].setAttribute(atributo, "sinInfluencia");
  //     }
  //   }
  // }

  var noMasD= 0;
  var noMasI= 0;
  var noMasA= 0;
  var noMasB= 0;
  for (var i = 0; i < 8; i++)
  {
    //Poner influencia
    if (piezaArribaF<56 && noMasA==0)
    {
      piezaArribaF+=8;
      if (isNaN(nodos[piezaArribaF].getAttribute("id")) && (nodos[piezaArribaF].getAttribute("id")).includes(colorRey)==false)
      {
        nodos[piezaArribaF].setAttribute(atributo, colorInfluencia);
        noMasA=1;
      }
      else
      {
        nodos[piezaArribaF].setAttribute(atributo, colorInfluencia);
      }
    }
    if (piezaAbajoF>7 && noMasB==0)
    {
      piezaAbajoF-=8;
      if (isNaN(nodos[piezaAbajoF].getAttribute("id"))&& (nodos[piezaAbajoF].getAttribute("id")).includes(colorRey)==false)
      {
        nodos[piezaAbajoF].setAttribute(atributo, colorInfluencia);
        noMasB=1;
      }
      else
      {
        nodos[piezaAbajoF].setAttribute(atributo, colorInfluencia);
      }
    }

    if (piezaDerechaF<63 && filaF==determinarFila(piezaDerechaF) && noMasD==0)
    {

      piezaDerechaF+=1;
      if (isNaN(nodos[piezaDerechaF].getAttribute("id"))&& (nodos[piezaDerechaF].getAttribute("id")).includes(colorRey)==false)
      {
        nodos[piezaDerechaF].setAttribute(atributo, colorInfluencia);
        noMasD=1;
      }
      else
      {
        nodos[piezaDerechaF].setAttribute(atributo, colorInfluencia);
      }
    }

    if (piezaIzquierdaF>0 && filaF==determinarFila(piezaIzquierdaF) && noMasI==0)
    {

      piezaIzquierdaF-= 1;
      if (isNaN(nodos[piezaIzquierdaF].getAttribute("id"))&& (nodos[piezaIzquierdaF].getAttribute("id")).includes(colorRey)==false)
      {
        nodos[piezaIzquierdaF].setAttribute(atributo, colorInfluencia);
        noMasI=1;
      }
      else
      {
        nodos[piezaIzquierdaF].setAttribute(atributo, colorInfluencia);
      }
    }
  }
}

//Añade escuchadores de evento que por cada click activan la funcion de obtenerPocision
{
nodos[0].onclick = function() {obtenerPocision(0);}
nodos[1].onclick = function() {obtenerPocision(1);}
nodos[2].onclick = function() {obtenerPocision(2);}
nodos[3].onclick = function() {obtenerPocision(3);}
nodos[4].onclick = function() {obtenerPocision(4);}
nodos[5].onclick = function() {obtenerPocision(5);}
nodos[6].onclick = function() {obtenerPocision(6);}
nodos[7].onclick = function() {obtenerPocision(7);}
nodos[8].onclick = function() {obtenerPocision(8);}
nodos[9].onclick = function() {obtenerPocision(9);}
nodos[10].onclick = function() {obtenerPocision(10);}
nodos[11].onclick = function() {obtenerPocision(11);}
nodos[12].onclick = function() {obtenerPocision(12);}
nodos[13].onclick = function() {obtenerPocision(13);}
nodos[14].onclick = function() {obtenerPocision(14);}
nodos[15].onclick = function() {obtenerPocision(15);}
nodos[16].onclick = function() {obtenerPocision(16);}
nodos[17].onclick = function() {obtenerPocision(17);}
nodos[18].onclick = function() {obtenerPocision(18);}
nodos[19].onclick = function() {obtenerPocision(19);}
nodos[20].onclick = function() {obtenerPocision(20);}
nodos[21].onclick = function() {obtenerPocision(21);}
nodos[22].onclick = function() {obtenerPocision(22);}
nodos[23].onclick = function() {obtenerPocision(23);}
nodos[24].onclick = function() {obtenerPocision(24);}
nodos[25].onclick = function() {obtenerPocision(25);}
nodos[26].onclick = function() {obtenerPocision(26);}
nodos[27].onclick = function() {obtenerPocision(27);}
nodos[28].onclick = function() {obtenerPocision(28);}
nodos[29].onclick = function() {obtenerPocision(29);}
nodos[30].onclick = function() {obtenerPocision(30);}
nodos[31].onclick = function() {obtenerPocision(31);}
nodos[32].onclick = function() {obtenerPocision(32);}
nodos[33].onclick = function() {obtenerPocision(33);}
nodos[34].onclick = function() {obtenerPocision(34);}
nodos[35].onclick = function() {obtenerPocision(35);}
nodos[36].onclick = function() {obtenerPocision(36);}
nodos[37].onclick = function() {obtenerPocision(37);}
nodos[38].onclick = function() {obtenerPocision(38);}
nodos[39].onclick = function() {obtenerPocision(39);}
nodos[40].onclick = function() {obtenerPocision(40);}
nodos[41].onclick = function() {obtenerPocision(41);}
nodos[42].onclick = function() {obtenerPocision(42);}
nodos[43].onclick = function() {obtenerPocision(43);}
nodos[44].onclick = function() {obtenerPocision(44);}
nodos[45].onclick = function() {obtenerPocision(45);}
nodos[46].onclick = function() {obtenerPocision(46);}
nodos[47].onclick = function() {obtenerPocision(47);}
nodos[48].onclick = function() {obtenerPocision(48);}
nodos[49].onclick = function() {obtenerPocision(49);}
nodos[50].onclick = function() {obtenerPocision(50);}
nodos[51].onclick = function() {obtenerPocision(51);}
nodos[52].onclick = function() {obtenerPocision(52);}
nodos[53].onclick = function() {obtenerPocision(53);}
nodos[54].onclick = function() {obtenerPocision(54);}
nodos[55].onclick = function() {obtenerPocision(55);}
nodos[56].onclick = function() {obtenerPocision(56);}
nodos[57].onclick = function() {obtenerPocision(57);}
nodos[58].onclick = function() {obtenerPocision(58);}
nodos[59].onclick = function() {obtenerPocision(59);}
nodos[60].onclick = function() {obtenerPocision(60);}
nodos[61].onclick = function() {obtenerPocision(61);}
nodos[62].onclick = function() {obtenerPocision(62);}
nodos[63].onclick = function() {obtenerPocision(63);}
}

function moverG(ni, nf, pieza, trn, boleano)
{
  //Verifica si la casilla esta vacia o ocupada
  var idNf=nodos[nf].getAttribute("id");
  if(isNaN(idNf))
  {
    //Este es el caso en el que la casilla final esta ocupada
    if (verificarColor(idNf)==boleano)
    {
      //Este es en el caso en el que la posicion final esta ocupada por una pieza del mismo color
      return;
    }
    else
    {
      //Este es en el caso en el que la posicion final esta ocupada por una pieza de color distinto
      if (nodos[nf].getAttribute("id").includes("rey"))
      {
        return ;
      }
      else
      {
        var nodoHijo = nodos[ni].childNodes;
        nodos[ni].removeChild(nodoHijo[1]);
        var nodoHijo = nodos[nf].childNodes;
        nodos[nf].removeChild(nodoHijo[1]);
        nodos[nf].appendChild(crearPieza(pieza));
        nodos[ni].setAttribute("id", ni);
        nodos[nf].setAttribute("id", pieza);

        turno=trn;
      }
    }
  }
  else
  {
    //Este es el caso en que la casilla final esta vacia
    var nodoHijo = nodos[ni].childNodes;
    nodos[ni].removeChild(nodoHijo[1]);
    nodos[ni].setAttribute("id", ni);
    nodos[nf].appendChild(crearPieza(pieza));
    nodos[nf].setAttribute("id", pieza);
    turno=trn;
  }
}
//Obtiene la posicion inicial y la posicion final de donde se clickeo
//Ademas activa la funcion de mover segun el id de la imagen.

function obtenerPocision(j)
  {
    console.log(j);
    if(seleccion==0)
    {
      if (isNaN(nodos[j].getAttribute("id")))
      {
        console.log("posicionI es " + j);
        posicionI = j;
        seleccion = 1;
        nodos[posicionI].appendChild(crearCapaSeleccion);
      }
    }
    else if(seleccion==1)
    {
      console.log("posicionF es " + j);
      posicionF = j;
      seleccion=0;

      var idPosIni = nodos[posicionI].getAttribute("id");
      var filaI= determinarFila(posicionI);
      var filaF= determinarFila(posicionF);
      var columnaI= determinarColumna(posicionI);
      var columnaF= determinarColumna(posicionF);

      if((idPosIni=="reyBlanco.png" && turno==0) || (idPosIni=="reyNegro.png" && turno==1))
      {
        for (var i = 0; i < 64; i++)
        {
          if (nodos[i].getAttribute("id") == "torreNegra.png")
          {
            casillasInfluenciaLatVer("influenciaNegra", "name", "reyBlanco.png", true, i);
          }
          else if (nodos[i].getAttribute("id") == "damaNegra.png")
          {
            casillasInfluenciaDiagonales("influenciaNegra", "name", "reyBlanco.png", true, i);
            casillasInfluenciaLatVer("influenciaNegra", "name", "reyBlanco.png", true, i);
          }
          else if (nodos[i].getAttribute("id") == "torreBlanca.png")
          {
            casillasInfluenciaLatVer("influenciaBlanca", "class", "reyNegro.png", true, i);
          }
          else if (nodos[i].getAttribute("id") == "damaBlanca.png")
          {
            casillasInfluenciaDiagonales("influenciaBlanca", "class", "reyNegro.png", true, i);
            casillasInfluenciaLatVer("influenciaBlanca", "class", "reyNegro.png", true, i);
          }
          else if (nodos[i].getAttribute("id") =="peonNegro.png" || nodos[i].getAttribute("id") == "peonBlanco.png" )
          {
            if (nodos[i].getAttribute("id") =="peonNegro.png")
            {
              peon.casillasInfluenciaPeon("Negro", true, i);
            }
            if (nodos[i].getAttribute("id") == "peonBlanco.png")
            {
              peon.casillasInfluenciaPeon("Blanco", true, i);
            }
          }
        }
        console.log("la class: " + nodos[posicionF].getAttribute("class") + " y name es: "+ nodos[posicionF].getAttribute("name"));

        if ( idPosIni=="reyBlanco.png" && nodos[posicionF].getAttribute("name")=="influenciaNegra")
        {
          return ;
        }
        else if ( idPosIni=="reyNegro.png" && nodos[posicionF].getAttribute("class")=="influenciaBlanca")
        {
          return ;
        }
        else if (posicionF==62 && nodos[61].getAttribute("id")==61 && nodos[62].getAttribute("id")==62 && torre.movidaBlaDer==0 && rey.movidoB==0)
        {
          //enroque corto blancas
          rey.mover(posicionI, posicionF);
          var nodoHijo = nodos[63].childNodes;
          nodos[63].removeChild(nodoHijo[1]);
          torre.mostrarB(61);
          nodos[63].setAttribute("id", 63);
        }
        else if (posicionF==58 && nodos[58].getAttribute("id")==58 && nodos[59 ].getAttribute("id")==59 && nodos[57].getAttribute("id")==57 && torre.movidaBlaIzq==0 && rey.movidoB==0)
        {
          //enroque largo blancas
          rey.mover(posicionI, posicionF);
          var nodoHijo = nodos[56].childNodes;
          nodos[56].removeChild(nodoHijo[1]);
          torre.mostrarB(59);
          nodos[56].setAttribute("id", 56);
        }
        else if (posicionF==6 && nodos[6].getAttribute("id")==6 && nodos[5].getAttribute("id")==5 && torre.movidaNegDer==0 && rey.movidoN==0 )
        {
          //enroque corto negras
          rey.mover(posicionI, posicionF);
          var nodoHijo = nodos[7].childNodes;
          nodos[7].removeChild(nodoHijo[1]);
          torre.mostrarN(5);
          nodos[7].setAttribute("id", 7);
        }
        else if (posicionF==2 && nodos[1].getAttribute("id")==1 && nodos[2].getAttribute("id")==2 && nodos[3].getAttribute("id")==3 && torre.movidaNegIzq==0 && rey.movidoN==0)
        {
          //enroque largo negras
          rey.mover(posicionI, posicionF);
          var nodoHijo = nodos[0].childNodes;
          nodos[0].removeChild(nodoHijo[1]);
          torre.mostrarN(3);
          nodos[0].setAttribute("id", 0);
        }

        else if (posicionF==posicionI-9 || posicionF==posicionI-8 || posicionF==posicionI-7 || posicionF==posicionI-1 || posicionF==posicionI+1 || posicionF==posicionI+9 || posicionF==posicionI+8 || posicionF==posicionI+7)
        {
          rey.mover(posicionI, posicionF);
        }
        else
        {
          return;
        }
      }
      else if ((idPosIni=="damaBlanca.png" && turno==0) || (idPosIni=="damaNegra.png" && turno==1))
      {
        if ((filaF-filaI == columnaF-columnaI) || (filaF-filaI==columnaI-columnaF) || (filaI-filaF==columnaI-columnaF) || (filaI-filaF == columnaF-columnaI))
        {
        //Si esta aqui es porque el movimiento es en diagonal
          //Los siguientes condicionales comprueaban si hay piezas entre la posicion i y la posicion f
          console.log("el movimiento es en diagonal");
          if (range(comprobarPiezaDiagonalAbajoIz(posicionI), posicionF, posicionI) && filaI>filaF && columnaI>columnaF)
          {
            return;
          }
          else if (range(comprobarPiezaDiagonalAbajoDe(posicionI), posicionF, posicionI) && filaI>filaF && columnaF>columnaI)
          {
            return;
          }
          else if (range(comprobarPiezaDiagonalArribaDe(posicionI), posicionI, posicionF) && filaF>filaI && columnaF>columnaI)
          {
            return;
          }
          else if (range(comprobarPiezaDiagonalArribaIz(posicionI), posicionI, posicionF) && filaF>filaI && columnaI>columnaF)
          {
            return;
          }
          else
          {
            dama.mover(posicionI, posicionF);
          }
        }
        //Los siguientes condicionales verifican si es un movimiento en lateral o vertical
        else if (posicionF>posicionI && filaF==filaI )
        {
            //el movimiento es lateral derecho
            if (range(comprobarPiezaDerecha(posicionI), posicionI, posicionF))
            {
              return;
            }
            else
            {
              dama.mover();
            }
        }
        else if (posicionF<posicionI && filaF==filaI )
        {
            //EL movimiento es lateral izquierdo
            if (range(comprobarPiezaIzquierda(posicionI), posicionF, posicionI))
            {
              return;
            }
            else
            {
              dama.mover();
            }
        }
        else if (posicionF<posicionI && filaF!=filaI && columnaI==columnaF)
        {
          //el movimiento es en vertical hacia abajo
            if (range(comprobarPiezaAbajo(posicionI), posicionF, posicionI))
            {
              return;
            }
            else
            {
              dama.mover();
            }
        }
        else if (posicionF>posicionI && filaF!=filaI && columnaI==columnaF)
        {
          //el movimiento es en vertical hacia arriba
            if (range(comprobarPiezaArriba(posicionI), posicionI, posicionF))
            {
              return;
            }
            else
            {
              dama.mover();
            }
        }
        else
        {
            return;
        }
      }
      else if ((idPosIni=="caballoBlanco.png" && turno==0) || (idPosIni=="caballoNegro.png" && turno==1))
      {
        if (posicionF == posicionI-15 || posicionF == posicionI-6 || posicionF == posicionI+10 || posicionF == posicionI+17 || posicionF == posicionI+15 || posicionF == posicionI+6 || posicionF == posicionI-10 || posicionF == posicionI-17)
        {
          caballo.mover(posicionI, posicionF);
        }
        else
        {
          return;
        }
      }
      else if (idPosIni=="alfilBlanco.png" && turno==0 || (idPosIni=="alfilNegro.png" && turno==1))
      {
        if ((filaF-filaI == columnaF-columnaI) || (filaF-filaI==columnaI-columnaF) || (filaI-filaF==columnaI-columnaF) || (filaI-filaF == columnaF-columnaI))
        {
          if (range(comprobarPiezaDiagonalAbajoIz(posicionI), posicionF, posicionI) && filaI>filaF && columnaI>columnaF)
          {
            return;
          }
          else if (range(comprobarPiezaDiagonalAbajoDe(posicionI), posicionF, posicionI) && filaI>filaF && columnaF>columnaI)
          {
            return;
          }
          else if (range(comprobarPiezaDiagonalArribaDe(posicionI), posicionI, posicionF) && filaF>filaI && columnaF>columnaI)
          {
            return;
          }
          else if (range(comprobarPiezaDiagonalArribaIz(posicionI), posicionI, posicionF) && filaF>filaI && columnaI>columnaF)
          {
            return;
          }
          else
          {
            alfil.mover(posicionI, posicionF);
          }
        }
        else
        {
          return;
        }
      }
      else if ((idPosIni=="torreBlanca.png" && turno==0) || (idPosIni=="torreNegra.png" && turno==1))
      {
        if (filaF!=filaI && columnaI!=columnaF)
        {
          return;
        }
        if (posicionF>posicionI && filaF==filaI)
        {
          if (range(comprobarPiezaDerecha(posicionI), posicionI, posicionF))
          {
            return;
          }
          else
          {
            torre.mover();
          }
        }
        if (posicionF<posicionI && filaF==filaI)
        {
          if (range(comprobarPiezaIzquierda(posicionI), posicionF, posicionI))
          {
            return;
          }
          else
          {
            torre.mover();
          }
        }
        if (posicionF<posicionI && filaF!=filaI)
        {
          if (range(comprobarPiezaAbajo(posicionI), posicionF, posicionI))
          {
            return;
          }
          else
          {
            torre.mover();
          }
        }
        if (posicionF>posicionI && filaF!=filaI)
        {
          if (range(comprobarPiezaArriba(posicionI), posicionI, posicionF))
          {
            return;
          }
          else
          {
            torre.mover();
          }
        }
      }
      else if (idPosIni=="peonBlanco.png" && turno==0)
      {
        // peon.moverPeon(posicionI, posicionF);
        if (range(posicionI, 48, 55) && posicionF==posicionI-16)
        {
          peon.moverPeon(posicionI, posicionF);
        }
        else if (posicionF==posicionI-8 && isNaN(nodos[posicionF].getAttribute("id"))==false)
        {
          peon.moverPeon(posicionI, posicionF);
        }
        else if ((posicionF==posicionI-7 || posicionF==posicionI-9) && isNaN(nodos[posicionF].getAttribute("id")))
        {
          peon.moverPeon(posicionI, posicionF);
        }
        else
        {
          return ;
        }

      }
      else if (idPosIni=="peonNegro.png" && turno==1)
      {
        if (range(posicionI, 8, 15) && posicionF==posicionI+16)
        {
          peon.moverPeon(posicionI, posicionF);
        }
        else if (posicionF==posicionI+8 && isNaN(nodos[posicionF].getAttribute("id"))==false)
        {
          peon.moverPeon(posicionI, posicionF);
        }
        else if ((posicionF==posicionI+7 || posicionF==posicionI+9) && isNaN(nodos[posicionF].getAttribute("id")))
        {
          peon.moverPeon(posicionI, posicionF);
        }
        else
        {
          return ;
        }
      }
    }
  }

//Crea un nodo con una imagen para ser incluida en las casillas de la tabla
function crearPieza(imag) {
  var imagen= document.createElement("img");
  imagen.setAttribute("src", imag);
  return imagen;
}

//crea una funcion para verificar si la pieza es blanca o negra
function verificarColor(strIma)
{
  if (strIma.includes("Blanco") || strIma.includes("Blanca") )
  {
      return true;
  }
  else if (strIma.includes("Negro") || strIma.includes("Negra"))
  {
      return false;
  }
}
//Creacion de las piezas mediante el uso de objetos
//Cada objeto contiene:El nombre de la pieza,
//una funcion crear (que agraga la imagen en la casilla deseada),
//y una funcion mover(que al mismo tiempo intengra las funcionalidades de comer y coronar, en el caso de los peones)
var peon =
{
  imaB: "peonBlanco.png",
  imaN: "peonNegro.png",
  mostrarB: function(ni)
  {
    nodos[ni].appendChild(crearPieza(peon.imaB));
    nodos[ni].setAttribute("id", peon.imaB);
  },
  mostrarN: function(ni)
  {
    nodos[ni].appendChild(crearPieza(peon.imaN));
    nodos[ni].setAttribute("id", peon.imaN);
  },
  //Crea una funcion que defina las casillas de influencia del peon
  casillasInfluenciaPeon: function(colorPeon, llamadoPorRey, posF)
  {
    var posicionDerechaNf = posF+9;
    var posicionIzquierdaNf = posF+7;
    var posicionDerechaBf = posF-9;
    var posicionIzquierdaBf = posF-7;

    if (llamadoPorRey==false)
    {
      posicionDerechaNf   = posicionF+9;
      posicionIzquierdaNf = posicionF+7;
      posicionDerechaBf   = posicionF-9;
      posicionIzquierdaBf = posicionF-7;
      if (colorPeon=="Negro" )
      {
        nodos[posicionI+7].setAttribute("name", "sinInfluencia");
        nodos[posicionI+9].setAttribute("name", "sinInfluencia");
      }
      if (colorPeon=="Blanco" )
      {
        nodos[posicionI-7].setAttribute("class", "sinInfluencia");
        nodos[posicionI-9].setAttribute("class", "sinInfluencia");
      }
    }
      if (colorPeon=="Negro" )
      {
        nodos[posicionDerechaNf].setAttribute("name", "influenciaNegra");
        nodos[posicionIzquierdaNf].setAttribute("name", "influenciaNegra");
      }
      if (colorPeon=="Blanco")
      {
        nodos[posicionDerechaBf].setAttribute("class", "influenciaBlanca");
        nodos[posicionIzquierdaBf].setAttribute("class", "influenciaBlanca");
      }
  },
  verificarCoronacion: function (nF, iniR, finR, colorPiezaCoronada, colorPeon)
  {
    if (range(nF, iniR, finR))
    {
      nodos[nF].appendChild(crearPieza(colorPiezaCoronada));
      nodos[nF].setAttribute("id", colorPiezaCoronada);
    }
    else
    {
      nodos[nF].appendChild(crearPieza(colorPeon));
      nodos[nF].setAttribute("id", colorPeon);
    }
  },
  mover: function (idNi, idNf, booleano, ni, nf, iniR, finR, colorPiezaCoronada, colorPeon, trn)
  {
    var nodoHijoI = nodos[ni].childNodes;
    var nodoHijoF = nodos[nf].childNodes;
    if(isNaN(idNf))
    {
      //Este el caso en el que la posicion esta ocupada
      if (verificarColor(idNf)==booleano)
      {
      //Este es en el caso en el que la posicion final esta ocupada por una pieza del mismo color
        return;
      }
      else
      {
        //Este es en el caso en el que la posicion final esta ocupada por una pieza de diferente color
        nodos[ni].removeChild(nodoHijoI[1]);
        nodos[nf].removeChild(nodoHijoF[1]);
        nodos[ni].setAttribute("id", ni);
        peon.verificarCoronacion(nf, iniR, finR, colorPiezaCoronada, colorPeon);
        turno= trn;
      }
    }
    else
    {
      //Este el caso en el que la posicion esta vacia
      nodos[ni].removeChild(nodoHijoI[1]);
      nodos[ni].setAttribute("id", ni);
      peon.verificarCoronacion(nf, iniR, finR, colorPiezaCoronada, colorPeon);
      turno= trn;
    }
  },
  moverPeon: function (ni, nf)
  {
    //Verifica si la pieza es negra o blanca
    //Verifica si la casilla final esta vacia o ocupada
    //para saber si la funcion es comer o mover
    //Luego verifica si la posicion final es una casilla de coronacion para las negras
    var idNf = nodos[nf].getAttribute("id");
    var idNi = nodos[ni].getAttribute("id");
    if(idNi=="peonNegro.png")
    {
      peon.casillasInfluenciaPeon("Negro", false, 0)
      peon.mover( idNi, idNf, false, ni, nf, 56, 63, dama.imaN, peon.imaN, 0);
    }
    else if(idNi=="peonBlanco.png")
    {
      peon.casillasInfluenciaPeon("Blanco", false, 0)
      peon.mover( idNi, idNf, true, ni, nf, 0, 7, dama.imaB, peon.imaB, 1);
    }
  }
}

var caballo =
{
  imaB: "caballoBlanco.png",
  imaN: "caballoNegro.png",
  mostrarB: function(ni)
  {
    nodos[ni].appendChild(crearPieza(caballo.imaB));
    nodos[ni].setAttribute("id", caballo.imaB);
  },
  mostrarN: function(ni)
  {
    nodos[ni].appendChild(crearPieza(caballo.imaN));
    nodos[ni].setAttribute("id", caballo.imaN);
  },
  //Crea una funcion que defina las casillas de influencia del caballo
  casillasInfluenciaCaballo: function ( colorInfluencia, atributo)
  {
    //Cuando la funcion es llamada asigna el name "influenciaNegra" para caballo negro en las casillas a las que el caballo negro se podria mover una vez se ha hecho el movimiento
    //pero si es llamada con colorInfluencia: "influenciaBlanca", asigna influenciaBlanca a la clase de las casillas a la que el caballo blanco se podria mover una vez hecho el movimiento
    //tambien elimina la influencia de los caballos una vez se mueven, para ello toma en cuenta las casillas a las que se podia mover el caballo antes de hacer el movimiento
        if (posicionF>16)
        {
          nodos[posicionF-17].setAttribute(atributo, colorInfluencia);
        }
        if (posicionI>16)
        {
          nodos[posicionI-17].setAttribute(atributo, "sinInfluencia");
        }
        if (posicionF>14)
        {
          nodos[posicionF-15].setAttribute(atributo, colorInfluencia);
        }
        if (posicionI>14)
        {
          nodos[posicionI-15].setAttribute(atributo, "sinInfluencia");
        }

        if (posicionF>9)
        {

          nodos[posicionF-10].setAttribute(atributo, colorInfluencia);
        }
        if (posicionI>9)
        {
          nodos[posicionI-10].setAttribute(atributo, "sinInfluencia");
        }
        if (posicionF>5)
        {

          nodos[posicionF-6].setAttribute(atributo, colorInfluencia);
        }
        if (posicionI>5)
        {
          nodos[posicionI-6].setAttribute(atributo, "sinInfluencia");
        }
        if (posicionF<58)
        {

          nodos[posicionF+6].setAttribute(atributo, colorInfluencia);
        }
        if (posicionI<58)
        {
          nodos[posicionI+6].setAttribute(atributo, "sinInfluencia");
        }
        if (posicionF<54)
        {

          nodos[posicionF+10].setAttribute(atributo, colorInfluencia);
        }
        if (posicionI<54)
        {
          nodos[posicionI+10].setAttribute(atributo, "sinInfluencia");
        }
        if (posicionI<49)
          {
            nodos[posicionI+15].setAttribute(atributo, "sinInfluencia");
          }
        if (posicionF<49)
        {

          nodos[posicionF+15].setAttribute(atributo, colorInfluencia);
        }
        if (posicionF<47)
        {

          nodos[posicionF+17].setAttribute(atributo, colorInfluencia);
        }
        if (posicionI<47)
        {
          nodos[posicionI+17].setAttribute(atributo, "sinInfluencia");
        }
      // }
  },
  mover: function (ni, nf)
  {
    if(nodos[ni].getAttribute("id")=="caballoNegro.png")
    {
      caballo.casillasInfluenciaCaballo("influenciaNegra", "name");
      moverG(posicionI, posicionF, caballo.imaN, 0, false);
    }
    else if(nodos[ni].getAttribute("id")=="caballoBlanco.png")
    {
      caballo.casillasInfluenciaCaballo( "influenciaBlanca", "class");
      moverG(posicionI, posicionF, caballo.imaB, 1, true);
    }
  }
}

var alfil =
{
  imaB: "alfilBlanco.png",
  imaN: "alfilNegro.png",
  mostrarB: function(ni)
  {
    nodos[ni].appendChild(crearPieza(alfil.imaB));
    nodos[ni].setAttribute("id", alfil.imaB);
  },
  mostrarN: function(ni)
  {
    nodos[ni].appendChild(crearPieza(alfil.imaN));
    nodos[ni].setAttribute("id", alfil.imaN);
  },
  mover: function (ni, nf)
  {
    if(nodos[ni].getAttribute("id")=="alfilNegro.png")
    {
      casillasInfluenciaDiagonales("influenciaNegra", "name", "colorRey", false, 0);
      moverG(posicionI, posicionF, alfil.imaN, 0, false);
    }
    else if(nodos[ni].getAttribute("id")=="alfilBlanco.png")
    {
      casillasInfluenciaDiagonales("influenciaBlanca", "class", "colorRey", false, 0);
      moverG(posicionI, posicionF, alfil.imaB, 1, true);
    }
  }
}

var torre =
{
  imaB: "torreBlanca.png",
  imaN: "torreNegra.png",
  movidaNegDer: 0,
  movidaNegIzq: 0,
  movidaBlaIzq: 0,
  movidaBlaDer: 0,
  mostrarB: function(ni)
  {
    nodos[ni].appendChild(crearPieza(torre.imaB));
    nodos[ni].setAttribute("id", torre.imaB);
  },
  mostrarN: function(ni)
  {
    nodos[ni].appendChild(crearPieza(torre.imaN));
    nodos[ni].setAttribute("id", torre.imaN);
  },
  mover: function ()
  {
    if(nodos[posicionI].getAttribute("id")=="torreNegra.png")
    {

      moverG(posicionI, posicionF, torre.imaN, 0, false);
      casillasInfluenciaLatVer("influenciaNegra", "name", "reyBlanco.png", false, 0);
      if (posicionI==0)
      {
        torre.movidaNegIzq=1;
      }
      else if (posicionI==7)
      {
        torre.movidaNegDer=1;
      }
    }
    else if(nodos[posicionI].getAttribute("id")=="torreBlanca.png")
    {

      moverG(posicionI, posicionF, torre.imaB, 1, true);
      casillasInfluenciaLatVer("influenciaBlanca", "class", "reyNegro.png", false, 0);
      if (posicionI==63)
      {
        torre.movidaBlaDer=1;
      }
      else if (posicionI==56)
      {
        torre.movidaBlaIzq=1;
      }
    }
  }
}

var dama =
{
  imaB: "damaBlanca.png",
  imaN: "damaNegra.png",
  mostrarB: function(ni)
  {
    nodos[ni].appendChild(crearPieza(dama.imaB));
    nodos[ni].setAttribute("id", dama.imaB);
  },
  mostrarN: function(ni)
  {
    nodos[ni].appendChild(crearPieza(dama.imaN));
    nodos[ni].setAttribute("id", dama.imaN);
  },
  mover: function ()
  {
    if(nodos[posicionI].getAttribute("id")=="damaNegra.png")
    {
      moverG(posicionI, posicionF, dama.imaN, 0, false);
      casillasInfluenciaLatVer("influenciaNegra", "name", "reyBlanco.png", true, 0);
      casillasInfluenciaDiagonales("influenciaNegra", "name", "colorRey", false, 0);
    }
    else if(nodos[posicionI].getAttribute("id")=="damaBlanca.png")
    {
      moverG(posicionI, posicionF, dama.imaB, 1, true);
      casillasInfluenciaLatVer("influenciaBlanca", "class", "reyNegro.png", true, 0);
      casillasInfluenciaDiagonales("influenciaBlanca", "class", "colorRey", false, 0);
    }
  }
}

var rey =
{
  imaB: "reyBlanco.png",
  imaN: "reyNegro.png",
  movidoN: 0,
  movidoB: 0,
  mostrarB: function(ni)
  {
    nodos[ni].appendChild(crearPieza(rey.imaB));
    nodos[ni].setAttribute("id", rey.imaB);
  },
  mostrarN: function(ni)
  {
    nodos[ni].appendChild(crearPieza(rey.imaN));
    nodos[ni].setAttribute("id", rey.imaN);
  },
  casillasInfluenciaRey: function(colorInfluencia, atributo)
  {
      if (posicionF>6)
      {
        nodos[posicionF-7].setAttribute(atributo, colorInfluencia);
      }
      if (posicionF>7)
      {
        nodos[posicionF-8].setAttribute(atributo, colorInfluencia);
      }
      if (posicionF>8)
      {
        nodos[posicionF-9].setAttribute(atributo, colorInfluencia);
      }
      if (posicionF>0)
      {
        nodos[posicionF-1].setAttribute(atributo, colorInfluencia);
      }
      if (posicionF<63)
      {
        nodos[posicionF+1].setAttribute(atributo, colorInfluencia);
      }
      if (posicionF<57)
      {
        nodos[posicionF+7].setAttribute(atributo, colorInfluencia);
      }
      if (posicionF<56)
      {
        nodos[posicionF+8].setAttribute(atributo, colorInfluencia);
      }
      if (posicionF<55)
      {
        nodos[posicionF+9].setAttribute(atributo, colorInfluencia);
      }

  },
  mover: function (ni, nf)
  {
    if(nodos[ni].getAttribute("id")=="reyNegro.png")
    {
        rey.casillasInfluenciaRey("influenciaNegra", "name");
        moverG(posicionI, posicionF, rey.imaN, 0, false);
        rey.movidoN=1;
    }
    else if(nodos[ni].getAttribute("id")=="reyBlanco.png")
    {
        rey.casillasInfluenciaRey("influenciaBlanca", "class");
        moverG(posicionI, posicionF, rey.imaB, 1, true);
        rey.movidoB=1;
    }
  }
}


//Creacion de las piezas
// {
  peon.mostrarB(48);
peon.mostrarB(49);
peon.mostrarB(50);
peon.mostrarB(51);
peon.mostrarB(52);
peon.mostrarB(53);
peon.mostrarB(54);
peon.mostrarB(55);
peon.mostrarN(8);
peon.mostrarN(9);
peon.mostrarN(10);
peon.mostrarN(11);
peon.mostrarN(12);
peon.mostrarN(13);
peon.mostrarN(14);
peon.mostrarN(15);

caballo.mostrarB(57);
caballo.mostrarB(62);
caballo.mostrarN(1);
caballo.mostrarN(6);

alfil.mostrarB(58);
alfil.mostrarB(61);
alfil.mostrarN(2);
alfil.mostrarN(5);

dama.mostrarB(59);
rey.mostrarB(60);
dama.mostrarN(3);
rey.mostrarN(4);

torre.mostrarB(56);
torre.mostrarB(63);
torre.mostrarN(0);
torre.mostrarN(7);
// }
