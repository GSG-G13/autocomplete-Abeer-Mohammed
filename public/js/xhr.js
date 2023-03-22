
  function fetchData (method, url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          cb(JSON.parse(xhr.responseText));
        } else {
          cb(true);
        }
      }
    };
    xhr.open(method, url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
  };

  const get =  (url, cb) =>  fetchData('GET', url, cb); 


