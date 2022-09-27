var socket = io();

var nome = prompt('Qual seu nome?');

var messages = document.getElementById('messages')
var form = document.getElementById('form')
var input = document.getElementById('input')

socket.emit('new user',nome);

socket.on('new user',function(data){
    if(data.success){

      alert('Bem-vindo ao Grog Chat '+nome);

    }else{

         alert('Já existe usuário com este nome....');

         window.location.href= "/";

        }

});

form.addEventListener('submit', (e)=>{
   e.preventDefault();
   if(input.value){
    socket.emit('chat message',{msg:input.value,nome:nome})
    input.value = '';
    //alert('mensagem enviada')
   }
})


/* socket.on('conectado', function(msg) {
     
    alert(nome + ' Está conectado!')
    console.log(msg);

});*/



/*socket.on('novo usuario', function(msg) {

    console.log(msg);

});*/

socket.on('chat message', function(obj){
    if(obj.nome == nome){
        
        var item = document.createElement('li');
        //coloco a mensagem com uma cor
        item.style.backgroundColor = 'rgba(255, 255, 255, 0.507)';
        item.style.textAlign = 'right';
        item.style.borderRadius = '20px';  
        item.style.marginTop = '4px';  
        item.style.marginBottom = '4px';
        item.textContent = obj.nome+': '+obj.msg;
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    }else{
        //coloco com outra
        var item = document.createElement('li');
        item.style.backgroundColor = 'rgba(0, 0, 0, 0.432)';
        item.style.color = 'white'
        item.style.borderRadius = '20px'
        item.style.marginTop = '4px';  
        item.style.marginBottom = '4px';
        item.textContent = obj.nome+': '+obj.msg;
       
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    }
})
