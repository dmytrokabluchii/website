$(function(){
    // Fix Header Scroll
    $(window).on('scroll', function(){
            if($(window).scrollTop()>0){
                if(!$("header").hasClass("fixed_header")) {
                    $("header").addClass("fixed_header");
                }
        }else{
                if($("header").hasClass("fixed_header")){
                    $("header").removeClass("fixed_header");
                }
            }
    });
    $("#header__menu_links a").on('click', function(e){
        e.preventDefault();
        const top = $($(this).attr("href")).offset().top-60;
        $("html, body").animate({scrollTop:top+'px'}, 1400);
    });


    // Скролл по arrow!
    $(".footer__arrow a").on("click", function (e) {
        e.preventDefault();
        let id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1400);
    });


    // Hamburger-menu
    $(".hamburger, .page_overlay").on('click', function () {
        $(".mobile_menu_wrap .hamburger").toggleClass("is-active");
        $("body").toggleClass("open");
    });
    // Закрытие меню бургер при нажатии на пунты меню и кнопку callback
    $(".sidemenu ul li a, .mobile__btn").on('click', function () {
        $("body").removeClass("open");
    });
    

    // Модальное окно order tour
    $.when(getCard()).then(function() {
        // открыть по кнопке
        $('#booking_btn, #card_btn').click(function() { 
            $('.booking__modal').fadeIn();
            $('.booking__modal').addClass('disabled');
        });
        // закрыть на крестик
        $('.modal__close_btn').click(function() { 
            $('.booking__modal').fadeOut(600); // закрытие с плавной анимацией, где 600 это время в мс
        });
        // закрыть по клику вне окна
        $(document).mouseup(function (e) { 
            let popup = $('.modal__content');
            if (e.target!=popup[0]&&popup.has(e.target).length === 0){
                $('.booking__modal').fadeOut(600);
            }
        });
        // закрыть по ESC
        $(document).on('keydown',function(event) {
            if (event.keyCode == 27) {
                $('.booking__modal').fadeOut(600);
            }
        });
        // Маска номера телефона
        $(function () {
            $('#booking_phone').mask('+38 (099) 999-99-9?9');
        })
        // Валидация + отправка формы на Telegram BOT
        $("#my_booking-form").on('submit', function(e){
            e.preventDefault();
            let nameInput = document.getElementById('booking_name');
            let surnameInput = document.getElementById('booking_surname');
            let emailInput = document.getElementById('booking_email');
            let phoneInput = document.getElementById('booking_phone'); 
            let tourSelect = document.getElementById('choice_tour');              
            const BOT_TOKEN = '5019836353:AAEY0Hztn5q-UaklaKWXMoDqbUyn0MhEzhc';
        //  @get_id_bot and /get_id
            const CHAT_ID = '704440668';
        //  let text = encodeURI("<b>Email:</b> "+$("#exampleInputEmail1").val()+"\n<b>Subject:</b> "+$("#exampleInputPassword1").val()+"\n<b>Message:</b> "+$("#massage").val());
            let text = encodeURI(`Name: ${nameInput.value}, Surname:${surnameInput.value}, 
            Email: ${emailInput.value}, Phone: ${phoneInput.value}, Tour: ${tourSelect.value}`);
            if(nameInput.value !== '' && surnameInput.value !== '' && emailInput.value !== '' 
            && phoneInput.value !== '' && tourSelect.value !== ''){
                $.get(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=`+text+'&parse_mode=html', (json)=>{
                    if(json.ok){
                        $("#my_booking-form").trigger('reset');
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Your message send!',
                            showConfirmButton: false,
                            timer: 3000
                        })
                    }
                });
            }else{
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'Fill all field!',
                    showConfirmButton: false,
                    timer: 3000
                })
            }
        });
    });

    // Slick-slider Place
    // getCard();
    $('#card_tour').slick({
        infinite: true,
        speed: 900,
        dots: true,
        slidesToShow: 3, 
        slidesToScroll: 3,
        infinite: true,
        responsive: [
            {
                breakpoint: 999,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    // arrows: false,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    // arrows: false,
                }
            }
        ]
    });
    


    // Модальное окно callback
    // открыть по кнопке
    $('.callback__btn').click(function() { 
        $('.modal__callback').fadeIn();
        $('.modal__callback').addClass('disabled');
    });
    // закрыть на крестик
    $('.callback__close_btn').click(function() { 
        $('.modal__callback').fadeOut(600); // закрытие с плавной анимацией, где 600 это время в мс
    });
    // закрыть по клику вне окна
    $(document).mouseup(function (e) { 
        let popup = $('.callback__content');
        if (e.target!=popup[0]&&popup.has(e.target).length === 0){
            $('.modal__callback').fadeOut(600);
        }
    });
    // закрыть по ESC
    $(document).on('keydown',function(event) {
        if (event.keyCode == 27) {
            $('.modal__callback').fadeOut(600);
         }
     });

     // Маска номера телефона
     $(function () {
        $('#callback_phone').mask('+38 (099) 999-99-9?9');
    })

    // Валидация + отправка формы на Telegram BOT
    $("#my_callback-form").on('submit', function(e){
        e.preventDefault();
        let nameInput = document.getElementById('callback_name');
        let phoneInput = document.getElementById('callback_phone');            
        const BOT_TOKEN = '5019836353:AAEY0Hztn5q-UaklaKWXMoDqbUyn0MhEzhc';
    // @get_id_bot and /get_id
        const CHAT_ID = '704440668';
    //   let text = encodeURI("<b>Email:</b> "+$("#exampleInputEmail1").val()+"\n<b>Subject:</b> "+$("#exampleInputPassword1").val()+"\n<b>Message:</b> "+$("#massage").val());
        let text = encodeURI(`Name: ${nameInput.value}, Phone: ${phoneInput.value}`);
        if(nameInput.value !== '' && phoneInput.value !== ''){
            $.get(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=`+text+'&parse_mode=html', (json)=>{
                if(json.ok){
                    $("#my_callback-form").trigger('reset');
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your message send!',
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
            });
        }else{
            Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: 'Fill all field!',
                showConfirmButton: false,
                timer: 3000
            })
        }
    });

});


// Динамические карты блока place
function getCard(){
    $.ajax({
        url:'common/card.json',
        type:'get',
        dataType:'json',
        success:function(json){
            let html = '';
            json.forEach((card)=>{
                html += `
                    <li class="card__item card-first">
                        <div class="card__image">
                            <div class="card__image_link" href="#!">
                                <img class="card__pic lazy"
                                    src="assets/images/place_image/${card.pic.image}" alt="place_image">
                                <div class="card__price">${card.pic.price}</div>
                            </div>
                        </div>
                        <div class="card__content">
                            <div class="card__title">
                                <h6>${card.title}</h6>
                            </div>
                            <div class="card__subtitle subtitle">
                                <p>${card.description}</p>
                            </div>
                            <div class="card__link">
                                <button type="button" class="card__link_text text_orange" id="card_btn">
                                ${card.link}</button>
                            </div>
                        </div>
                    </li>
                `;
            });

            $("#page_card").append(html);
            $("#card_tour").slick('slickAdd', html);
            
        },
        error:function(){
            // modal window sweet-aler2
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Oops...',
                text: "The tour-cards don't load!",
                showConfirmButton: false,
                timer: 4000
            })
        }
    });  
};


// Подключение lightGallery
lightGallery(document.querySelector('.gallery__album', '.album__page'), {
    plugins:[lgZoom, lgThumbnail],
    thumbnail: true,
    zoom: true,
    actualSize: true,
    animateThumb: true,
    zoomFromOrigin: true,
    speed: 500,
    licenseKey: 'your_license_key',
});



// Динамический подсчет блока place count
// function getCount(){
//     $.ajax({
//         url:'common/count.json',
//         type:'get',
//         dataType:'json',
//         success:function(json){
//             let html = '';
//             json.forEach((count)=>{
//                 html += `
//                     <div class="count__column">
//                         <div class="count__column_calculation">
//                         <span class="count__column_green counter">${count.calc}</span>+</div>
//                         <div class="count__column_text">${count.title}</div>
//                     </div>
//                 `;
//             });
//                 // Добавляем в наш html            
//             $("#place_count").append(html);
//         },
//         error:function(){
//             // modal window sweet-aler2 вставляем
//         }
//     });  
// }
// getCount();