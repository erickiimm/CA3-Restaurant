 //getElementByID method returns the element that has the ID attribute with the specified value.
 document.getElementById("check-password").addEventListener("click", () => {
    var inputValue = document.getElementById("password").value;
    document.getElementById("error-message").textContent = "";
    var passwordOk = true;