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
let advantages_buttons;
let description_items;
let advantages_selected = 0;
let advantages_scroll_timer;

if (advantages) {
  advantages_buttons = advantages.querySelectorAll(".advantages-list__button");
  description_items = advantages.querySelectorAll(".advantages-description__item");

  advantages_init(advantages);

  advantages_scroll_timer = setInterval(advantages_autoscroll, 5000, 0);
}

function advantages_init(advantages_block) {
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
          advantages_selected = m;
          clearInterval(advantages_scroll_timer);
          advantages_scroll_timer = setInterval(advantages_autoscroll, 5000, m);
        }
      }

    });
  }
}

function advantages_autoscroll(selectedIndex) {
  if (selectedIndex < advantages_buttons.length - 1) {
    selectedIndex += 1;
  }
  else {
    selectedIndex = 0;
  }

  let click_event = new Event("click");
  advantages_buttons[selectedIndex].dispatchEvent(click_event);
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

  var money_calc_select = money_calc.querySelectorAll(".money-calc__select");
  var money_calc_switch = money_calc.querySelector(".money-calc__switch");
  var result_container = money_calc.querySelector(".money-calc__result-container");
  var money_calc_result = money_calc.querySelector(".money-calc__calc-result");
  var money_calc_on_hand = money_calc.querySelector(".money-calc__on-hand");
  var money_calc_button = money_calc.querySelector(".money-calc__button");

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

  var extend_select = money_calc.querySelectorAll(".money-calc__extend");

  money_calc_switch.addEventListener("change", function () {

    money_calc_select.forEach(element => {
      element.options.selectedIndex = 0;
    });

    if (money_calc_switch.checked) {
      extend_select.forEach(element => {
        element.classList.add("money-calc__extend-show");
      });
    }
    else {
      extend_select.forEach(element => {
        element.classList.remove("money-calc__extend-show");
      });
    }
  });

  money_calc_button.addEventListener("click", function (evt) {
    evt.preventDefault();

    var calc_form = money_calc.querySelector(".money-calc__form");
    var dirt_salary = calc_money(calc_form);

    if (dirt_salary > 0) {

      if (result_container.classList.contains("money-calc__result-container_shown")) {
        result_container.classList.remove("money-calc__result-container_shown");
      }
      
      result_container.classList.add("money-calc__result-container_shown");
      money_calc_result.textContent = " " + (dirt_salary).toFixed(2) + " р.";
      money_calc_on_hand.textContent = " " + round(dirt_salary * 0.87, 2) + " р.";
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

function round(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function calc_money(calc_form) {

  var rank = parseInt(calc_form.rank.value); //Оклад по воинскому званию
  var pay_grade = parseInt(calc_form.pay_grade.value); //Оклад по воинской должности

  var period = parseFloat(calc_form.period.value);
  var qualification = parseFloat(calc_form.qualification.value);
  var secret = parseFloat(calc_form.secret.value);
  var secret_period = parseFloat(calc_form.secret_period.value);
  var cypher_period = parseFloat(calc_form.cypher_period.value);
  var sport = parseFloat(calc_form.sport.value);
  var prize_range = parseFloat(calc_form.prize_range.value);
  var legal_education = parseFloat(calc_form.legal_education.value);
  var risk_range = parseFloat(calc_form.risk_range.value);
  var spec_achievement_range = parseFloat(calc_form.spec_achievement.value);
  var spec_conditions_range = parseFloat(calc_form.spec_conditions.value);
  var region = parseFloat(calc_form.region.value);
  var north_range = parseFloat(calc_form.north_range.value);

  var basic_pay = 0; //Оклад денежного содержания
  var period_pay = 0; //Выслуга лет
  var qualification_pay = 0; //Классная квалификация
  var secret_pay = 0; //Сведения составляющие гос. тайну
  var secret_period_pay = 0; //Стаж в подразделениях ПЗГТ
  var cypher_period_pay = 0; //Стаж в шифроорганах
  var sport_pay = 0; //ФП
  var prize_range_pay = 0; //Премия за добросовестное и эффективное исполнение должностных обязанностей
  var legal_education_pay = 0; //Высшее юридическое образование
  var risk_range_pay = 0; //Риск для жизни
  var spec_achievement_pay = 0; //Особые достижения
  var spec_conditions_pay = 0; //ОУС
  var region_pay = 0; //Районный коэффициент
  var north_range_pay = 0; //Северная надбавка

  if ((rank >= 0) && (pay_grade >= 0)) {
    basic_pay = round(rank + pay_grade, 2);
    console.log("Оклад денежного содержания: " + basic_pay.toFixed(2));
  }

  if (period >= 0) {
    period_pay = round(basic_pay * period, 2);
    console.log("Надбавка за выслугу лет: " + period_pay.toFixed(2));
  }

  if (qualification >= 0) {
    qualification_pay = round(pay_grade * qualification, 2);
    console.log("Надбавка за классную квалификацию: " + qualification_pay.toFixed(2));
  }

  if (secret >= 0) {
    secret_pay = round(pay_grade * secret, 2);
    console.log("Надбавка за работу со сведениями, составляющими государственную тайну: " + secret_pay.toFixed(2));
  }

  if (secret_period >= 0) {
    secret_period_pay = round(pay_grade * secret_period, 2);
    console.log("Надбавка за стаж работы в подразделениях ЗГТ: " + secret_period_pay.toFixed(2));
  }

  if (cypher_period >= 0) {
    cypher_period_pay = round(pay_grade * cypher_period, 2);
    console.log("Надбавка за стаж работы в шифроорганах: " + cypher_period_pay.toFixed(2));
  }

  if (sport >= 0) {
    sport_pay = round(pay_grade * sport, 2);
    console.log("Надбавка за квалификационный уровень по физической подготовке: " + sport_pay.toFixed(2));
  }

  if (prize_range >= 0) {
    prize_range_pay = round(basic_pay * prize_range, 2);
    console.log("Премия за добросовестное исполнение должностных обязанностей: " + prize_range_pay.toFixed(2));
  }

  if (legal_education >= 0) {
    legal_education_pay = round(pay_grade * legal_education, 2);
    console.log("Надбавка военнослужащим, имеющим высшее юридическое образование и занимающим воинские должности юридической специальности: " + legal_education_pay.toFixed(2));
  }

  if (risk_range >= 0) {
    risk_range_pay = round(pay_grade * risk_range, 2);
    console.log("Надбавка за выполнение задач, непосредственно связанных с риском для жизни и здоровья в мирное время: " + risk_range_pay.toFixed(2));
  }

  if (spec_achievement_range >= 0) {
    spec_achievement_pay = round(pay_grade * spec_achievement_range, 2);
    console.log("Надбавка за особые достижения в военной службе: " + spec_achievement_pay.toFixed(2));
  }

  if (spec_conditions_range >= 0) {
    spec_conditions_pay = round(pay_grade * spec_conditions_range, 2);
    console.log("Надбавка за особые условия военной службы, включая командование подразделением: " + spec_conditions_pay.toFixed(2));
  }

  if (region >= 0) {
    region_pay = round((basic_pay + period_pay + qualification_pay + secret_pay + spec_conditions_pay) * region, 2);
    console.log("РАЙОННЫЙ КОЭФФИЦИЕНТ ЗА ВОЕННУЮ СЛУЖБУ В РАЙОНАХ КРАЙНЕГО СЕВЕРА И ПРИРАВНЕННЫХ К НИМ МЕСТНОСТЯХ," +
      " С НЕБЛАГОПРИЯТНЫМИ ЭКОЛОГИЧЕСКИМИ И КЛИМАТИЧЕСКИМИ УСЛОВИЯМИ, ОТДАЛЕННЫХ, ВЫСОКОГОРНЫХ РАЙОНАХ, ПУСТЫННЫХ" +
      " И БЕЗВОДНЫХ МЕСТНОСТЯХ: " +
      region_pay.toFixed(2));
  }

  if (north_range >= 0) {
    north_range_pay = round((basic_pay + period_pay + qualification_pay + secret_pay + spec_conditions_pay) * north_range, 2);
    console.log("НАДБАВКА ЗА ВОЕННУЮ СЛУЖБУ В РАЙОНАХ КРАЙНЕГО СЕВЕРА И ПРИРАВНЕННЫХ К НИМ МЕСТНОСТЯХ," +
      " А ТАКЖЕ В ДРУГИХ МЕСТНОСТЯХ С НЕБЛАГОПРИЯТНЫМИ КЛИМАТИЧЕСКИМИ ИЛИ ЭКОЛОГИЧЕСКИМИ УСЛОВИЯМИ, В ТОМ" +
      " ЧИСЛЕ ОТДАЛЕННЫХ МЕСТНОСТЯХ: " + north_range_pay.toFixed(2));
  }

  return basic_pay + period_pay + qualification_pay + secret_pay +
    secret_period_pay + cypher_period_pay + sport_pay + prize_range_pay +
    legal_education_pay + risk_range_pay + spec_achievement_pay +
    spec_conditions_pay + region_pay + north_range_pay;

}

//end of calc