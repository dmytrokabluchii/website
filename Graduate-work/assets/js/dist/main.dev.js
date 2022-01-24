"use strict";

$(function () {
  // Fix Header Scroll
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 0) {
      if (!$("header").hasClass("fixed_header")) {
        $("header").addClass("fixed_header");
      }
    } else {
      if ($("header").hasClass("fixed_header")) {
        $("header").removeClass("fixed_header");
      }
    }
  }); // Плавный скролл по меню!

  $("#header__menu_links a").on('click', function (e) {
    e.preventDefault();
    var top = $($(this).attr("href")).offset().top - 60;
    $("html, body").animate({
      scrollTop: top + 'px'
    }, 1400);
  }); // Скролл по arrow!

  $(".arrow__content a").on("click", function (e) {
    e.preventDefault();
    var id = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({
      scrollTop: top
    }, 1400);
  }); // Hamburger-menu

  $(".hamburger, .page_overlay").on('click', function () {
    $(".mobile_menu_wrap .hamburger").toggleClass("is-active");
    $("body").toggleClass("open");
  }); // Закрытие меню бургер при нажатии на пунты меню

  $(".sidemenu ul li a").on('click', function () {
    $("body").removeClass("open");
  }); // Slick-slider Place

  getCard();
  $('#card_tour').slick({
    infinite: true,
    speed: 900,
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }]
  });
}); // Подключение lightGallery

lightGallery(document.querySelector('.gallery__album', '.album__page'), {
  plugins: [lgZoom, lgThumbnail],
  thumbnail: true,
  zoom: true,
  actualSize: true,
  animateThumb: true,
  zoomFromOrigin: true,
  speed: 500,
  licenseKey: 'your_license_key'
}); // Динамические карты блока place

function getCard() {
  $.ajax({
    url: 'common/card.json',
    type: 'get',
    dataType: 'json',
    success: function success(json) {
      var html = '';
      json.forEach(function (card) {
        html += "\n                    <li class=\"card__item card-first\">\n                        <div class=\"card__image\">\n                            <a class=\"card__image_link\" href=\"#!\">\n                                <img class=\"card__pic lazy\"\n                                    src=\"assets/images/".concat(card.pic.image, "\" alt=\"place_image\">\n                                <div class=\"card__price\">").concat(card.pic.price, "</div>\n                            </a>\n                        </div>\n                        <div class=\"card__content\">\n                            <div class=\"card__title\">\n                                <h6>").concat(card.title, "</h6>\n                            </div>\n                            <div class=\"card__subtitle subtitle\">\n                                <p>").concat(card.description, "</p>\n                            </div>\n                            <div class=\"card__link\">\n                                <a class=\"card__link_text text_orange\" href=\"#!\">").concat(card.link, "\n                                </a>\n                            </div>\n                        </div>\n                    </li>\n                ");
      });
      $("#card_tour").slick('slickAdd', html);
    },
    error: function error() {
      panel.warning("The card don't load!", true);
    }
  });
} // Динамический подсчет блока place


function getCount() {
  $.ajax({
    url: 'common/count.json',
    type: 'get',
    dataType: 'json',
    success: function success(json) {
      var html = '';
      json.forEach(function (count) {
        html += "\n                    <div class=\"count__column\">\n                        <div class=\"count__column_calculation\"><span class=\"count__column_green\">".concat(count.calc, "</span>+</div>\n                        <div class=\"count__column_text\">").concat(count.title, "</div>\n                    </div>\n                ");
      });
      $("#place_count").append(html);
    },
    error: function error() {
      panel.warning("The count of tours don't load!", true);
    }
  });
}

getCount();