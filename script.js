let currentIndex = 0;
const slider = document.getElementById("slider");
const totalSlides = slider.children.length;
let autoSlideInterval;
const dotsContainer = document.getElementById("dots-container");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

// Create floating hearts
function createHeart() {
  const heart = document.createElement('div');
  heart.innerHTML = '♥';
  heart.className = 'floating-heart';
  heart.style.left = Math.random() * 100 + 'vw';
  document.body.appendChild(heart);
  
  heart.addEventListener('animationend', () => {
    heart.remove();
  });
}

// Generate hearts periodically
setInterval(createHeart, 300);

// Create dots for navigation
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => {
    goToSlide(i);
  });
  dotsContainer.appendChild(dot);
}

// Initialize slider
function initSlider() {
  const images = document.querySelectorAll('.slide img');
  const imagePromises = Array.from(images).map(img => {
    if (img.complete) return Promise.resolve();
    return new Promise(resolve => {
      img.onload = img.onerror = resolve;
    });
  });

  Promise.all(imagePromises).then(() => {
    startAutoSlide();
  });
}

// Navigation functions
function updateSlider() {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
}

function goToSlide(index) {
  currentIndex = index;
  updateSlider();
  resetAutoSlide();
}

function goToNextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlider();
  resetAutoSlide();
}

function goToPrevSlide() {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateSlider();
  resetAutoSlide();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(goToNextSlide, 5000);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// Add event listeners for navigation
nextBtn.addEventListener("click", goToNextSlide);
prevBtn.addEventListener("click", goToPrevSlide);

// Swipe functionality for mobile
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

slider.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  if (touchEndX < touchStartX - swipeThreshold) {
    goToNextSlide();
  } else if (touchEndX > touchStartX + swipeThreshold) {
    goToPrevSlide();
  }
}

// Contador desde data
const end = new Date("Sep 06, 2024 22:30:00").getTime();

function updateCounter() {
  const now = new Date().getTime();
  const diff = now - end;

  let day = Math.floor(diff / (1000 * 3600 * 24));
  let hour = Math.floor((diff % (1000 * 3600 * 24)) / (1000 * 3600));
  let min = Math.floor((diff % (1000 * 3600)) / (1000 * 60));
  let sec = Math.floor((diff % (1000 * 60)) / 1000);

  day = day < 10 ? "0" + day : day;
  hour = hour < 10 ? "0" + hour : hour;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;

  document.getElementById("count").innerText = `${day} dias ${hour}:${min}:${sec}`;
}

setInterval(updateCounter, 1000);
updateCounter();

window.addEventListener('load', initSlider);
