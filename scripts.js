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
    // Adding buttons to remove itens 
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
// User generation with thumbnail image
function renderCustomers() {
    fetch("https://randomuser.me/api/?results=5").then((resp) => resp.json())
    .then(data => {
        var users = data.results;
        var customersDiv = document.getElementById("customers-list");
        for (var i = 0; i < users.length; i++) {
            var customerDiv = document.createElement("div");
            customerDiv.classList.add("customer");
            var photo = document.createElement("img");
            photo.src = users[i].picture.thumbnail;
            customerDiv.appendChild(photo);
            var name = document.createElement("p");
            name.textContent = `name: ${users[i].name.first}`;
            customerDiv.appendChild(name);
            var phone = document.createElement("p");
            phone.textContent = `phone number: ${users[i].phone}`;
            customerDiv.appendChild(phone);
            var dob = document.createElement("p");
            dob.textContent = `dob: ${users[i].dob.date}`;
            customerDiv.appendChild(dob);
            var age = document.createElement("p");
            age.textContent = `age: ${users[i].dob.age}`;
            customerDiv.appendChild(age);
            var email = document.createElement("p");
            email.textContent = `email: ${users[i].email}`;
            customerDiv.appendChild(email);
            var gender = document.createElement("p");
            gender.textContent = `gender: ${users[i].gender}`;
            customerDiv.appendChild(gender);
            var city = document.createElement("p");
            city.textContent = `city: ${users[i].location.city}`;
            customerDiv.appendChild(city);
            var country = document.createElement("p");
            country.textContent = `country: ${users[i].location.country}`;
            customerDiv.appendChild(country);
            var postCode = document.createElement("p");
            postCode.textContent = `post code: ${users[i].location.postcode}`;
            customerDiv.appendChild(postCode);
            customersDiv.appendChild(customerDiv);
        }
    })
}
//My Menu 

//Courses 
function renderMenu() {
    var menuList = document.getElementById("menu-list");
    var startersTitle = document.createElement("h2");
    startersTitle.textContent = "Starters";
    menuList.appendChild(startersTitle);
    renderMenuCategory(starters, menuList);
    var mainsTitle = document.createElement("h2");
    mainsTitle.textContent = "Main";
    menuList.appendChild(mainsTitle);
    renderMenuCategory(mains, menuList);
    var dessertsTitle = document.createElement("h2");
    dessertsTitle.textContent = "Desserts";
    menuList.appendChild(dessertsTitle);
    renderMenuCategory(desserts, menuList);
    var drinksTitle = document.createElement("h2");
    drinksTitle.textContent = "Drinks";
    menuList.appendChild(drinksTitle);
    renderMenuCategory(drinks, menuList);
}