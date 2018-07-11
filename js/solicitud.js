$( "input[name='segunda-persona']").click(function(){
  if($(this).val() == 'si-sp'){
    $('#segunda-persona').removeClass('hidden')
  }else{
    $('#segunda-persona').addClass('hidden')
  }
})

$( "input[name='t-ingresos']").click(function(){
  
  if($(this).val() == 'asalariada'){
    if($(this).prop('checked')){
      $('#datos-asalariada').removeClass('hidden')
    }else{
      $('#datos-asalariada').addClass('hidden')
    }
  }
  if($(this).val() == 'p-act-empresarial'){
    if($(this).prop('checked')){
      $('#datos-act-empresarial').removeClass('hidden')
    }else{
      $('#datos-act-empresarial').addClass('hidden')
    }
  }
  if($(this).val() == 'prof-independiente'){
    if($(this).prop('checked')){
      $('#datos-independiente').removeClass('hidden')
    }else{
      $('#datos-independiente').addClass('hidden')
    }
  }
  if($(this).val() == 'ingresos-cheques'){
    if($(this).prop('checked')){
      $('#datos-cheques').removeClass('hidden')
    }else{
      $('#datos-cheques').addClass('hidden')
    }
  }
})



$('#ingreso_mensual').on('change',formatCurrency)

function formatCurrency() {
  //number-format the user input
  this.value = parseFloat(this.value.replace(/,/g, '')).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

$.fn.exists = function() {
  return this.length > 0;
}
var valid = true;
var isMobile = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 isMobile = true;
}

const linksOptions = document.querySelectorAll('.scrollmenu a');
linksOptions.forEach(option => option.addEventListener('click', toggleActive));

function toggleActive() {
  linksOptions.forEach(option => {
    if(option.classList.contains('active')) option.classList.remove('active')
  });
  this.classList.add('active')
  if(this.dataset.type == 'precalificacion') {
    $('#datos-precalificacion').removeClass('hidden')
    $('#generales').addClass('hidden')
  }
  if(this.dataset.type == 'generales') {
    $('#datos-precalificacion').addClass('hidden')
    $('#generales').removeClass('hidden')

  }
}

// valida
function checkInputs() {
  var isValid = true;
  $('input').each(function() {
    if ($(this).val() === '') {
      $('#confirm').prop('disabled', true)
      isValid = false;
      return false;
    }
  });
  if(isValid) {$('#confirm').prop('disabled', false)}
  return isValid;
}

const validateInputs = function (inputs) {
  var validForm = true;

  inputs.each(function(index) {
    let input = $(this);

    if (!input.val() || (input.type === "radio" && !input.is(':checked'))) {
      console.log('No se han llenado todos los campos');
      validForm = false;
    }
  });
  return validForm;
}

/** Formulario Solicitud **/
// agrego evento para manejar la clase valid de cada input y poner su valor debajo
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
// agrego evento a los select para poner su valor debajo
const selectsSolicitud = $('#formDatosPersonales select')
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

// manejo de iconos en panel collapsible
function toggleChevron(e) {
  $(e.target).prev('.panel-heading').find("i").toggleClass('fa-minus fa-plus');
}

// $('#accordion').on('hidden.bs.collapse', toggleChevron);
// $('#accordion').on('shown.bs.collapse', toggleChevron);

$('.panel-default').on('show.bs.collapse', function() {
  $(this).addClass('active');
  $(this).find('.panel-heading').find("img").attr("src","img/minus-squared-button.svg");
});

$('.panel-default').on('hide.bs.collapse', function() {
  $(this).removeClass('active');
  $(this).find('.panel-heading').find("img").attr("src","img/add-square-button.svg");
});
// evento cuando elige co-acreditado

$("input[name='segunda-persona']").click(function() {
  if ($(this).prop('value') == 'si-sp') {
    $('#co-acreditado').removeClass('hidden');
    $(this).closest('.panel-heading').siblings('.collapse').collapse('show');
    $('#panel-domicilio-sp').removeClass('hidden');
  } else {
    if (!$('#co-acreditado').hasClass('hidden')) {
      $('#co-acreditado').addClass('hidden');
      $(this).closest('.panel-heading').siblings('.collapse').collapse('hide');
    }
    $('#panel-domicilio-sp').addClass('hidden');
  }
});

$("input[name='segunda-persona-domicilio']").click(function() {
  if ($(this).prop('value') == 'no-sp-domicilio') {
    $('#domicilio-acreditado').removeClass('hidden');
    $(this).closest('.panel-heading').siblings('.collapse').collapse('show');
  } else {
    if (!$('#domicilio-acreditado').hasClass('hidden')) {
      $('#domicilio-acreditado').addClass('hidden');
      $(this).closest('.panel-heading').siblings('.collapse').collapse('hide');
    }
  }
});

// si vive en el mismo domicilio el co-acreditado copia los campos
$("input[name='domicilio_acreditado']").click(function() {
  if ($(this).prop('value') == 'si') {
    $('#calle_ca').val($('#calle').val())
    $('#num_ext_ca').val($('#num_ext').val())
    $('#num_int_ca').val($('#num_int').val())
    $('#cp_ca').val($('#cp').val())
    $('#colonia_ca').val($('#colonia').val())
    $('#delegacion_ca').val($('#delegacion').val())
    $('#ciudad_ca').val($('#ciudad').val())
  }
});

// al ingresar el codigo SMS recibido, si se escribe un numero paso enseguida al siguiente input para una facil captura del codigo
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

// formatea el campo de telefono

if ($('#celular').exists()) {

  let cleave = new Cleave('#celular', {
    phone: true,
    phoneRegionCode: 'MX'
  });
}

$('#btnCalculaOfertas').click(function(){
  $('.loading-background').show('slow')
  setTimeout(function(){
    window.location.href = window.location.origin+'/kosmos-santander/aceptacion.html';
  }, 2500)
})

if(window.location.href.indexOf("#generales") > -1) {
  $('#precalificacion').addClass('hidden')
  $('#generales').removeClass('hidden')
  $('#link_precalificacion').removeClass('active');
  $('#link_generales').addClass('active');
    }

  $('#btnPasaDatosClinicos').click(function(){
    $('#generales').addClass('hidden')
    $('#clinicos').removeClass('hidden')
    $('#link_generales').removeClass('active');
    $('#link_clinicos').addClass('active');
  })

  $('#btnPasaCargaDocumentos').click(function(){
    $('#clinicos').addClass('hidden')
    $('#documentos').removeClass('hidden')
    $('#link_clinicos').removeClass('active');
    $('#link_documentos').addClass('active');
  })

  $('#btnTerminaSolicitud').click(function() {
    window.location.href = window.location.origin+'/kosmos-santander/final.html';
  })

$("input[name='tarjeta_credito']").click(function() {
  if ($(this).prop('value') == 'si') {
    $('#ult_digitos_tarjeta').prop('disabled', false)
  } else {
    $('#ult_digitos_tarjeta').prop('disabled', true)
  }
});

/* file uploads */
function ui_add_log(message, color)
{
  var d = new Date();

  var dateString = (('0' + d.getHours())).slice(-2) + ':' +
    (('0' + d.getMinutes())).slice(-2) + ':' +
    (('0' + d.getSeconds())).slice(-2);

  color = (typeof color === 'undefined' ? 'muted' : color);

  var template = $('#debug-template').text();
  template = template.replace('%%date%%', dateString);
  template = template.replace('%%message%%', message);
  template = template.replace('%%color%%', color);

  $('#debug').find('li.empty').fadeOut(); // remove the 'no messages yet'
  $('#debug').prepend(template);
}

// Creates a new file and add it to our list
function ui_multi_add_file_comprobante(id, file)
{
  var template = $('#files-template').text();
  template = template.replace('%%filename%%', file.name);

  template = $(template);
  template.prop('id', 'uploaderFile' + id);
  template.data('file-id', id);

  $('#filesComprobante').find('li.empty').fadeOut(); // remove the 'no files yet'
  $('#filesComprobante').prepend(template);
}

function ui_multi_add_file_ingresos(id, file)
{
  var template = $('#files-template').text();
  template = template.replace('%%filename%%', file.name);

  template = $(template);
  template.prop('id', 'uploaderFile' + id);
  template.data('file-id', id);

  $('#filesIngresos').find('li.empty').fadeOut(); // remove the 'no files yet'
  $('#filesIngresos').prepend(template);
}

function ui_multi_add_file_id(id, file)
{
  var template = $('#files-template').text();
  template = template.replace('%%filename%%', file.name);

  template = $(template);
  template.prop('id', 'uploaderFile' + id);
  template.data('file-id', id);

  $('#filesId').find('li.empty').fadeOut(); // remove the 'no files yet'
  $('#filesId').prepend(template);
}

function ui_multi_add_file_actas(id, file)
{
  var template = $('#files-template').text();
  template = template.replace('%%filename%%', file.name);

  template = $(template);
  template.prop('id', 'uploaderFile' + id);
  template.data('file-id', id);

  $('#filesActas').find('li.empty').fadeOut(); // remove the 'no files yet'
  $('#filesActas').prepend(template);
}

// Changes the status messages on our list
function ui_multi_update_file_status(id, status, message)
{
  $('#uploaderFile' + id).find('span').html(message).prop('class', 'status-upload text-' + status);
  $('#uploaderFile' + id).find('.delete-file-btn').attr('data-file-id', id);
  $('#uploaderFile' + id).find('.modal-tag-btn').attr('data-file-id', id);
  updateFileButtonsActions()
}

function updateFileButtonsActions() {
  $('.delete-file-btn').click(function(){
    var idFile = $(this).attr('data-file-id');
    $('#uploaderFile' + idFile).remove()
    // borrar archivo
  })
  $('.modal-tag-btn').click(function(){
    var idFile = $(this).attr('data-file-id');
    // usar el idFile para categorizar
    $('#modalCategorizar').modal()
  })

  $('.btn-save-tag').click(function(){
    $('#modalCategorizar').modal('hide')
    // salvar categoria
  })
}



// Updates a file progress, depending on the parameters it may animate it or change the color.
function ui_multi_update_file_progress(id, percent, color, active)
{
  color = (typeof color === 'undefined' ? false : color);
  active = (typeof active === 'undefined' ? true : active);

  var bar = $('#uploaderFile' + id).find('div.progress-bar');

  bar.width(percent + '%').attr('aria-valuenow', percent);
  bar.toggleClass('progress-bar-striped progress-bar-animated', active);

  if (percent === 0){
    bar.html('');
  } else {
    bar.html(percent + '%');
  }

  if (color !== false){
    bar.removeClass('bg-success bg-info bg-warning bg-danger');
    bar.addClass('bg-' + color);
  }
  if(!active){
    $('#uploaderFile' + id).find('div.progress').hide()
  }
}

$(function(){
  
  $('#drag-and-drop-comprobante').dmUploader({ //
    url: 'https://httpstat.us/200',   // url publica para recibir un status 'ok' y ver funcionar la animacion
    maxFileSize: 3000000, // 3 Megs
    onDragEnter: function(){
      // Happens when dragging something over the DnD area
      this.addClass('active');
    },
    onDragLeave: function(){
      // Happens when dragging something OUT of the DnD area
      this.removeClass('active');
    },
    onInit: function(){
      // Plugin is ready to use
      ui_add_log('Penguin initialized :)', 'info');
    },
    onComplete: function(){
      // All files in the queue are processed (success or error)
      ui_add_log('All pending tranfers finished');
    },
    onNewFile: function(id, file){
      // When a new file is added using the file selector or the DnD area
      ui_add_log('New file added #' + id);
      ui_multi_add_file_comprobante(id, file);
    },
    onBeforeUpload: function(id){
      // about tho start uploading a file
      ui_add_log('Starting the upload of #' + id);
      ui_multi_update_file_status(id, 'uploading', '<img src="img/ico-close.svg" alt="">');
      ui_multi_update_file_progress(id, 0, '', true);
    },
    onUploadCanceled: function(id) {
      // Happens when a file is directly canceled by the user.
      ui_multi_update_file_status(id, 'warning', 'Canceled by User');
      ui_multi_update_file_progress(id, 0, 'warning', false);
    },
    onUploadProgress: function(id, percent){
      // Updating file progress
      ui_multi_update_file_progress(id, percent);
    },
    onUploadSuccess: function(id, data){
      // A file was successfully uploaded
      ui_add_log('Server Response for file #' + id + ': ' + JSON.stringify(data));
      ui_add_log('Upload of file #' + id + ' COMPLETED', 'success');
      ui_multi_update_file_status(id, 'success', '<button class="red btn-link delete-file-btn">Eliminar documento</button><button class="red btn-link modal-tag-btn"> <img src="img/tag-icon.svg" alt=""> Categorizar documento</button>');
      ui_multi_update_file_progress(id, 100, 'success', false);
    },
    onUploadError: function(id, xhr, status, message){
      ui_multi_update_file_status(id, 'danger', message);
      ui_multi_update_file_progress(id, 0, 'danger', false);
    },
    onFallbackMode: function(){
      // When the browser doesn't support this plugin :(
      ui_add_log('Plugin cant be used here, running Fallback callback', 'danger');
    },
    onFileSizeError: function(file){
      ui_add_log('File \'' + file.name + '\' cannot be added: size excess limit', 'danger');
    }
  });

  $('#drag-and-drop-ingresos').dmUploader({ //
    url: 'https://httpstat.us/200',  // url publica para recibir un status 'ok'
    maxFileSize: 3000000, // 3 Megs
    onDragEnter: function(){
      // Happens when dragging something over the DnD area
      this.addClass('active');
    },
    onDragLeave: function(){
      // Happens when dragging something OUT of the DnD area
      this.removeClass('active');
    },
    onInit: function(){
      // Plugin is ready to use
      ui_add_log('Penguin initialized :)', 'info');
    },
    onComplete: function(){
      // All files in the queue are processed (success or error)
      ui_add_log('All pending tranfers finished');
    },
    onNewFile: function(id, file){
      // When a new file is added using the file selector or the DnD area
      ui_add_log('New file added #' + id);
      ui_multi_add_file_ingresos(id, file);
    },
    onBeforeUpload: function(id){
      // about tho start uploading a file
      ui_add_log('Starting the upload of #' + id);
      ui_multi_update_file_status(id, 'uploading', '<img src="img/ico-close.svg" alt="">');
      ui_multi_update_file_progress(id, 0, '', true);
    },
    onUploadCanceled: function(id) {
      // Happens when a file is directly canceled by the user.
      ui_multi_update_file_status(id, 'warning', 'Canceled by User');
      ui_multi_update_file_progress(id, 0, 'warning', false);
    },
    onUploadProgress: function(id, percent){
      // Updating file progress
      ui_multi_update_file_progress(id, percent);
    },
    onUploadSuccess: function(id, data){
      // A file was successfully uploaded
      ui_add_log('Server Response for file #' + id + ': ' + JSON.stringify(data));
      ui_add_log('Upload of file #' + id + ' COMPLETED', 'success');
      ui_multi_update_file_status(id, 'success', '<button class="red btn-link delete-file-btn">Eliminar documento</button><button class="red btn-link modal-tag-btn"> <img src="img/tag-icon.svg" alt=""> Categorizar documento</button>');
      ui_multi_update_file_progress(id, 100, 'success', false);
    },
    onUploadError: function(id, xhr, status, message){
      ui_multi_update_file_status(id, 'danger', message);
      ui_multi_update_file_progress(id, 0, 'danger', false);
    },
    onFallbackMode: function(){
      // When the browser doesn't support this plugin :(
      ui_add_log('Plugin cant be used here, running Fallback callback', 'danger');
    },
    onFileSizeError: function(file){
      ui_add_log('File \'' + file.name + '\' cannot be added: size excess limit', 'danger');
    }
  });

  $('#drag-and-drop-id').dmUploader({ //
    url: 'https://httpstat.us/200', // url publica para recibir un status 'ok'
    maxFileSize: 3000000, // 3 Megs
    onDragEnter: function(){
      // Happens when dragging something over the DnD area
      this.addClass('active');
    },
    onDragLeave: function(){
      // Happens when dragging something OUT of the DnD area
      this.removeClass('active');
    },
    onInit: function(){
      // Plugin is ready to use
      ui_add_log('Penguin initialized :)', 'info');
    },
    onComplete: function(){
      // All files in the queue are processed (success or error)
      ui_add_log('All pending tranfers finished');
    },
    onNewFile: function(id, file){
      // When a new file is added using the file selector or the DnD area
      ui_add_log('New file added #' + id);
      ui_multi_add_file_id(id, file);
    },
    onBeforeUpload: function(id){
      // about tho start uploading a file
      ui_add_log('Starting the upload of #' + id);
      ui_multi_update_file_status(id, 'uploading', '<img src="img/ico-close.svg" alt="">');
      ui_multi_update_file_progress(id, 0, '', true);
    },
    onUploadCanceled: function(id) {
      // Happens when a file is directly canceled by the user.
      ui_multi_update_file_status(id, 'warning', 'Canceled by User');
      ui_multi_update_file_progress(id, 0, 'warning', false);
    },
    onUploadProgress: function(id, percent){
      // Updating file progress
      ui_multi_update_file_progress(id, percent);
    },
    onUploadSuccess: function(id, data){
      // A file was successfully uploaded
      ui_add_log('Server Response for file #' + id + ': ' + JSON.stringify(data));
      ui_add_log('Upload of file #' + id + ' COMPLETED', 'success');
      ui_multi_update_file_status(id, 'success', '<button class="red btn-link delete-file-btn">Eliminar documento</button><button class="red btn-link modal-tag-btn"> <img src="img/tag-icon.svg" alt=""> Categorizar documento</button>');
      ui_multi_update_file_progress(id, 100, 'success', false);
    },
    onUploadError: function(id, xhr, status, message){
      ui_multi_update_file_status(id, 'danger', message);
      ui_multi_update_file_progress(id, 0, 'danger', false);
    },
    onFallbackMode: function(){
      // When the browser doesn't support this plugin :(
      ui_add_log('Plugin cant be used here, running Fallback callback', 'danger');
    },
    onFileSizeError: function(file){
      ui_add_log('File \'' + file.name + '\' cannot be added: size excess limit', 'danger');
    }
  });

  $('#drag-and-drop-actas').dmUploader({ //
    url: 'https://httpstat.us/200',
    maxFileSize: 3000000, // 3 Megs
    onDragEnter: function(){
      // Happens when dragging something over the DnD area
      this.addClass('active');
    },
    onDragLeave: function(){
      // Happens when dragging something OUT of the DnD area
      this.removeClass('active');
    },
    onInit: function(){
      // Plugin is ready to use
      ui_add_log('Penguin initialized :)', 'info');
    },
    onComplete: function(){
      // All files in the queue are processed (success or error)
      ui_add_log('All pending tranfers finished');
    },
    onNewFile: function(id, file){
      // When a new file is added using the file selector or the DnD area
      ui_add_log('New file added #' + id);
      ui_multi_add_file_actas(id, file);
    },
    onBeforeUpload: function(id){
      // about tho start uploading a file
      ui_add_log('Starting the upload of #' + id);
      ui_multi_update_file_status(id, 'uploading', '<img src="img/ico-close.svg" alt="">');
      ui_multi_update_file_progress(id, 0, '', true);
    },
    onUploadCanceled: function(id) {
      // Happens when a file is directly canceled by the user.
      ui_multi_update_file_status(id, 'warning', 'Canceled by User');
      ui_multi_update_file_progress(id, 0, 'warning', false);
    },
    onUploadProgress: function(id, percent){
      // Updating file progress
      ui_multi_update_file_progress(id, percent);
    },
    onUploadSuccess: function(id, data){
      // A file was successfully uploaded
      ui_add_log('Server Response for file #' + id + ': ' + JSON.stringify(data));
      ui_add_log('Upload of file #' + id + ' COMPLETED', 'success');
      ui_multi_update_file_status(id, 'success', '<button class="red btn-link delete-file-btn">Eliminar documento</button><button class="red btn-link modal-tag-btn"> <img src="img/tag-icon.svg" alt=""> Categorizar documento</button>');
      ui_multi_update_file_progress(id, 100, 'success', false);
    },
    onUploadError: function(id, xhr, status, message){
      ui_multi_update_file_status(id, 'danger', message);
      ui_multi_update_file_progress(id, 0, 'danger', false);
    },
    onFallbackMode: function(){
      // When the browser doesn't support this plugin :(
      ui_add_log('Plugin cant be used here, running Fallback callback', 'danger');
    },
    onFileSizeError: function(file){
      ui_add_log('File \'' + file.name + '\' cannot be added: size excess limit', 'danger');
    }
  });
});

function calcularAvance(percent) {
  var step = $('#step-number')
  var txtStepProgress = $('#step-percentage')
  var stepProgress = 0
  if(percent<=25){
    step.text(1)
    stepProgress = percent/25*100
    txtStepProgress.text(stepProgress+'%')
  }
  if(50>=percent && percent>25) {
    step.text(2)
    stepProgress = (percent-25)/25*100
    txtStepProgress.text(stepProgress+'%')
  }
  if(75>=percent && percent>50) {
    step.text(3)
    stepProgress = (percent-50)/25*100
    txtStepProgress.text(stepProgress+'%')
  }
  if(percent>75) {
    step.text(4)
    stepProgress = (percent-75)/25*100
    txtStepProgress.text(stepProgress+'%')
  }


  
  $(".progress-bar").css("width", percent + "%").attr("aria-valuenow", percent);
  $(".progress-completed").text(percent + "%"); 
}

function simulacion(){

  setTimeout(function(){
    calcularAvance(10)
    setTimeout(function(){
      calcularAvance(15)
      setTimeout(function(){
        calcularAvance(25)
        setTimeout(function(){
          calcularAvance(35)
          setTimeout(function(){
            calcularAvance(55)
          },2000)
        },2000)
      },2000)
    },2000)
  },2000)
}

simulacion()

$('.nav-btn').on('click', function(e) {
  e.preventDefault()

    $(this).closest('.collapse').collapse('hide')
    console.log($(this))
    $(this).closest('.panel').next().find('.collapse').collapse('show')


})
var icon = document.getElementById('saveAnimatedIcon');
// animacion de guardado automatico
function animateSaveIcon() {
  icon.classList.remove('fa-check');
  icon.classList.add('fa-refresh', 'fa-spin', 'fa-fw');
  setTimeout(function () {
    icon.classList.remove('fa-refresh', 'fa-spin', 'fa-fw');
    icon.classList.add('fa-check', 'faa-vertical', 'animated');
    setTimeout(function () {
      icon.classList.remove('faa-vertical', 'animated');
    }, 2000);
  }, 3000);
  setTimeout(function () {

    if (!timeUp) animateSaveIcon();
  }, 8000);
}
var timeUp = false;
function simularTiempo() {

  animateSaveIcon();
  setTimeout(function () {
    return timeUp = true;
  }, 40000);
}

setTimeout(function () {
  return simularTiempo();
}, 3000);

$('#copy-clipboard').click(function(){
  var folio = $('#folio-value').html();
  var hiddenClipboard = $('#_hiddenClipboard_');
  $('body').append('<textarea style="position:absolute;top: -9999px;" id="_hiddenClipboard_"></textarea>');
  hiddenClipboard = $('#_hiddenClipboard_');
  hiddenClipboard.html(folio);
  hiddenClipboard.select();
  var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Folio copiado: " + folio;
  document.execCommand('copy');
})

$(function () {
  $('[data-toggle="popover"]').popover({
    container: 'body'
  })
})