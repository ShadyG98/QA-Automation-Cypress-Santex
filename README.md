## 🌐 Idiomas / Languages
- 🇪🇸 [Español](#-explicación-en-español)
- 🇬🇧 [English](#-explanation-in-english)

## 🇬🇧 Explanation in English

## XAcademy
## QA Automation
### Trello: https://trello.com/b/d95n96JT/saucedemo-qa-automation 
### Test Plan: https://docs.google.com/spreadsheets/d/1z88R_VCYDiSMn8zNHTPlWinaPwejp6it/edit?gid=1761268626#gid=1761268626 

## Final Project

1. Create a test plan to later automate it
2. Have Cypress installed
3. Create the test “saucedemoTest.cy.js”
4. On the following site: https://www.saucedemo.com, create the tests:
4.1. Purchase with user 1 <br>
4.1.1. Login with user “standard_user” <br>
4.1.2. Add products to the cart <br>
4.1.3. Perform the checkout <br>
4.1.4. Validate that the checkout was completed <br>
4.1.5. Logout <br>
4.2. Purchase with user 2 <br>
4.2.1. Login with user “problem_user” <br>
4.2.2. Repeat steps 4.1.2, 4.1.3, 4.1.4, 4.1.5

5. Use the Trello incident management tool and report defects or improvements detected using the following incident template <br>
6. Delivery format: Upload the project to GitHub and attach the repository link to the submission <br>

Evaluation Criteria: <br>
● Apply everything learned <br>
● Understanding and application: The understanding and correct application of the concepts learned during the course, as reflected in the final project, will be evaluated. <br>
● Use of best practices: The code should demonstrate good practices in test automation. <br>

Tool Usage <br>
●  Flexibility in tool selection: Students can use any additional tools they consider useful to complete the project, besides Cypress. <br>

Test Plan <br>
●  Presence of a test plan: It is essential to have a well-defined test plan. <br>
●  Clarity and detail: The test plan should be clear and detailed, with precise descriptions of the test cases. <br>

Test Automation <br>
●  Requirement compliance: Automated tests must meet the requirements specified in the final project. <br>
●  Validations and Verifications: Tests must include proper validations and verifications to ensure results are correct. <br>

## Project Initialization

Project folder creation and management
1. Initial command: `npm install cypress --save-dev`
2. Use the command `npx cypress open` once the Cypress modules are correctly installed.
3. Configure the test type and add the files. The version used will be Chrome v131.
4. Create the file according to the instructions: `saucedemoTest.cy.js` in the e2e folder. To maintain order, create a folder called saucedemo. Then move the file inside that folder for a more organized project structure.
5. One major issue found was that the saucedemo site has problems with images not loading correctly.
Issue thread: https://github.com/cypress-io/cypress/issues/27501
6. The last product on the list, the red t-shirt, had a problem with its ID. I found a different solution for this particular case: use the data-test attribute.
```
cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click()
//cy.get('#add-to-cart-test.allthethings()-t-shirt-(red)').click() -> this line was the one I replaced.
---
```
7. Once most of the project worked correctly, I began refactoring the code. I realized many lines were repeated, so I decided to iterate and replace repetitions with a single method or store them in an array. I used ChatGPT to find better alternatives.
8. At the end of the tests, I had to increase the loading time (`cy.wait`) to prevent failures and improve performance. Additionally, since the instructions mention products in plural, I iterated over all items. If any item was clicked when it shouldn’t or used by someone else, it might fail; however, I followed the instructions.
9. I updated Trello and added all my tasks to maintain better organization, setting timelines and adjusting personal deadlines.
10. I installed the Mocha report generator and used the `cypress-mochawesome-reporter` command. I added the corresponding files, included most possible commands, and prepared the report.
11. Finally, I reviewed and updated GitHub, the report template, and edited the README with step-by-step instructions and all project materials.

## Theoretical Material and Commands That Helped with Project Delivery

#### Run specs & Use Mocha to Generate Reports
1. Run all tests from the console
To run all tests of a project, simply execute the following command in the terminal:
`npx cypress run`
​
This command will find all specification files (spec files) in the cypress/e2e folder and execute them.
Inside cypress.config.js, set the following configuration:
```js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
   e2e: {
    setupNodeEvents(on, config) {
      // Other events..
    },
  },
  video: true, // Save videos
  screenshotOnRunFailure: true, // Save screenshots of failed tests
  videosFolder: "cypress/videos", // Specify folder for videos
  screenshotsFolder: "cypress/screenshots", // Specify folder for screenshots
});
```
2. Run specific tests
To run a specific file, pass the file path as an argument:
```
npx cypress run --spec cypress/e2e/file_name.cy.js
```

4. Run tests in a specific directory
If tests are organized in subdirectories and you want to run all tests in a specific directory:
```
npx cypress run --spec cypress/e2e/directory_name/*
```

5. Run tests in interactive mode
Open the Cypress UI to select and run tests manually using:
```
npx cypress open
```

This will open the Cypress interface where tests can be selected and run interactively.
5. Run tests in a specific browser

Specify the browser using the --browser option:
npx cypress run ```--browser``` chrome
Other supported browsers include Firefox, Edge, and Electron (Cypress’s default browser).

6. Steps to generate a report:
Install the cypress-mochawesome-reporter package to generate reports:
```
npm i cypress-mochawesome-reporter --save-dev
```
Modify cypress.config.js:
```
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter', // Set the reporter to use
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on); // Configure Node events so the plugin works
    },
  },
});
```
Update support/e2e.js:
Import the reporter registration so Cypress knows to use this reporter:
```
import 'cypress-mochawesome-reporter/register'; // In e2e.js file
```

Run the tests:
```
npx cypress run
```
Reports will be generated in cypress/reports/html, including screenshots of failed tests and detailed statistics.
To customize the report, add options in cypress.config.js:
```
charts: shows statistical charts
reportPageTitle: custom title
embeddedScreenshots: include screenshots in HTML
inlineAssets: include assets directly in the file
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  // ---------- New lines ----------
  reporterOptions: {
    charts: true,
    reportPageTitle: 'My Report',
    embeddedScreenshots: true,
    inlineAssets: true,   
  },
 ------------------------------
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
  video: true,
  screenshotOnRunFailure: true,
  videosFolder: "cypress/videos",
  screenshotsFolder: "cypress/screenshots",
});
```

## 🇪🇸 Explicación en Español

## XAcademy
## QA Automation
### Trello: https://trello.com/b/d95n96JT/saucedemo-qa-automation 
### Plan de pruebas: https://docs.google.com/spreadsheets/d/1z88R_VCYDiSMn8zNHTPlWinaPwejp6it/edit?gid=1761268626#gid=1761268626 

## Trabajo Final

1. Generar un plan de pruebas para posteriormente automatizarlo
2. Tener instalado cypress
3. Crear el test “saucedemoTest.cy.js”
4. En el siguiente sitio: https://www.saucedemo.com, generar los tests:
4.1. Compra con user 1 <br>
4.1.1. Login con el usuario “standard_user” <br>
4.1.2. Agregar los productos al carrito <br>
4.1.3. Hacer el checkout <br>
4.1.4. Validar que se haya realizado el checkout <br>
4.1.5. Realizar el logout <br>
4.2. Compra con user 2 <br>
4.2.1. Ingresar con el usuario “problem_user” <br>
4.2.2. Repetir los puntos 4.1.2, 4.1.3, 4.1.4, 4.1.5

5. Utilizar la herramienta de gestión de incidencias Trello y reportar los defectos o mejoras detectadas en la siguiente plantilla de incidentes <br>
6. Formato de entrega: Subir el trabajo a github y adjuntar el link del repositorio a la entrega <br>

Criterios de Evaluación: <br>
● Aplicar todo lo aprendido <br>
● Comprensión y aplicación: Se evaluará la comprensión y correcta aplicación de los conceptos aprendidos durante el curso, reflejados en el trabajo final. <br>
● Uso de buenas prácticas: El código debe demostrar buenas prácticas en automatización de pruebas. <br>

Uso de Herramientas <br>
●  Flexibilidad en la elección de herramientas: Los estudiantes pueden utilizar cualquier herramienta adicional que consideren útil para completar el trabajo, además de Cypress. <br>

Plan de Pruebas <br>
●  Presencia de un plan de pruebas: Es fundamental contar con un plan de pruebas bien definido. <br>
●  Claridad y detalle: El plan de pruebas debe ser claro y detallado, con una descripción precisa de los casos de prueba. <br>

Automatización de Pruebas <br>
●  Cumplimiento de los requisitos: Las pruebas automatizadas deben cumplir con los requisitos especificados en el trabajo final. <br>
●  Validaciones y Verificaciones: Las pruebas deben incluir validaciones y verificaciones adecuadas para asegurar que los resultados sean correctos. <br>

## Inicializacion del proyecto: 

Creación de la carpeta y gestión del proyecto
1. Comando inicial: `npm install cypress --save-dev.`
2. Utilizo el comando npx cypress open una vez que los módulos de Cypress están instalados correctamente.
3. Configuro el tipo de test y agrego los archivos. La versión que utilizaré es Chrome v131.
4. Creo el archivo conforme a la consigna: `saucedemoTest.cy.js` en la carpeta e2e. Para mantener el orden, crearé una carpeta llamada saucedemo. Luego moveré el archivo dentro de esa carpeta para tener una estructura más organizada en el proyecto.
5. Uno de los mayores inconvenientes que encontré fue que el sitio saucedemo tiene problemas con las imágenes, las cuales no cargan correctamente como deberían.
Hilo del problema: https://github.com/cypress-io/cypress/issues/27501
6. El último producto de la lista, la remera roja, tenía un problema con el ID. Busqué una solución diferente para este caso particular: usar el data-test.
```
cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').click() 
//cy.get('#add-to-cart-test.allthethings()-t-shirt-(red)').click() -> ésta linea es la que terminé reemplazando.

``` 
7. Una vez que logré que la mayoría del proyecto funcionara correctamente, comencé a refactorizar el código. Me di cuenta de que había repetido muchas líneas, así que decidí iterar y reemplazar las repeticiones con un único método o almacenarlas en un array. Para encontrar mejores alternativas, me ayudé con ChatGPT.
8. Al finalizar las pruebas, tuve que incrementar el tiempo de carga (`cy.wait`) para evitar que fallaran y así mejorar el rendimiento. Además, en el enunciado menciona productos en plural, por ello decidi iterar todos los productos y hacer la prueba con todos los items. Si alguno quedo clickeado cuando no deberia o alguien lo uso antes, podria no funcionar correctamente; Sin embargo, me emplee respetando la consigna.
9. Me puse al día con Trello y añadí todas mis tareas para tener un mejor orden, estableciendo tiempos y ajustando mis plazos personales.
10. Empecé a instalar el generador de reportes Mocha y utilicé el comando `cypress-mochawesome-reporter`. Agregué los archivos correspondientes, incorporé la mayoría de los comandos posibles y dejé listo el reporte.
11. Finalmente, revisé y actualicé GitHub, la plantilla del reporte, y para cerrar el proyecto, edité el README dejando un paso a paso y anexando material de todo el proyecto.

## Material teorico y comandos que fueron de ayuda para la entrega del proyecto.

#### Correr specs & Uso de mocha para generar reportes
1. Correr todos los tests por consola
Para correr todos los tests de un proyecto, simplemente ejecutamos el siguiente comando en la terminal:
`npx cypress run`
​
Este comando buscará todos los archivos de especificación (spec files) en la carpeta cypress/e2ey los ejecutará.
Dentro de cypress.config.js, setear la siguiente configuración:
```const { defineConfig } = require("cypress");

module.exports = defineConfig({
   e2e: {
    setupNodeEvents(on, config) {
      // Other events..
    },
  },
  video: true, // Guardar los videos
  screenshotOnRunFailure: true, // Guardar las capturas de pantallas de los tests que fallaron
  videosFolder: "cypress/videos", // Le decimos en que carpeta guardar los videos
  screenshotsFolder: "cypress/screenshots", // Le decimos en que carpeta guardar las capturas
  
});
```
​
2. Correr tests específicos
Para correr un archivo específico, podemos pasar la ruta del archivo como argumento:
`npx cypress run --spec cypress/e2e/nombre_del_archivo.cy.js`

​
3. Correr tests en un directorio específico
Si tenemos los tests organizados en subdirectorios y deseamos correr todos los tests de ese directorio específico, podemos usar el siguiente comando:
`npx cypress run --spec cypress/e2e/nombre_del_directorio/*`

​
4. Correr tests en modo interactivo
Abrir la interfaz de usuario de Cypress para seleccionar y correr los tests manualmente, usamos el siguiente comando:
`npx cypress open`

​
Esto abrirá la interfaz de Cypress, donde podemos seleccionar y correr los tests de manera interactiva.
5. Correr tests en un navegador específico
Podemos especificar el navegador en el que deseas correr los tests usando la opción --browser:
`npx cypress run --browser chrome`

​
Otros navegadores soportados incluyen firefox, edge, y electron (el navegador predeterminado de Cypress).
6. Pasos para generar un reporte:
Instalar el paquete cypress-mochawesome-reporter para generar los reportes:
`npm i cypress-mochawesome-reporter --save-dev`
​
Modificar cypress.config.js:
`const { defineConfig } = require('cypress');`
```
module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter', // Definimos el reporte a utilizar 
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on); // Configura los eventos de Node para que el plugin funcione
    },
  },
});

```

Actualizar support/e2e.js:
Importar el registro del reporter: permite que Cypress sepa que debe usar este reporter para las pruebas
`import 'cypress-mochawesome-reporter/register'`; // En el archico e2e.js

​
Ejecutar las pruebas:
`npx cypress run`

​
Los reportes se generarán en cypress/reports/html. Incluirán capturas de pantalla de pruebas fallidas y estadísticas detalladas.
Para personalizar el reporte, puedemos agregar opciones en cypress.config.js:
```
charts: muestra gráficos estadísticos
reportPageTitle: título personalizado
embeddedScreenshots: incluye capturas en el HTML
inlineAssets: agrega recursos directamente en el archivo
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  // ---------- Líneas nuevas ----------
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Mi Reporte',
    embeddedScreenshots: true,
    inlineAssets: true,   
  },
 ------------------------------
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
  video: true,
  screenshotOnRunFailure: true,
  videosFolder: "cypress/videos",
  screenshotsFolder: "cypress/screenshots",
  
});
```

