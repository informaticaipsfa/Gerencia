class Conexion{
    constructor(){
        this.IP = "192.168.11.34";
        this.Puerto = ":8080";
        this.PuertoSSL = ":2608";
        this.API = "/ipsfa/api/";
        this.URL = this.API;
        this.URLS = "https://" + this.IP + this.PuertoSSL + this.API;
        this.URLSEC = "https://" + this.IP + this.PuertoSSL;
        this.URLIMG = "http://192.168.11.34/imagenes/";
        this.URLTEMP = "temp/";
  
    }
  }
  
  function CargarAPI(sURL, metodo, valores, Objeto){
    var xhttp = new XMLHttpRequest();
    xhttp.open(metodo, sURL);
    xhttp.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('ipsfaToken'));
  
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          if(Objeto != undefined){
            Objeto.Crear(JSON.parse(xhttp.responseText));
          }else{
            respuesta = JSON.parse(xhttp.responseText);
            if (respuesta.tipo != 0){
              $.notify("Se ha Insertado correctamente", "success");
            }else{
                alert(xhttp.responseText)
            }
      }
        }
    }
    xhttp.onerror = function() {
        if (this.readyState == 4 && this.status == 0) {
          $.notify("No se puede conectar al servidor");
          $("#_cargando").hide();
        }
  
    };
  
  
    if(valores != undefined){
     
      xhttp.send(JSON.stringify(valores));
    }else{
      xhttp.send();
    }
  
  
  }


  function CargarAPI_II(options){
    var xhttp = new XMLHttpRequest();
    xhttp.open(options.metodo, options.sURL);
    xhttp.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('ipsfaToken'));
    var promise = new Promise(function(resolve, reject) {
        xhttp.addEventListener('readystatechange', function() {

            if ( xhttp.readyState === 4 && xhttp.status === 200) {
                if(options.Objeto != undefined){
                    options.Objeto = JSON.parse(xhttp.responseText);
                }
                resolve(xhttp);
            }
            if( xhttp.status === 401){
              if ( xhttp.responseText != "" ) {
                respuesta = JSON.parse(xhttp.responseText);
                $.notify(respuesta.msj);
              }
            }
        });

        xhttp.addEventListener('error', function() {
          if ( xhttp.responseText != "" ) {
            respuesta = JSON.parse(xhttp.responseText);
            if (respuesta.tipo != 0){
              $.notify("Se ha Insertado correctamente", "success");
            }else{
              alert(xhttp.responseText);
            }
          }
          reject(xhttp);
        });
    });

    if(options.valores != undefined){
        xhttp.send(JSON.stringify(options.valores));
    }else{
        xhttp.send();
    }

    return promise;
}
