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
            addPopup();
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

function addPopup() {
    var popup = $('.popup');
    var popupButton = $('.popup-button');
    popup.html(
        '<div class="background popup-close"></div><ul class="list"></ul>'
    );
    window.options.sort();
    for (var i = 0; i < window.options.length; i++) { popup.find('.list').append('<li>- ' + window.options[i] + '</li>'); }
    
    // Add form listeners
    popupButton.on('click', function(e) { e.preventDefault(); popup.toggleClass('active'); });
    popup.find('.popup-close').on('click', function(e) { e.preventDefault(); popup.removeClass('active'); });
    
    // DEPRECATED - Twitter dumb
    popup.find('.new-option').on('submit', function(e) {
        e.preventDefault();
        var input = $('.popup').find('input[name="option"]');
        var link = 'https://twitter.com/intent/tweet?text=@doppl3r%20Valorant%20Bingo%20idea: ' + input.val();
        window.open(link, '_blank');
    });
}

function setFreeCard() {
    var box = $('.card label:nth-of-type(13)');
    box.click();
    box.find('span').text("Freebie");
}

$(document).ready(function() {
    loadJSON();
});