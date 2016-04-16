
function displayFormSuccess(event) {
  var response = JSON.parse(this.responseText);

  var errorsToRemove = document.querySelectorAll('.errors');

  if(errorsToRemove) {
    for(var i = 0; i < errorsToRemove.length; i++) {
      var parent = errorsToRemove[i].parentNode;
      parent.removeChild(errorsToRemove[i]);
    }
  }

  if(response.success) {
    window.location.href = response.redirect;
  } else {
    var errors = response.errors;
    Object.keys(errors).forEach(function(key) {
      var errorDiv = document.querySelector('#' + key);
      var errorMessage = document.createElement('p');
      errorMessage.className = "errors";
      errorMessage.innerHTML = errors[key];
      errorDiv.appendChild(errorMessage);
    });
  }

}