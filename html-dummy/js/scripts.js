$(document).ready(function() {
    $('.js-slick-init').slick({
        arrows: false
    });
    
    $('.js-slick-month-nav').slick({
        arrows: false,
        asNavFor: '.js-slick-month-cont'
    });

    $('.js-slick-month-cont').slick({
        arrows: false,
        asNavFor: '.js-slick-month-nav'
    });
});