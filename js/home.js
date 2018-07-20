var headerOptions = document.querySelectorAll('.header-calculate-options');
var cotizadorOptions = document.querySelectorAll('.option-calc');

cotizadorOptions.forEach(function(option){
  option.addEventListener('click', function(){
    var id = option.getAttribute('id');
    // me muevo hacia el cotizador
    $('html, body').animate({ scrollTop: $('#cotizador').offset().top }, 'slow');
    // remuevo la clase active
    cotizadorOptions.forEach(function(opcion){
      
      if(opcion.classList.contains('active')) {
        if(opcion.id != id)
          opcion.classList.remove('active');
      }
      if(opcion.id == id) opcion.classList.add('active');
    }) 
    // selecciono la opcion para el cotizador
    changeValuesForOption (id);
  });
}) 

var tituloPregunta = document.getElementById('question-option');

function changeValuesForOption (option) {
  switch (option) {
    case 'valor':
      tituloPregunta.innerHTML = '¿Cuál es el valor de la vivienda?';
      break;
    case 'monto':
      tituloPregunta.innerHTML = '¿Cuál es el monto que necesitas?';
      break;
    case 'ingreso':
      tituloPregunta.innerHTML = '¿Cuál es tu ingreso neto mensual?';
      break;
    case 'pago':
      tituloPregunta.innerHTML = '¿Cuanto pagarías mensualmente?';
      break;
    default:
      break;
  }
}

// modal infonavit/fovissste
const linksOptions = document.querySelectorAll('.scrollmenu a');
linksOptions.forEach(function(option){
  option.addEventListener('click', toggleActive)
});

function toggleActive() {
  linksOptions.forEach(function(option){
    if(option.classList.contains('active')) option.classList.remove('active')
  });
  this.classList.add('active')
}

// modal folio
var olvideFolioLink = document.getElementById('olvide-folio-link');
var tituloModal = document.getElementById('modal-folio-titulo');
olvideFolioLink.addEventListener('click', function(){
  tituloModal.innerHTML = 'Olvide mi folio';
  document.getElementById('ingresa-folio').classList.add('hidden');
  document.getElementById('olvide-folio').classList.remove('hidden');
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

$.fn.exists = function() {
  return this.length > 0;
}

selectsSolicitud.each(function() {
  let select = $(this)
      let optionSelected = select.find("option:selected");
      select.siblings('.input-success').html(optionSelected.text());
})

$(".code-input").bind('keyup', function() {
  var indexInput = 0;
  var value = $(this).val()
  var regex = /^\d+$/
  if (regex.test(value)) {
    if (indexInput < 5)
      $(this).next().focus()
    indexInput++
  }
});
var clock;

$('#btnSolicitarSMS').click(function(){
  if(!$('#btnGeneraSolicitud').hasClass('hidden')){
    $('#btnGeneraSolicitud').addClass('hidden')
  }
  if($('.code-submit-form').hasClass('hidden')){
    $('.code-submit-form').removeClass('hidden')
  }
  if(!$('#after-sms').hasClass('hidden')){
    $('#after-sms').addClass('hidden')
  }
  $('#countdown').removeClass('hidden')
  $('#before-sms').removeClass('hidden')
  clock = new FlipClock($('.clock'), 15, {
    clockFace: 'Counter',
    autoStart: true,
    countdown: true,
    callbacks: {
      stop: function(){
        $('#before-sms').addClass('hidden')
        $('#after-sms').removeClass('hidden')
        $('#countdown').addClass('hidden')
        $('#btnGeneraSolicitud').removeClass('hidden')
      }
    }
  });
})

const inputsSolicitud = $('input')
inputsSolicitud.each(function() {
  let input = $(this)
  input.change(function() {
    if (input.val() !== '') {
      if (input.attr('id') === 'celular') { // pregunto cuando sea el campo del celular
        let regex = /^\(?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        if (regex.test(input.val())) { // valido el telefono
          $('#loader-phone-message').removeClass('hidden') // si pasa se muestra loader

          // aqui se enviaria el mensaje, solo se simula un periodo de tiempo
          setTimeout(function() {
            $('#loader-phone-message').addClass('hidden')
            $('#phone-message-alert').removeClass('hidden')
          }, 4000);

        } else {
          input.siblings('.input-error').html('No es un número de teléfono válido');
          input.addClass('invalid')
        }
      } else {

        input.addClass('valid')
        input.siblings('.input-success').html(input.val());
      }
    }
  })
})

if ($('#celular-solicitud').exists()) {
  let cleave = new Cleave('#celular-solicitud', {
    phone: true,
    phoneRegionCode: 'MX'
  });
}

var valorVivienda = $('#valor-inmueble')
var plazo = $('#plazo')
var monto = $('#monto-credito')
var ingresoNeto = $('#ingreso-neto')
var financiamiento = $('#financiamiento')
var tasa = $('#tasa')
var mensAccesorios = $('#mens-accesorios')
var pagoMensualTotal = $('#pago-mensual-total')
var comisionMensual = $('#comision-mensual')
var seguroMensual = $('#seguro-mensual')
var seguroDanios = $('#seguro-danios')
var desembolso = $('#desembolso')
var enganche = $('#enganche')
var apertura = $('#apertura')
var notariales = $('#notariales')
var avaluo = $('#avaluo')

function calculaOferta() {
  $('#calcula-loader').removeClass('hidden');
  setTimeout(function(){
    $('#calcula-loader').addClass('hidden');
    valorVivienda.html('$'+getRandomFloat(800000,1000000))
  plazo.html(getRandomInt(5,20)+' años')
  monto.html('$'+getRandomFloat(800000,900000))
  ingresoNeto.html('$'+getRandomFloat(20000,30000))
  financiamiento.html(getRandomInt(10,20)+'%')
  tasa.html(getRandomFloat(5,15)+'%')
  mensAccesorios.html('$'+getRandomFloat(5000,10000))
  pagoMensualTotal.html('$'+getRandomFloat(5000,10000))
  comisionMensual.html('$'+getRandomFloat(5000,10000))
  seguroMensual.html('$'+getRandomFloat(5000,10000))
  seguroDanios.html('$'+getRandomFloat(5000,10000))
  desembolso.html('$'+getRandomFloat(5000,10000))
  enganche.html('$'+getRandomFloat(5000,10000))
  apertura.html('$'+getRandomFloat(5000,10000))
  notariales.html('$'+getRandomFloat(5000,10000))
  avaluo.html('$'+getRandomFloat(5000,10000))
  },1500)
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

$('#valor-vivienda').on('change',formatCurrency)

function formatCurrency() {
  //number-format the user input
  this.value = '$' + parseFloat(this.value.replace(/,/g, '')).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function getRandomFloat(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}