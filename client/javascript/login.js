

document.getElementById('loginButton').addEventListener('click', function() {
    const username = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log('Username: ' + username);
    console.log('Password: ' + password);

    if(username === 'wasadmin@test.com' && password === 'red') {
        console.log('logged in');
    } else {
            console.log('NOT AUTHORIZED');
        }
    
});