var advantages = document.querySelector('.advantages');

//menu vars
var init_width;

var nav_list = document.querySelector('.main-nav__list');
var toggle_button = document.querySelector('.main-nav__toggle');
var sandvitch_icon = document.querySelector('.main-nav__sandvitch');
//end of menu vars

const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()

    const blockID = anchor.getAttribute('href').substr(1)

    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}

//menu
toggle_button.addEventListener('click', function () {
  menu_toggle();
});

function menu_toggle() {
  if (!sandvitch_icon.classList.contains('main-nav__sandvitch_on')) {
    menu_open();
  }
  else {
    menu_close();
  }
}

function menu_open() {
  if (!sandvitch_icon.classList.contains('main-nav__sandvitch_on')) {
    sandvitch_icon.classList.add('main-nav__sandvitch_on');

    if (!nav_list.classList.contains('main-nav__list_mobile')) {
      nav_list.classList.add('main-nav__list_mobile');
      nav_list.classList.add('main-nav__list_mobile-open');
    }
  }
}

function menu_close() {
  if (sandvitch_icon.classList.contains('main-nav__sandvitch_on')) {
    sandvitch_icon.classList.remove('main-nav__sandvitch_on');
    sandvitch_icon.classList.add('main-nav__sandvitch_off');

    if (nav_list.classList.contains('main-nav__list_mobile')) {
      nav_list.classList.remove('main-nav__list_mobile-open');
      nav_list.classList.add('main-nav__list_mobile-close');
      setTimeout(function () {
        nav_list.classList.remove('main-nav__list_mobile');
        nav_list.classList.remove('main-nav__list_mobile-open');
        nav_list.classList.remove('main-nav__list_mobile-close');
      }, 350);
    }

    setTimeout(function () {
      sandvitch_icon.classList.remove('main-nav__sandvitch_off');
    }, 500);
  }
}

//end of menu

//advantages tabs
if (advantages) {
  advantages_init(advantages);
}

function advantages_init(advantages_block) {
  var advantages_buttons = advantages_block.querySelectorAll(".advantages-list__button");
  var description_items = advantages_block.querySelectorAll(".advantages-description__item");

  for (var i = 0; i < advantages_buttons.length; i++) {
    advantages_buttons[i].addEventListener("click", function (evt) {

      var active_button = advantages_block.querySelector(".advantages-list__button_active");
      if (active_button) {
        active_button.classList.remove("advantages-list__button_active");
      }

      evt.target.classList.add("advantages-list__button_active");

      var active_description = advantages_block.querySelector(".advantages-description__item_show");
      if (active_description) {
        active_description.classList.remove("advantages-description__item_show");
      }

      for (m = 0; m < advantages_buttons.length; m++) {
        if (advantages_buttons[m].classList.contains("advantages-list__button_active")) {
          description_items[m].classList.add("advantages-description__item_show");
        }
      }
    });
  }
}

//slider

//bxslider initialize
$(document).ready(function () {
  init_width = window.outerWidth;

  $('.bxslider').bxSlider({
    adaptiveHeight: true,
    controls: true,
    pager: true,
    video: true,
    minSlides: 1,
    infiniteLoop: true,
  });
});

//yandex.maps
var map_container = document.querySelector('.contacts__map-container');
var map_overlay = document.querySelector('.contacts__map-overlay');
var overlay_button = document.querySelector('.contacts__map-overlay-button');

//close map overlay button
overlay_button.addEventListener('click', function () {
  if (map_overlay.classList.contains('contacts__map-overlay_active')) {
    map_overlay.classList.remove('contacts__map-overlay_active');
  }
});

try {
  //yandex.maps API
  ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
      center: [64.554778, 40.539630],
      zoom: 17,
      controls: ['zoomControl', 'routeButtonControl']
    }),

      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #35475f; background-color: #ffffff; border-radius: 5px;' +
        'padding:5px; font-weight: bold; width: 200px; text-align: center; opacity: 90%">$[properties.iconContent]</div>'
      ),

      myPlacemarkWithContent = new ymaps.Placemark([64.554778, 40.539630], {
        iconContent: 'Пункт отбора на военную службу по контракту',
        hintContent: 'Пункт отбора на военную службу по контракту',
      }, {
        iconLayout: 'default#imageWithContent',
        iconImageHref: 'img/map_marker_new.png',
        iconImageSize: [57, 60],
        iconImageOffset: [-11, -70],
        iconContentOffset: [-90, -50],
        iconContentLayout: MyIconContentLayout
      });

    // //на мобильных устройствах... (проверяем по userAgent браузера)
    // if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    //   //... отключаем перетаскивание карты
    //   myMap.behaviors.disable('drag');
    // }

    //disable mouse scroll
    myMap.behaviors.disable('scrollZoom');
    // myMap.behaviors.disable('drag'); 
    // myMap.behaviors.disable('multiTouch');

    myMap.geoObjects
      .add(myPlacemarkWithContent);
  });
}
catch {
  console.log("Yandex maps is not defined at this page");
}

// //close mobile menu if window is resized
// window.addEventListener("resize", function () {
//     menu_close();
// }, false);

//close mobile menu if window is orientation changed
window.addEventListener("orientationchange", function() {
  menu_close();
}, false);