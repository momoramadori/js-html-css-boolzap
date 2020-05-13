
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

    $('input').keydown(function (e) {
        if($(this).val().length == 0 && e.which==32){
            e.preventDefault();
        }
    })

    //MILESTONE 2 PT 2
    //Ricerca contatti con click
    $('.input i').click(function(){
        //al click sull'icona applico la funzione ad ogni contatto e verifico il tutto, rimarranno visibili solo quelli che includono la ricerca
        research();
        //dopodichè libero l'input
        $('.input input').val('');
    })

    $('.input input').keyup(function(){
        research();
    })

    //faccio la stessa cosa ma con l'enter
    $('.input input').keyup(function(event) {
        // verifico se l'utente ha digitato "ENTER"
        if(event.which == 13) {
            research();
            $('.input input').val('');
        }
    });

    function research() {
        //identifico il valore inserito dall'utente e lo rendo uppercase
        var ricerca_utente = $('.input input').val().toUpperCase();
        //identifico i nomi dei contatti e li rendo uppercase
        if (ricerca_utente != '') {
            $(".chat-preview").each(function() {
                var nomi_contatti = $(this).find('.info-text h4').text().toUpperCase();
                //se non includono la ricerca dell'utente li rendo invisibili
                if (nomi_contatti.includes(ricerca_utente)) {
                    $(this).show();
                    //se la ricerca dell'utente è vuota ricompaiono tutti
                } else  {
                    $(this).hide();
                }
            })
        } else {
            $(".chat-preview").show();
        }
    }

    //MILESTONE 3

    //MILESTONE 3 PT 1

    //Al click aprire la chat del singolo utente e poterci scrivere
    $('.chat-preview').click(function() {
        $('.chat-preview').removeClass('grey');
        $(this).addClass('grey');
        //recupero la posizione del contatto su cui sono
        var posizione_contatto = $(this).index();
        //recupero immagine  contatto su cui sono
        var immagine_contatto = $(this).find('img').clone();
        //sostituisco l'immagine nell'header right con quella del contatto su cui sono
        $(".img-header-right img").replaceWith(immagine_contatto);
        //recupero il nome del contatto su cui sono
        var nome_contatto = $(this).find('h4').text();
        //sostituisco il nome nell'header-right con quello del contatto su cui sono
        $('.img-header-right .info-text h4').text(nome_contatto)
        //definisco la posizione della chat corrispondente
        var chat_corrispondente = $('.chat').eq(posizione_contatto);
        //identifico la chat visibile
        var chat_corrente = $('.chat.chat-active');
        //rendo la chat  invisibile
        chat_corrente.removeClass('chat-active');
        //nascondo i messaggi al suo interno
        chat_corrente.find('.message').hide();
        //rendo visibile la chat corrispondente al contatto su cui ho cliccato
        chat_corrispondente.addClass('chat-active');
        //rendo visibili i suoi messaggi
        chat_corrispondente.find('.message').show();
    })

    //MILESTONE 3 PT 2
    $('body').on('click','.message i', function() {
        //identifico  dropdown  corrispondente al messaggio su cui clicco
        var drop = $(this).next().next('.message-dropdown');
        // se è già attivo li nascono tutti
        if (drop.hasClass('message-dropdown-active')) {
            $('.message-dropdown').removeClass('message-dropdown-active');
        } else {
            //se non è attivo li nascondo tutti di base
            $('.message-dropdown').removeClass('message-dropdown-active');
            // e poi apro solo quello su cui ho cliccato
            drop.addClass('message-dropdown-active');
        }
    })

    //quando clicco su delete message elimino il messaggio corrispondente
    $('body').on('click','.message-delete', function() {
        $(this).closest('.message').remove();
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
