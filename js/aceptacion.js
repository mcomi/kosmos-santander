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
})

$('#editar-datos-btn').click(function(){
  $('#propuesta-final').addClass('hidden')
  $('#propuesta-inicial').removeClass('hidden')
  $('#tabla-modificadores').removeClass('hidden')
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