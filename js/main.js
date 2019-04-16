document.getElementById('formulario').addEventListener('submit',cadastraVeiculo);

function cadastraVeiculo(e){
    e.preventDefault();
    var modeloCarro = document.getElementById('modeloCarro').value;
    var placaCarro = document.getElementById('placaCarro').value;
    var time = new Date();

    if(!modeloCarro || !placaCarro){
        alert('Prencha os campos em branco!')
        return false;
    }

    carro ={
        modelo: modeloCarro,
        placa: placaCarro,
        hora: ( "0" + time.getHours()).slice(-2),
        minutos: ( "0" + time.getMinutes()).slice(-2),
        dia: time.getDate() ,
        mes: time.getMonth(),
        ano: time.getFullYear()
    }

    console.log(carro);
    //Adciona o carro no patio 
    if(localStorage.getItem('patio') === null){
        var carros = [];
        carros.push(carro);
        localStorage.setItem('patio',JSON.stringify(carros));
    }else{
        var carros = JSON.parse(localStorage.getItem('patio'));
        carros.push(carro);
        localStorage.setItem('patio',JSON.stringify(carros));
    }
    //Adiciona o carro no Historico
    if(localStorage.getItem('historico') === null){
        var carros = [];
        carros.push(carro);
        localStorage.setItem('historico',JSON.stringify(carros));
    }else{
        var carros = JSON.parse(localStorage.getItem('historico'));
        carros.push(carro);
        localStorage.setItem('historico',JSON.stringify(carros));
    }

    document.getElementById('formulario').reset();
    mostraCarro();
}

function apagarCarro(placa){
    var carros =  JSON.parse(localStorage.getItem('patio'));
    
    for (var i = 0; i < carros.length ; i ++){

        if(carros[i].placa == placa){
            carros.splice(i,1);
            localStorage.setItem('patio',JSON.stringify(carros));
        }
    }

    mostraCarro();
}

function mostraCarro(){
    var tabelaCarro = document.getElementById('resultado');
    var carros = JSON.parse(localStorage.getItem('patio'));
        tabelaCarro.innerHTML ="";

    for(var i=0; i<carros.length;i++){
        
        var modelo = carros[i].modelo;
        var placa = carros[i].placa;
        var hora = carros[i].hora;
        var minutos = carros[i].minutos;
        

        tabelaCarro.innerHTML += "<tr><td>" + modelo + 
                                "</td><td>" + placa + 
                                "</td><td>"+hora+ ":" +minutos+'</td><td><button class="btn btn-danger" onclick="apagarCarro(\''+placa+'\')">Excluir</button>'+
                                '</td></tr>';
        
    }
    
}

function historico(){
    var tabelaCarro = document.getElementById('historico');
    var carros = JSON.parse(localStorage.getItem('historico'));
    
    tabelaCarro.innerHTML = '';
    carros.sort(function(a,b){
        
        return new Date(b.ano,b.mes,b.dia,b.hora,b.minutos) - new Date(a.ano,a.mes,a.dia,a.hora,a.minutos);
        })

    for(var i=0; i<carros.length;i++){
        
        var modelo = carros[i].modelo;
        var placa = carros[i].placa;
        var hora = carros[i].hora;
        var minutos = carros[i].minutos;
        var dia = carros[i].dia;
        var mes = carros[i].mes;
        var ano = carros[i].ano;
            
    
        tabelaCarro.innerHTML += "<tr><td>" + modelo + 
                                "</td><td>" + placa + 
                                "</td><td>"+hora+ ":" +minutos+
                                '</td><td>' + dia + '/' +mes +"/"+ano+
                                '</td></tr>';
            
    }


}