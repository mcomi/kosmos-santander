$('#btn-solicita-sms').click(function(){
  $('#loader-phone-message').removeClass('hidden') // si pasa se muestra loader

  // aqui se enviaria el mensaje, solo se simula un periodo de tiempo
  setTimeout(function() {
    $('#loader-phone-message').addClass('hidden')
    $('#phone-message-alert').removeClass('hidden')
    $('.input-sms-code').removeClass('hidden')
  }, 4000);
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

var inputsText = document.querySelectorAll('input')

inputsText.forEach(input => input.addEventListener('change', function() {
  if (this.value !== '')
    this.classList.add('valid')
}))

const inputsSolicitud = $('input')
inputsSolicitud.each(function() {
  let input = $(this)
  input.change(function() {
    if (input.val() !== '') {
      if (input.attr('id') === 'celular') { // pregunto cuando sea el campo del celular
        let regex = /^\(?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        if (regex.test(input.val())) { // valido el telefono
          input.addClass('valid')
          input.siblings('.input-success').html(input.val());

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

// formatea el campo de telefono


  let cleave = new Cleave('#celular', {
    phone: true,
    phoneRegionCode: 'MX'
  });
