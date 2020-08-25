let controller;
let slideScene;

function animateSlides() {
  controller = new ScrollMagic.Controller();

  const slides = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");

  slides.forEach((slide) => {
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");

    const slidesTimeline = gsap.timeline({
      defaults: {
        duration: 1,
        ease: "power1.inOut"
      }
    });

    slidesTimeline.fromTo(revealImg, { x: "0%" }, { x: "100%" });
    slidesTimeline.fromTo(img, { scale: 2 }, { scale: 1 }, "-=0.9");
    slidesTimeline.fromTo(revealText, { x: "0%" }, { x: "100%" }, "-=0.75");
    slidesTimeline.fromTo(nav, { y: "-100%" }, { y: "0%" }, "-=0.5");
  });
}

animateSlides();
