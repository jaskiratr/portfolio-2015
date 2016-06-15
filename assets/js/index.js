// external js: masonry.pkgd.js, imagesloaded.pkgd.js

$(document).ready(function() {
    // init Masonry
    var $grid = $('.grid').masonry({
        itemSelector: '.grid-item',
        percentPosition: true,
        columnWidth: '.grid-sizer'
    });
    // layout Isotope after each image loads
    $grid.imagesLoaded().progress(function() {
        $grid.masonry();
    });

});
var container = document.querySelector("#st-container");
document.querySelector("#nav-toggle")
    .addEventListener("click", function() {
        this.classList.toggle("active");

        container.classList.toggle("st-menu-open");


    });
