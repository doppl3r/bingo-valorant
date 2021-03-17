function setBackground() {
    var index = Math.floor(Math.random() * window.background.length);
    $("body").css("background-image", "url('img/" + window.background[index] + "')");
}

function loadJSON() {
    var url  = 'json/card.json?nocache=' + (new Date()).getTime();
    $.ajax({
        url: url,
        method: 'GET',
        success: function(response) {
            window.card = response.card;
            window.options = response.card;
            window.background = response.background;
            setBackground();
            shuffleCard();
            sliceCard();
            renderCard();
            updatePopup();
            setFreeCard();
        }
    });
}

function shuffleCard() {
    window.card = window.card.sort(() => Math.random() - 0.5);
}

function sliceCard() {
    window.card = window.card.slice(0, 25);
}

function renderCard() {
    $('.card').empty();
    for (var i = 0; i < window.card.length; i++) {
        $('.card').append(
            '<label class="box">' +
                '<input type="checkbox">' +
                '<span>' + window.card[i] + '</span>' +
            '</label>'
        );
    }
}

function updatePopup() {
    var popup = $('.popup');
    var popupButton = $('.popup-button');
    popupButton.off();
    popup.find('.popup-close').off();
    popup.html(
        '<div class="background popup-close"></div>' +
        '<ul><li>Want to see more?<br>Message me on Twitter <a href="https://twitter.com/doppl3r" target="_blank">@doppl3r</a><br><br></li></ul>'
    );
    window.options.sort();
    for (var i = 0; i < window.options.length; i++) { popup.find('ul').append('<li>- ' + window.options[i] + '</li>'); }
    popupButton.on('click', function(e) { e.preventDefault(); popup.toggleClass('active'); });
    popup.find('.popup-close').on('click', function(e) { e.preventDefault(); popup.removeClass('active'); });

}

function setFreeCard() {
    var box = $('.card label:nth-of-type(13)');
    box.click();
    box.find('span').text("Freebie");
}

$(document).ready(function() {
    loadJSON();
});