// Obtener el body, crear una división, crear la tabla y el cuerpo de la tabla.
var body = document.getElementsByTagName("body")[0];
var divCuerpo= document.createElement("div");
var newTabla = document.createElement("table");
var tBody= document.createElement("tbody");

// Creaciom de la tabla
for(var i=0; i<8;i++)
{
  var newTr = document.createElement("tr");
  for(var j=0; j<8; j++)
  {
     var newTd = document.createElement("td");
     var textNode= document.createTextNode("");

     newTd.appendChild(textNode);
     newTr.appendChild(newTd);
  }
  tBody.appendChild(newTr);
}

//Agregar el cuerpo de la tabla a la tabla y la tabla al body
newTabla.appendChild(tBody);
divCuerpo.appendChild(newTabla);
body.appendChild(divCuerpo);

//Cambiar el tamaño de letra
newTabla.style.fontSize= "10px";

//Obtener los nodos de la tabla
var nodos= document.getElementsByTagName("td");

//Pintar la tabla
var colorBlanco='white';
var colorNegro='#2C8704';
for(var i=0; i<64;i++)
{
  nodos[i].setAttribute("id", i);
  nodos[i].setAttribute("name", "sinInfluencia");
  nodos[i].setAttribute("class", "sinInfluencia");
  if (i<8)
  {
    if (i% 2 == 0)
    {
      nodos[i].style.backgroundColor = colorBlanco;
    }
    else
    {
      nodos[i].style.backgroundColor = colorNegro;
    }
  }
  else if(i>7 && i<16)
  {
    if (i % 2 == 0)
    {
      nodos[i].style.backgroundColor = colorNegro;
    }
    else
    {
      nodos[i].style.backgroundColor = colorBlanco;
    }
  }

 else if(i>23 && i<32)
  {
    if (i % 2 == 0)
    {
      nodos[i].style.backgroundColor = colorNegro;
    }
    else
    {
      nodos[i].style.backgroundColor = colorBlanco;
    }
  }

 else if (i>39 && i<48)
  {
    if (i % 2 == 0)
    {
      nodos[i].style.backgroundColor = colorNegro;
    }
    else
    {
      nodos[i].style.backgroundColor = colorBlanco;
    }
  }

 else if(i>55)
  {
    if (i % 2 == 0)
    {
      nodos[i].style.backgroundColor = colorNegro;
    }
    else
    {
      nodos[i].style.backgroundColor = colorBlanco;
    }
  }

 else
  {
     if (i % 2 == 0)
     {
       nodos[i].style.backgroundColor = colorBlanco;
     }
     else
     {
          nodos[i].style.backgroundColor = colorNegro;
     }
  }
}

//
// nodos[57].textContent="B";
// nodos[58].textContent="C";
// nodos[59].textContent="D";
// nodos[60].textContent="E";
// nodos[61].textContent="F";
// nodos[62].textContent="G";
// nodos[63].textContent="H";
//
// nodos[0].textContent="1";
// nodos[8].textContent="2";
// nodos[16].textContent="3";
// nodos[24].textContent="4";
// nodos[32].textContent="5";
// nodos[40].textContent="6";
// nodos[48].textContent="7";
// nodos[56].textContent="8.     A";
