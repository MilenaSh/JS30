//Hide blue navbar on scroll

//activate the scroll event

$(window).scroll(function () {
    // removeSideMenu();
    var scrollBottom = $(window).scrollTop() + $(window).height();
    // console.log(scrollBottom);
    // console.log($(window).height());

    if ($(this).scrollTop() >= 100) {
        $(".header-blue").css("height", "0px")
            .css("transition", "height 1s")
            .css(".-webkit-transition", "height 1s");
    }

    if ($(this).scrollTop() <= 80) {
        $(".header-blue").css("height", "40px")
            .css("transition", "height .25s");
    }
});


////////////////////////////////////////////////////////////

// Draw the snowflake menu

var LineIndex = 0;

function addLine(selector, lines, customClass) {
    var parent = $(selector);

    var lines = GetLine(3, lines, "diamondLine");


    for (var i = 0; i < lines.length; i++) {
        // lines[i].addClass('diamondLine');
        lines[i].addClass(customClass);
        parent.append(lines[i]);
    }

    for (var i = 0; i < lines.length; i++) {
        parent.append(lines[i]);
    }
}

var circleIndex = 0;

function addCircle(size, angle, ratioOfRadius, selector, lines) {

    var parent = $(selector);
    var maxRadius = parent.width() / 2;
    var angleInRad = DegreesToRad(angle);

    var radius = maxRadius * ratioOfRadius;
    var top = maxRadius - Math.sin(angleInRad) * radius - size / 2;
    var left = maxRadius + Math.cos(angleInRad) * radius - size / 2;

    var element = $("<div>")
        .addClass("small-circle")
        //.addClass(additionalClass)
        // .css("width", size * 3)
        .css("top", top)
        .css("left", left);

    element.attr("data-order", circleIndex);

    // console.log(circleIndex);

    circleIndex++;

    //[{ x: 200, y: 200 }, { x: 100, y: 150 }, { x: left, y: top }]
    var lines = GetLine(3, lines, "line");


    for (var i = 0; i < lines.length; i++) {
        parent.append(lines[i])
    }

    $(element).hover(function () {

        for (var i = 0; i < lines.length; i++) {
            lines[i].addClass('hover');
        }
    }, function () {
        for (var i = 0; i < lines.length; i++) {
            lines[i].removeClass('hover');
        };
    });

    parent.append(element);

    for (var i = 0; i < lines.length; i++) {
        parent.append(lines[i]);
    }
}

var index = 0;

function addElement(height, width, angle, ratioOfRadius, selector, text, lines, parentDevider, maxRadius) {

    var parent = $(selector);
    // var maxRadius = parent.width() / parentDevider;
    // var maxRadius = maxRadius;
    var angleInRad = DegreesToRad(angle);

    var radius = maxRadius * ratioOfRadius;
    var top = maxRadius - Math.sin(angleInRad) * radius - height / 2;
    var left = maxRadius + Math.cos(angleInRad) * radius - height / 2;

    // var additionalClass = ["0", "30", "60", "80", "90", "120", "150", "180","210", "240", "270", "300", "330", "350"]

    var element = $("<div>")
        .addClass("element")
        //.addClass(additionalClass)
        .css("width", width)
        .css("height", height)
        .css("top", top)
        .css("left", left)
        .html(text);

    element.attr("data-index", index);


    // console.log(index);

    index++;

    //[{ x: 200, y: 200 }, { x: 100, y: 150 }, { x: left, y: top }]
    var lines = GetLine(3, lines, "line");


    for (var i = 0; i < lines.length; i++) {
        parent.append(lines[i])
    }

    $(element).hover(function () {

        for (var i = 0; i < lines.length; i++) {
            lines[i].addClass('hover');
        }
    }, function () {
        for (var i = 0; i < lines.length; i++) {
            lines[i].removeClass('hover');
        };
    });

    parent.append(element);

    for (var i = 0; i < lines.length; i++) {
        parent.append(lines[i]);
    }
}


function DegreesToRad(angle) {
    return (angle / 180) * Math.PI;
}

function RadToDegree(rad) {
    return (rad / Math.PI) * 180;
}

function GetLine(width, points, customClass) {
    let segments = [];

    for (var i = 0; i < points.length; i += 1) {
        let startPoint = points[i];
        let endPoint = points[i + 1];
        //  console.log(startPoint);
        //  console.log(endPoint);

        let lenght = Math.sqrt(Math.pow((endPoint.x - startPoint.x), 2) + Math.pow((endPoint.y - startPoint.y),
            2));
        let angle = RadToDegree(Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x)) - 90;

        let shadow = "";

        if ((angle == 45 || (angle > -47 && angle < -43) || angle == 315) && customClass === "line") {
            shadow = "0 3px 5px #c8d0d4";
        }
        else if ((angle >= -230 && angle < -200) && customClass === "line") { // rule for 10: 30 and 11 oclock
            shadow = "1px 0 5px #c8d0d4";
        }
        else if ((angle == 90 || (angle >= 40 && angle < 50) || angle == 0) && customClass === "line") {
            shadow = "3px 0 5px #c8d0d4";
        }
        else if ((angle > 90 && angle < 270) && customClass === "line") {
            shadow = "3px 0 5px #c8d0d4";
        } else if ((angle <= 90 || angle >= 270) && customClass === "line") {
            shadow = "-3px 0 5px #c8d0d4";
            // console.log(angle);
        }
        //  console.log("l:" + lenght);
        //   console.log("a:" + angle);

        var line = $("<div>")
            .addClass(customClass)
            // .addClass("line" + LineIndex)            
            .css("height", lenght)
            .css("width", width)
            .css("top", startPoint.y)
            .css("left", startPoint.x)
            .css("transform", "rotate(" + angle + "deg)")
            .css("transform-origin", "50% 0%")
            .css("box-shadow", shadow);

        segments.push(line)

        LineIndex++;

        if (i + 1 == points.length - 1) {
            break;
        }
    }

    return segments;
}


function radialToXY(r, angle, centerX, centerY) {

    var angleInRad = DegreesToRad(angle);

    var top = centerY - Math.sin(angleInRad) * r;
    var left = centerX + Math.cos(angleInRad) * r;

    return {
        x: left,
        y: top
    }
}


var drawSnowflake = function (halfwidth, elementSizeBase, parentDevider) {

    // halfwidth = halfwidth;
    index = 0;

    var twelveOclock = [
        radialToXY(0 * halfwidth, 0, halfwidth, halfwidth),
        radialToXY(0.50 * halfwidth, 90, halfwidth, halfwidth)
    ];
    //0.01
    // 0.2

    var oneThirty = [
        radialToXY(0 * halfwidth, 0, halfwidth, halfwidth),
        radialToXY(0.5 * halfwidth, 40, halfwidth, halfwidth)
    ];

    var threeOclock = [
        radialToXY(0 * halfwidth, 0, halfwidth, halfwidth),
        radialToXY(0.55 * halfwidth, 0, halfwidth, halfwidth)

    ];

    var fourThirty = [
        radialToXY(0 * halfwidth, 0, halfwidth, halfwidth),
        radialToXY(0.5 * halfwidth, -45, halfwidth, halfwidth)
    ];

    var sixOclock = [
        radialToXY(0 * halfwidth, 0, halfwidth, halfwidth),
        radialToXY(0.75 * halfwidth, -90, halfwidth, halfwidth)
    ];

    var sevenThirty = [
        radialToXY(0 * halfwidth, 0, halfwidth, halfwidth),
        radialToXY(0.5 * halfwidth, -133, halfwidth, halfwidth)
    ];

    var nineOclock = [
        radialToXY(0 * halfwidth, 0, halfwidth, halfwidth),
        radialToXY(0.55 * halfwidth, 180, halfwidth, halfwidth)
    ];
    // 0.88
    // 0.98

    var tenThirty = [
        radialToXY(0 * halfwidth, 0, halfwidth, halfwidth),
        radialToXY(0.5 * halfwidth, 135, halfwidth, halfwidth)
    ];

    // smaller lines

    var two = [
        radialToXY(0 * halfwidth, 0, halfwidth, halfwidth),
        radialToXY(0.3 * halfwidth, 0, halfwidth, halfwidth),
        radialToXY(0.5 * halfwidth, 20, halfwidth, halfwidth)
    ];


    var four = [
        radialToXY(0 * halfwidth, 0, halfwidth, halfwidth),
        radialToXY(0.3 * halfwidth, 0, halfwidth, halfwidth),
        radialToXY(0.5 * halfwidth, -20, halfwidth, halfwidth),
        // radialToXY(1 * 400, -15, 400, 400)

    ];

    var ten = [
        radialToXY(0 * halfwidth, 0, halfwidth, halfwidth),
        radialToXY(0.3 * halfwidth, 180, halfwidth, halfwidth),
        radialToXY(0.5 * halfwidth, 160, halfwidth, halfwidth)

        // radialToXY(0.65 * 400, 15, 100, 400)
    ];

    var eight = [
        radialToXY(0 * halfwidth, 0, halfwidth, halfwidth),
        radialToXY(0.3 * halfwidth, 180, halfwidth, halfwidth),
        radialToXY(0.5 * halfwidth, 200, halfwidth, halfwidth),


    ];

    var eleven = [
        radialToXY(0 * halfwidth, 0, halfwidth, halfwidth),
        radialToXY(0.25 * halfwidth, 90, halfwidth, halfwidth),
        radialToXY(0.47 * halfwidth, 113, halfwidth, halfwidth)
    ];


    var one = [
        radialToXY(0 * halfwidth, 0, halfwidth, halfwidth),
        radialToXY(0.25 * halfwidth, 90, halfwidth, halfwidth),
        radialToXY(0.47 * halfwidth, 66, halfwidth, halfwidth)
    ];

     addElement(0.8 * elementSizeBase, 0.8 * elementSizeBase * 3, 105, 0.65, ".dandelion-menu", "environment sync", twelveOclock, parentDevider, halfwidth); //12
    addElement(0.9 * elementSizeBase, 0.9 * elementSizeBase * 3, 50, 0.65, ".dandelion-menu", "import tool (Sitefinity content)", one, parentDevider, halfwidth); // 1
    addElement(0.8 * elementSizeBase, 0.8 * elementSizeBase * 3, 27, 0.75, ".dandelion-menu", "version control (revision history)", oneThirty, parentDevider, halfwidth); // 1.5
    addElement(0.6 * elementSizeBase, 0.6 * elementSizeBase * 3, 8, 0.9, ".dandelion-menu", "auto sitemap", two, parentDevider, halfwidth); // 2
    addElement(0.6 * elementSizeBase, 0.6 * elementSizeBase * 3, -2, 0.85, ".dandelion-menu", "multilingual", threeOclock, parentDevider, halfwidth); // 3
    addElement(0.6 * elementSizeBase, 0.6 * elementSizeBase * 3, -17, 0.8, ".dandelion-menu", "forums", four, parentDevider, halfwidth); // 4
    addElement(0.6 * elementSizeBase, 0.6 * elementSizeBase * 3, -40, 0.7, ".dandelion-menu", "modular", fourThirty, parentDevider, halfwidth); // 4.5
    addElement(0.6 * elementSizeBase, 0.6 * elementSizeBase * 3, -150, 0.9, ".dandelion-menu", "blogs", sevenThirty, parentDevider, halfwidth); // 7.5
    addElement(0.6 * elementSizeBase, 0.6 * elementSizeBase * 3, -167, 1.1, ".dandelion-menu", "tagging", eight, parentDevider, halfwidth); // 8
    addElement(0.6 * elementSizeBase, 0.7 * elementSizeBase * 3, -178, 1.25, ".dandelion-menu", "dynamic content", nineOclock, parentDevider, halfwidth); // 9
    addElement(0.7 * elementSizeBase, 0.9 * elementSizeBase * 3, -185, 1.3, ".dandelion-menu", "multisite management", ten, parentDevider, halfwidth); // 10
    addElement(0.7 * elementSizeBase, 0.7 * elementSizeBase * 3, 165, 1.2, ".dandelion-menu", "(DDOS) attack protection", tenThirty, parentDevider, halfwidth); // 10.5
    addElement(0.9 * elementSizeBase, 0.9 * elementSizeBase * 3, 150, 1, ".dandelion-menu", "search " + '</br>' + "(Google integration)", eleven, parentDevider, halfwidth); // 11  
  
    addLine(".dandelion-menu", sixOclock, "sixOclock"); // 6
    addElement(80, 80, 180, 0, ".dandelion-menu", '<div class="logo-center"><img src="../../images/Sitetriks_logo.png" alt="logo" style="width: 80px; height: 80px;"></div>', [], parentDevider, halfwidth); // 11


}


/* Mobile View functionality */

/* Diamond figure resize */
var wrapperHalfWidth;

var state = -1;

// state = 0 - > 1280
// state = 1 - 1280 - 900
// state =2  - < 900

var reDrawSnowflake = function () {
    let windowWidth = $(window).width();

    let containerHalfWidth;

    if ((windowWidth > 1280) && !(state == 0)) {
        $('.dandelion-menu').html('');
        //$('.jumbotron-section').css('min-height', '640px');
        //$('.jumbotron-section').css('height', '640px');
        //$('.diamond-figure').css('margin', '-5% auto');
        $('.dandelion-menu').css('height', '700px')
            .css('width', '802px');
        drawSnowflake(400, 100, 2);
        state = 0;
    } else if ((windowWidth <= 1280 && windowWidth > 993) && !(state == 1)) {
        $('.dandelion-menu').html('');
        console.log('middle'),

            //$('.jumbotron-section').css('min-height', '0');
            //$('.jumbotron-section').css('height', '525px');
            $('.diamond-figure').css('margin', '-3% auto');
        $('.dandelion-menu').css('height', '525px')
            .css('width', '602px');
        drawSnowflake(300, 70, 2.5);
        state = 1;

        // containerHalfWidth = $('.diamond-figure').width() / 2;
    } else if ((windowWidth <= 992) && !(state == 2)) {
        console.log('I am in');
        $('.dandelion-menu').html('');
        // $('.jumbotron-section').css('min-height', '0');
        // $('.jumbotron-section').css('height', '450px');
        $('.diamond-figure').css('margin', '-3% auto');
        $('.dandelion-menu').css('height', '437px')
            .css('width', '502px');
        drawSnowflake(250, 70, 5);
        state = 2;
    };
}


$(window).ready(reDrawSnowflake);
$(window).resize(reDrawSnowflake);



/* Hamburger menu */

var clicked = false;
var hamburgerCompress = '/images/mobile/Compress.gif';
var hamburgerExpand = '/images/mobile/Expand.gif';

$('#hamburger-menu img').click(function (ev) {
    if ($(':animated').length) {
        return false;
    };
    if (clicked == false) {
        $('#mobile-view-top-menu').slideDown("slow");
        // $('.hamburger-image').toggle();
        $('.hamburger-image').attr('src', hamburgerCompress);
        setTimeout(function () {
            $('.logo-mobile-image').toggle();
            $('.logo-container-mobile').css('background-color', '#123e7a');
        }, 800);
        //setTimeout($('.logo-container-mobile').css('background-color', '#123e7a'), 6000);
        //$('.logo-container-mobile').css('background-color', '#123e7a');
        clicked = true;
        $('.hidden-by-menu').toggle();

    } else if (clicked == true) {
        $('#mobile-view-top-menu').slideUp("slow");
        // $('.hamburger-image').toggle();
        $('.hamburger-image').attr('src', hamburgerExpand);
        setTimeout(function () {
            $('.logo-mobile-image').toggle();
            $('.logo-container-mobile').css('background-color', 'white');
        }, 800);
        clicked = false;
        $('.hidden-by-menu').toggle();
    }
});

/* Hamburger menu functionality as bottom menu */

/*Load proper content on click*/

$('#mobile-view-top-menu').on('click', '.menu-icon', function (event) {
    var $button = $(event.target);

    if (!$button.hasClass('menu-icon')) {
        $button = $button.parents('.menu-icon');
    }

    $('#static-section').remove();
    // check if it was already clicked
    if ($button.hasClass('active')) {
        // console.log($button);
        $button.removeClass('active');

    } else if (!$button.hasClass('active')) {
        // $('.menu-icon').addClass('active');
        $('.menu-icon').removeClass('active');
        $button.addClass('active');
        $button.parent().parent().next().html(selectedSection);
    }

    // console.log(button);
    console.log($button.attr('data-order'));

});


/*Change the middle box sign */

var changeSlogan = function () {
    let windowWidth = $(window).width();

    if (windowWidth < 768) {
        $('.entreprice-description').text('(Free basic license available)');
        $('#middle-box .arrows').css('display', 'inline-block');
    } else if (windowWidth >= 768) {
        $('.entreprice-description').text('Available with SiteTriks\'s free basic license.');
        $('#middle-box .arrows').css('display', 'none');
    }
};

$(window).ready(changeSlogan);
$(window).resize(changeSlogan);

/* Main menu */

let $detailedMenuItem = $('.wrapper-menu-items');
let $mainDropdown = $('#middle-box');

$mainDropdown.click(function () {
    $detailedMenuItem.toggle();
    $('.main-arrows').toggle();
});

/* Separate Menu items */

$('.wrapper-menu-items').on('click', ($('.item-header')), function (event) {
    var button = $(event.target);
    //$('.item-arrow').toggle();
    if (!button.hasClass('item-header')) {
        button = button.parents('.item-header');
    }

    button.toggleClass('whiteText');
    button.next().toggle();
    button.children('img').toggle();
});

/* Technology and advantages */
let $advanatagesDropdown = $('.advantages-block');

let $technologyDropdown = $('.technology-block');

$advanatagesDropdown.click(function () {
    $('.bullets').toggle();
    $('.dropdownOne-advantage').toggle();
})

$technologyDropdown.click(function () {
    $('.technology-links').toggle();
    $('.dropdownOne-tech').toggle();
})

/* Bottom menu display and functionality*/



let changeMenu = function () {
    let windowWidth = $(window).width();
    let mobileView = $('#mobile-view-menu');
    let desktopView = $('#desktop-view-menu');

    if (windowWidth < 768) {
        $('#desktop-view-menu').css('display', 'none');
        $('#mobile-view-menu').css('display', 'block');
        //desktopView.remove();
        //mobileView.appendTo($('.technology-list'));

    } else if (windowWidth >= 768) {
        $('#desktop-view-menu').css('display', 'block');
        $('#mobile-view-menu').css('display', 'none');
        //mobileView.remove();
        //desktopView.appendTo($('.technology-list'));
    }
}

$(window).ready(changeMenu);
$(window).resize(changeMenu);

/*Load proper content on click*/

$('#mobile-view-menu').on('click', '.menu-icon', function (event) {
    var $button = $(event.target);

    if (!$button.hasClass('menu-icon')) {
        $button = $button.parents('.menu-icon');
    }

    $('#static-section').remove();
    // check if it was already clicked
    if ($button.hasClass('active')) {
        // console.log($button);
        $button.removeClass('active');

    } else if (!$button.hasClass('active')) {
        // $('.menu-icon').addClass('active');
        $('.menu-icon').removeClass('active');
        $button.addClass('active');
        $button.parent().parent().next().html(selectedSection);
    }

    // console.log(button);
    console.log($button.attr('data-order'));

});

var selectedSection = "<div class=\"col col-xs-12\"><div class=\"selected-feature\" id=\"static-section\"><div class=\"feature-content\"></div></div></div>";


/*To Move - Logic for Contact Us page*/

function initSomeForm() {
    $('body').on('click', '.phone-contact', function () {
        console.log('clicked');
        $('.expanded-contacts.phone').css('display', 'block');
        $('.contact-us-widget.main-container').css('display', 'none');
        $('.expanded-contacts.mail').css('display', 'none');
    })

    $('body').on('click', '.mail-contact', function () {
        console.log('clicked');
        $('.expanded-contacts.mail').css('display', 'block');
        $('.contact-us-widget.main-container').css('display', 'none');
        $('.expanded-contacts.phone').css('display', 'none');
    })

    $('body').on('click', '.go-back-button', function () {
        console.log('clicked');
        $('.expanded-contacts.mail').css('display', 'none');
        $('.expanded-contacts.phone').css('display', 'none');
        $('.contact-us-widget.main-container').css('display', 'block');
    })
   
};

$(document).on('initSomeForm', initSomeForm);

$(document).trigger('initSomeForm');



// Clean the form and success/ error messages.

$('body').on('submit', '#test-form', function (ev) {
    let formData = new FormData(this);
    Data.postForm({ url: this.action, formData: formData })
        .then(function (res) {
            console.log(res);
            $("input").val("");
            $("textarea").val("")
            alert('Your request was sent successfully!')
            $('#test-form').append
        })
        .catch(function (err) {
            console.log(err);
            alert('One or more fields were not filled in successfully. Please fill them in and try again.')
        })
    ev.preventDefault();
    return false;

})

/* Filter the phone number according to the selected */

$('body').on('click', '.list-of-regions li', function () {
    console.log('clicked');

    $('.list-of-regions li').each(function () {
        if ($(this).hasClass('selected-region')) {
            $(this).removeClass('selected-region');
        }
    });
    $(this).toggleClass('selected-region');
    console.log($(this).attr('data-region'));

    switch ($(this).attr('data-region')) {
        case "europe":
            $('.list-of-contacts').html("<p>Contacts within Europe: </p><ul ><li><img src=\"/images/contact-us/tel_blue.svg\"><a href=\"tel:+44 515 772 228\">UK: +44 515 772 228</a></li><li><img src=\"/images/contact-us/tel_blue.svg\"><a href=\"tel:+49515772228\">Germany: +49 515 772 228</a></li><li><img src=\"/images/contact-us/tel_blue.svg\"><a href=\"tel:+359876645789\">Bulgaria: +359876645789</a></li></ul>");
            break;
        case "north-america":
            $('.list-of-contacts').html("<p>Contacts within North America: </p><ul ><li><img src=\"/images/contact-us/tel_blue.svg\"><a href=\"tel:+44 515 772 228\">UK: +443 515 772 228</a></li><li><img src=\"/images/contact-us/tel_blue.svg\"><a href=\"tel:+49515772228\">Germany: +49 515 772 228</a></li><li><img src=\"/images/contact-us/tel_blue.svg\"><a href=\"tel:+359515772228\">Bulgaria: +359 515 772 228</a></li></ul>");
            break;
        case "south-america":
            $('.list-of-contacts').html("<p>Contacts within South America: </p><ul ><li><img src=\"/images/contact-us/tel_blue.svg\"><a href=\"tel:+44 515 772 228\">UK: +44444 515 772 228</a></li><li><img src=\"/images/contact-us/tel_blue.svg\"><a href=\"tel:+49515772228\">Germany: +49 515 772 228</a></li><li><img src=\"/images/contact-us/tel_blue.svg\"><a href=\"tel:+359515772228\">Bulgaria: +359 515 772 228</a></li></ul>");
            break;
        case "asia":
            $('.list-of-contacts').html("<p>Contacts within Asia: </p><ul ><li><img src=\"/images/contact-us/tel_blue.svg\"><a href=\"tel:+44 515 772 228\">UK: +44444 515 772 228</a></li><li><img src=\"/images/contact-us/tel_blue.svg\"><a href=\"tel:+49515772228\">Germany: +49 515 772 228</a></li><li><img src=\"/images/contact-us/tel_blue.svg\"><a href=\"tel:+359515772228\">Bulgaria: +359 515 772 228</a></li></ul>");
            break;
        case "australia":
            $('.list-of-contacts').html("<p>Contacts within Australia: </p><ul ><li><img src=\"/images/contact-us/tel_blue.svg\"><a href=\"tel:+44 515 772 228\">UK: +44444 515 772 228</a></li><li><img src=\"/images/contact-us/tel_blue.svg\"><a href=\"tel:+49515772228\">Germany: +49 515 772 228</a></li><li><img src=\"/images/contact-us/tel_blue.svg\"><a href=\"tel:+359515772228\">Bulgaria: +359 515 772 228</a></li></ul>");
            break;
        case "africa":
            $('.list-of-contacts').html("<p>Contacts within Africa</p><ul ><li><img src=\"/images/contact-us/tel_blue.svg\"><a href=\"tel:+44 515 772 228\">UK: +44444 515 772 228</a></li><li><img src=\"/images/contact-us/tel_blue.svg\"><a href=\"tel:+49515772228\">Germany: +49 515 772 228</a></li><li><img src=\"/images/contact-us/tel_blue.svg\"><a href=\"tel:+359515772228\">Bulgaria: +359 515 772 228</a></li></ul>");
            break;
        default:
            $('.list-of-contacts').html("<p>Contacts within Europe: </p><ul ><li><img src=\"/images/contact-us/tel_blue.svg\"><a href=\"tel:+44 515 772 228\">UK: +44 515 772 228</a></li><li><img src=\"/images/contact-us/tel_blue.svg\"><a href=\"tel:+49515772228\">Germany: +49 515 772 228</a></li><li><img src=\"/images/contact-us/tel_blue.svg\"><a href=\"tel:+359515772228\">Bulgaria: +359 515 772 228</a></li></ul>");
            break;
    }
})