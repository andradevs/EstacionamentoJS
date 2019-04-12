document.getElementById('formulario').addEventListener('submit',cadastraVeiculo);

function cadastraVeiculo(e){
    e.preventDefault();
    var modeloCarro = document.getElementById('modeloCarro').value;
    var placaCarro = document.getElementById('placaCarro').value;
    var time = new Date();

    carro ={
        modelo: modeloCarro,
        placa: placaCarro,
        hora: time.getHours(),
        minutos: time.getMinutes()
    }

    console.log(carro);

    if(localStorage.getItem('patio') === null){
        var carros = [];
        carros.push(carro);
        localStorage.setItem('patio',JSON.stringify(carros));
    }else{
        var carros = JSON.parse(localStorage.getItem('patio'));
        carros.push(carro);
        localStorage.setItem('patio',JSON.stringify(carros));
    }
    
}

function mostraCarro(){
    var tabelaCarro = document.getElementById('resultado');
    var carros = JSON.parse(localStorage.getItem('patio'));
   
    for (var i = 0; i < carros.lenght; i++) {
        console.log('piru');

    }

    for(var i=0; i<carros.length;i++){
        
        var modelo = carros[i].modelo;
        var placa = carros[i].placa;
        var hora = carros[i].hora;
        var minutos = carros[i].minutos;
        

        tabelaCarro.innerHTML += "<tr><td>" + modelo + 
                                "</td><td>" + placa + 
                                "</td><td>"+hora+ ":" +minutos+'</td><td><button type="" class="btn btn-primary">remover</button>'+
                                '</td></tr>';
        
    }
    console.log(carros.length);
}