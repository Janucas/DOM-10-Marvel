let pvtkey = '6ebb713808eb692449e1d5bb245301ba895b3092';
let pubkey = '82f08d3d2f414cb1da959a07fcd00fb1';

let ts = Date.now();
let hash = CryptoJS.MD5(ts+pvtkey+pubkey).toString();

let call = `ts=${ts}&apikey=${pubkey}&hash=${hash}`;

let endpoint = `https://gateway.marvel.com/v1/public/characters?${call}`;
let comics = `https://gateway.marvel.com/v1/public/comics?${call}`;
//Usando fetch
//Realiza la solicitud a la api
fetch(endpoint)
  .then((response) => {
    if (response.ok) {
      return response.json(); 
    } else {
      throw new Error("Error, la respuesta no es verdadera "); 
    }
  })
  .then((respuesta) => {
    
    let personajes = respuesta.data.results;

    //Iteramos sobre el array
    for (let i = 0; i < personajes.length; i++) {
      //Obtenemos el personaje actual
      let personaje = personajes[i];

      //Obtenemos la card donde iremos añadiendo los personajes
      let card = document.querySelector(".card");

      //Creamos un elemento img
      let img = document.createElement("img");
      //Se le asigna una clase
      img.classList = "card-img-top";
      //Se le asocia el valor del src de la img
      img.src = `${personaje.thumbnail.path}.${personaje.thumbnail.extension}`;

      //Se crea un elemento parrafo
      let p = document.createElement("p");
      //Se le añade una clase
      p.classList = ".card-text";
      //Almacena el contenido del nombre del personaje
      p.textContent = personaje.name;

      //Se añaden como nodos hijos a la card
      card.appendChild(img);
      card.appendChild(p);
    }
  })
  //Manejar el error
  .catch((error) => {
    console.log(error);
  });

  async function getAllCharacter() {
    let respuesta = await fetch(comics);
  
    if (!respuesta.ok) {
      console.log("Error al obtener la respuesta");
    }
  
    let respuestaJson = await respuesta.json();
  
    let personajes = respuestaJson.data.results;
  
    //Iteramos sobre el array
    for (let i = 0; i < personajes.length; i++) {
      //Obtenemos el personaje actual
      let personaje = personajes[i];
  
      //Obtenemos la card donde iremos añadiendo los personajes
      let card = document.querySelector(".card");
  
      //Creamos un elemento img
      let img = document.createElement("img");
      //Se le asigna una clase
      img.classList = "card-img-top";
      //Se le asocia el valor del src de la img
      img.src = `${personaje.thumbnail.path}.${personaje.thumbnail.extension}`;
  
      //Se crea un elemento parrafo
      let p = document.createElement("p");
      //Se le añade una clase
      p.classList = ".card-text";
      //Almacena el contenido del nombre del personaje
      p.textContent = personaje.name;
  
      //Se añaden como nodos hijos a la card
      card.appendChild(img);
      card.appendChild(p);
    }
  }
  
  getAllCharacter();