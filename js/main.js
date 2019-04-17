
// Verifica se na pagina existe o formulario.
var form = document.getElementById('formulario')
if(form){
    form.addEventListener('submit',cadastraVeiculo);
}

//Insere o Veiculo no arquivo Local
function cadastraVeiculo(e){
    e.preventDefault();
    var modeloCarro = document.getElementById('modeloCarro').value;
    var placaCarro = document.getElementById('placaCarro').value;
    var time = new Date();

    if(!modeloCarro || !placaCarro){
        alert('Prencha os campos em branco!')
        return false;
    }
    // Obejeto Carro
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

// Remove o veiculo do Patio
function apagarCarro(placa){
    var carros =  JSON.parse(localStorage.getItem('patio'));
    var carrosh = JSON.parse(localStorage.getItem('historico'));
    var time = new Date();
    var hora =  ( "0" + time.getHours()).slice(-2) + ":" + ( "0" + time.getMinutes()).slice(-2);
    var dia = time.getDate() + '/' + time.getMinutes() + '/' + time.getFullYear();

    for (var i = 0; i < carros.length ; i ++){

        if(carros[i].placa == placa){
            carros.splice(i,1);
            localStorage.setItem('patio',JSON.stringify(carros));
        }

    }

    for(var i = 0; i<carrosh.length; i++){

        if(carrosh[i].placa == placa){
            Object.defineProperties(carrosh[i],{
                'saidah': {value : hora,
                            enumerable:true,
                            configurable:true },
                'saidad': {value : dia,
                            enumerable:true,
                            configurable:true}});
            console.log(carrosh[i]);
            console.log(carrosh);
            localStorage.setItem('historico',JSON.stringify(carrosh));
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
                                "</td><td>"+hora+ ":" 
                                +minutos+'</td><td><button class="btn btn-danger" onclick="apagarCarro(\''+placa+'\')">Excluir</button>'+
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
        var horaS = carros[i].saidah;
        var diaS = carros[i].saidad;

        tabelaCarro.innerHTML += "<tr><td>" + modelo + 
                                "</td><td>" + placa + 
                                "</td><td>"+hora+ ":" +minutos+
                                '</td><td>' + dia + '/' +mes +"/"+ano+
                                '</td><td>' + horaS +
                                '</td><td>' + diaS +
                                '</td></tr>';
            
    }

    console.log(carros);


}