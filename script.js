const playlistContainerTag = document.getElementsByClassName(
    "playlistContainer"
)[0];

const currentAndTotelTag = document.getElementsByClassName(
    "currentAndTotel"
)[0];

const currentProgressTag = document.getElementById("currentProgress");
const audioTag = document.getElementsByClassName("audioTag")[0];
const playButtonTag = document.getElementsByClassName("playButton")[0];
const pauseButtonTag = document.getElementsByClassName("pauseButton")[0];
const previousButtonTag = document.getElementsByClassName("previousButton")[0];
const nextButtonTag = document.getElementsByClassName("nextButton")[0];

const tracks = [
    { trackId: "music/track1.mp3", title: "Bunny Phyo ft Ki Ki - Birthday" },
    { trackId: "music/track2.mp3", title: "John Legend - All of me" },
    { trackId: "music/track3.mp3", title: "Lewis Capaldi - Someone You Loved" },
    { trackId: "music/track4.mp3", title: "Wine WIne - A chit bird" },
];

for (let i=0; i < tracks.length; i++) {
    const trackTag = document.createElement("div");
    trackTag.addEventListener("click", () => {
        const trackId = tracks[i].trackId;
        audioTag.src = trackId;
        audioTag.play();
        isPlaying = true;
        updatePlayAndPauseButton();
    });
    trackTag.classList.add("trackItem");
    const title = (i + 1).toString() +". "+ tracks[i].title;
    trackTag.textContent = title;
    playlistContainerTag.append(trackTag);
}

let durationText = "00:00"
let duration = 0
audioTag.addEventListener("loadeddata", () => {
    duration = Math.floor(audioTag.duration);
    durationText = createMinuteAndSecondText(duration);
});

audioTag.addEventListener("timeupdate", () => {
    const currentTime = Math.floor(audioTag.currentTime);
    const currentTimeText = createMinuteAndSecondText(currentTime);
    const currentTimeTextAndDurationText = currentTimeText + " / " + durationText;
    currentAndTotelTag.textContent = currentTimeTextAndDurationText;
    updateCurrentProgress(currentTime);
});

updateCurrentProgress = (currentTime) => {
    const currentProgressWidth = (500/duration) * currentTime; 
    currentProgressTag.style.width = currentProgressWidth.toString() + "px"; 
}

const createMinuteAndSecondText = (totalsecond) => {
    const minutes = Math.floor(totalsecond/60);
    const seconds = totalsecond%60;

    const minuteText = minutes < 10 ? "0" + minutes.toString() : minutes;
    const secondText = seconds < 10 ? "0" + seconds.toString() : seconds;
    return minuteText + ":" + secondText;
}

let currentPlayingIndex = 0
let isPlaying = false;
playButtonTag.addEventListener("click", () => {
    const currentTime = Math.floor(audioTag.currentTime);
    isPlaying = true;
    if (currentTime === 0) {
        const songIdToPlay = tracks[currentPlayingIndex].trackId;
    audioTag.src = songIdToPlay   ;
    audioTag.play();
    updatePlayAndPauseButton();
    } else {
        audioTag.play();
        updatePlayAndPauseButton();
    }
    
});

pauseButtonTag.addEventListener("click", () => {
    isPlaying = false;
    audioTag.pause();
    updatePlayAndPauseButton();
});

previousButtonTag.addEventListener("click", () => {
    if (currentPlayingIndex === 0) {
        return;
    }
    currentPlayingIndex -= 1;
    const songIdToPlay = tracks[currentPlayingIndex].trackId;
    audioTag.src = songIdToPlay;
    audioTag.play();
    isPlaying = true;
    updatePlayAndPauseButton();
});

nextButtonTag.addEventListener("click", () => {
    if (currentPlayingIndex === tracks.length - 1) {
        return;
    }
    currentPlayingIndex += 1;
    const songIdToPlay = tracks[currentPlayingIndex].trackId;
    audioTag.src = songIdToPlay;
    audioTag.play();
    isPlaying = true;
    updatePlayAndPauseButton();
});

updatePlayAndPauseButton = () => {
    if (isPlaying) {
        playButtonTag.style.display = "none";
        pauseButtonTag.style.display = "inline";
    } else {
        playButtonTag.style.display = "inline";
        pauseButtonTag.style.display = "none";
    }
};

/* 

    100s = 500px
    1s = 500px/100s = 5px

*/