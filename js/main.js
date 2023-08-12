const listaPokemon = document.querySelector("#pokemonList");
const botonesHeader = document.querySelectorAll('.btn-header');
const searchInput = document.getElementById('searchInput');
const elementList = document.getElementById('elementList');


let URL = "https://pokeapi.co/api/v2/pokemon/";

searchInput.addEventListener('keypress', function (e) {

    if (e.key === 'Enter') {
        listaPokemon.innerHTML = "";
        const searchTerm = searchInput.value;

        for (let i = 1; i <= 151; i++) {
            fetch(URL + i)
                .then(response => response.json())
                .then(data => {
                    const namePok = data.name;
                    //console.log(namePok);
                    if (data.name.startsWith(searchTerm)) {
                        mostrarPokemon(data)
                        console.log(data);
                    }
                });
        }
    }
});

function displayElements(elements) {
    elementList.innerHTML = '';

    elements.forEach(element => {
        const listItem = document.createElement('li');
        listItem.textContent = element.name;
        elementList.appendChild(listItem);
    });
}


///////////
/*Búsqueda de los pokemon*/
for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
}

function mostrarPokemon(poke) {
    console.log("entro al metodo")
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }


    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-image">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
        </div>
    `;
    listaPokemon.append(div);
}

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
        console.log("url rara ", URL + i)
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if (botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }
                }

            })
    }
}))