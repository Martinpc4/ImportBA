# ReactJS - CoderHouse
[![GitHub Profile](https://img.shields.io/badge/GitHub-Profile-f1faee?logo=GitHub)](https://github.com/Martinpc4)
[![Contact Me](https://img.shields.io/badge/Email-Contact_me-a8dadc?logo=Mail.Ru)](mailto:perezcobomartin4@hotmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Follow_me-457b9d?logo=linkedin)](https://linkedin.com/in/martin-perez-cobo/)

# Informaación del proyecto
Este es mi proyecto final para el curso de ReactJS en [CoderHouse](https://www.coderhouse.com), parte de la carrera de desarrollador web full-stack.
Este proyecto consiste en un ecomerce implementado con React, React Router, React Hooks, Libreria de React-Select, Libreria de Bootstrap y Firebase como base de datos. Porfavor leer la licencia del proyecto antes interactuar con el, dicha licencia se encuentra en el archivo "license.md".

# Funcionamiento y Componentes

## Flujo de Compra
La idea a traves de la cual base el flujo de compra era en que el usuario tenga la experiencia mas placentera posible de manera que no se tenga que preocupar de como fue diseñada la página, y que si se equivoca en algo, lo pueda corregir rapidamente sin tener que reciniciar el e-commerce.

Para poder comprar uno multiples items, se debe seleccionarlo desde el Home en productos destacados o desde una categoria. A partir de ahi, se debe seleccionar la cantidad y color del item, para que se habilite el boton de agregar el carrito.
Automaticamente, se va a redirigir a el carrito donde el usuario puede modificar la cantidad del o de los items en el carrito (en caso de que no haya stock se le indica mediante un SVG) y proceder a la sección del checkout en caso de que haya stock de los items selecionados. Una vez en el checkout, se le muestra el total de la compra con detalle de todo loq ue contiene la compra, el usuario completa sus datos y acepta los terminos y condiciones, lo que le habilitan el boton de proceder a pagar.
Una vez que se procede a pagar, se deberia agregar una API de pago, como lo puede ser mercado pago, que no fue agregada porque el objetivo del proyecto no era ese. En este caso, directamente se reliza la orden en caso de que haya stock de los productos, se borra los items del carrito y se le muestra un alert al usuario que le indica que la compra fue realizada correctamente y se le proporciona de un id de compra.

## Componentes

### Cart
**Importaciones**

- Se va a utilizar el useContext Hook con el CartContext para obtener la función *getTotal* que muestra el percio total sin impuestos de los items del carrito, la función *checkCartForStock* que devuelve un valor booleano dependiendo de si todos los items del Array Cart dentro del context tienen stock en la db y por ultimo el array *Cart* que va a ser el array de items que estan en el carrito del usuario.
- Se va a utilizar el useState Hook que va a indicar si se puede hacer la compra o no, para poder habilitar el boton de "proceder al pago".
- Se va a utilizar el useHistory Hook para poder acceder al history y redireccionar al usuario.
- Se va a utilizar el useEffect Hook para poder correr una función asyncrona la primera vez que se monte y cuando cambia el Cart Array.

**Flujo de Componente**

Haciendo uso del useEffect, la primera vez que se monta el componente y cada vez que cambia el Cart Array (traido desde context), se va a ejecutar una función asincrona en la que, si el carrito no esta vacio, va a llamar a la función "checkCartForStock" (traida desde el context) que va a verificar si todos los items en el carrito del usuario tienen stock.
Si lo tienen modifica el "estado de compra" a true y si no tiene algun item stock, entonces se pone en false.
Cuando se monte el componente, se va a renderizar el item "CartList" y utilizando la función "getTotal()"(traida desde context), si es mayor a cero entonces se renderiza el total del carrito utilizando la misma función y el boton de "checkout" si el "estado de compra" es igual a verdadero.
Cuando se renderice el boton de "checkout", cuando se haga click en el, se utiliza el useHistory hook para hacer un push de la ruta del checkout y redirigir al usuario al checkout

### CartList
**Importaciones**

- Se va a utilizar el useContext Hook con el CartContext para obtener el array *Cart* que va a ser el array de items que estan en el carrito del usuario.
- Se va a utilizar el useState Hook para poder almacenar un array de Componentes "ItemCart" para ser renderizados mas tarde.
- Se va a utilizar el useEffect Hook para poder correr una función de manera condicional la primera vez qeu se monta y cuando se actualiza el Cart Array (traido desde context).
- Se va a utiliza el "Link" de react-router-dom para poder crear links en donde se redirecciona al usuario.

**Flujo de Componente**

Cuando se monte el compoente y cuando se modifique el Cart Array (traido desde context), se va a ejecutar, si el carrito no esta vacio, la función "formatProductData" que va a iterar por todos los items en el Cart Array (traido desde context) y por cada uno se va a crear un ItemCart component, pasandole el tipo de lista recibido por props, con la data de cada item y se va a agregar a un array. Dicho array se va a setear como valor del "products" state, lo que va a causar que se re-renderice el componente.
A la hora de renderizar el componente, en caso de que el carrito este vacio, se renderiza un mensaje de que "todavia no hay productos" con un Link que si haces click en el mensaje te redirecciona al home "/". En el caso de que no este vacio, se renderiza el estado de "products" que va a contener a los items ya formateados.

### CartWidget

**Importaciones**

- Se va a utilizar el useContext Hook con el CartContext para obtener el array *Cart* que va a ser el array de items que estan en el carrito del usuario y la función *getTotal* que muestra el percio total sin impuestos de los items del carrito.
- Se va a utilizar el useState Hook para establecer el "clickedState" que indica si el usuario abrio o cerro el "cart widget".
- Se va a utilizar el useEffect Hook para re-renderizar el componente cuando cambia el Cart Array(context).
- Se va a utiliza el "Link" de react-router-dom para poder crear links en donde se redirecciona al usuario.

**Flujo de Componente**

Se va a renderizar un SVG, con un indicador de la cantidad de items que contiene el carrito obtenido mediante la función "getTotal"(context), en el que cuando se hace click, mediante la función "modifyClickedState" cambia el estado "clickedState" al contrario que estaba antes.
Si el "clickedState" es verdadero, entonces se va a renderizar un contenedor con un Link component que lo va a convertir en un hipervinculo al Cart Component. Dentro del contenedor se va a renderizar el componente CartList indicandole el tipo de lista.
Ademas, si el total del carrito obtenido por la función "getTotal" (context) es mayor a cero, entonces se va a renderizar el monto del total.

### Checkout

**Importaciones**

- Se va a utilizar el useContext Hook con el CartContext para obtener el array *Cart* que va a ser el array de items que estan en el carrito del usuario,la función *getTotal* que muestra el percio total sin impuestos de los items del carrito, la función *getItemList* que devuelve un array de codigo JSX con datos de cada item del Cart Array, la varriable *dolar* y *iva* que van a ser valores estaticos definidos en el Context, la función *checkCartForStock* que devuelve un valor booleano dependiendo de si todos los items del Array Cart dentro del context tienen stock en la db y la función *cleanCart* que vacia el carrito.
- Se va a utilizar el useState Hook para establecer la información ingresada por el usuario en el form ("userData").
- Se va a utilizar el useState Hook para establecer si la cantidad de información ingreada es la necesaria ("validDataState").
- Se va a utilizar el useState Hook para establecer el estado de la compra, si se realizo o no y alamacenar el id de la compra realizada ("purchaseState").
- Se va a utilizar el useEffect Hook para ejecutar una logica cuando se monta el componente por primera vez o cuando se actualice alguno de todos los estados.

**Flujo de Componente**

Cuando se monte por primera vez el componente o se modifque algun estado, si el estado "userData" fue llenado correctamente, entonces se actualiza el estado "setValidDataState" con el valor booleano true y si no se lleno correctamente o esta vacio, se actualiza el estado "setValidDataState" con el valor booleano false.

Cuando se renderiza, si la variable "state" dentro del estado "purchaseState" es verdadera (el usuario realizo la compra), entonces se muestra un mensaje de confirmación de compra y se muestra la segunda propiedad del estado que es el id de la compra.
Siempre se va a renderizar un formulario en el que el usuario debe ingresar su información y por cada cambio en el formulario, se actualiza la propierdad correspondiente del estado "userData" con el valor ingresado (para despues ser validado). Ádemas, se va a mostrar el total de la compra en detalle, con lo simpuestos necesarios haciendo uso de las función "getTotal" (context) y las variable "iva" y "dolar" (context).
En caso de que el estado "validDataState" sea verdadero (la info. ingresada por el usuario es valida), entonces se habilita el boton "proceder al pago". Cuando se clickea el boton, se va a utilizar la función "checkCartForStock" de manera asincrona para validar que haya stock y si lo hay se ejecuta la función "senduserDataToDB".
Cuando se ejecute la función "senduserDataToDB", se va a dar el formato correspondiente a los items del Cart Array (context) y se los envia a Firestore junto con los datos ingresados por el usuario. Esta operación devuelve una promesa en la que se va a modificar el estado "purchaseState" con el id de la compra y el estado con un valor booleano verdadero indicando que se realizo al compra. Esto va a causar que el componente se re-renderice y muestre un alert con los datos de la compra.

### Error
**Importaciones**
**Flujo de Componente**
### Footer
**Importaciones**
**Flujo de Componente**
### Home
**Importaciones**
**Flujo de Componente**
### Item
**Importaciones**
**Flujo de Componente**
### ItemCart
**Importaciones**
**Flujo de Componente**
### ItemCounter
**Importaciones**
**Flujo de Componente**
### ItemDetail
**Importaciones**
**Flujo de Componente**
### ItemList
**Importaciones**
**Flujo de Componente**
### NavBar
**Importaciones**
**Flujo de Componente**
### Shop
**Importaciones**
**Flujo de Componente**
### Cart (Context)
**Importaciones**
**Flujo de Componente**
### CustomCartProvider
**Importaciones**
**Flujo de Componente**

# Libraries

## React-Select
La librería de React-Select le proporciona la elección de colores a la hora de agregar un ítem al carrito. Fue implementada por su practicidad a la hora de manejar un select tag. Podría haberse realizado solo con los vanilla html tags implementando un onChange event de React y un state con React Hooks pero como ya la conocía y quería experimentar con librerías ajenas al proyecto.

## Bootstrap
La librería de Bootstrap proporciona sus famosas clases de estilos. Elegí implementarla ya que el uso de dichas clases me ayudaron mucho a la hora de maquetar por su intuitividad y grandes estilos, además, su alta personalización me permitió modificar, por ejemplo, los colores generales de la librerías. Se podría haber reemplazado a la librería con estilos SCSS para después ser compilados a CSS pero me hubiera tomado demasiado tiempo y no era el objetivo del curso maquetar.

# Desafios Extras (Pro-Coder)

## Custom item
- **Objetivo**: Posibilidad de agregar características seleccionables al producto (ej. talla, color, etc). La customización no debería modificar el precio. Las selecciones serán detalladas en el checkout. Por ejemplo: 1 x camisa.
- **Notas**:
    1. La caracteristica agregada a cada item es la del color, ya que correspondia debido a que todos los productos tienen al menos dos colores como elección.
## Stock check
- **Objetivo**: Validar stock al momento de intentar generar la order.
- **Notas**:
    1. La manera en la que se verifica el stock es mediante el uso de un array llamado "stock" que tiene cada producto en donde el indice del elemento dentro de dicho array corresponde al indice del array de colores del mismo producto.
    1. La verificación del stock fue realizada tanto el el Cart Component como en el Checkout Component para que el usuario no pueda simplemente ingresar manualmente la ruta correspondiente en el navegador y pueda hacer la orden igualmente.
    1. Se incluyo un indicador de stock (haciendo hover explica lo que es) en el Cart Component para que el usuario sepa que no hay suficiente stock con la cantidad de producto selecionado.
    
##  Cart persistente
- **Objetivo**: Hacer que el cart sea persistente en alguna api de almacenamiento local en el navegador (local/session storage).
- **Notas**:
    1. Fue implementado haciendo uso del localstorage y del useEffect Hook de React en el CustomCartProvider Component.
