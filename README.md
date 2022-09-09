Saludos, mi nombre es Oniel Santos, desarrollador de software en Intellisys, y egresado de Cincinnatus. Y hoy les traigo este tema.

# La ciencia oculta detrás de un lenguaje de programación. Descubre cómo crear tu propio lenguaje.

¿Algunas vez no les ha dado curiosidad de saber como se crea un lenguaje de programación? 
Bueno pues en este espacio al fin comprenderan que es lo que ocurre detras de escenas.

## ¿Por qué realizo esta charla?

Mi objetivo con esta charla es que podamos entender como y porque nuestro código se comporta de la forma en que lo hace, esto nos ayudara a tener una visión más amplia a la hora de programar, y por lo tanto, convertirnos en mejores desarrolladores.

## ¿A quién esta dirigida esta charla?

A todo aquel que este interesado en aprender un poco más sobre la ingenieria de software; esta charla esta preparada de modo que hasta el más nuevo en la industria pueda comprender los temás que se van a tratar.

## ¿Qué veremos en esta charla?

- Que es un lenguaje de programación
- Como la máquina ejecuta un lenguaje de programación
- Como hice para crear mi propio lenguaje de programación
- Paso a paso el ciclo de vida de un lenguaje de programación desde su codificación hasta su ejecución

Bien, con eso dicho vamos por el primer punto.
## ¿Qué es un lenguaje de programación?

Para comprender esto de una mejor forma dividamos los conceptos de que es un lenguaje, y que es un programa
### ¿Qué es un lenguaje?

El lenguaje es un sistema de reglas que hacen posible la comunicación. Por ejemplo en lenguajes como el español o el ingles, se tienen reglas de como se debe escribir, como se debe saludar, como se transmite la información correctamente de un emisor a un receptor.
### ¿Y qué es un programa?

Es un conjunto de instrucciones que le dicen a una computadora como realizar algun tipo de tarea. 
por lo tanto 

### ¿Qué es un lenguaje de programación? 
un leguaje de programación el sistema de reglas o sintaxis, que nos permiten comunicarnos con un dispositivo para crear un programa

Nota: el lenguaje es solo la sintaxis, no determina su ejecución.

### Instrucciones a la máquina.

Ya un programa son instrucciones para la máquina, veamos que tipos de instrucciones se pueden escribir en un lenguaje de programación, teniendo en cuenta que no todos los lenguajes son iguales y existen un monton de ellos con distintos fines, pero estas son las instrucciones más comunes que podemos encontrar:

- #### Guardar un valor en una variable.
    Lo cual significa tomar algun valor, y almacenarlo en memoria con un nombre, de manera que luego con el nombre podemos acceder al valor almacenado. Estos valores se dividen en tipos los más básicos son:
    - numeros (enteros, decimales o flotantes, complejos) `age = 15     price = 2.1    complex = 4+i`
    - string (cadena de texto/cadena de caracteres) `title = ‘Esto es una cadena de texto’`
    - booleano (verdadero o falso) `active = true      open = false`
  
    Como pueden ver en los ejemplos mostrados se define un nombre y a ese nombre se le da un valor, a esto se le llama variable. Nota: cada lenguaje tiene sus reglas para como se deben definir las mismas.

- #### Mostrar información
    Mostrar en pantalla algun valor y/o información
    `print('Información que se mostrará en pantalla al ejecutar el programa')`
    `print('Cada lenguaje tiene un método de salida estándar que es donde se enviará la información a mostrar')`

    Una programa escrito para pc tendra un sitio distinto en donde mostrar la información que uno para mobile.


- #### Realizar operaciones aritmeticas y de relación
    ##### Operaciones aritmeticas
        Realizar operaciones de suma, resta, división, multiplicación, etc...
        Y son muy necesarias para el buen funcionamiento de un programa, por ejemplo cuando se le da click al boton de likes en YouTube, tiene en su programa una instrucción de suma para aumentar el valor likes.
    ##### Operaciones de relación
        Realizar operaciones de relación como mayor que, menor que, es igual, es distinto etc...
        Un ejemplo de uso es cuando ponen su PIN de acceso a su cuenta de banco, tiene que verificar si el PIN digitado es igual al de la cuenta que esta intentando acceder. Luego de procesarse normalmente la expresion se convierte en un booleano, por ejemplo `5 < 1` se convertiria en falso, porque 5 no es menor que 1.

- #### Definir condicionales
    Las condicionales son una estructura que dependiendo de una condición ejecutan una acción u otra, una condición en escencia debe ser un booleano (verdadero o falso), si la condición es verdadera ejecuta un bloque y si es falsa puede ejecutar otro bloque. Sigamos con el ejemplo del PIN en el banco, si el PIN registrado es igual al PIN de la cuenta, te da acceso, pero si no lo es, te muestra en pantalla que hubo un error. Resumiendo, tenemos una condición y 2 posibles resultados.

    Nota: Recuerden que la sintaxis puede variar dependiendo del lenguaje.

- #### Definir bucles
    Los bucles son una estructura que dependiendo de una condición repiten una tarea. Un ejemplo sería una máquina industrial que le ponga las tapas a las botellas, en las instrucciones de su programa tienen un bucle repitiendo la tarea siempre y cuando aún queden botellas por trabajar.

    Nota: Recuerden que la sintaxis puede variar dependiendo del lenguaje.

- #### Definir funciones
    Almacenar una acción o conjunto de acciones con un nombre, similar a una variable, pero aca la diferencia es que se almacena un proceso y este proceso retorna un valor, las funciones pueden recibir parametros, los cuales son valores que el proceso necesita para ejecutarse.

- #### Escribir comentarios
    Los comentarios Son líneas de código que no se ejecutan.

    Los comentarios en programación se utilizan para poner aclaraciones de código, y así es más fácil de entender lo que hace, aunque también se utilizan para anular parte de un código.

    `# age = 15`
    Por ejemplo la línea de arriba no guarda el valor en la variable porque es un comentario.


Existen lenguajes con más instrucciones, pero a rasgos generales las vistas anteriormente son las más básicas.

Bien ya sabemos lo que es un lenguaje de programación y que se puede hacer en el, ahora veamos.

## ¿Cómo la máquina ejecuta un lenguaje de programación?

La máquina no ejecuta un lenguaje de programación directamente, ellas solo procesan un lenguaje dificil de comprender y trabajar para los humanos, que es el lenguaje binario o lenguaje máquina, por ese motivo, se crearon lenguajes con una sintaxis más familiar para nosotros pero desconocido para las máquinas, por lo tanto, nos hace falta un traductor, una herramienta que trasforme ese lenguaje de programación, a un lenguaje máquina, a esta herramienta se le conoce como Compilador.

Pero tambien tenemos otra herramienta llamada Interprete, la cual se encarga de traducir el código y a la vez ejecutarlo.

Veamos las principales diferencias entre un compilador y un interprete

- Un interprete lee el codigo línea a línea, mientras un compilador lee todo el código escrito de una.
- Un interprete traduce mientras lee convirtiendo el programa en instrucciones, mientras que un compilador corre solo el proceso para transformarlo completo en lenguaje máquina.
- Un interprete puede interpretar tu código en cualquier plataforma, mientas que un compilador te genera un archivo de código máquina listo para ejectuarse solamente en la plataforma creada.

Con esto podemos decir que: El nucleo, esa magía oculta que le da significado a eso que escribimos, son los compiladores y los interpretes, cada lenguaje utiliza uno de estos para funcionar y estos se encargan de construir las instrucciones, que luego son ejecutadas por una plataforma.

Existen lenguajes como JavaScript, que se interpretan en el navegador y funcionan en cualquier dispositivo que tenga un navegador, como Chrome o Mozilla, pero tambien hay lenguajes como Swift, se que compilan a un código máquina especificamente para ser utilizados en dispositivos IOS de la marca Apple.

## ¿Cómo cree un lenguaje de programación?

Mejor dicho, ¿Comó creé (en mi caso) un interprete a la sintaxis que quise utilizar, y ejecute instrucciones directamente en el navegador?

Para crear un traductor de lenguaje de programación a instrucciones hay muchas maneras, a continuación veremos una de ellas.

 - ### Definir una sintaxis
  El traductor debe tener definida las reglas de como se va a hacer cada cosa, cuales seran los caracteres pertenecen a los numeros, a operadores, como se debe definir una variable, como se declara un string, como se crean funciones, como se definen condicionales, bucles, y como se escriben los comentarios, todos esos caracteres o palabras especiales relacionadas a esas instrucciones del lenguaje, deben definirse dentro del traductor.

- ### Crear tokens
    Clasificar cada elemento del código por lo que es. El traductor toma el código fuente del lenguaje y va leyendo cada carácter uno a uno, identificando a que categoria pertenece, si es un numero, si es un string, si es una palabra reservada, si es una variable, si es un signo de punctuación, cada elemento le asigna un tipo o categoria, y se guardan cada tipo con cada valor, lo cual sería un token.

- ### Crear AST (Abstract Syntax Tree o Arbol de Sintaxis Abstracto)
  Se toman todos los tokens creados, y se analiza, la relación entre ellos, se les da un significado y un orden, por ejemplo si a un nombre, le sigue un signo de `=` y luego un string, significa que se esta asignando un string a una variable, por lo tanto se guarda esa instrucción en una estructura de arbol.

  Esta estructura sirve para definir cuales seran las instrucciones y en que orden deben de ejectuarse.

- ### Último paso
    Aquí pueden pasar 2 cosas
    #### Si el traductor es un Compilador
        Transformaria el AST, en código máquina y exportaria el archivo listo para ser ejectudo en la plataforma destino.
    #### Si el traductor es un Interprete
        Recorreria el AST, y ejectuaria las instrucciones en la plataforma que se encuentre.

## Paso a paso: Desde codificación hasta ejecución

Aquí veremos mi lenguaje junto a una herramienta didactica que creé para que veamos paso a paso de una forma visual como es todo el proceso anteriormente mencionado.

[Mi lenguaje de programación](https://foro-cic-09.vercel.app/)

Muchisimás gracias por su atención.