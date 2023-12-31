// Constantes.
const REGULAR_TYPE = 21;
const LOWER_TYPE = 4;
const EXEMPT_TYPE = 0;


// Datos de entrada.
const products = [
    {
        description: "Goma de borrar",
        price: 0.25,
        tax: LOWER_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Lápiz H2",
        price: 0.4,
        tax: LOWER_TYPE,
        stock: 5,
        units: 0,
    },
    {
        description: "Cinta rotular",
        price: 9.3,
        tax: REGULAR_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Papelera plástico",
        price: 2.75,
        tax: REGULAR_TYPE,
        stock: 5,
        units: 0,
    },
    {
        description: "Escuadra",
        price: 8.4,
        tax: REGULAR_TYPE,
        stock: 3,
        units: 0,
    },
    {
        description: "Pizarra blanca",
        price: 5.95,
        tax: REGULAR_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Afilador",
        price: 1.2,
        tax: LOWER_TYPE,
        stock: 10,
        units: 0,
    },
    {
        description: "Libro ABC",
        price: 19,
        tax: EXEMPT_TYPE,
        stock: 2,
        units: 0,
    },
];

//Paso 1-Implementa un algoritmo que genere desde Javascript los elementos HTML necesarios para mostrar una lista de productos con su descripción, precio unitario y un input de unidades para cada uno.

let container = document.getElementById("productListContainer");

for (let i = 0; i < products.length; i++) {
    let productList = document.createElement("ul");
    productList.setAttribute("class", "productList");
    productList.innerText = "-- " + products[i].description + " -------------------------" + products[i].price + "€/ud ";
    container.appendChild(productList);

    let productUnits = document.createElement("input");
    productUnits.setAttribute("class", "productUnits");
    productUnits.setAttribute("id", "productUnits");
    productUnits.setAttribute("type", "number");
    productUnits.setAttribute("min", 0);
    productUnits.setAttribute("max", products[i].stock);
    productUnits.addEventListener("change", event => {
        products[i].units = parseInt(event.target.value);
        botonDisponible();

    });
    productList.appendChild(productUnits);

};



//Paso 2-Prepara un algoritmo que calcule la factura cuando pulsemos el botón calcular y muestre el resultado en los campos: subtotal , impuestos y total .



// Calcular el Subtotal del carrito de la compra.

function calcSubtotal() {

    let subTotal = 0;

    for (i = 0; i < products.length; i++) {
        subTotal += products[i].price * products[i].units;
    };

    console.log("------------------------");
    console.log("TOTAL A PAGAR = " + subTotal.toFixed(2) + "€");
    console.log("------------------------");
    return subTotal

};


// Calcular el valor del IVA.

function calcIva() {

    let totalIva = 0;

    for (let i = 0; i < products.length; i++) {

        let subTotalObjeto = products[i].price * products[i].units;

        if (products[i].tax == REGULAR_TYPE) {
            totalIva += subTotalObjeto * 0.21;
        } else if (products[i].tax === LOWER_TYPE) {
            totalIva += subTotalObjeto * 0.04;
        };

    };

    console.log("------------------------");
    console.log("TOTAL IVA = " + totalIva.toFixed(2) + "€");
    console.log("------------------------");
    return totalIva;
};

// Calcular el valor total real.


function calcTotal(subtotal, iva) {
    return subtotal + iva;

};

function resultado() {
    var subtotal = calcSubtotal();
    var valorSubtotal = document.getElementById("subtotalquantity");
    valorSubtotal.innerHTML = subtotal.toFixed(2);

    var iva = calcIva();
    var valorIva = document.getElementById("iva");
    valorIva.innerHTML = iva.toFixed(2);

    let total = calcTotal(subtotal, iva);
    let valorTotal = document.getElementById("total");
    valorTotal.innerHTML = total.toFixed(2);
    console.log("------------------------");
    console.log("TOTAL = " + total.toFixed(2) + "€");
    console.log("------------------------");
}

/*Paso 3-Intenta hacer que el botón Calcular se habilite o deshabilite en función de si el usuario ha elegido al menos 1 unidad de algún producto o no.
Es decir: Si las unidades de todos los productos están a 0, el botón calcular se deshabilita.
Si existe al menos 1 producto con 1 unidad seleccionada, el botón calcular se deberá habilitar.*/

let botonDisponible = () => {
    let buttonOff = true;
    for (i = 0; i < products.length; i++) {
        if (products[i].units > 0) {
            buttonOff = false;
        }
    }
    document.getElementById("submit").disabled = buttonOff;
}

botonDisponible();

//Paso 4-Funcion global para el uso del boton "Calcular"//



document.getElementById("submit").addEventListener("click", resultado)
