const currentmusictime = document.getElementById('currentmusictime')
const pause_play = document.getElementById('pause-play')
let audio = document.getElementsByTagName('audio')[0]
const music_title = document.getElementById('music-title')
const artist = document.getElementById('artist')

currentmusictime.min = 0

audio.addEventListener("loadedmetadata", () => {
  currentmusictime.max = audio.duration
})

currentmusictime.addEventListener('input', () => {
  audio.currentTime = currentmusictime.value
})

setInterval(() => {
  currentmusictime.value = audio.currentTime
  usercurrentdata.currentTimeuser = audio.currentTime
}, 500)

const songs = [
  {
    songname: "Alors On Danse",
    src: "alorsondanse.mp3",
    author: "Stromae",
    id: 1
  },
  {
    songname: "All Eyez on Me",
    src: "Pac - All Eyez on Me (Lyrics) DJ Belite Remix.mp3",
    author: "2Pac",
    id: 2
  },
  {
    songname: "Hit Em Up",
    src: "Pac - Hit Em Up (Dirty) (Music Video) HD.mp3",
    author: "2Pac",
    id: 3
  },
  {
    songname: "Pretty Little Baby",
    src: "Connie Francis - Pretty Little Baby (Lyrics).mp3",
    author: "Connie Francis",
    id: 4
  },
  {
    songname: "Gims",
    src: "gims.mp3",
    author: "Gims",
    id: 5
  },
  {
    songname: "Mockingbird",
    src: "Eminem - Mockingbird (Lyrics).mp3",
    author: "Eminem",
    id: 6
  },
  {
    songname: "Superman",
    src: "Eminem - Superman.mp3",
    author: "Eminem",
    id: 7
  },
  {
    songname: "Without Me",
    src: "Eminem - Without Me (Audio).mp3",
    author: "Eminem",
    id: 8
  },
  {
    songname: "Godzilla",
    src: "Eminem ft. Juice WRLD - Godzilla (LYRICS) — Uproxx Music.mp3",
    author: "Eminem ft. Juice WRLD",
    id: 9
  },
  {
    songname: "Est-ce que tu m'aimes",
    src: "Gims - Est-ce que tu maimes  (ParolesLyrics).mp3",
    author: "Gims",
    id: 10
  },
  {
    songname: "Dernière Danse",
    src: "Indila - Dernière Danse (Clip Officiel).mp3",
    author: "Indila",
    id: 11
  },
  {
    songname: "MAGIE",
    src: "Maes - MAGIE.mp3",
    author: "Maes",
    id: 12
  },
  {
    songname: "Papaoutai",
    src: "Stromae - papaoutai (Official Video).mp3",
    author: "Stromae",
    id: 13
  }
]

const addedsongs = songs.map((song) => {
  return `
    <div class="music-card flex" id="song-${song.id}" onclick="playsong(${song.id})">
      <div class="flex">${song.id}</div>
      <div class="music-title">${song.author}</div>
      <div class="music-name">${song.songname}</div>
    </div>`
})

const music_playlist = document.getElementById('music-playlist')
music_playlist.innerHTML = addedsongs.join('')

let usercurrentdata = {
  songsuser: [...songs],
  currentTimeuser: null,
  currentSonguserid: [],
}

let isPlaying = false

pause_play.addEventListener('click', () => {
  if (!isPlaying) {
    spinner()
    let currentSongIndex
    if (usercurrentdata.currentSonguserid.length === 0) {
      currentSongIndex = 1
      usercurrentdata.currentSonguserid.push(currentSongIndex)
    } else {
      currentSongIndex = usercurrentdata.currentSonguserid[usercurrentdata.currentSonguserid.length - 1]
    }

    audio.src = `${songs[currentSongIndex - 1].src}`

    if (usercurrentdata.currentTimeuser !== null) {
      audio.currentTime = usercurrentdata.currentTimeuser
    }

    audio.play().then(() => {
      isPlaying = true
      pause_play.innerHTML = `<i class="fa-solid fa-pause fa-4x"></i>`
    })

    music_title.innerText = usercurrentdata.songsuser[currentSongIndex - 1].songname
    artist.innerText = usercurrentdata.songsuser[currentSongIndex - 1].author
  } else {
    audio.pause()
    usercurrentdata.currentTimeuser = audio.currentTime
    stop_spinner()
    pause_play.innerHTML = `<i class="fa-solid fa-play fa-4x"></i>`
    isPlaying = false
  }
})

function playsong(songid) {
  const isSameSong = usercurrentdata.currentSonguserid.at(-1) === songid

  if (!isSameSong) {
    audio.src = `${songs[songid - 1].src}`
    audio.currentTime = 0
    usercurrentdata.currentTimeuser = 0
    usercurrentdata.currentSonguserid.push(songid)
  } else if (usercurrentdata.currentTimeuser !== null) {
    audio.currentTime = usercurrentdata.currentTimeuser
  }

  audio.play().then(() => {
    isPlaying = true
    pause_play.innerHTML = `<i class="fa-solid fa-pause fa-4x"></i>`
  })

  music_title.innerText = usercurrentdata.songsuser[songid - 1].songname
  artist.innerText = usercurrentdata.songsuser[songid - 1].author

  spinner()

  const rightmusiccardid = document.getElementById(`song-${songid}`)
  rightmusiccardid.style.backgroundColor = "rgba(240, 248, 255, 0.24)"

  if (usercurrentdata.currentSonguserid.length > 1 && !isSameSong) {
    const previousId = usercurrentdata.currentSonguserid[usercurrentdata.currentSonguserid.length - 2]
    const recentmusiccard = document.getElementById(`song-${previousId}`)
    recentmusiccard.style.backgroundColor = "rgba(240, 248, 255, 0.052)"
  }

  usercurrentdata.currentTimeuser = audio.currentTime
}

function spinner() {
  const img = document.getElementsByTagName('img')[0]
  img.style.cssText = `animation: img-animation 10s linear infinite;`
}

function stop_spinner() {
  const img = document.getElementsByTagName('img')[0]
  img.style.cssText = `animation: none`
}

function forward() {
  audio.currentTime += 7
}

function backward() {
  audio.currentTime -= 7
}

const song_controller = document.getElementById('song-controller')
song_controller.min = 0
song_controller.max = 1
song_controller.value = 1
audio.volume = 1
song_controller.step = 0.05
song_controller.addEventListener('input', () => {
  audio.volume = song_controller.value
})
