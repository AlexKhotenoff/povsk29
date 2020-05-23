var advantages = document.querySelector('.advantages');

//menu vars
var init_width;

var nav_list = document.querySelector('.main-nav__list');
var toggle_button = document.querySelector('.main-nav__toggle');
var sandvitch_icon = document.querySelector('.main-nav__sandvitch');
var nav_dropdown_button = nav_list.querySelectorAll('.main-nav__button_dropdown');
//end of menu vars

//dropdown
var dropdown_button = document.querySelectorAll('.dropdown');
var dropdown_active = document.querySelectorAll('.dropdown');
var dropdown_container = document.querySelectorAll('.dropdown__container');

var dropdown_options = {
  accordion: true
};

dropdown_button.forEach(element => {
  element.addEventListener('click', function () {
    if (dropdown_options.accordion) {
      if (element.classList.contains('dropdown_active')) {
        element.classList.toggle('dropdown_active');
        element.parentElement.parentElement.querySelector('.dropdown__container').classList.toggle('dropdown__container_show');
      } else {
        dropdown_active.forEach(dpa => {
          if (dpa.classList.contains('dropdown_active')) {
            dpa.classList.remove('dropdown_active');
          }
        });

        dropdown_container.forEach(dpc => {
          if (dpc.classList.contains('dropdown__container_show')) {
            dpc.classList.remove('dropdown__container_show');
          }
        });

        element.classList.add('dropdown_active');
        element.parentElement.parentElement.querySelector('.dropdown__container').classList.add('dropdown__container_show');
      }

    }
    else {
      element.classList.toggle('dropdown_active');
      element.parentElement.parentElement.querySelector('.dropdown__container').classList.toggle('dropdown__container_show');
    }
  });
});
//End of dropdown

// const anchors = document.querySelectorAll('a[href*="#"]')

// for (let anchor of anchors) {
//   anchor.addEventListener('click', function (e) {
//     e.preventDefault()

//     const blockID = anchor.getAttribute('href').substr(1)

//     document.getElementById(blockID).scrollIntoView({
//       behavior: 'smooth',
//       block: 'start'
//     })
//   })
// }

//menu
toggle_button.addEventListener('click', function () {
  menu_toggle();
});

nav_dropdown_button.forEach(element => {
  element.addEventListener('click', function () {
    element.classList.toggle('main-nav__button_dropdown-open');
    element.parentElement.parentElement.querySelector('.main-nav__list_sub-menu').classList.toggle('main-nav__list_sub-menu-open');
  });
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

    if (nav_list.classList.contains('main-nav__list_no-mobile')) {
      nav_list.classList.remove('main-nav__list_no-mobile');
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
        nav_list.classList.add('main-nav__list_no-mobile');
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

  var slider = document.querySelector('.bxslider');

  if (slider) {
    $('.bxslider').bxSlider({
      adaptiveHeight: true,
      controls: true,
      pager: true,
      video: true,
      minSlides: 1,
      infiniteLoop: true,
    });
  }

});

//yandex.maps
var map_container = document.querySelector('.contacts__map-container');
var map_overlay = document.querySelector('.contacts__map-overlay');
var overlay_button = document.querySelector('.contacts__map-overlay-button');

if (overlay_button) {
  //close map overlay button
  overlay_button.addEventListener('click', function () {
    if (map_overlay.classList.contains('contacts__map-overlay_active')) {
      map_overlay.classList.remove('contacts__map-overlay_active');
    }
  });
}


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

//close mobile menu if window is orientation changed
window.addEventListener("orientationchange", function () {
  menu_close();
}, false);


//calc
var money_calc_block = document.querySelector(".money-calc");

if (money_calc_block) {
  var request_url = 'js/money_calc_params.json';
  var request = new XMLHttpRequest();
  request.open('GET', request_url);
  request.responseType = 'json';
  request.send();

  request.onload = function () {
    var mcp = request.response;

    money_calc_init(money_calc_block, mcp);
  };
}

function money_calc_init(money_calc, calc_params) {

  var money_calc_switch = money_calc.querySelector(".money-calc__switch");
  var rank_select = money_calc.querySelector(".money-calc__select_rank");
  var pay_grade_select = money_calc.querySelector(".money-calc__select_pay-grade");
  var period_select = money_calc.querySelector(".money-calc__select_period");
  var qualification_select = money_calc.querySelector(".money-calc__select_qualification");
  var secret_select = money_calc.querySelector(".money-calc__select_secret");
  var secret_period_select = money_calc.querySelector(".money-calc__select_secret-period");
  var cypher_period_select = money_calc.querySelector(".money-calc__select_cypher-period");
  var sport_select = money_calc.querySelector(".money-calc__select_sport");
  var prize_range_select = money_calc.querySelector(".money-calc__select_prize-range");
  var legal_education_select = money_calc.querySelector(".money-calc__select_legal-education");
  var risk_range_select = money_calc.querySelector(".money-calc__select_risk-range");
  var spec_achievement_range_select = money_calc.querySelector(".money-calc__select_spec-achievement");
  var spec_conditions_range_select = money_calc.querySelector(".money-calc__select_spec-conditions");
  var region_select = money_calc.querySelector(".money-calc__select_region");
  var north_range_select = money_calc.querySelector(".money-calc__select_north-range");

  money_calc_switch.addEventListener("change", function () {
    var extend_block = money_calc.querySelectorAll(".money-calc__extend");

    if (money_calc_switch.checked) {
      extend_block.forEach(element => {
        element.classList.add("money-calc__extend-show");
      });
    }
    else {
      extend_block.forEach(element => {
        element.classList.remove("money-calc__extend-show");
      });
    }
  });

  for (var i = 0; i < calc_params.rank_list.length; i++) {
    var option = document.createElement('option');
    option.textContent = calc_params.rank_list[i].caption;
    option.setAttribute("class", "money-calc__option");
    option.setAttribute("value", calc_params.rank_list[i].value);

    rank_select.appendChild(option);
  }

  for (var i = 0; i < calc_params.pay_grade_list.length; i++) {
    var option = document.createElement('option');
    option.textContent = calc_params.pay_grade_list[i].caption;
    option.setAttribute("class", "money-calc__option");
    option.setAttribute("value", calc_params.pay_grade_list[i].value);

    pay_grade_select.appendChild(option);
  }

  for (var i = 0; i < calc_params.period_list.length; i++) {
    var option = document.createElement('option');
    option.textContent = calc_params.period_list[i].caption;
    option.setAttribute("class", "money-calc__option");
    option.setAttribute("value", calc_params.period_list[i].value);

    period_select.appendChild(option);
  }

  for (var i = 0; i < calc_params.qualification_list.length; i++) {
    var option = document.createElement('option');
    option.textContent = calc_params.qualification_list[i].caption;
    option.setAttribute("class", "money-calc__option");
    option.setAttribute("value", calc_params.qualification_list[i].value);

    qualification_select.appendChild(option);
  }

  for (var i = 0; i < calc_params.secret_list.length; i++) {
    var option = document.createElement('option');
    option.textContent = calc_params.secret_list[i].caption;
    option.setAttribute("class", "money-calc__option");
    option.setAttribute("value", calc_params.secret_list[i].value);

    secret_select.appendChild(option);
  }

  for (var i = 0; i < calc_params.secret_period_list.length; i++) {
    var option = document.createElement('option');
    option.textContent = calc_params.secret_period_list[i].caption;
    option.setAttribute("class", "money-calc__option");
    option.setAttribute("value", calc_params.secret_period_list[i].value);

    secret_period_select.appendChild(option);
  }

  for (var i = 0; i < calc_params.cypher_period_list.length; i++) {
    var option = document.createElement('option');
    option.textContent = calc_params.cypher_period_list[i].caption;
    option.setAttribute("class", "money-calc__option");
    option.setAttribute("value", calc_params.cypher_period_list[i].value);

    cypher_period_select.appendChild(option);
  }

  for (var i = 0; i < calc_params.sport_list.length; i++) {
    var option = document.createElement('option');
    option.textContent = calc_params.sport_list[i].caption;
    option.setAttribute("class", "money-calc__option");
    option.setAttribute("value", calc_params.sport_list[i].value);

    sport_select.appendChild(option);
  }

  for (var i = calc_params.prize_range.min; i <= calc_params.prize_range.max; i += calc_params.prize_range.step) {

    var option = document.createElement('option');
    option.textContent = i + calc_params.prize_range.unit;
    option.setAttribute("class", "money-calc__option");
    option.setAttribute("value", (i / 100));

    prize_range_select.appendChild(option);
  }

  for (var i = 0; i < calc_params.legal_education_list.length; i++) {
    var option = document.createElement('option');
    option.textContent = calc_params.legal_education_list[i].caption;
    option.setAttribute("class", "money-calc__option");
    option.setAttribute("value", calc_params.legal_education_list[i].value);

    legal_education_select.appendChild(option);
  }

  for (var i = calc_params.risk_range.min; i <= calc_params.risk_range.max; i += calc_params.risk_range.step) {

    var option = document.createElement('option');
    option.textContent = i + calc_params.risk_range.unit;
    option.setAttribute("class", "money-calc__option");
    option.setAttribute("value", (i / 100));

    risk_range_select.appendChild(option);
  }

  for (var i = calc_params.spec_achievement_range.min; i <= calc_params.spec_achievement_range.max; i += calc_params.spec_achievement_range.step) {

    var option = document.createElement('option');
    option.textContent = i + calc_params.spec_achievement_range.unit;
    option.setAttribute("class", "money-calc__option");
    option.setAttribute("value", (i / 100));

    spec_achievement_range_select.appendChild(option);
  }

  for (var i = calc_params.spec_conditions_range.min; i <= calc_params.spec_conditions_range.max; i += calc_params.spec_conditions_range.step) {

    var option = document.createElement('option');
    option.textContent = i + calc_params.spec_conditions_range.unit;
    option.setAttribute("class", "money-calc__option");
    option.setAttribute("value", (i / 100));

    spec_conditions_range_select.appendChild(option);
  }

  for (var i = 0; i < calc_params.region_list.length; i++) {
    var option = document.createElement('option');
    option.textContent = calc_params.region_list[i].caption;
    option.setAttribute("class", "money-calc__option");
    option.setAttribute("value", calc_params.region_list[i].value);

    region_select.appendChild(option);
  }

  for (var i = calc_params.north_range.min; i <= calc_params.north_range.max; i += calc_params.north_range.step) {

    var option = document.createElement('option');
    option.textContent = i + calc_params.north_range.unit;
    option.setAttribute("class", "money-calc__option");
    option.setAttribute("value", (i / 100));

    north_range_select.appendChild(option);
  }
}

//end of calc