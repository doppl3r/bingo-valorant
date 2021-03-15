function loadJSON() {
    var url  = 'json/card.json?nocache=' + (new Date()).getTime();
    $.ajax({
        url: url,
        method: 'GET',
        success: function(response) {
            window.card = response.card;
            shuffleCard();
            sliceCard();
            renderCard();
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

function setFreeCard() {
    var box = $('.card label:nth-of-type(13)');
    box.click();
    box.find('span').text("Freebie");
}

$(document).ready(function() {
    loadJSON();
});