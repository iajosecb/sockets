var socket = io.connect('http://localhost:8080', { 'forceNew': true });

socket.on('messages', function(data) {
    console.log(data);
    render(data);
});

function render(data) {
    // La funcion map recorre Arrays de una manera mas elegante
    var html = data.map(function(elemt, index){
        return(
            `<div>
                <strong>${elemt.username}</strong>
                <em>${elemt.text}</em>
            </div>`);
    }).join(" ");
    
    document.getElementById('messages').innerHTML = html;
}

function addMessage(e){
    var payload = {
        username: document.getElementById('username').value,
        text: document.getElementById('message').value
    };

    socket.emit('newMessage', payload);

    return false;
}