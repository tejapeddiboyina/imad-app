// check for login of a user
loadLogin();


function loadLogin(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
      if(request.readyState === XMLHttpRequest.DONE) {
          if (request.status === 200){
              loadLoggedInUser(this.responseText);
            }else {
                loadLoginForm();
            }
        }  
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}


function loadLoggedInUser(username){
    document.getElementById('login-area').innerHTML = `
        <h3> Hi <i>${username}</i></h3>
        <a href="/logout">Logout</a>
        `;
}


function loadLoginForm(){
    document.getElementById('login-area').innerHTML = `
        <h3>Login/Register to unlock awesome features</>h3>
        <input type="text" id="username" placeholder="username" />
        <input type="password" id="password" />
        <br/><br/>
        <input type="submit" id="login-btn" value="login" />
        <input type="submit" id=register-btn" value="register" />
        `;
        
    var submit = document.getElementById('login-btn');
    submit.onclick = function(){
      var request = new XMLHttpRequest();
      request.onreadystatechange = function(){
          if (request.readyState === XMLHttpRequest.DONE){
              if (request.status === 200){
                  submit.value = 'Sucess!';
              }else if (request.status === 403){
                  submit.value = 'Invalid credentials. Try agian?';
              }else {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              }
              loadLogin();
          }
      };
      
      var username = document.getElementById('username').value;
      var password = document.getElementById('password').value;
      console.log('username');
      console.log('password');
      request.open('POST', '/login', true);
      request.setRequestHeader('Content-type', 'application/json');
      request.send(JSON.stringify({username: username, password: password}));
      submit.value = 'Logging in....';
    };
    
    var register = document.getElementById('register-btn');
    register.onclick = function(){
        var request = new XMLHttpRequest();
        request.onreadystatechange = function(){
            if(request.readyState === XMLHttpRequest.DONE){
                if(request.status === 200){
                    alert('User created successfully');
                    register.value = 'Registered';
                }else {
                    alert('Could not register the user');
                    register.value = 'Register';
                }
            }
        };
        
        var username = document.getElementById('username');
        var password = document.getElementById('password');
        console.log('username');
        console.log('password');
        request.open('POST', '/create-user', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));
        register.value = 'Registering...';
    };
}


loadArticles();


function loadArticles(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            var articles = document.getElementById('articles');
            if(request.status === 200){
                var content = '<ul>';
                var articleData = JSON.parse(this.responseText);
                for (var i = 0; i < articleData.length; i++){
                    content += `<li>
                    <a href="/articles/${articleData[i].title}">${articleData.heading}</a>
                    (${articleData[i].date.split('T')[0]})</li>`;
                }
                content += "</ul>"
                articles.innerHTML = content;
            }else {
                articles.innerHTML('Oops! Could not load all articles')
            }
        }
    };
    
    request.open('GET', '/get-articles', true);
    request.send(null);
}