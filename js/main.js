var advantages = document.querySelector(".advantages");


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

$(document).ready(function(){
    $('.bxslider').bxSlider({
        adaptiveHeight: true,
        controls: true,
        pager: true,
        video: true,
        minSlides: 1,
        infiniteLoop: true,
    });
  });

//Yandex.maps

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