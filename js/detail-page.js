jQuery(document).ready(function ($) {
    $('.detail_info-descript .btn-more').on('click', function (e) {
        e.preventDefault()
        $('.programs_detail.tabs-outer .tabs-switchers > a:nth-child(2)').trigger('click')
    })


    const TabsElems = {
        defaultsOptions: {
            tabsSwitcher: $('.tabs-outer .tabs-switchers a'),
            tabsContents: $('.tabs-outer .tabs-content')
        },
        init: function () {
            var options = $.extend(this.defaultsOptions, options)
            this.events(options)
        },
        events: function (options) {
            const ThisObj = this
            options.tabsSwitcher.on('click', function (e) {
                e.preventDefault()
                const $this = $(this),
                    $thisIndex = $(this).index()
                options.tabsContents.filter('.active').removeClass('active')
                $this.siblings('.active').removeClass('active')
                $(this).addClass('active')
                options.tabsContents.eq($thisIndex).addClass('active').hide().fadeIn()
                // Тут можно написать Ajax запрос
                // if (docWidth >= 768)
            })
        }
    }


    if ($('.tabs-outer .tabs-switchers a').length) {
        TabsElems.init()
        // if (docWidth >= 768)
    }
})