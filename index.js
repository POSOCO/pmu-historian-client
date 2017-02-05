var cacheData_ = null;

function fetchHistorianData() {
  // https://github.com/doedje/jquery.soap - JQUERY SOAP PLUGIN
  var webServiceURL = document.getElementById("serverBaseAddressInput").value;

  var username_ = "perf1";
  var password_ = "Abcd@1234";

  var cacheData_ = "";

  var soapMessage =
    '<?xml version="1.0" encoding="utf-8"?> \
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" \
    xmlns:xsd="http://www.w3.org/2001/XMLSchema" \
    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> \
  <soap:Body> \
    <Hello xmlns="http://tempuri.org/"> \
      <name>' + 'hgfhjh' + '</name> \
    </Hello> \
  </soap:Body> \
</soap:Envelope>';

  $.ajax({
    url: webServiceURL,
    type: "POST",
    dataType: "xml",
    data: soapMessage,
    beforeSend: function(xhr) {
      /* Authorization header */
      xhr.setRequestHeader("Authorization", "Basic " + btoa(username_ + ":" + password_));
    },
    processData: false,
    contentType: "text/xml; charset=\"utf-8\"",
    success: OnSuccess,
    error: OnError
  });

  var OnSuccess = function(data) {
    cacheData_ = data;
    WriteLineConsole(JSON.stringify(data));
  };

  var OnError = function(jqXHR, textStatus, errorThrown) {
    WriteLineConsole(JSON.stringify(jqXHR));
    console.log(textStatus, errorThrown);
  }
}

function plotData() {
  var data = cacheData_;
  var plotData = [{
    x: [],
    y: [],
    type: 'scatter'
  }];
  for (var i = 0; i < data.length; i++) {
    plotData[0].x[i] = new Date(data[i].timestamp);
    plotData[0].y[i] = data[i].dval;
  }
  Plotly.newPlot('plotDiv', plotData);
}
