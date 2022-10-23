import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  navbarlinks: any;
  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
   selectHeader = this.select('#header')
  /**
   * Back to top button
   */
   backtotop = this.select('.back-to-top')
   
   constructor() { }

  ngOnInit(): void {
  /**
   * Navbar links active state on scroll
   */
   this.navbarlinks = this.select('#navbar .scrollto', true);
   window.addEventListener('load', this.navbarlinksActive);
   this.onscroll(document, this.navbarlinksActive);
   
   if (this.selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        this.selectHeader.classList.add('header-scrolled')
      } else {
        this.selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    this.onscroll(document, headerScrolled)
  }   

  if (this.backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        this.backtotop.classList.add('active')
      } else {
        this.backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    this.onscroll(document, toggleBacktotop)
  }


    
  /**
   * Mobile nav toggle
   */
   this.on('click', '.mobile-nav-toggle', function(e: any) {
    this.select('#navbar').classList.toggle('navbar-mobile')
    .classList.toggle('bi-list')
    .classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  this.on('click', '.navbar .dropdown > a', function(e: any) {
    if (this.select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  this.on('click', '.scrollto', function(e: any) {
    if (this.select(this.hash)) {
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
      if (this.select(window.location.hash)) {
        this.scrollto(window.location.hash)
      }
    }
  });

    /**
   * Porfolio isotope and filter
   */
     window.addEventListener('load', () => {
      let portfolioContainer = this.select('.portfolio-container');
      if (portfolioContainer) {
        let portfolioIsotope = new Isotope(portfolioContainer, {
          itemSelector: '.portfolio-item'
        });
  
        let portfolioFilters = this.select('#portfolio-flters li', true);
  
        this.on('click', '#portfolio-flters li', function(e: any) {
          e.preventDefault();
          portfolioFilters.forEach(function(el: any) {
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
  
}
  
  /**
   * Easy selector helper function
   */
  select(el: any, all = false) {
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
  on(type: any, el: any, listener: any, all = false) {
    let selectEl = this.select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach((elem: any) => elem.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  onscroll(el: any, listener: any) {
    el.addEventListener('scroll', listener)
  }


  navbarlinksActive() {
    let position = window.scrollY + 200
    this.navbarlinks.forEach((navbarlink: any) => {
      if (!navbarlink.hash) return
      let section = this.select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }

  
  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el: any) => {
    let header = this.select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = this.select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  



  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

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

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();



}
