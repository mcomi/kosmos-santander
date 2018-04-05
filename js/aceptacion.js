function formatCurrency() {
  //number-format the user input
  this.value = parseFloat(this.value.replace(/,/g, '')).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

var valid = true;
var isMobile = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 isMobile = true;
}

const ofertasOpcion = document.querySelectorAll('.ofertas-corner-top');
ofertasOpcion.forEach(oferta => oferta.addEventListener('click', toggleActive));

function toggleActive() {
  ofertasOpcion.forEach(oferta => {
    if(oferta.classList.contains('active')) oferta.classList.remove('active')
  });
  this.classList.add('active')
}
