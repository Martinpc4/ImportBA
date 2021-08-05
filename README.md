# ReactJS - CoderHouse
[![GitHub Profile](https://img.shields.io/badge/GitHub-Profile-f1faee?logo=GitHub)](https://github.com/Martinpc4)
[![Contact Me](https://img.shields.io/badge/Email-Contact_me-a8dadc?logo=Mail.Ru)](mailto:perezcobomartin4@hotmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Follow_me-457b9d?logo=linkedin)](https://linkedin.com/in/martin-perez-cobo/)

### Sobre este Proyecto
Este es mi proyecto final para el curso de ReactJS en [CoderHouse](https://www.coderhouse.com), parte de la carrera de desarrollador web full-stack.
Este proyecto consiste en un ecomerce implementado con React, React Router, React Hooks, React Select y Firebase como base de datos. Porfavor leer la licencia del proyecto antes interactuar con el, dicha licencia se encuentra en el archivo "license.md".

### About this Project
This is my final project for the JavaScript course on [CoderHouse](https://www.coderhouse.com), which is a part of the full-stack web developer career.
This proyect consists of an Ecomerce developed with React, React Router, React Hooks, React Select and Firebase as a database. In order to store data, I've chosen to use a NoSQL database, MongoDB. Please, before interacting in anyway with the project, read the license carefully, wich can be found in the file "license.md".


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
