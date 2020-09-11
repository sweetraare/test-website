//global variables
let controller;
let slideScene;
let pageScene;

//selectors
const cursor = document.querySelector('.cursor');
const cursorText = cursor.querySelector('span');
const logo = document.querySelector('#logo');
const burgerMenu = document.querySelector('.burger');

const exploreButtons = document.querySelectorAll('.explore');

//functions
function animateSlides() {
  controller = new ScrollMagic.Controller();

  const slides = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");

  slides.forEach((slide, index, slides) => {
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");

    const slidesTimeline = gsap.timeline({
      defaults: {
        duration: 1,
        ease: "power1.inOut"
      }
    });

    slidesTimeline.fromTo(revealImg, {
      x: "0%"
    }, {
      x: "100%"
    });
    slidesTimeline.fromTo(img, {
      scale: 2
    }, {
      scale: 1
    }, "-=0.9");
    slidesTimeline.fromTo(revealText, {
      x: "0%"
    }, {
      x: "100%"
    }, "-=0.75");
    slidesTimeline.fromTo(nav, {
      y: "-100%"
    }, {
      y: "0%"
    }, "-=0.5");

    slideScene = new ScrollMagic.Scene({
        triggerElement: slide,
        triggerHook: 0.25,
        reverse: false
      })
      .addIndicators()
      .setTween(slidesTimeline)
      .addTo(controller);

    // page animation

    const pageTimeline = gsap.timeline();

    let nextSlide = index === slides.length - 1 ? "last" : slides[index + 1];

    pageTimeline.fromTo(nextSlide, {
      y: "0%"
    }, {
      y: "50%"
    });

    pageTimeline.fromTo(slide, {
      opacity: 1,
      scale: 1
    }, {
      opacity: 0,
      scale: 0.5
    });

    pageTimeline.fromTo(nextSlide, {
      y: "50%"
    }, {
      y: "0%"
    }, "-=0.5");

    pageScene = new ScrollMagic.Scene({
        triggerElement: slide,
        duration: "100%",
        triggerHook: 0
      })
      .setPin(slide, {
        pushFollowers: false
      })
      .addIndicators()
      .setTween(pageTimeline)
      .addTo(controller);
  });
}

function handleMouseMove(e) {

  cursor.style.top = `${e.pageY}px`;
  cursor.style.left = `${e.pageX}px`;
}

function handleMouseEnterLogo(e) {
  cursor.classList.add('active');
}

function handleMouseLeaveLogo(e) {
  cursor.classList.remove('active');
}

function handleMouseEnterExplore(e) {
  cursor.classList.add('active-explore');
  cursorText.innerText = 'TAP';
  gsap.to('.title-swipe', 1, {
    y: '0%'
  });
}

function handleMouseLeaveExplore(e) {
  cursor.classList.remove('active-explore');
  cursorText.innerText = '';
  gsap.to('.title-swipe', 1, {
    y: '100%'
  });

}

animateSlides();

//listeners
window.addEventListener('mousemove', handleMouseMove);

logo.addEventListener('mouseenter', handleMouseEnterLogo);
logo.addEventListener('mouseleave', handleMouseLeaveLogo);

burgerMenu.addEventListener('mouseenter', handleMouseEnterLogo);
burgerMenu.addEventListener('mouseleave', handleMouseLeaveLogo);

exploreButtons.forEach(exploreButton => {
  exploreButton.addEventListener('mouseenter', handleMouseEnterExplore);
  exploreButton.addEventListener('mouseleave', handleMouseLeaveExplore);

});