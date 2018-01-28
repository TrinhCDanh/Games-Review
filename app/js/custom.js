//----------------------------------- Animation dropdown menu of bootstrap
$(function(){
    // ADD SLIDEDOWN ANIMATION TO DROPDOWN //
    $('.dropdown').on('show.bs.dropdown', function(e){
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
        //$('.dropdown-menu').animate({opacity: '1'}, "slow");
    });

    // ADD SLIDEUP ANIMATION TO DROPDOWN //
    $('.dropdown').on('hide.bs.dropdown', function(e){
        e.preventDefault();
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp(300, function(){
            //On Complete, we reset all active dropdown classes and attributes
            //This fixes the visual bug associated with the open class being removed too fast
            $('.dropdown').removeClass('open');
            $('.dropdown').find('.dropdown-toggle').attr('aria-expanded','false');
        });
    });
});

//----------------------------------- Open and Close search box

$(document).ready(function(){
    $("#open-search").click(function(){
      document.getElementById('searchbar').style.visibility = 'visible';
      document.getElementById('searchbar').style.opacity = 1;
    });
    $("#close-search").click(function(){
      document.getElementById('searchbar').style.opacity = 0;
      document.getElementById('searchbar').style.visibility = 'hidden';
    });
});   

//----------------------------------- Owl carousel (Slider)
$(document).ready(function() {
  var game_owl = $('.game-owl-carousel');
  var home_owl = $('.home-owl-carousel');
  var sidebar_owl = $('.sidebar-owl-carousel');
  game_owl.owlCarousel({
    margin: 2,
    nav: false,
    dots: false,
    loop: false,
    responsive: {
      0: {
        items: 1
      },
      550: {
        items: 2
      },
      768: {
        items: 3
      },
      1000: {
        items: 4
      }
    }
  })
  home_owl.owlCarousel ({
    margin: 2,
    nav: false,
    dots: false,
    loop:true,
    autoplay:true,
    autoplayTimeout:10000,
    autoplayHoverPause:true,
    responsive: {
      0: {
        items: 1
      },
      550: {
        items: 2
      },
      1280: {
        items: 3
      },
      1920: {
        items: 4
      },
      2440: {
        items: 5
      }
    }
  })
  sidebar_owl.owlCarousel({
    margin: 2,
    nav: true,
    dots: false,
    loop: false,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      600: {
        items: 3
      },
      1000: {
        items: 2
      }
    }
  })
})

//----------------------------------- Tool Tip
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();   
});

//----------------------------------- Back to Top
$(document).ready(function(){
     $(window).scroll(function () {
            if ($(this).scrollTop() > 50) {
                $('#back-to-top').fadeIn();
            } else {
                $('#back-to-top').fadeOut();
            }
        });
        // scroll body to 0px on click
        $('#back-to-top').click(function () {
            $('#back-to-top').tooltip('hide');
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
        
        $('#back-to-top').tooltip('show');
});
//------------------------------------

$('.portfolio-item').each(function(k) {
    $(this).delay((k++) * 150).animate({opacity:1});
}); 

/*$('.cc').each(function(k) {
    $(this).delay((k++) * 200).animate({opacity:1}, 200, 'linear');
});*/

//----------------------------------- Animation open modal of bootstrap 
function testAnim(x) {
    $('.modal .modal-dialog').attr('class', 'modal-dialog  ' + x + '  animated');
};
$('.modal').on('show.bs.modal', function (e) {
  var anim = 'zoomIn';
      testAnim(anim);
})
$('.modal').on('hide.bs.modal', function (e) {
  var anim = 'zoomOut';
      testAnim(anim);
})

//----------------------------------- Circle chart
$('.rating-1').percentcircle({
fillColor: '#1abc9c'
});  
$('.rating-2').percentcircle({
fillColor: '#4080ff'
}); 

//------------------------------------------------
var acc = document.getElementsByClassName("o-accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].onclick = function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  }
}
//----------------------------------- Loading
var Nanobar=function(){var a,b,c,d,e,f,g={width:"100%",height:"10px",zIndex:9999,top:"0"},h={width:0,height:"100%",clear:"both",transition:"height .3s"};return a=function(a,b){for(var c in b)a.style[c]=b[c];a.style["float"]="left"},d=function(){var a=this,b=this.width-this.here;.1>b&&-.1<b?(e.call(this,this.here),this.moving=!1,100==this.width&&(this.el.style.height=0,setTimeout(function(){a.cont.el.removeChild(a.el)},100))):(e.call(this,this.width-b/4),setTimeout(function(){a.go()},16))},e=function(a){this.width=a,this.el.style.width=this.width+"%"},f=function(){var a=new b(this);this.bars.unshift(a)},b=function(b){this.el=document.createElement("div"),this.el.style.backgroundColor=b.opts.bg,this.here=this.width=0,this.moving=!1,this.cont=b,a(this.el,h),b.el.appendChild(this.el)},b.prototype.go=function(a){a?(this.here=a,this.moving||(this.moving=!0,d.call(this))):this.moving&&d.call(this)},c=function(b){b=this.opts=b||{};var c;b.bg=b.bg||"#1abc9c",this.bars=[],c=this.el=document.createElement("div"),a(this.el,g),b.id&&(c.id=b.id),c.style.position=b.target?"relative":"fixed",b.target?b.target.insertBefore(c,b.target.firstChild):document.getElementsByTagName("body")[0].appendChild(c),f.call(this)},c.prototype.go=function(a){this.bars[0].go(a),100==a&&f.call(this)},c}(),nanobar=new Nanobar;nanobar.go(30),nanobar.go(60),nanobar.go(100);

/*//-----------------------------------------
var shuffleme = (function( $ ) {
  'use strict';
  var $grid = $('#grid'), //locate what we want to sort 
      $filterOptions = $('.portfolio-sorting li'),  //locate the filter categories
      $sizer = $grid.find('.shuffle_sizer'),    //sizer stores the size of the items

  init = function() {

    // None of these need to be executed synchronously
    setTimeout(function() {
      listen();
      setupFilters();
    }, 100);

    // instantiate the plugin
    $grid.shuffle({
      itemSelector: '[class*="col-"]',
      sizer: $sizer    
    });
  },

      

  // Set up button clicks
  setupFilters = function() {
    var $btns = $filterOptions.children();
    $btns.on('click', function(e) {
      e.preventDefault();
      var $this = $(this),
          isActive = $this.hasClass( 'active' ),
          group = isActive ? 'all' : $this.data('group');

      // Hide current label, show current label in title
      if ( !isActive ) {
        $('.portfolio-sorting li a').removeClass('active');
      }

      $this.toggleClass('active');

      // Filter elements
      $grid.shuffle( 'shuffle', group );
    });

    $btns = null;
  },

  // Re layout shuffle when images load. This is only needed
  // below 768 pixels because the .picture-item height is auto and therefore
  // the height of the picture-item is dependent on the image
  // I recommend using imagesloaded to determine when an image is loaded
  // but that doesn't support IE7
  listen = function() {
    var debouncedLayout = $.throttle( 300, function() {
      $grid.shuffle('update');
    });

    // Get all images inside shuffle
    $grid.find('img').each(function() {
      var proxyImage;

      // Image already loaded
      if ( this.complete && this.naturalWidth !== undefined ) {
        return;
      }

      // If none of the checks above matched, simulate loading on detached element.
      proxyImage = new Image();
      $( proxyImage ).on('load', function() {
        $(this).off('load');
        debouncedLayout();
      });

      proxyImage.src = this.src;
    });

    // Because this method doesn't seem to be perfect.
    setTimeout(function() {
      debouncedLayout();
    }, 500);
  };      

  return {
    init: init
  };
}( jQuery ));

$(document).ready(function()
{
  shuffleme.init(); //filter portfolio
});


//$("wrapper").easeScroll();

// -------------------------------
*/
/*----------------------------------------------- Slider
$(document).ready(function(){
    $('.bxslider').bxSlider({
      mode: 'horizontal',//horizontal
      auto: true,
      //moveSlides: 1,
      slideMargin: 0,
      infiniteLoop: true,
      minSlides: 1,
      maxSlides: 1,
      speed: 1000,
      onSliderLoad: function(){
       $(".bxslider").css("visibility", "visible");
      }
    });
  });
//------------------------------------------
 $(function () {

      // Slideshow 1
      $("#slider1").responsiveSlides({
        auto: true,
        pager: true,
        nav: true,
        speed: 1000,
        width: "100%",
        namespace: "centered-btns"
      });

      // Slideshow 2
      
    });

//------------------------------------------------
$(function() {
  $('#slides').slidesjs({
    width: 940,
    height: 528,
    navigation: false
  });
});
*/
$(document).ready(function(){
    $(".fancybox").fancybox({
        openEffect: "none",
        closeEffect: "none"
    });
});

$('a[href*="#"]:not([href="#"],[href*="#menu"])').click(function() {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top - 100
      }, 1000);
      return false;
    }
  }
});
