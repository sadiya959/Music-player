const audioElement = document.createElement("audio");

document.body.appendChild(audioElement);

const playBtn = document.querySelector(".play-button");
const prevBtn = document.querySelector(".back");
const nexttBtn = document.querySelector(".next");
const title = document.querySelector(".title");
const skip = document.querySelector(".skip");
const speed = document.querySelector("#speed");
const progressContainer = document.querySelector(".progress-container");
const progressBar = document.querySelector(".progress-bar");
const heart = document.querySelector(".heart");
const volumeSlider = document.querySelector("#volume");

// Song data
const songs = [
  // https://soundcloud.com/soundhelix/sets/soundhelix-examples?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing
  {
    title: "Song One",
    artist: "Artist One",
    cover: "https://via.placeholder.com/250/4CAF50/FFFFFF?text=1",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    title: "Song Two",
    artist: "Artist Two",
    cover: "https://via.placeholder.com/250/2196F3/FFFFFF?text=2",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    title: "Song Three",
    artist: "Artist Three",
    cover: "https://via.placeholder.com/250/FFC107/FFFFFF?text=3",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    title: "Song Four",
    artist: "Artist Four",
    cover: "https://via.placeholder.com/250/FFC107/FFFFFF?text=3",
    src: "./songs/Maxamed Aadan Dugsiiye heesta ma ogtahay jacaylow _ Aar laga cabsoodiyo _ weli kuma aqoonsani _ hees [771ccER-ZQk].mp3",
  },
  {
    title: "Song Five",
    artist: "Artist Five",
    cover: "https://via.placeholder.com/250/FFC107/FFFFFF?text=3",
    src: "/songs/mixkit-cbpd-400.mp3",
  },
];

let songIndex = 0;
let isPlaying = false;
let speedStart = 1;

function loadSong(song) {
  title.textContent = song.title + " - " + song.artist;
  audioElement.src = song.src;
}

loadSong(songs[songIndex]);

// play
function playSong() {
  playBtn.querySelector(".play-img").src = "./images/playing.svg";
  audioElement.play();
  isPlaying = true;
}

// pause
function pauseSong() {
  playBtn.querySelector(".play-img").src = "./images/play.svg";
  audioElement.pause();
  isPlaying = false;
}

// next song functionality
function nextSong() {
  pauseSong();

  setTimeout(() => {
    songIndex++;

    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
  }, 300);
}

// prev song functionality
function prevSong() {
  pauseSong();

  setTimeout(() => {
    songIndex--;

    if (songIndex < 0) {
      songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);

    playSong();
  }, 300);
}

// update Progress
function updateProgress(e) {
  const { duration, currentTime } = e.currentTarget;
  if (isNaN(duration)) return;

  const progressPercent = (currentTime / duration) * 100;

  progressBar.style.width = `${progressPercent}%`;
  heart.style.left = `${progressPercent}%`;

  // duration calculation
  const durationMinutes = Math.floor(duration / 60);
  let durationSeconds = Math.floor(duration % 60);

  if (durationSeconds < 10) {
    durationSeconds = `0${durationSeconds}`;
  }
  document.querySelector(
    ".total-time"
  ).textContent = `${durationMinutes}:${durationSeconds}`;

  // current time calculation
  const currentMinutes = Math.floor(currentTime / 60);
  let currenSeconds = Math.floor(currentTime % 60);

  if (currenSeconds < 10) {
    currenSeconds = `0${currenSeconds}`;
  }

  document.querySelector(
    ".current-time"
  ).textContent = `${currentMinutes}:${currenSeconds}`;

  audioElement.playbackRate = speedStart;
}

// set Progress

function setProgress(e) {
  const width = this.clientWidth;

  const clickX = e.offsetX;

  const duration = audioElement.duration;

  if (isNaN(duration)) return;

  const newTime = (clickX / width) * duration;
  audioElement.currentTime = newTime;

  progressBar.style.width = `${clickX}px`;
  heart.style.left = `${clickX}px`;
}

// events
playBtn.addEventListener("click", () => {
  if (!isPlaying) {
    playSong();
  } else {
    pauseSong();
  }
});

nexttBtn.addEventListener("click", () => {
  nextSong();
});

prevBtn.addEventListener("click", () => {
  prevSong();
});

audioElement.addEventListener("timeupdate", updateProgress);

progressContainer.addEventListener("click", setProgress);

audioElement.addEventListener("ended", () => {
  const playImg = (playBtn.querySelector(".play-img").src =
    "./images/play.svg");
  playSong();
});

volumeSlider.addEventListener("input", (e) => {
  audioElement.volume = e.target.value;
});

speed.addEventListener("change", (e) => {
  speedStart = parseFloat(e.target.value);
  audioElement.playbackRate = speedStart;
});

audioElement.addEventListener("loadeddata", () => updateProgress);
