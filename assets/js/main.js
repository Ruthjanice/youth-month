const toggles = document.querySelectorAll('.toggle');


function showText() {
  toggles.forEach((element) => {
      element.classList.toggle('active');
  });
}


(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   * About bug here
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  // /**
  //  * Initiate portfolio lightbox 
  //  */
  // const portfolioLightbox = GLightbox({
  //   selector: '.portfolio-lightbox'
  // });

  // /**
  //  * Portfolio details slider
  //  */
  // new Swiper('.portfolio-details-slider', {
  //   speed: 400,
  //   loop: true,
  //   autoplay: {
  //     delay: 5000,
  //     disableOnInteraction: false
  //   },
  //   pagination: {
  //     el: '.swiper-pagination',
  //     type: 'bullets',
  //     clickable: true
  //   }
  // });

  // /**
  //  * Testimonials slider
  //  */
  // new Swiper('.testimonials-slider', {
  //   speed: 600,
  //   loop: true,
  //   autoplay: {
  //     delay: 5000,
  //     disableOnInteraction: false
  //   },
  //   slidesPerView: 'auto',
  //   pagination: {
  //     el: '.swiper-pagination',
  //     type: 'bullets',
  //     clickable: true
  //   },
  //   breakpoints: {
  //     320: {
  //       slidesPerView: 1,
  //       spaceBetween: 20
  //     },

  //     1200: {
  //       slidesPerView: 3,
  //       spaceBetween: 20
  //     }
  //   }
  // });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()


const LButton = document.querySelector('.carousel__button--left');
const RButton = document.querySelector('.carousel__button--right');


// const midIndex = Math.floor(slides.length / 2);
// const midElement = slides[midIndex];
// let slideIndex = midIndex;
// console.log(slideIndex);

// track.style.transform = 'translateX(-' + width * slideIndex + 'px)';
// midElement.classList.add('current-slide');

// Initialise play the carousel
// need to make this variable from DOM
var directionForward = true;
const slideTimeInMs = 3000;
var carouselPaused = false;
let slideIndex = midIndex + 1;
var width = slideWidth;



function sleep(ms) {
    if (carouselPaused == true) { return 0 }
    else {
        return new Promise(resolve => setTimeout(resolve, ms));
    };
};


function AutoSlideScroll() {
    // console.log(slideIndex);
    if (slideIndex >= slides.length - 1) { slideIndex = slides.length - 1; }
    else if (slideIndex <= 0) { slideIndex = 0; };

    if (directionForward === true) {
        track.style.transform = 'translateX(-' + width * slideIndex + 'px)';
        if (slideIndex >= 1) {
            slides[slideIndex].classList.add('current-slide');
            slides[slideIndex - 1].classList.remove('current-slide');
        } else {
            slides[slideIndex].classList.add('current-slide');
            slides[slideIndex + 1].classList.remove('current-slide');
        }
    } else {
        if (slideIndex >= slides.length - 1) {
            slides[slideIndex].classList.add('current-slide');
            slides[slideIndex - 1].classList.remove('current-slide');
        } else {
            slides[slideIndex].classList.add('current-slide');
            slides[slideIndex + 1].classList.remove('current-slide');
        }
        track.style.transform = 'translateX(-' + width * slideIndex + 'px)';
    }
};

function manualSlideScroll() {
    AutoSlideScroll();
}

async function InitializeSlides() {
    while (!document.hidden && carouselPaused === false) {
        if (slideIndex < slides.length - 1 && directionForward === true) {
            await sleep(slideTimeInMs);
            AutoSlideScroll();
            slideIndex++;
        } else {
            await sleep(slideTimeInMs);
            AutoSlideScroll();
            slideIndex--;
            if (slideIndex === 0) { directionForward = true; }
            else { directionForward = false; };
        }
    }
    // console.log('Done sliding for now');
}

InitializeSlides();

// This won't work as intended = bugs noted TODO: make this efficient.
track.addEventListener("visibilitychange", () => {
    if (track.visibilityState === 'hidden') {
        carouselPaused = true;
    } else if (track.visibilityState === 'visible' && document.activeElement !== LButton && document.activeElement !== RButton) {
        carouselPaused = false;
        InitializeSlides();
    } else if (track.visibilityState === 'visible' && carouselPaused === true) {
        async function awaitResume() {
            await sleep(4000);
            carouselPaused = false;
            InitializeSlides();
        }
        awaitResume();
    }
});


// Check if user has pressed any of the buttons so that carousel can pause
// Use currentSlideindex - get it from the async function so that it's more responsive - if possible
LButton.addEventListener('click', () => {
    carouselPaused = true;
    directionForward = false;

    manualSlideScroll();
    slideIndex--;
    // console.log('clicked');
});

RButton.addEventListener('click', () => {
    carouselPaused = true;
    directionForward = true;

    manualSlideScroll();
    slideIndex++;
    // console.log('clicked');
});
