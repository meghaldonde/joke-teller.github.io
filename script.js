//Get DOM Element Reference
const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

//Disable and Enable Element
function toggleButton() {
    button.disabled = !button.disabled;
}

//Passing Joke to VoiceRSS API
function tellMeAJoke(joke) {
    VoiceRSS.speech({
        key: config.API_KEY,
        src: 'Do you want to hear a joke?....' + joke,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

//Get Jokes from Joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup}...${data.delivery}`;
        } else {
            joke = data.joke;
        }
        //Text-to-Speech
        tellMeAJoke(joke);
        //Disable Button
        toggleButton();

    } catch (error) {
        //Catch Error
        console.log('Whoops, something went wrong!' + error);
    }
}

//Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);