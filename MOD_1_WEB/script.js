//VARIABLES
const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");

const apiURL = "https://api.lyrics.ovh"; // API link
// GETTING INPUT VALUE
form.addEventListener("submit", e => {
    e.preventDefault();
    let searchValue = search.value.trim();

    if (!searchValue) {
        alert("Oopss... Please enter a song or artist :)")
    } else {
        beginSearch(searchValue); }
})
// CREATING SEARCH FUNCTION
async function beginSearch(searchValue) {
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`);
    const data = await searchResult.json();
    displayData(data);
}
// DISPLAYING SEARCH RESULTS
function displayData(data) {
    result.innerHTML = `
    <ul class = "songs">
        ${data.data
        .map(song => ` <li>
                        <div>
                        <b>${song.artist.name}
                        </b> - ${song.title}
                        </div> 
                        <span data-artist="${song.artist.name}"
                        data-songtitle="${song.title}">Get Lyrics</span>
                    </li>` 
        )
        .join('')}
    </ul>
    `;}
// GETTING LYRICS w/ FUNCTION 
result.addEventListener("click", e => {
    const clickedElement = e.target;

    // Checking if click element is get lyrics button
    if (clickedElement.tagName === 'SPAN') {
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');  
        getLyrics(artist, songTitle);
    }
})
// FUNCTION FOR GETLYRICS FUNCTION ABOVE
async function getLyrics(artist, songTitle) {
    const response = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await response.json();
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, `<br>`);

    result.innerHTML = `<h2><b>${artist}</b> - ${songTitle}</h2>
    <p>${lyrics}</p>`;}