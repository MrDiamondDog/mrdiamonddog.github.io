
function login(){
    const username = document.getElementById("username-field")
    const password = document.getElementById("password-field")
    const loginErrorMsg = document.getElementById("login-error-msg"); 

    if (username === "user" && password === "web_dev") {
        alert("You have successfully logged in.");
        location.reload();
    } else {
        loginErrorMsg.style.opacity = 1;
    }
}