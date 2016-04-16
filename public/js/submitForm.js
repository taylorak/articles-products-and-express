var newForm = document.querySelector('#newForm');

newForm.addEventListener('submit', function(event) {
  event.preventDefault();

  var params = '';
  var inputs = this.querySelectorAll('.inputs');
  for(var i = 0; i < inputs.length; i++) {
    params += inputs[i].name + '=' +inputs[i].value;
    if(i !== inputs.length - 1) {
      params += '&';
    }
  }

  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', displayFormSuccess);
  xhr.open('POST', newForm.action);
  xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
  xhr.send(params);
});
