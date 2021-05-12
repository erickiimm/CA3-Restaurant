 //getElementByID method returns the element that has the ID attribute with the specified value.
 document.getElementById("check-password").addEventListener("click", () => {
    var inputValue = document.getElementById("password").value;
    document.getElementById("error-message").textContent = "";
    var passwordOk = true;
    var hints = [];
    //Staff password validator :
    //
    //lowercase letter item 
    if (!(/[a-z]/.test(inputValue))) {        
        passwordOk = false;
        hints.push("The password must have at least one lowercase letter");
    }