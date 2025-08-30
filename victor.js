console.log("Welcome to Victor Music Player")
let song = new Audio();

let songIndex = 0;
let masterplay = document.getElementById("masterplay");
let title = document.getElementById("songName");
let songList = document.getElementsByClassName('songName');
let playlistItems = document.querySelectorAll('#playlist li');
let prevbttn = document.getElementById("previous");
let nextbttn = document.getElementById("next");


const songs = [
    { name: "6 Am", filePath: "songs/6_Am.mp3", coverPath: "songs/6_Am.jpg" },
    { name: "Beeba", filePath: "songs/Beeba.mp3", coverPath: "songs/Beeba.jpg" },
    { name: "Bonita", filePath: "songs/Bonita.mp3", coverPath: "songs/Bonita.jpg" },
    { name: "Caliente", filePath: "songs/Caliente.mp3", coverPath: "songs/Caliente.jpg" },
    { name: "Chhori", filePath: "songs/Chhori.mp3", coverPath: "songs/Chhori.jpg" },
    { name: "Hide It", filePath: "songs/Hide_It.mp3", coverPath: "songs/Hide_It.jpg" },
    { name: "High On Me", filePath: "songs/High_On_Me.mp3", coverPath: "songs/High_On_Me.jpg" },
    { name: "Jatt Mehkma", filePath: "songs/Jatt_Mehkma.mp3", coverPath: "songs/Jatt_Mehkma.jpg" },
    { name: "Lapata", filePath: "songs/Lapata.mp3", coverPath: "songs/Lapata.jpg" },
    { name: "Malamaal", filePath: "songs/Malamaal.mp3", coverPath: "songs/Malamaal.jpg" },
    { name: "Millionaire", filePath: "songs/Millionaire.mp3", coverPath: "songs/Millionaire.jpg" },
    { name: "Payal", filePath: "songs/Payal.mp3", coverPath: "songs/Payal.jpg" },
    { name: "Rap God", filePath: "songs/Rap_God.mp3", coverPath: "songs/Rap_God.jpg" },
    { name: "Rounds N Ring", filePath: "songs/Rounds_N_Ring.mp3", coverPath: "songs/Rounds_N_Ring.jpg" },
    { name: "Shamaan De Vele", filePath: "songs/Shamaan_De_Vele.mp3", coverPath: "songs/Shamaan_De_Vele.jpg" },
];

// default song play 
document.body.addEventListener("click", function autoPlayOnce() {
    song.src = songs[songIndex].filePath;
    title.innerText = songs[songIndex].name;
    song.play();
    masterplay.classList.remove("fa-play");
    masterplay.classList.add("fa-pause");
    document.body.removeEventListener("click", autoPlayOnce); // Only play once on first click
});



Array.from(songList).forEach((item, i) => {
    item.innerText = songs[i].name;
});



// Load song
function loadSong(i) {
    song.src = songs[i].filePath;
    title.textContent = songs[i].name;
    song.load();
}

// PLAY FUNCTION 
function play(i) {
    songIndex = i;
    title.textContent = songs[i].name;
    song.src = songs[i].filePath;
    song.addEventListener("canplay", function playWhenReady() {
        song.play()

        song.removeEventListener("canplay", playWhenReady);
    })
}



masterplay.addEventListener("click", function () {
    if (song.paused) {
        song.src = songs[songIndex].filePath;
        title.textContent = songs[songIndex].name;

        // Wait until song is ready before playing
        song.addEventListener("canplay", function playWhenReady() {
            song.play();
            masterplay.classList.remove("fa-play");
            masterplay.classList.add("fa-pause");

            // Remove this listener after it runs once
            song.removeEventListener("canplay", playWhenReady);
        });
    } else {
        song.pause();
        masterplay.classList.remove("fa-pause");
        masterplay.classList.add("fa-play");
    }
});



// play by clicking li 
playlistItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        play(index);
        masterplay.classList.remove("fa-play");
        masterplay.classList.add("fa-pause");

    });
});


// Previous song
prevbttn.addEventListener("click", () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
    song.play();
    masterplay.classList.remove("fa-play");
    masterplay.classList.add("fa-pause");
});

// Next song
nextbttn.addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    song.play();
    masterplay.classList.remove("fa-play");
    masterplay.classList.add("fa-pause");
});

const cover = document.getElementById("cover");

// When song plays
song.addEventListener("play", () => {
    cover.classList.add("rotating");
});

// When song pauses
song.addEventListener("pause", () => {
    cover.classList.remove("rotating");
});




