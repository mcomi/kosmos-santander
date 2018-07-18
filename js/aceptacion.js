function formatCurrency() {
  //number-format the user input
  this.value = parseFloat(this.value.replace(/,/g, '')).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
var valorVivienda = 1111000; // para pasar el valor de la vivienda
var montoCredito = 1000000;  // para pasar el valor del monto del credito

function cargaDatosIniciales() {
  $('#valor-vivienda').val(formatCurrencyManual(valorVivienda));
  $('#monto-credito').val(formatCurrencyManual(montoCredito));
  $('#pago-mensual').html('$10,281')
  $('#tasa').html('10.94%')
  $('#cat').html('14%')
}

function recalculaOferta() {  // simula recalcula oferta
  $('#pago-mensual').html('$11,435')
  $('#tasa').html('6.94%')
  $('#cat').html('12%')
}

cargaDatosIniciales()

$('#regresar-datos-btn').click(function(){
  cargaDatosIniciales()
})

function recalculaPlazos(){
  $('#pago-mensual').html('$9,281')
  $('#tasa').html('7.23%')
  $('#cat').html('11%')
}

function recalculaEsquemaPagos(){
  $('#pago-mensual').html('$7,281')
  $('#tasa').html('9.23%')
  $('#cat').html('17%')
}

$('#plazos').change(function(){
  recalculaPlazos()
})

$('#esquema').change(function(){
  recalculaEsquemaPagos()
})

$('#muestra-oferta-final-btn').click(function(e){
  e.preventDefault();
  $('#propuesta-final').removeClass('hidden')
  $('#propuesta-inicial').addClass('hidden')
  $('#tabla-modificadores').addClass('hidden')
  $('#continuar-solicitud-btn').removeClass('hidden')
  if(isMobile){

    setTimeout(function(){
  
      $('html, body').animate({ scrollTop: $('#propuesta-final').offset().top }, 'slow');
    },400)
  }
})

$(function () {
  $('[data-toggle="popover"]').popover({
    container: 'body'
  })
})

$('#editar-datos-btn').click(function(){
  $('#propuesta-final').addClass('hidden')
  $('#propuesta-inicial').removeClass('hidden')
  $('#tabla-modificadores').removeClass('hidden')
  $('#continuar-solicitud-btn').addClass('hidden')
})

$('#recalcular-btn').click(function(){
  $('#loader-recalcula').removeClass('hidden')
  $(this).addClass('hidden')
  setTimeout(function(){

    $('#oferta-inicial').removeClass('hidden')
    $('#cambio-oferta').addClass('hidden')
    $('#loader-recalcula').addClass('hidden')
    $('#recalcular-btn').removeClass('hidden')
    recalculaOferta()
  },4000)
})

function formatCurrencyManual(valor) {
  //number-format the user input
  return parseFloat(valor.toString().replace(/,/g, '')).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

var valid = true;
var isMobile = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 isMobile = true;
}

const inputsSolicitud = $('input')
inputsSolicitud.each(function() {
  let input = $(this)
  input.change(function() {
    if (input.val() !== '') {
      
        $('#oferta-inicial').addClass('hidden')
        input.addClass('valid')
        input.siblings('.input-success').html(input.val());
        $('#cambio-oferta').removeClass('hidden')
    }
  })
})

inputsSolicitud.each(function() {
  let input = $(this)
  input.addClass('valid')
  input.siblings('.input-success').html(input.val());
      
})

const selectsSolicitud = $("select")
selectsSolicitud.each(function() {
  let select = $(this)
  select.change(function() {
    if (select.val() !== '') {
      select.addClass('valid')
      let optionSelected = select.find("option:selected");
      select.siblings('.input-success').html(optionSelected.text());
    }
  })
})

selectsSolicitud.each(function() {
  let select = $(this)
      let optionSelected = select.find("option:selected");
      select.siblings('.input-success').html(optionSelected.text());
})

$('#copy-clipboard').click(function(){
  var folio = $('#folio-value').html();
  var hiddenClipboard = $('#_hiddenClipboard_');
  $('body').append('<textarea style="position:absolute;top: -9999px;" id="_hiddenClipboard_"></textarea>');
  hiddenClipboard = $('#_hiddenClipboard_');
  hiddenClipboard.html(folio);
  hiddenClipboard.select();
  var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Folio copiado: " + folio;
    setTimeout(function(){
      tooltip.innerHTML = "";
    },1000)
  document.execCommand('copy');
})