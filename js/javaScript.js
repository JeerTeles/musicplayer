const btnPlay = document.querySelector("#btn-play");
const btnPlayIcon = document.querySelector("#btn-play-icon");
const btnRepeat = document.querySelector("#btn-repeat");
const btnPrev = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");
const btnVolume = document.querySelector("#btn-volume");
const btnVolumeIcon = document.querySelector("#btn-volume i");
const playerVolume = document.querySelector("#player-volume");
const songName = document.querySelector("#song-name");
const songAuthor = document.querySelector("#song-author");
const playerCurrentTime = document.querySelector("#player-current-time");
const playerDuration = document.querySelector("#player-duration");
const playerProgress = document.querySelector("#player-progress");
const audioPlayer = document.querySelector("#audio-player");

let currentSong = 0;
let repeatSong = false;

const songs = [
  {
    name: "Solinho Do Brabo",
    author: "Japãozin",
    path: "./music/japaozin-solinho-do-brabo-d56c033d.mp3",
  },

  {
    name: "Conspiração Ft. Marília Mendonça",
    author: "Tribo Da Periferia",
    path: "./music/tribodaperiferia-conspiracao-ft-marilia-mendonca-01356338.mp3"
  },

  {
    name: "Carinha De Neném",
    author: "Japãozin", 
    path: "./music/japaozin-japaozin-carinha-de-nenem-9c2101d8.mp3"
  },


  {
    name: "Desbeijar Minha Boca",
    author: "Henrique e  Juliano", 
    path: "./music/henriqueejulianooficial-desbeijar-minha-boca-c2f932ee.mp3",
  },

  {
    name: "Cidade Vizinha",
    author: "Henrique e Juliano",
    path: "./music/henriqueejulianooficial-cidade-vizinha-9f59e1e5.mp3",
  },

  {
    name: "Eu você o mar e ela",
    author: "Nadson Ferinha",
    path: "./music/nadsonoferinhadoarrochaweb-03-eu-vc-o-mar-e-ela-401f3c7f.mp3"
  },

  {
    name: "A gente fez Amor",
    author: "Unha Pintada",
    path: "./music/unhapintadaoficial-01-a-gente-fez-amor-2-19153414.mp3"
  },

  {
    name: "Anti Amor",
    author: "Gustavo Mioto",
    path: "./music/gustavomioto-gustavo-mioto-anti-amor-part-jorge-e-mateus-61cde797.mp3",
  },

  {
    name: "Imprevisivel",
    author: "Tribo Da Periferia",
    path: "./music/tribodaperiferia-imprevisivel-2ad746d1.mp3",
  },
];

btnPlay.addEventListener("click", () => togglePlaySong());
btnPrev.addEventListener("click", () => changeSong(false));
btnNext.addEventListener("click", () => changeSong());
btnRepeat.addEventListener("click", () => toggleRepeatSong());
playerVolume.addEventListener("input", () => changeVolume());
playerProgress.addEventListener("input", () => changeTime());
audioPlayer.addEventListener("timeupdate", () => timeUpdate());
audioPlayer.addEventListener("ended", () => ended());

const togglePlaySong = () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    btnPlayIcon.classList.replace("bi-play-fill", "bi-pause-fill");
  } else {
    audioPlayer.pause();
    btnPlayIcon.classList.replace("bi-pause-fill", "bi-play-fill");
  }
};

const changeSong = (next = true) => {
  if (next && currentSong < songs.length - 1) {
    currentSong++;
  } else if (!next && currentSong > 0) {
    currentSong--;
  } else {
    return;
  }

  updatePlayer();
  togglePlaySong();
};

const updatePlayer = () => {
  const song = songs[currentSong];

  songName.innerHTML = song.name;
  songAuthor.innerHTML = song.author;
  audioPlayer.src = song.path;
  playerProgress.value = audioPlayer.currentTime;
};

const toggleRepeatSong = () => {
  repeatSong = !repeatSong;
  btnRepeat.classList.toggle("btn-activated");
};

const timeUpdate = () => {
  const { currentTime, duration } = audioPlayer;

  if (isNaN(duration)) return;

  playerDuration.innerHTML = formatSecondsToMinutes(duration);
  playerCurrentTime.innerHTML = formatSecondsToMinutes(currentTime);
  playerProgress.max = duration;
  playerProgress.value = currentTime;
};

const changeVolume = () => {
  const { value } = playerVolume;

  audioPlayer.volume = value;

  if (value == 0) {
    btnVolumeIcon.classList.replace("bi-volume-up-fill", "bi-volume-mute-fill");
  } else {
    btnVolumeIcon.classList.replace("bi-volume-mute-fill", "bi-volume-up-fill");
  }
};

const changeTime = () => {
  audioPlayer.currentTime = playerProgress.value;
};

const formatSecondsToMinutes = (seconds) => {
  return new Date(seconds * 1000).toISOString().slice(14, 19);
};

const ended = () => {
  repeatSong ? togglePlaySong() : changeSong(true);
};

window.onload = () => {
  updatePlayer();
};