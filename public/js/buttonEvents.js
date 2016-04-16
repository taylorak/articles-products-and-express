var deleteButtons = document.querySelectorAll('.deleteButton');

for(var i= 0; i<deleteButtons.length; i++){
  deleteButtons[i].addEventListener('click', function (event){
    event.preventDefault();
    var button = this;
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', something(button));
    xhr.open('DELETE', this.href);
    xhr.send();
  });
}

function something (button) {
  return function deleteElement (event) {
    var response = JSON.parse(this.responseText);
      if(response.success){
        var listElem = button.parentNode.parentNode;
        var list = listElem.parentNode;
        list.removeChild(listElem);
      }
  };
}