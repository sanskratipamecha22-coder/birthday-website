/* ============================================
   SIDDHI'S BIRTHDAY WEBSITE - PREMIUM SCRIPTS
   ============================================ */

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initFloatingElements();
    initMusicToggle();
});

// ============================================
// LOADER
// ============================================

function initLoader() {
    const loader = document.getElementById('loader');
    
    setTimeout(() => {
        loader.classList.add('hidden');
        startFloatingAnimation();
    }, 2500);
}

// ============================================
// SCREEN NAVIGATION
// ============================================

let currentScreen = 1;

function goToScreen(screenNumber) {
    const currentEl = document.getElementById(`screen${currentScreen}`);
    const nextEl = document.getElementById(`screen${screenNumber}`);
    
    if (currentEl && nextEl) {
        currentEl.classList.remove('active');
        nextEl.classList.add('active');
        currentScreen = screenNumber;
        
        // Trigger screen-specific animations
        if (screenNumber === 5) {
            setTimeout(startTypingAnimation, 500);
        }
        
        // Try to play music on first interaction
        tryPlayMusic();
    }
}

// ============================================
// FLOATING ELEMENTS (Anti-gravity effect)
// ============================================

const floatingEmojis = ['💖', '✨', '🦋', '🎈', '💕', '🌸', '💗', '🎀', '💜', '🤍', '🩷', '🫧'];

function initFloatingElements() {
    // Pre-create some elements
    for (let i = 0; i < 15; i++) {
        setTimeout(() => createFloatingElement(), i * 200);
    }
}

function startFloatingAnimation() {
    // Continuously create floating elements
    setInterval(createFloatingElement, 800);
}

function createFloatingElement() {
    const container = document.getElementById('floating-elements');
    const element = document.createElement('div');
    element.className = 'floating-item';
    element.textContent = floatingEmojis[Math.floor(Math.random() * floatingEmojis.length)];
    
    // Random position and properties
    element.style.left = Math.random() * 100 + 'vw';
    element.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
    element.style.animationDuration = (Math.random() * 10 + 10) + 's';
    element.style.animationDelay = Math.random() * 2 + 's';
    element.style.opacity = Math.random() * 0.5 + 0.3;
    
    container.appendChild(element);
    
    // Remove after animation completes
    setTimeout(() => {
        element.remove();
    }, 25000);
}

// ============================================
// MUSIC CONTROL
// ============================================

let musicStarted = false;

function initMusicToggle() {
    const toggle = document.getElementById('musicToggle');
    const audio = document.getElementById('bgMusic');
    
    toggle.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().catch(() => {});
            toggle.classList.remove('muted');
        } else {
            audio.pause();
            toggle.classList.add('muted');
        }
    });
}

function tryPlayMusic() {
    if (musicStarted) return;
    
    const audio = document.getElementById('bgMusic');
    const toggle = document.getElementById('musicToggle');
    
    audio.volume = 0.4;
    audio.play().then(() => {
        musicStarted = true;
        toggle.classList.remove('muted');
    }).catch(() => {
        // Auto-play blocked, user needs to click toggle
        toggle.classList.add('muted');
    });
}

// ============================================
// TYPING ANIMATION (Letter Screen)
// ============================================

const letterContent = `Thank you for always being there for me 💌

You make my life so beautiful 💖

I'm so lucky to have you as my sister, and vice versa 😄

You are truly the best, and you already know that!

Even though you're my elder sister, sometimes I love being your little mentor too 😜

And yes, I know you're a little scared of me — but I love that 😂

You deserve everything in this world, and I really hope you get it all.

The way you care for me is incredible.

Honestly, I can't fully express my love for you in words, but this is just a small gesture from my side 💕

Always remember — I am always with you 🌸`;

let typingIndex = 0;
let typingInterval;

function startTypingAnimation() {
    const textElement = document.getElementById('typedLetter');
    const letterBtn = document.getElementById('letterBtn');
    const cursor = document.querySelector('.typing-cursor');
    
    textElement.textContent = '';
    typingIndex = 0;
    
    typingInterval = setInterval(() => {
        if (typingIndex < letterContent.length) {
            textElement.textContent += letterContent[typingIndex];
            typingIndex++;
        } else {
            clearInterval(typingInterval);
            cursor.style.display = 'none';
            letterBtn.style.display = 'inline-flex';
            letterBtn.style.animation = 'fadeUp 0.5s ease-out';
        }
    }, 40);
}

// ============================================
// CANDLE / FINALE
// ============================================

function blowCandles() {
    const flames = document.querySelectorAll('.flame');
    const blowBtn = document.getElementById('blowBtn');
    const finalMessage = document.getElementById('finalMessage');
    
    // Blow out candles
    flames.forEach((flame, index) => {
        setTimeout(() => {
            flame.classList.add('blown');
        }, index * 200);
    });
    
    // Hide button
    blowBtn.style.opacity = '0';
    blowBtn.style.pointerEvents = 'none';
    
    // Start celebration
    setTimeout(() => {
        finalMessage.classList.add('show');
        startCelebration();
        tryPlayMusic();
    }, 1000);
}

// ============================================
// CONFETTI & CELEBRATION
// ============================================

function startCelebration() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confetti = [];
    const colors = ['#ff6b9d', '#c9a7eb', '#fcb69f', '#ffd6e0', '#fff', '#ffacc7'];
    
    // Create confetti particles
    for (let i = 0; i < 200; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 10 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedY: Math.random() * 3 + 2,
            speedX: Math.random() * 2 - 1,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confetti.forEach(c => {
            ctx.save();
            ctx.translate(c.x, c.y);
            ctx.rotate(c.rotation * Math.PI / 180);
            ctx.fillStyle = c.color;
            ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 0.6);
            ctx.restore();
            
            c.y += c.speedY;
            c.x += c.speedX;
            c.rotation += c.rotationSpeed;
            
            if (c.y > canvas.height) {
                c.y = -20;
                c.x = Math.random() * canvas.width;
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Add extra hearts burst
    burstHearts();
}

function burstHearts() {
    const container = document.getElementById('floating-elements');
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-item';
            heart.textContent = ['💖', '💕', '💗', '🩷', '❤️'][Math.floor(Math.random() * 5)];
            heart.style.left = (40 + Math.random() * 20) + 'vw';
            heart.style.bottom = '0';
            heart.style.fontSize = (Math.random() * 2 + 1.5) + 'rem';
            heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
            container.appendChild(heart);
            
            setTimeout(() => heart.remove(), 10000);
        }, i * 100);
    }
}

// ============================================
// RESIZE HANDLER
// ============================================

window.addEventListener('resize', () => {
    const canvas = document.getElementById('confettiCanvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});
