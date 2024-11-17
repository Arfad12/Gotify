let currentSongIndex = 0; // Track the current song index
let currentSong = null; // To track the current song

// Define song list
const songList = [
    {
        path: 'Music/Minchagi.mp3',
        image: 'Image/Minchagi.jpg',
        name: 'Minchagi',
        artist: 'Sonu Nigam and V. Harikrishna'
    },
    {
        path: 'Music/Yen_Kadhal_Solla.mp3',
        image: 'Image/Yen_Kadhal_Solla.jpg',
        name: 'Yen Kadhal Solla',
        artist: 'Yuvan Shankar Raja, Tanvi Shah'
    },
    {
        path: 'Music/August_Diaries.mp3',
        image: 'Image/August_Diaries.jpg',
        name: 'August Diaries',
        artist: 'Dharia'
    },
    // Add more songs here...
];

// Function to play a song
function playSong(songPath, imagePath, songName, artistName) {
    const audioPlayer = document.getElementById("audioPlayer");
    const songImage = document.getElementById("songImage");
    const currentSongName = document.getElementById("currentSongName");
    const currentArtistName = document.getElementById("currentArtistName");
    const playPauseBtn = document.getElementById("playPauseBtn");

    console.log("Playing song:", songPath); // Debugging: Check the song path

    // Check if the same song is clicked
    if (currentSong === songPath) {
        console.log("Same song clicked, toggling play/pause"); // Debugging
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseBtn.innerHTML = `<img src="Icon/Pause.png" alt="Pause" height="50px" width="50px">`;
        } else {
            audioPlayer.pause();
            playPauseBtn.innerHTML = `<img src="Icon/Play.png" alt="Play" height="50px" width="50px">`;
        }
        return;
    }

    // Load the new song
    currentSong = songPath;
    audioPlayer.src = songPath;
    audioPlayer.play();

    // Update UI
    songImage.src = imagePath;
    currentSongName.textContent = songName;
    currentArtistName.textContent = artistName;
    playPauseBtn.innerHTML = `<img src="Icon/Pause.png" alt="Pause" height="30px" width="30px">`;

    // Reset progress slider and time
    document.getElementById("progressSlider").value = 0;
    document.getElementById("currentTime").textContent = "0:00";

    // Update duration when metadata is loaded
    audioPlayer.onloadedmetadata = () => {
        document.getElementById("duration").textContent = formatTime(audioPlayer.duration);
    };
}

// Format time in MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" + secs : secs}`;
}

// Update progress slider and current time
const audioPlayer = document.getElementById("audioPlayer");
audioPlayer.addEventListener("timeupdate", () => {
    const progressSlider = document.getElementById("progressSlider");
    const currentTime = document.getElementById("currentTime");

    progressSlider.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    currentTime.textContent = formatTime(audioPlayer.currentTime);
});

// Set progress when the slider is changed
function setProgress(value) {
    const audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.currentTime = (value / 100) * audioPlayer.duration;
}

// Play or pause when clicking the play button
document.getElementById("playPauseBtn").addEventListener("click", () => {
    if (!currentSong) {
        console.log("No song is selected to play"); // Debugging
        return; // Prevent action if no song is selected
    }

    console.log("Toggling play/pause for song:", currentSong); // Debugging
    const audioPlayer = document.getElementById("audioPlayer");
    if (audioPlayer.paused) {
        audioPlayer.play();
        document.getElementById("playPauseBtn").innerHTML = `<img src="Icon/Pause.png" alt="Pause" height="30px" width="30px">`;
    } else {
        audioPlayer.pause();
        document.getElementById("playPauseBtn").innerHTML = `<img src="Icon/Play.png" alt="Play" height="30px" width="30px">`;
    }
});

// Previous button functionality
const prevBtn = document.getElementById("prevBtn");
prevBtn.addEventListener("click", () => {
    if (currentSongIndex > 0) {
        currentSongIndex--;
        playSong(songList[currentSongIndex].path, songList[currentSongIndex].image, songList[currentSongIndex].name, songList[currentSongIndex].artist);
    } else {
        currentSongIndex = songList.length - 1; // Loop to the last song
        playSong(songList[currentSongIndex].path, songList[currentSongIndex].image, songList[currentSongIndex].name, songList[currentSongIndex].artist);
    }
});

// Next button functionality
const nextBtn = document.getElementById("nextBtn");
nextBtn.addEventListener("click", () => {
    if (currentSongIndex < songList.length - 1) {
        currentSongIndex++;
        playSong(songList[currentSongIndex].path, songList[currentSongIndex].image, songList[currentSongIndex].name, songList[currentSongIndex].artist);
    } else {
        currentSongIndex = 0; // Loop to the first song
        playSong(songList[currentSongIndex].path, songList[currentSongIndex].image, songList[currentSongIndex].name, songList[currentSongIndex].artist);
    }
});

// Volume visibility toggle logic
let isVolumeVisible = false;

// Show or hide the volume slider
function toggleVolumeSlider() {
    const volumeSliderWrapper = document.getElementById("volumeSliderWrapper");
    isVolumeVisible = !isVolumeVisible;
    volumeSliderWrapper.style.display = isVolumeVisible ? "block" : "none";
}

// Hide the volume slider when clicking outside of it
document.addEventListener("click", (event) => {
    const volumeIcon = document.querySelector(".volume-control img");
    const volumeSliderWrapper = document.getElementById("volumeSliderWrapper");

    if (
        isVolumeVisible &&
        !volumeSliderWrapper.contains(event.target) &&
        !volumeIcon.contains(event.target)
    ) {
        volumeSliderWrapper.style.display = "none";
        isVolumeVisible = false;
    }
});

// Adjust the volume when the slider is moved
function setVolume(value) {
    const audioPlayer = document.getElementById("audioPlayer");
    const volume = value / 100; // Convert slider value to 0.0–1.0 range
    audioPlayer.volume = volume; // Set audio player's volume

    console.log(`Volume set to: ${Math.round(volume * 100)}%`); // Debugging
}

// Ensure the volume slider shows vertical alignment
const volumeSlider = document.getElementById("volumeSlider");
volumeSlider.style.transform = "rotate(-90deg)"; // Rotate the slider to make it vertical
volumeSlider.style.width = "100px"; // Adjust size for vertical usage

// Add event listener to the volume slider
volumeSlider.addEventListener("input", (event) => {
    const value = event.target.value;
    setVolume(value); // Call setVolume when the slider is adjusted
});

