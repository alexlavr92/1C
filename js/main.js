'use strict'



let docWidth = document.body.clientWidth
// console.log(docWidth)

// Функционал блокировки скрола при открытии модального окна
const BlockScroll = {
    open: function () {
        setTimeout(function () {

            if (!document.body.hasAttribute('data-body-scroll-fix')) {
                let scrollPosition = window.pageYOffset || document.documentElement.scrollTop; // Получаем позицию прокрутки

                document.body.setAttribute('data-body-scroll-fix', scrollPosition); // Cтавим атрибут со значением прокрутки
                document.body.style.overflow = 'hidden';
                document.body.style.position = 'fixed';
                document.body.style.top = '-' + scrollPosition + 'px';
                document.body.style.left = '0';
                document.body.style.right = '0';
                if ($('body').height() < $(window).height()) {
                    document.body.style.bottom = '0';
                }

            }
        }, 10);
    },
    close: function () {
        setTimeout(function () {
            if (document.body.hasAttribute('data-body-scroll-fix')) {

                let scrollPosition = document.body.getAttribute('data-body-scroll-fix'); // Получаем позицию прокрутки из атрибута

                document.body.removeAttribute('data-body-scroll-fix'); // Удаляем атрибут
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.left = '';
                document.body.style.right = '';
                window.scroll(0, scrollPosition); // Прокручиваем на полученное из атрибута значение
            }
        }, 10)
    }
}
// ------------------------------------


jQuery(document).ready(function ($) {



    // Инициализация плагина анимации
    AOS.init({
        once: true,
    });
    // ------------------------------------

    // Инициализация плагина параллакс
    if ($('.rellax').length)
        var rellax = new Rellax('.rellax');


    var SpaceNumber = function (NumberElem) {
        NumberElem.each(function (index, element) {
            var valIn = $(this).text();
            var valInNew = valIn.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ");
            $(this).text(valInNew);
        });
    };
    // добавляем пробелы в числа во всех тегах с классом this-number
    var ThisNumber = $(".this-number span");
    SpaceNumber(ThisNumber);
    //----------------------//


    // Функционал слайдера
    const ClientsSlider = {
        defaultOptions: {
            sliderOuter: $('.our-cliens-slider')
        },
        init: function (options) {
            var options = $.extend(this.defaultOptions, options)
            // console.log(options.sliderOuter)
            const sliderWrapper = options.sliderOuter,
                sliderContainer = sliderWrapper.find('.swiper-container'),
                PrevArrow = sliderWrapper.find('.swiper-arrow.--prev'),
                NextArrow = sliderWrapper.find('.swiper-arrow.--next')


            let swiper = new Swiper(sliderContainer, {
                slidesPerView: 'auto',
                spaceBetween: 30,
                // slidesPerGroup: 3,
                speed: 1000,

                // lazy: true,
                watchOverflow: true,
                watchSlidesVisibility: true,
                touchReleaseOnEdges: true,
                // loop: true,
                // autoplay: {
                //     delay: 5000,
                // },
                grabCursor: true,
                navigation: {
                    nextEl: NextArrow,
                    prevEl: PrevArrow,
                },
                // pagination: {
                //     el: '.swiper-pagination',
                //     clickable: true,
                //     type: 'bullets',
                // },
                breakpoints: {
                    1199: {
                        spaceBetween: 20,
                        // slidesPerGroup: 1,
                    },
                    767: {
                        spaceBetween: 20,
                        // slidesPerView: 1,
                        // slidesPerGroup: 1,
                    },
                },
                // autoplay: {
                //     delay: 5000,
                //     disableOnInteraction: false,
                //     pauseOnMouseEnter: true,
                // },
            })
        },


    }
    if ($('.our-cliens-slider').length) {
        ClientsSlider.init()
    }
    // ------------------------------------







    // Инициализация счётчиков
    const CounterInit = {
        defaultsOptions: {
            countWrapper: $('.count-wrapper'),
            windowHeight: $(window).height(),
            CountInited: false,
        },
        init: function (options) {
            var options = $.extend(this.defaultsOptions, options)
            // console.log(options)
            // let CountInited = false
            this.events(options)
        },
        events: function (options) {
            let CounterFunction = function (options) {
                // console.log('options')
                // console.log($(options.countWrapper))
                let CounterItems = options.countWrapper.find('.number')
                CounterItems.each(function () {
                    if (!$(this).hasClass('inited')) {

                        $(this)
                            .prop("Counter", 0)
                            .animate(
                                {
                                    Counter: parseInt($(this).text().replaceAll(' ', '')),
                                },
                                {
                                    duration: 4000,
                                    easing: "swing",
                                    step: function (now) {
                                        now = Number(Math.ceil(now)).toLocaleString('en');
                                        now = now.replaceAll(',', ' ')
                                        $(this).text(now);
                                    },
                                }
                            ).addClass('inited');
                    }
                })
                return true
            }

            let scroll = $(window).scrollTop();
            const CountOffset = options.countWrapper.offset().top
            if ((scroll + options.windowHeight >= CountOffset && options.countWrapper != undefined && options.CountInited != true)) {
                options.CountInited = CounterFunction(options)
            }
            // console.log(options.countWrapper)

            $(window).scroll(function () {
                scroll = $(window).scrollTop();
                if ((scroll + options.windowHeight >= CountOffset && options.countWrapper != undefined && options.CountInited != true)) {
                    options.CountInited = CounterFunction(options)
                }
            })
        }
    }

    if ($('.count-wrapper').length) {
        CounterInit.init({
            countWrapper: $('.count-wrapper')
        })
    }
    //------------------------------------

    // Инициализация бибилиотеки валидности номера телефона //
    function InitMaskPhone() {
        if ($(".input-phone").length > 0) {
            $(".input-phone").inputmask({
                mask: "+7 999 999 99 99",
            });
        }
    }
    //----------------------//
    InitMaskPhone();

    function InitMaskName() {
        if ($('.input-name').length > 0) {
            $(".input-name").inputmask({
                mask: "z{*} ",
                showMaskOnHover: false,
                // greedy: false,
                definitions: {
                    'z': {
                        validator: "[A-Za-zА-Яа-яЁё\u0020\-]",
                    }
                }
            });
        }
    }
    InitMaskName()

    let ValidateEmail = function (email) {
        // console.log(email.value)
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(email.val()) == false) {
            return false
        }
        else return true
    }
    // Инициадизация отправки формы
    const Forms = {
        defaultsOptions: {
            FormsElems: $('.form-default')
        },
        formSubjectInit: function (formSubjectText) {
            this.formSubject = formSubjectText
        },
        submit: function (options) {
            var options = $.extend(this.defaultsOptions, options)
            // console.log(options)
            const $thisObj = this
            options.FormsElems.on('submit', function (e) {
                e.preventDefault()
                let EditInputWrapper = function (input, invalidText) {
                    if (!input.closest('.default-input-wrapper.invalid').length) {
                        var ItemInputWrapper = input.closest('.default-input-wrapper')
                        ItemInputWrapper.addClass('invalid')
                        if (invalidText) {
                            var InvalidText = "<span class='invalid-text'>" + invalidText + "</span>"
                            $(InvalidText).appendTo(ItemInputWrapper)
                        }
                    }
                }

                // console.log('submit')
                let $this = $(this),
                    InvalidCount = 0,
                    AllRequiredInputs = $this.find('.required input')
                // console.log(AllRequiredInputs)

                $.each(AllRequiredInputs, function (i, input) {
                    // console.log(input)
                    if ($(input).val() == '') {
                        EditInputWrapper($(input), 'Заполните обязательное поле')
                        InvalidCount += 1
                    }
                    else {
                        if ($(input).hasClass('input-phone') && !$(input).inputmask("isComplete")) {
                            EditInputWrapper($(input), 'Введите корректный номер')
                            InvalidCount += 1
                        }
                        if ($(input).hasClass('input-mail') && !ValidateEmail($(input))) {
                            EditInputWrapper($(input), 'Введите корректный email')
                            InvalidCount += 1
                        }
                    }
                })

                const FormConfInput = $this.find('input[type="checkbox"]')
                if (FormConfInput.prop('checked') == false) {
                    const ItemInputWrapper = FormConfInput.closest('.default-input-wrapper')
                    ItemInputWrapper.addClass('invalid')
                    InvalidCount += 1
                }

                if (InvalidCount == 0) {
                    const formData = new FormData()
                    let textarea

                    if ($this.find('textarea').length) {
                        textarea = $this.find('textarea')
                        console.log(textarea)
                        AllRequiredInputs = AllRequiredInputs.add(textarea)
                    }
                    //  console.log(AllRequiredInputs)
                    $.each(AllRequiredInputs, function () {
                        let $thisVal = this.value
                        if (this.getAttribute('name') == 'input-phone') {
                            $thisVal = $thisVal.replace(/\s+/g, '')
                        }
                        formData.append(this.getAttribute('name'), $thisVal)
                    })
                    if (!$thisObj.formSubject || $thisObj.formSubject == '')
                        formData.append('form-type', $this.attr('type'))
                    else formData.append('form-title', $thisObj.formSubject)
                    for (let [name, value] of formData) {
                        console.log(`${name} = ${value}`)
                        // alert(`${name} = ${value}`); // key1=value1, потом key2=value2
                    }

                    // Ajax-запрос тут можно написать


                    const RequestSuccess = $this.siblings('.request-success-wrapper'),
                        $thisFormHeight = $this.innerHeight()
                    RequestSuccess.fadeIn({
                        start: function () {
                            const FormInner = $this.closest('.form-inner').length ? $this.closest('.form-inner') : $this.closest('.faq-form-inner')
                            if (docWidth < 1200 && !$this.closest('.modal').length)
                                window.scrollTo(0, FormInner.offset().top - $('.header-outer').innerHeight() - 50)
                            $this.hide()
                            // if (docWidth >= 1200) {
                            $(this).css({
                                'height': $thisFormHeight + 'px',
                            })
                            $thisObj.formSubjectInit('')
                            // }
                        },
                        /*   complete: function () {
                              console.log($this.offset().top)

                          } */
                    })
                }
                // e.preventDefault()
            })
            this.events(options.FormsElems)
        },
        events: function (forms) {
            // Функционал изменения input
            forms.on('input change', 'input[type="text"], input[type="checkbox"]', function (e) {
                var $this = $(this),
                    $thisInputWrapper = $this.closest('.default-input-wrapper')
                $thisInputWrapper.find('.invalid-text').remove()
                $thisInputWrapper.removeClass('invalid')

                $this.val() != ''
                    ? $this.addClass('active')
                    : $this.removeClass('active')
            })
        }
    }

    if ($('.form-default').length) {
        Forms.submit()
    }
    //------------------------------------

    // инициализация модальных окон
    const ModalElem = {
        defaultsOption: {
            modalHash: '',
            projectsJsonLink: './json/projects.json',
        },
        init: function (options) {
            this.modalElem = $('#' + options.modalHash + '')

            this.initModal()
            this.events(this.modalElem, options)


        },
        initModal: function () {
            let click_close = true;
            this.modalElem.modal({
                fadeDuration: 150,
                closeExisting: false, // новое 11.07.2022
                closeClass: "close-custom",
                closeText: '<span class="visually-hidden">Закрыть</span>',
                clickClose: click_close, // новое 28.11.2022
            });
        },
        events: function (modalElem, options) {
            $('body').on('modal:open', modalElem, function (event, modal) {

                BlockScroll.open();
            })
            $('body').on('modal:close', modalElem, function (event, modal) {
                BlockScroll.close();
                Forms.formSubjectInit('')

                if (modal.$elm.find('.faq-form-inner').length) {
                    // console.log(modal.$elm)
                    const successWrapper = modal.$elm.find('.request-success-wrapper')
                    successWrapper.css('height', '')
                    successWrapper.hide()
                    modal.$elm.find('.form-default').css('display', '')
                    modal.$elm.find('input').val('')
                    modal.$elm.find('input:checked').prop('checked', false)

                    modal.$elm.find('.invalid').removeClass('invalid')
                    modal.$elm.find('.invalid-text').remove()
                    // modal.$elm.find('input:checked')

                }
            })
        }
    }


    $('body').on('click', '.modal-open', function (e) {
        e.preventDefault()
        const $this = $(this),
            thisHash = $this.attr('data-modal')
        // console.log(thisHash)
        let thisText
        if ($this.closest('.dropdown-column').length)
            thisText = $this.text()
        else if ($this.closest('.programs-item').length)
            thisText = $this.closest('.programs-item').find('.title > span').text()
        else if ($this.closest('.its-price-item').length)
            thisText = $this.closest('.its-price-item').find('.title').text()
        else if ($this.closest('.detail_info-offer').length)
            thisText = $this.closest('.top-section').find('h1').text()
        else thisText = $this.text()
        // console.log($this.text())
        Forms.formSubjectInit(thisText)
        ModalElem.init({
            // targetElem: $this,
            modalHash: thisHash
        })
        return false;
    })
    // ------------------------------------




    $("body").on("click", ".btn-animate", function (e) {
        e.preventDefault();
        // console.log('click')
        let header_offset = 0,
            $thisHash = $(this.hash),
            $thisHashOffset,
            $duration = 1000,
            BodyScroll
        // console.log($thisHash, $thisHashOffset)
        if (docWidth > 1200) {
            header_offset = $('.header-outer').innerHeight();
            // console.log(header_offset)
        } else {
            if ($('header.show').length) {
                // BodyScroll = parseInt($('body').attr('data-body-scroll-fix'))
                $('.header-menu_btn').trigger('click')
            }

            header_offset = $('.header-outer').innerHeight();

        }
        // console.log(header_offset)
        $thisHashOffset = $thisHash.offset().top
        let $scrollTop = $thisHashOffset - header_offset
        // if (BodyScroll != 0 && BodyScroll != undefined) {
        //     $scrollTop = $scrollTop + BodyScroll
        // }
        console.log($scrollTop)

        $("html, body")
            .stop()
            .animate(
                {
                    scrollTop: $scrollTop,
                },
                {
                    duration: $duration, // продолжительность анимации
                    easing: "linear", // скорость анимации
                    queue: false // не ставим в очередь
                }
            );
        // e.preventDefault();
        return false;
    });

    // Инициализация custom-select
    const InitSelect2 = {
        defaultsOptions: {
            selects: $('.select-custom')
        },
        init: function (options) {
            var options = $.extend(this.defaultsOptions, options)
            // console.log(options)
            $.each(options.selects, function () {
                const $this = $(this)
                $this.select2({
                    minimumResultsForSearch: Infinity,
                    theme: "custom-select",
                    language: "ru",
                    width: 'style',
                });


            })
            this.events(options)
        },
        events: function (options) {
            options.selects.on("change", function (e) {
                // console.log($(this).prop("selectedIndex"))
                if ($(this).prop("selectedIndex") != 0)
                    $(this).siblings('.select2').addClass('select2-selected')
            });
            // console.log(options)
        }
    }

    if ($('.select-custom').length) {
        InitSelect2.init({
            selects: $('.select-custom')
        })
    }
    //------------------------------------





    if ($('.lightgallery').length > 0) {
        $('.lightgallery').lightGallery({
            share: false,
            selector: '.lightgallery_item', // новое 08.08.2022
            videojs: false,
            autoplayFirstVideo: false,
            download: false,
            videojs: false,
            // exThumbImage: 'data-external-thumb-image'
        });
        // $('body').on('onAfterOpen.lg onBeforeClose.lg onCloseAfter.lg', '.lightgallery', function (e) {
        //     /* console.log(e.type) */
        //     if (e.type == "onAfterOpen") {
        //         $('.lg-outer').addClass('lg-used-auto')
        //         blockScroll('open')
        //     }
        //     if (e.type == 'onBeforeClose') {
        //         blockScroll('close')
        //     }
        // })
        //----------------------//
    }

    if ($('.scrollbar').length) {
        $('.scrollbar').scrollbar({
            ignoreMobile: true
        })
    }


    const Programs = {
        defaultsOptions: {
            tabsSwitcher: $('.programs .tabs-switchers a'),
        },
        init: function () {
            var options = $.extend(this.defaultsOptions, options)
            this.events(options)
        },
        hideProgramsItems: function () {
            let HideLength = docWidth >= 1200 ? 9 : docWidth >= 768 ? 6 : 4
            const ProgramsItems = $('.programs-item')
            ProgramsItems.removeClass('hide')
            ProgramsItems.closest('.programs-items').find('.btn-more-wrapper').remove()
            console.log(ProgramsItems.length)
            if (ProgramsItems.length > HideLength) {
                ProgramsItems.eq(HideLength - 1).nextAll().addClass('hide')
                const BtnMore = '<div href=javascript: void(0) class="btn-more-wrapper"><a href="javascript: void(0)" class="btn-more">Показать полностью</a></div>'
                if (!ProgramsItems.closest('.programs-items').find('.btn-more-wrapper').length)
                    $(BtnMore).appendTo(ProgramsItems.closest('.programs-items'))
            }
        },
        events: function (options) {
            const ThisObj = this
            options.tabsSwitcher.on('click', function (e) {
                e.preventDefault()
                const $this = $(this)
                $this.siblings('.active').removeClass('active')
                $(this).addClass('active')

                // Тут можно написать Ajax запрос
                // if (docWidth >= 768)
                ThisObj.hideProgramsItems()
            })
            $('body').on('click', '.programs-items .btn-more', function (e) {
                e.preventDefault()
                const $this = $(this),
                    HidePrograms = $('.programs-item.hide')

                $this.toggleClass('open')
                if ($this.hasClass('open')) {
                    HidePrograms.fadeIn({
                        start: function () {
                            $(this).css({
                                'display': 'flex'
                            })
                        }
                    })
                    $this.text('Скрыть')
                }
                else {
                    // let CurrentScrollTop = $(window).scrollTop()
                    HidePrograms.hide()
                    // let NowScrollTop = $(window).scrollTop()
                    // console.log(CurrentScrollTop, NowScrollTop)
                    // window.scrollTo(0, CurrentScrollTop - NowScrollTop)
                    $this.text('Показать полностью')
                }
            })
            $(window).on('resize', function (e) {
                ThisObj.hideProgramsItems()
            })
        }
    }


    if ($('.programs .tabs-switchers a').length) {
        Programs.init()
        // if (docWidth >= 768)
        Programs.hideProgramsItems()
    }

    const OppItemsWrappers = $('.opportunities-items')
    $('body').on('click', '.opportunities .switcher:not(.active)', function (e) {
        e.preventDefault()
        const $this = $(this),
            $thisIndex = $this.index()
        $this.addClass('active')
        $this.siblings('.active').removeClass('active')
        $this.closest('.switchers').toggleClass('active')
        console.log($thisIndex)
        OppItemsWrappers.hide().removeClass('active')
        OppItemsWrappers.eq($thisIndex).fadeIn({
            start: function () {
                $(this).css('display', 'flex')
                $(this).addClass('active')
            }
        })
    })


    //Оработчик клика на кнопку "наверх"//
    $(".btn-up").on("click", function (e) {
        e.preventDefault();
        $("body,html").animate(
            {
                scrollTop: 0,
            },
            800
        );
        return false;
    });
    //----------------------//


    // Accordeon function
    $('body').on('click', '.accordeon-wrapper .accordeon-title', function (e) {
        e.preventDefault()
        const $this = $(this),
            $thisAccordeonWrapp = $this.closest('.accordeon-wrapper')
        $thisAccordeonWrapp.toggleClass('open')
        $thisAccordeonWrapp.hasClass('open')
            ? $thisAccordeonWrapp.find('.accordeon-content').slideDown()
            : $thisAccordeonWrapp.find('.accordeon-content').slideUp()
    })
    //----------------------//
}) // end ready

// console.log(projectsJson)


// Функционал работы Header
const InitHeader = {
    defaultsOptions: {
        headerWrapper: $('header'),
        headerOuter: $('.header-outer'),
        // headerHamburger: $('.header-hamburger'),
        windowWidth: document.body.clientWidth,
        lastScrollTop: 0,
        // headerMob: $('.header-mob'),
        // topSocials: $('.top-socials')
    },
    init: function () {
        // console.log($(this.HeaderBurger))
        this.events()
        // this.checkMargin()
        // this.checkAdaptive(this.defaultsOptions.windowWidth)
        // this.checkSticky($(window).scrollTop(), this.defaultsOptions.headerWrapper)

    },
    checkAdaptive: function (windowWidth) {
        // console.log(windowWidth)
        const headerWrapper = this.defaultsOptions.headerWrapper,
            headerOuter = this.defaultsOptions.headerOuter,
            headerContacts = headerOuter.find('.header-contacts'),
            headerTopNav = headerOuter.find('.header-top-nav'),
            Btntg = headerOuter.find('.btn-tg'),
            headerNavBottom = headerOuter.find('.header-nav-bottom')

        if (windowWidth < 1200) {
            if (headerWrapper.hasClass('open')) BlockScroll.open()
            headerTopNav.insertAfter(headerNavBottom)
            headerContacts.insertAfter(headerNavBottom)
            Btntg.insertAfter(headerNavBottom)
            // headerOuter.find('.header-bottom').attr('style', '')
            $('main').css({ 'margin-top': headerOuter.find('.header-top').outerHeight() + 'px' })


        }
        else {
            if (headerWrapper.hasClass('open')) {
                headerWrapper.removeClass('open')
                BlockScroll.close()
            }
            headerContacts.insertAfter(headerOuter.find('.header-logo'))
            headerTopNav.appendTo('.header-top .new-container')
            Btntg.appendTo('.header-top .new-container')
            $('main').css({ 'margin-top': headerOuter.outerHeight() + 'px' })
        }
    },
    checkSticky: function (scrollTop, headerOuter, nowWidth, lastScrollTop) {
        // const headerOuter = headerWrapper.find('.header-top'),
        //     headerTopHeight = headerTop.innerHeight()
        if (nowWidth >= 1200) {
            scrollTop > headerOuter.innerHeight()
                ? this.defaultsOptions.headerWrapper.addClass('sticky')
                : this.defaultsOptions.headerWrapper.removeClass('sticky')
        }
        else {
            scrollTop > $(window).height()
                ? $('.btn-up').addClass('show')
                : $('.btn-up').removeClass('show')
        }
        // else {
        //     if (scrollTop > lastScrollTop || scrollTop == 0 && $('header').hasClass('sticky')) {
        //         $('header').removeClass('sticky')
        //     }
        //     else if (scrollTop > headerOuter.height() && !$('header').hasClass('sticky')) {
        //         // upscroll code
        //         // console.log('fixed')
        //         $('header').addClass('sticky')
        //     }
        // }
    },
    events: function () {
        const $thisObj = this,
            options = this.defaultsOptions
        // console.log(options.windowWidth)
        this.checkAdaptive(options.windowWidth)

        let scrollTop = $(window).scrollTop();
        $thisObj.checkSticky(scrollTop, options.headerOuter)
        $(window).on('scroll', function () {
            scrollTop = $(window).scrollTop();
            // if (options.windowWidth < 1200) { }
            // else {
            if (!$('.jquery-modal').length)
                $thisObj.checkSticky(scrollTop, options.headerOuter, options.windowWidth, options.lastScrollTop)

            if (options.windowWidth < 1200) {
                options.lastScrollTop = scrollTop;
            }

            // }
        })
        $(window).on('resize', function () {
            if (options.windowWidth != document.body.clientWidth) {
                // console.log(options.windowWidth)
                options.windowWidth = document.body.clientWidth
                // console.log(options.windowWidth)
                // $thisObj.checkMargin()
                $thisObj.checkAdaptive(options.windowWidth)
            }

        })
        const MenuBtn = options.headerWrapper.find('.hamburger')
        MenuBtn.on('click', function (e) {
            if (options.windowWidth < 1200) {
                // console.log('click')
                const $this = $(this),
                    headerBottom = options.headerWrapper.find('.header-bottom')
                options.headerWrapper.toggleClass('open')
                if (options.headerWrapper.hasClass('open')) {
                    headerBottom.slideDown({
                        complete: function () {
                            BlockScroll.open()
                        }
                    })
                }
                else {
                    headerBottom.slideUp({
                        complete: function () {
                            BlockScroll.close()
                        }
                    })
                }
            }
            else return false
        })
        const DropDownWrapper = options.headerWrapper.find('.dropdown-elem')
        DropDownWrapper.on('click', function (e) {
            e.preventDefault()
            // console.log('ок')
            if (options.windowWidth < 1200) {
                const $this = $(this),
                    $thisParent = $this.closest('.dropdown')
                $thisParent.toggleClass('open')
                $thisParent.hasClass('open')
                    ? $thisParent.find('.dropdown-wrapper').slideDown()
                    : $thisParent.find('.dropdown-wrapper').slideUp()
            }
            else return false
        })
    }
}



// ------------------------------------



$(window).on('resize', function () {
    if (docWidth != document.body.clientWidth)
        docWidth = document.body.clientWidth
    // console.log(docWidth)
})

$(window).on('load', function () {
    if ($('header').length) {
        InitHeader.init()
    }
})

