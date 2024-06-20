"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const characterContainer = document.getElementById('character-container');
    const searchInput = document.getElementById('search-input');

    const fetchCharacters = async (name = '') => {
        const url = name ? `https://rickandmortyapi.com/api/character/?name=${name}` : 'https://rickandmortyapi.com/api/character';
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    };

    const displayCharacters = (characters) => {
        characterContainer.innerHTML = ''; 
        characters.forEach(character => {
            const characterCard = document.createElement('div');
            characterCard.className = 'character-card';
            characterCard.innerHTML = `
                <h2>${character.name}</h2>
                <img src="${character.image}" alt="${character.name}">
                <div>
                    <p> <span>Status:</span> ${character.status}</p>
                    <p><span>Species:</span> ${character.species}</p>
                    <p><span>Location:</span> ${character.location.name}</p>

                </div>
            `;
            characterContainer.appendChild(characterCard);
        });
    };

    fetchCharacters().then(displayCharacters);

    searchInput.addEventListener('input', (event) => {
        const query = event.target.value;
        fetchCharacters(query).then(displayCharacters);
    });
});
