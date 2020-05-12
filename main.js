
$(document).ready(function() {

    //MILESTONE 1 PT 1

    //Icona dell'aereoplano sostituisce il microfono quando entriamo sull'input
    $('.footer-right input').focus(function(){
        $('.footer-right .fa-microphone').addClass('icon-unactive');
        $('.footer-right .fa-paper-plane').removeClass('icon-unactive');
    })
    //Nel momento in cui usciamo dall'input se c'è testo rimane l'aereo, altrimenti torna il microfono
    $('.footer-right input').blur(function(){
        if ($('.footer-right input').val() == ('')) {
            $('.footer-right .fa-microphone').removeClass('icon-unactive');
            $('.footer-right .fa-paper-plane').addClass('icon-unactive');
        }
    })

    //Inseriamo l'input dell'utente in un messaggio al click dell'icona dell'aereo
    $('.footer-right i').click(invia_messaggio)
    // //inviare anche con enter BONUS
    $('.footer-right input').keypress(function(event) {
        // verifico se l'utente ha digitato "ENTER"
        if(event.which == 13) {
            invia_messaggio();
        }
    });

    function invia_messaggio() {
        // recupero il testo inserito dall'utente nell'input
        var testo_utente = $('.footer-right input').val();
        // verifico che il testo digitato non sia vuoto (o che non contenga solo " ")
        if(testo_utente.trim() != '') {
            // faccio una copia del template per creare un nuovo messaggio
            var nuovo_messaggio = $('.template .message').clone();
            // aggiungo la classe "sent" al messaggio
            nuovo_messaggio.addClass('my-message');
            // inserisco il testo dell'utente nello span "message-text"
            nuovo_messaggio.children('.casella').text(testo_utente);
            // inserisco il nuovo messaggio nel contenitore di tutti i messaggi della conversazione
            $('.chat.chat-active').append(nuovo_messaggio);
            // resetto l'input
            $('.footer-right input').val('');

            //MILESTONE 2 PT 1
            setTimeout(function(){
                var nuovo2_messaggio = $('.template .message').clone();
                nuovo2_messaggio.addClass('other-message');
                nuovo2_messaggio.children('.casella').text('ok!');
                $('.chat.chat-active').append(nuovo2_messaggio);
            },1000)
        }
    }

    //MILESTONE 2 PT 2
    //Ricerca contatti con click
    $('.input i').click(function(){
        $(".info-text h4").each(research)
        $('.input input').val('');
    })

    $('.input input').keypress(function(event) {
        // verifico se l'utente ha digitato "ENTER"
        if(event.which == 13) {
            $(".info-text h4").each(research)
            $('.input input').val('');
        }
    });

    function research() {
            var ricerca_utente = $('.input input').val().toUpperCase();
            var nomi_contatti = $(this).text().toUpperCase();
            if (!(nomi_contatti.includes(ricerca_utente))) {
                $(this).closest('.chat-preview').hide();
            } else if (ricerca_utente == '') {
                $('.chat-preview').show();
            }
        }

    //MILESTONE 3

    //MILESTONE 3 PT 1 da fare domani

    // //DA FARE MILESTONE 3 pt.1
    //Al click aprire la chat del singolo utente e poterci scrivere
    $('.chat-preview').click(function() {
        //recupero la posizione del contatto su cui sono
        var posizione_contatto = $(this).index();
        //definisco la posizione della chat corrispondente
        var chat_corrispondente = $('.chat').eq(posizione_contatto);
        //identifico la chat visibile
        var chat_corrente = $('.chat.chat-active');
        console.log(chat_corrente);
        //rendo la chat  invisibile
        chat_corrente.removeClass('chat-active');
        //nascondo i messaggi al suo interno
        chat_corrente.find('.message').hide();
        console.log(chat_corrente);
        //rendo visibile la chat corrispondente al contatto su cui ho cliccato
        chat_corrispondente.addClass('chat-active');
        //rendo visibili i suoi messaggi
        chat_corrispondente.find('.message').show();
        console.log(chat_corrispondente);
    })




    //MILESTONE 3 PT 2
    $('body').on('click','.message i', function() {
        var drop = $(this).next().next('.message-dropdown');
        if (drop.hasClass('message-dropdown-active')) {
            $('.message-dropdown').removeClass('message-dropdown-active');
        } else {
            $('.message-dropdown').removeClass('message-dropdown-active');
            drop.addClass('message-dropdown-active');
        }
    })

    $('body').on('click','.message-delete', function() {
        $(this).closest('.message').hide();
    })
})

//Aggiunto orario attuale alle chat
$('.ora').text(orario());
function orario() {
    var today = new Date();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    if (minutes < 10) {
        var time = today.getHours() + ":0" + today.getMinutes();
    } else {
        var time = today.getHours() + ":" + today.getMinutes();
    }
    return time
}




// $('.chat-preview').click(function() {
//     var indice_chat_corrente = $(this).index();
//     var spazio_chat_corrispondente = $('.chat').eq(indice_chat_corrente);
//     $('.chat-preview').removeClass('active-chat');
//     spazio_chat_corrispondente.addClass('active-chat');
//
// })
