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
    //uppercase letter item
    if (!(/[A-Z]/.test(inputValue))) {        
        passwordOk = false;
        hints.push("The password must have at least one uppercase letter");
    }
    //special character item
    if (!(/[ `!@#$%^&*()_+\-=[\]{};":"\\|,.<>/?~]/.test(inputValue))) {        
        passwordOk = false;
        hints.push("It must contain one digit and one special character");
    } 
    //delimit password lenght 
    if (inputValue.length < 8) {       
        passwordOk = false;
        hints.push("It must be at least eight characters long");
    }
    ////get error if the staff not follow the password rules 
    if (passwordOk === false) {
        var errorElement = document.getElementById("error-message");
        var errorText = document.createTextNode(`*Invalid format, please reenter. (${hints.join(", ")})`);
        errorElement.appendChild(errorText);
    }
})
// Division of the page
window.onload = () => {
    renderCustomers();
    renderMenu();
    // Adding buttons to add itens 
    var addButtons = document.querySelectorAll(".add");
    addButtons.forEach(element => {
        element.addEventListener("click", () => {
            var quantity = parseInt(element.parentElement.querySelector("b").textContent.replace("x",""));
            quantity++;
            element.parentElement.querySelector("b").textContent = ` x${quantity}`;
        })
    })
    
    var addButtons = document.querySelectorAll(".remove");
    addButtons.forEach(element => {
        element.addEventListener("click", () => {
            var quantity = parseInt(element.parentElement.querySelector("b").textContent.replace("x",""));
            if (quantity > 0) {
                quantity--;
                element.parentElement.querySelector("b").textContent = ` x${quantity}`;
            }
        })
    })
}
