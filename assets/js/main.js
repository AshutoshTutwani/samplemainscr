/**
* Template Name: Restaurantly - v1.1.0
* Template URL: https://bootstrapmade.com/restaurantly-restaurant-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function($) {
  "use strict";

  // Preloader
  $(window).on('load', function() {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function() {
        $(this).remove();
      });
    }
  });

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $('#header').outerHeight() - 1;
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    console.log("13")
    console.log($('.nav-menu').length)
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('.mobile-nav').prepend('<button type="button" class="mobile-nav-close"><i class="fa fa-window-close"></i></button>');
    $('#header').append('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="fa fa-bars iconcolor"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav-close', function(e) {
      $('body').removeClass('mobile-nav-active');
      $('.mobile-nav-overly').fadeOut();
    });

    $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('fa fa-bars iconcolor fa fa-window-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    console.log("12")
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }
  else
  {
    console.log("ads")
  }

  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
      $('#topbar').addClass('topbar-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
      $('#topbar').removeClass('topbar-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
    $('#topbar').addClass('topbar-scrolled');
  }

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, .mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200;
    console.log("13")
    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Back to top button
  $(window).scroll(function() {
    console.log("124")
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Menu list isotope and filter
  $(window).on('load', function() {
    var menuIsotope = $('.menu-container').isotope({
      itemSelector: '.menu-item',
      layoutMode: 'fitRows'
    });

    $('#menu-flters li').on('click', function() {
      $("#menu-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      menuIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      once: true
    });
  }
  $(window).on('load', function() {  
    aos_init();
  });

})(jQuery);

function SendInfo() {  
  var name = document.getElementById("name").value;
  var phone = document.getElementById("phone").value;
  //var comments = document.getElementById("comments").value;
  var email = document.getElementById("email").value;
  var comment = document.getElementById("comment").value;

  var errormsg = document.getElementById("error");
  var sentmsg = document.getElementById("sent");
  console.log(name + " 1" + email);
  var currentDateAndTime=new Date().toLocaleString();    
  if (validation()) // Calling validation function
  {
      var xhr = new XMLHttpRequest();
      var url = "https://us-central1-themagicalmomentzz.cloudfunctions.net/postContact";
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
              if (xhr.status === 200) {                
                  sentmsg.innerHTML  = "Thanks for contacting us! Our team will shortly contact you."
                  sentmsg.style.display = "block"              }
              else {
                errormsg.style.display = "block"
                errormsg.innerHTML  = "Could not send the message! Please contact us directly on the given phone number."
              }
          }
      };
      var data = JSON.stringify({ "email": email, "name": name, "phone": phone,"comment":comment, "date" : currentDateAndTime});
      console.log(data);
      xhr.send(data);
  }
  console.log("done");
};

function validation() {
  var name = document.getElementById("name").value;
  var phone = document.getElementById("phone").value;
  var email = document.getElementById("email").value;
  var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  console.log(name + " 2" + email);
  var isEmail = emailReg.test(String(email).toLowerCase());
  console.log("isemail" + isEmail);
  if (name === '') {
      alert("Please enter your name...!!!");
      return false;
  }
  else if (phone === '' && email === '') {
      alert("Please enter either Phone number or Email ID...!!!");
      return false;
  }
  else if (phone === '' && !isEmail) {
      alert("Invalid Email. Please try again with correct email ID, or directly contact us on the above mentioned details.");
      return false;
  }
  else if (email !== '' && !isEmail) {
      alert("Invalid Email. Please try again with correct email ID, or directly contact us on the above mentioned details.");
      return false;
  }
  else {
      return true;
  }
}