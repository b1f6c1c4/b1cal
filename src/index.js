const { $ } = window;

// Document on load.
$(() => {
  $('.owl-carousel').owlCarousel({
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    autoplay: true,
    loop: true,
    margin: 0,
    nav: true,
    dots: false,
    autoHeight: true,
    mouseDrag: false,
    autoplayHoverPause: true,
    items: 1,
    navText: [
      "<span class='owl-direction'>&lt;</span>",
      "<span class='owl-direction'>&gt;</span>",
    ],
  });
});
