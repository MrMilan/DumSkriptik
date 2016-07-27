function retrieveFiller(idTable) {
  var httpRequest;

  this.getDataFromHouse = function(url) {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      console.log('Creating of instance failed');
      return false;
    }
    httpRequest.onreadystatechange = getDataAndFill;
    httpRequest.open('GET', url);
    httpRequest.send();
  };

  function getDataAndFill() {
    try {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {

        if (httpRequest.status === 200) {
          var response;
          var sas = httpRequest.responseText;
          response = JSON.parse(sas);
          fillData(response);
        } else {
          console.log('Http status is BADass, pika pika');
        }
      }
    } catch (exc) {
      console.log('Crashed with err: ' + exc.description);
    }
  };

  function fillData(objc) {
    var table = document.getElementById(idTable);
    var thead = table.tHead;
    if (thead.rows.length < 2) {
      var theadRow = thead.insertRow(0);
    }
    var tbodyRow = table.tBodies[0].insertRow(0);
    var i = 0;
    for (var key in objc) {
      if (objc.hasOwnProperty(key)) {
        if (thead.rows.length < 2) {
          theadRow.insertCell(i).innerHTML = key;
        }
        tbodyRow.insertCell(i).innerHTML = objc[key];
        i++;
      }
    }
  };

};