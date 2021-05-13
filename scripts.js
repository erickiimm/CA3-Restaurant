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
// Category 
function renderMenuCategory(category, menuList) {
    for (var i = 0; i < category.length; i++) {
        var element = document.createElement("div");
        element.setAttribute("id",category[i].id);
        var elementAddButton = document.createElement("button");
        elementAddButton.classList.add('add');
        elementAddButton.textContent = "ADD";
        var elementRemoveButton = document.createElement("button");
        elementRemoveButton.classList.add('remove');
        elementRemoveButton.textContent = "REMOVE";
        var elementText = document.createElement("p");
        elementText.textContent = `${category[i].name} (${category[i].description})`;
        var elementQuantity = document.createElement("b");
        elementQuantity.textContent = " x0";
        var elementCost = document.createElement("span");
        elementCost.textContent = `€ ${category[i].cost}`;
        element.appendChild(elementAddButton);
        element.appendChild(elementRemoveButton);
        if (category[i].vegetarian) {
            var vegetarianImg = document.createElement("img");
            vegetarianImg.src = "assets/imgs/leaf.jpg";
            element.appendChild(vegetarianImg);
        }
        element.appendChild(elementText);
        element.appendChild(elementQuantity);
        element.appendChild(elementCost);
        menuList.appendChild(element);
    }
}
// Calculator
document.getElementById("calculate").addEventListener("click", () => {
    var items = document.querySelectorAll("#menu-list > div");
    var total = 0;
    var startersBill = 0;
    var mainsBill = 0;
    var dessertsBill = 0;
    var drinksBill = 0;
    var vegetarian = 0;
    var nonVegetarian = 0;
    for (var i = 0; i < items.length; i++) {
        var quantity = parseInt(items[i].querySelector("b").textContent.replace("x",""));
        var value = parseInt(items[i].querySelector("span").textContent.replace("€ ",""));
        var isVegetarian = !!items[i].querySelector("img");
        var isStarters = starters.filter(x => x.id == items[i].getAttribute("id")).length > 0;
        var isMains = mains.filter(x => x.id == items[i].getAttribute("id")).length > 0;
        total += quantity * value;
        if (isStarters) {
            startersBill += quantity * value;
        }
        if (isMains) {
            mainsBill += quantity * value;
        }
        if (desserts.filter(x => x.id == items[i].getAttribute("id")).length > 0) {
            dessertsBill += quantity * value;
        }
        if (drinks.filter(x => x.id == items[i].getAttribute("id")).length > 0) {
            drinksBill += quantity * value;
        }
        if (isVegetarian && (isStarters || isMains)) {
            vegetarian += quantity * value;
        } else if (isStarters || isMains) {
            nonVegetarian += quantity * value;
        }
    }
    //Breakdown bill
    document.getElementById("total").textContent = total;
    document.getElementById("starters").textContent = startersBill;
    document.getElementById("mains").textContent = mainsBill;
    document.getElementById("desserts").textContent = dessertsBill;
    document.getElementById("drinks").textContent = drinksBill;
    document.getElementById("vegetarian").textContent = vegetarian;
    document.getElementById("non-vegetarian").textContent = nonVegetarian;
})
// Starters 
var starters = [
    {
        id: 1,
        name: "Fries",
        description: "A portion of crunchy fries!",
        cost: "4",
        vegetarian: true,
    },
    {
        id: 2,
        name: "Special Fries",
        description: "A portion of crunchy fries, with cheese and bacon!",
        cost: "7",
        vegetarian: false,
    },
    {
        id: 3,
        name: "Chicken Wings",
        description: "A portion of chicken wings, with homemade sauce.",
        cost: "8",
        vegetarian: false,
    }
];
// Main couse 
var mains = [
    {
        id: 4,
        name: "Chicken Sandwich",
        description: "A sandwich with crunchy chicken and mayo!",
        cost: "14",
        vegetarian: false,
    },
    {
        id: 5,
        name: "Rump Steak Burguer",
        description: "A premium burguer with the best meat!",
        cost: "18",
        vegetarian: false,
    },
    {
        id: 6,
        name: "Soy Meat Burguer",
        description: "A delicious vegetarian burguer!",
        cost: "19",
        vegetarian: true,
    }
];
// Desserts
var desserts = [
    {
        id: 7,
        name: "Ice Cream",
        description: "A cold homemade ice cream!",
        cost: "10",
        vegetarian: true,
    },
    {
        id: 8,
        name: "Petit Gateau",
        description: "A secret recipe for the best petit gateau!",
        cost: "12",
        vegetarian: true,
    },
    {
        id: 9,
        name: "CheeseCake",
        description: "A cake with cream cheese!",
        cost: "12",
        vegetarian: true,
    }
];