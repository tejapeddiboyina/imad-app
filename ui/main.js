
var submit = document.getElementById('submit-btn');
submit.onclick = function(){

    // Create a request object
    var request = new XMLHttpRequest();
    
    // Capture the response and store it in a variable
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            
        //Take some action
            if(request.status === 200){
                alert('Logged in successfully');
            }else if (request.status === 403){
                alert('Username/password is incorrect');
            }else if (request.status === 500){
                alert('Something went wrong on the server');
            }
        }
        // not done yet.
    };
    
    // Make the reqyest 
   var username = document.getElementById('username').value;
   var password - document.getElementById('password').value; 
   console.log(username);
   console.log(password);
   request.open('POST', 'http://tejapeddiboyina7.imad.hasura-app.io/login', true);
   request.serRequestHeader('Content-Type', 'application/json');
   request.send(JSON.stringify({username: username, password: password}));
};
