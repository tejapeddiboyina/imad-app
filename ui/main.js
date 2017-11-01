// counter code
/*var button = document.getElementById('counter');

var counter = 0;

button.onclick = function(){

  /*  // Create a request object
    var request = new XMLHttpRequest();
    
    // Capture the response and store it in a variable
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            
        //Take some action
            if(request.status === 200){
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
        // not done yet.
    };
    
    // Make the reqyest 
    request.open('GET', 'http://tejapeddiboyina7.imad.hasura-app.io/counter', true);
    request.send(null); */
    counter = counter + 1;
    var span = document.getElementById('count');
    span.innerHTML = counter.toString();
};*/
console.log("i am teja");
alert('do something');
