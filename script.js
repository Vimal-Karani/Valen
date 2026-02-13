const introLayer = document.getElementById('introLayer');
const envelopeBtn = document.getElementById('envelopeBtn');
const letterPanel = document.getElementById('letterPanel');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const ctaRow = document.getElementById('ctaRow');
const afterYes = document.getElementById('afterYes');
const questionLine = document.getElementById('questionLine');
const subtitleLine = document.getElementById('subtitleLine');
const mainTitle = document.querySelector('.main-title');
const reasonBtn = document.getElementById('reasonBtn');
const reasonText = document.getElementById('reasonText');
const musicPlayer = document.getElementById('musicPlayer');
const record = document.getElementById('record');
const musicToggle = document.getElementById('musicToggle');
const prevTrack = document.getElementById('prevTrack');
const nextTrack = document.getElementById('nextTrack');
const trackCount = document.getElementById('trackCount');
const trackName = document.getElementById('trackName');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const progressBar = document.getElementById('progressBar');
const bgMusic = document.getElementById('bgMusic');
const fallingFlowers = document.getElementById('fallingFlowers');

const tracks = [
  { name: 'Tum Hi Ho ♡', src: 'music/track-17-only-you.mp3' },

  { name: 'Chiggy Wiggy ♡', src: 'music/track-03-playful-nights.mp3' },
  { name: 'Company ♡', src: 'music/track-04-your-company.mp3' },
  { name: 'Dus Bahane ♡', src: 'music/track-05-stolen-moments.mp3' },
  { name: 'Enna Sona ♡', src: 'music/track-06-you-feel-like-home.mp3' },
  { name: 'Janam Janam ♡', src: 'music/track-07-across-lifetimes.mp3' },
  { name: 'Jo Tum Saath Ho ♡', src: 'music/track-08-with-you.mp3' },
  { name: 'Kaho Na Kaho ♡', src: 'music/track-09-whispered-things.mp3' },
  { name: 'Khamoshiyan ♡', src: 'music/track-10-in-the-silence.mp3' },
  { name: 'Maahi ♡', src: 'music/track-11-my-constant.mp3' },
  { name: 'Milne Hai Mujhse Aayi ♡', src: 'music/track-12-longing.mp3' },
  { name: 'Sawan Aaya Hai ♡', src: 'music/track-13-when-it-rains.mp3' },
  { name: 'Suno Na Sangemarmar ♡', src: 'music/track-14-listen-close.mp3' },
  { name: 'Tarasti Hain Nigahain ♡', src: 'music/track-15-waiting-eyes.mp3' },
  { name: 'The Humma Song ♡', src: 'music/track-16-late-night-energy.mp3' },
  { name: 'Ye Tune Kya Kiya ♡', src: 'music/track-18-you-changed-me.mp3' },
  { name: 'Yeh Jism ♡', src: 'music/track-19-after-dark.mp3' }
];

function playWithDelay(delayMs = 10000) {
  setTimeout(() => {
    if (!playing) {
      playCurrentTrack();
    }
  }, delayMs);
}





const fallingIcons = ['🌹', '🌺', '🌸', '💗', '💖', '💘', '🖤', '❤️', '✨'];


let noEscapes = 0;
let playing = false;
let lastNoMoveAt = 0;
let currentTrack = 0;
let noButtonInitialized = false;

bgMusic.volume = 0.4;

// --- subtle UI sounds (very soft, emotional) ---
const paperSound = new Audio("sounds/paper-rustle.mp3");
paperSound.volume = 0.25;

const yesSound = new Audio("sounds/soft-chime.mp3");
yesSound.volume = 0.35;

let yesSoundPlayed = false;


function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function updateProgress() {
  if (!Number.isFinite(bgMusic.duration)) return;
  const percent = (bgMusic.currentTime / bgMusic.duration) * 100;
  progressBar.value = `${percent}`;
  currentTimeEl.textContent = formatTime(bgMusic.currentTime);
  durationEl.textContent = formatTime(bgMusic.duration);
}

function setupTrackPicker() {
  bgMusic.src = tracks[0].src;
  trackName.textContent = tracks[0].name;
  trackCount.textContent = `1 / ${tracks.length}`;
}

function setNoInitialPosition() {
  const area = ctaRow.getBoundingClientRect();
  const top = Math.max(8, (area.height - noBtn.offsetHeight) / 2);
  noBtn.style.left = '0px';
  noBtn.style.top = `${top}px`;
  noButtonInitialized = true;
}

function moveNoButton() {
  if (!noButtonInitialized) setNoInitialPosition();

  const now = Date.now();
  if (now - lastNoMoveAt < 420) return;
  lastNoMoveAt = now;

  const area = ctaRow.getBoundingClientRect();
  const maxX = Math.max(20, area.width - noBtn.offsetWidth - 20);
  const maxY = Math.max(16, area.height - noBtn.offsetHeight - 4);

  const nextX = 12 + Math.random() * (maxX - 12);
  const nextY = 8 + Math.random() * Math.max(12, maxY - 8);

  noBtn.style.left = `${nextX}px`;
  noBtn.style.top = `${nextY}px`;

  noEscapes += 1;
  if (noEscapes > 5) noBtn.textContent = 'Haila 👻';
  if (noEscapes > 10) noBtn.textContent = 'Rose, Surrender your heart 💕';
}

function spawnFallingItems(total = 34) {
  for (let i = 0; i < total; i += 1) {
    const item = document.createElement('span');
    item.className = 'falling-item';
    item.textContent = fallingIcons[Math.floor(Math.random() * fallingIcons.length)];
    item.style.left = `${Math.random() * 100}vw`;
    item.style.fontSize = `${0.85 + Math.random() * 1.5}rem`;
    item.style.animationDuration = `${7 + Math.random() * 8}s`;
    item.style.animationDelay = `${-Math.random() * 12}s`;
    item.style.setProperty('--drift', `${Math.random() * 22 - 11}vw`);
    fallingFlowers.appendChild(item);
  }
}

function burstHearts() {
  for (let i = 0; i < 20; i += 1) {
    const heart = document.createElement('span');
    heart.textContent = ['💖', '💘', '💝', '💗', '🌹'][Math.floor(Math.random() * 5)];
    heart.style.position = 'fixed';
    heart.style.left = `${50 + (Math.random() * 40 - 20)}vw`;
    heart.style.top = `${55 + (Math.random() * 20 - 10)}vh`;
    heart.style.fontSize = `${1 + Math.random() * 1.6}rem`;
    heart.style.zIndex = '6';
    heart.style.pointerEvents = 'none';
    heart.style.transition = 'all 1.3s ease-out';
    document.body.appendChild(heart);
    requestAnimationFrame(() => {
      heart.style.opacity = '0';
      heart.style.transform = `translate(${Math.random() * 220 - 110}px, ${-120 - Math.random() * 160}px)`;
    });
    setTimeout(() => heart.remove(), 1300);
  }
}

function generateHiddenHearts() {
  // Prevent duplicates
  if (letterPanel.querySelector('.hidden-heart')) return;

  const heartCount = Math.min(6, hiddenNotes.length);
  const letterRect = letterPanel.getBoundingClientRect();

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement('button');
    heart.className = 'hidden-heart';
    heart.textContent = '💗';

    // Position INSIDE the letter
    const padding = 40;
    const maxX = letterRect.width - padding * 2;
    const maxY = letterRect.height - padding * 2;

    heart.style.left = `${padding + Math.random() * maxX}px`;
    heart.style.top = `${padding + Math.random() * maxY}px`;

    heart.addEventListener('click', () => {
  // 💗 animate heart away
  heart.classList.add('clicked');

  // ✨ sparkle effect
  const sparkle = document.createElement('span');
  sparkle.textContent = '✨';
  sparkle.style.position = 'absolute';
  sparkle.style.left = '50%';
  sparkle.style.top = '50%';
  sparkle.style.transform = 'translate(-50%, -50%)';
  sparkle.style.fontSize = '1.2rem';
  sparkle.style.pointerEvents = 'none';
  sparkle.style.animation = 'heartSparkle 0.6s ease-out forwards';

  heart.appendChild(sparkle);

  // 🧹 cleanup
  setTimeout(() => {
    heart.remove();
  }, 600);
});


    letterPanel.appendChild(heart);
  }
}


function loadTrack(index) {
  currentTrack = (index + tracks.length) % tracks.length;
  bgMusic.src = tracks[currentTrack].src;
  bgMusic.load();
  trackName.textContent = tracks[currentTrack].name;
  trackCount.textContent = `${currentTrack + 1} / ${tracks.length}`;
}

function setPlayingState(isPlaying) {
  playing = isPlaying;
  if (playing) {
    musicPlayer.classList.add('playing');
    musicToggle.textContent = '⏸️';
  } else {
    musicPlayer.classList.remove('playing');
    musicToggle.textContent = '▶️';
  }
}

function playCurrentTrack() {
  bgMusic.play().then(() => {
    setPlayingState(true);
  }).catch(() => {
    // no-op: user can retry play or pick next
  });
}

envelopeBtn.addEventListener("click", () => {
  const stamp = document.getElementById("heartStamp");

  // Prevent double-clicks
  if (envelopeBtn.classList.contains("open")) return;

  // 1️⃣ Release the heart stamp
  if (stamp) {
    stamp.classList.add("release");
  }

  // 2️⃣ After stamp fades, open envelope
  setTimeout(() => {
    envelopeBtn.classList.add("flap-open");
  }, 650);

  // 3️⃣ Existing reveal logic (UNCHANGED, just delayed)
  setTimeout(() => {
    introLayer.classList.add("fade-out");
    introLayer.style.zIndex = "-1";

    setTimeout(() => {
      letterPanel.classList.remove("hidden");
      requestAnimationFrame(() => {
        letterPanel.classList.add("visible");
      });

      // 📄 soft paper rustle (once)
      paperSound.currentTime = 0;
      paperSound.play().catch(() => {});
      setNoInitialPosition();
    }, 500);

  }, 1050);

  setTimeout(() => {
    introLayer.remove();
  }, 2600);
});



noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('click', (e) => {
  e.preventDefault();
  moveNoButton();
});

ctaRow.addEventListener('mousemove', (event) => {
  const rect = noBtn.getBoundingClientRect();
  const distance = Math.hypot(event.clientX - (rect.left + rect.width / 2), event.clientY - (rect.top + rect.height / 2));
  if (distance < 95) moveNoButton();
});

window.addEventListener('resize', () => {
  if (noBtn.style.display !== 'none') setNoInitialPosition();
});

yesBtn.addEventListener('click', () => {

  if (!yesSoundPlayed) {
    yesSoundPlayed = true;
    yesSound.currentTime = 0;
    yesSound.play().catch(() => {});
  }

  // 👇 ADD THESE LINES
  document.getElementById('letterContent')?.classList.add('hidden');
  document.getElementById('compactHeader')?.classList.remove('hidden');
  // Switch letter into post-yes mode (remove header section)
  letterPanel.classList.add('after-yes-mode');

  afterYes.classList.remove('hidden');
  yesBtn.textContent = 'Chosen forever 💍';
  yesBtn.disabled = true;
  yesBtn.classList.add('chosen-center');
  noBtn.style.display = 'none';

  questionLine.classList.add('hidden-line');
  subtitleLine.classList.add('hidden-line');
  mainTitle.classList.add('compact');

  burstHearts();
  generateHiddenHearts();
  playWithDelay(10000); // 10 seconds

});


musicToggle.addEventListener('click', () => {
  if (playing) {
    bgMusic.pause();
    setPlayingState(false);
  } else {
    playCurrentTrack();
  }
});

prevTrack.addEventListener('click', () => {
  loadTrack(currentTrack - 1);
  if (playing) playCurrentTrack();
});

nextTrack.addEventListener('click', () => {
  loadTrack(currentTrack + 1);
  if (playing) playCurrentTrack();
});

progressBar.addEventListener('input', () => {
  if (!Number.isFinite(bgMusic.duration)) return;
  const nextTime = (Number(progressBar.value) / 100) * bgMusic.duration;
  bgMusic.currentTime = nextTime;
});

bgMusic.addEventListener('timeupdate', updateProgress);

bgMusic.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(bgMusic.duration);
  updateProgress();
});

bgMusic.addEventListener('ended', () => {
  loadTrack(currentTrack + 1);
  playCurrentTrack();
});


const unlockBtn = document.getElementById('unlockAttraction');
const attractionList = document.getElementById('attractionList');

if (unlockBtn && attractionList) {
  const attractionItems = attractionList.querySelectorAll('li');

  unlockBtn.addEventListener('click', () => {
    unlockBtn.style.opacity = '0';
    unlockBtn.style.pointerEvents = 'none';

    attractionList.classList.remove('hidden');

    attractionItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('visible');
      }, index * 900); // slow, intentional pacing
    });
  });
}

// ❤️ Repeatable 5-click heart bounce
let nameHeartClickCount = 0;

document.addEventListener('click', (e) => {
  const heart = e.target.closest('#compactHeader .heart');
  if (!heart) return;

  nameHeartClickCount++;

  if (nameHeartClickCount % 5 === 0) {
    // retrigger animation cleanly
    heart.classList.remove('bounce');
    void heart.offsetWidth; // force reflow
    heart.classList.add('bounce');
  }
});


setupTrackPicker();
spawnFallingItems();
updateProgress();

letterPanel.classList.remove('heart-found');
void letterPanel.offsetWidth;
letterPanel.classList.add('heart-found');


// 🔔 Time-based presence note (show once after ~60s)
// Reworked to run after DOMContentLoaded and with logging + test mode
// 🔔 Time-based presence note (show once after ~40s)
(function setupPresenceNote() {
  const PRESENCE_DELAY_MS = 40 * 1000; // 40 seconds
  const PRESENCE_SHOW_MS = 10 * 1000;  // show for 10 seconds

  const TEST_MODE = false; // 🚀 production mode

  function showNoteOnce(note) {
    if (!note) return;
    note.classList.add('show');

    setTimeout(() => {
      note.classList.remove('show');
    }, PRESENCE_SHOW_MS);
  }

  window.addEventListener('DOMContentLoaded', () => {
    const note = document.getElementById('presenceNote');
    if (!note) return;

    if (TEST_MODE) return;

    const presenceTimer = setTimeout(() => {
      showNoteOnce(note);
    }, PRESENCE_DELAY_MS);

    window.addEventListener('beforeunload', () =>
      clearTimeout(presenceTimer)
    );
  });
})();







