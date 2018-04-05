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
