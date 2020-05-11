
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
    $('.footer-right i').click(function(){
        //identifichiamo il VALORE dell'input e lo salviamo
        var testo_utente = $('.footer-right input').val();
        //inseriamo il valore dell'input nel nostro template
        $('.template #casella').text(testo_utente);
        //copiamo il template dove vogliamo che esso appaia
        $('.template>div:first-of-type').clone().appendTo('.chat');
        $('.footer-right input').val('');

        //MILESTONE 2 PT 1
        setTimeout(function(){
            $('.template>div:nth-of-type(2)').clone().appendTo('.chat')
        },1000)
    })

    //inviare anche con enter BONUS
    $('.footer-right input').on("enterKey",function(e){
        var testo_utente = $('.footer-right input').val();
        $('.template #casella').text(testo_utente);
        $('.template>div:first-of-type').clone().appendTo('.chat')
        setTimeout(function(){
            $('.template>div:nth-of-type(2)').clone().appendTo('.chat')
        },1000)
    })
    $('.footer-right input').keyup(function(e){
        if(e.keyCode == 13) {
            $(this).trigger("enterKey");
            $('.footer-right input').val('');
        }
    })

    //MILESTONE 2 PT 2

    //Ricerca contatti con click
    $('.input i').click(function(){
        $(".info-text h4").each(research)
        $('.input input').val('');
    })

    //Bonus enter per la ricerca dei contatti
    $('.input input').on("enterKey",function(e){
        $(".info-text h4").each(research)
    })

    $('.input input').keyup(function(e){
        if(e.keyCode == 13) {
            $(this).trigger("enterKey");
            $('.input input').val('');
        }
    })

    function research() {
            var ricerca_utente = $('.input input').val().toUpperCase();
            console.log(ricerca_utente);
            var nomi_contatti = $(this).text().toUpperCase();
            console.log(this);
            console.log($(this).text());
            if (!(nomi_contatti.includes(ricerca_utente))) {
                $(this).closest('.chat-preview').hide();
            } else if (ricerca_utente == '') {
                $('.chat-preview').show();
            }
        }

    //MILESTONE 3

    //MILESTONE 3 PT 1 da fare domani


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



//DA FARE MILESTONE 3 pt.1

//Delete message MILESTONE 3 PARTE 3
