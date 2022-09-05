# La ciencia oculta detrás de un lenguaje de programación. Descubre cómo crear tu propio lenguaje.

## ¿Por qué realizo esta charla?

Mi objetivo con esta charla es que podamos entender como y porque nuestro código se comporta de la forma en que lo hace, esto nos ayudara a tener una visión más amplia a la hora de programar, y por lo tanto, convertirnos en mejores desarrolladores.

## ¿A quién esta dirigida esta charla?

A todo aquel que este interesado en aprender un poco más sobre la ingenieria de software, esta charla esta preparada de modo que hasta el más nuevo en la industria pueda comprender los temás que se van a tratar.

## ¿Qué veremos en esta charla?

- Que es un lenguaje de programación
- Como la máquina ejecuta un lenguaje de programación
- Como hice para crear mi propio lenguaje de programación
- Paso a paso el ciclo de vida de un lenguaje de programación desde su codificación hasta su ejecución

Bien, let's go

## ¿Qué es un lenguaje de programación?
```
  const [Lenguaje, Programacion] = "Lenguaje Programacion".split(' ');
  whatIs(Lenguaje);
  whatIs(Programacion);
```

Vayamos poco a poco, primero viendo 
### ¿Qué es un lenguaje?

El lenguaje es un sistema de reglas que hacen posible la comunicación
### ¿Y qué es un programa?

Es un conjunto de instrucciones que le dicen a una computadora como realizar algun tipo de tarea por lo tanto un leguaje de programación: el sistema de reglas o sintaxis, que nos permiten crear un programa

Ojo a esto, el lenguaje es solo la sintaxis es decir las reglas

### Instrucciones a la máquina.

Ya un programa son instrucciones para la maquina, veamos que tipos de instrucciones se pueden escribir en un lenguaje de programación, teniendo en cuenta que no todos los lenguajes son iguales y existen un monton de ellos con distintos fines, pero estas son las instrucciones más comunes que podemos encontrar:

- #### Guardar un valor en una variable.
    Lo cual significa tomar algun valor, y almacenarlo en memoria con un nombre, de manera que luego con el nombre podemos acceder al valor almacenado, estos valores se dividen en tipos los más básicos son:
    - numeros (enteros, flotantes, complejos)
    - string (cadena de texto/cadena de caracteres)
    - booleano (verdadero o falso)

- #### Mostrar información
    Mostrar en pantalla algun valor y/o información

- #### Realizar operaciones aritmeticas y logicas
    Realizar operaciones de suma, resta, división, multiplicación, comparar valores etc...

- #### Definir condicionales
    Son una estructura que dependiendo de una condición ejecutan una acción u otra, una condición normalmente es comparar 2 valores por ejemplo `12 > 15` en este caso la condición es falsa y no ejecutaría la acción, por el contrario `5 > 1` es verdadero y si ejecutaría la acción

- #### Definir bucles
    Son una estructura que dependiendo de una condición repiten una tarea

- #### Definir funciones
    Almacenar una acción o conjunto de acciones con un nombre, similar a una variable, pero aca la diferencia es que se almacena un proceso y este proceso retorna un valor, las funciones pueden recibir parametros, los cuales son valores que el proceso necesita para ejecutarse

- #### Escribir comentarios
    Son textos que no se van a procesar solo sirven para que el programador escriba algo libre.

Existen lenguajes con más instrucciones, pero a rasgos generales estas son las más básicas.

## ¿Cómo la máquina ejecuta un lenguaje de programación?

La máquina no ejecuta un lenguaje de programación directamente, ellas solo procesan un lenguaje dificil de comprender y trabajar para los humanos (Binario), por ese motivo, se crearon lenguajes con una sintaxis más familiar para nosotros pero desconocido para las máquinas, por lo tanto, nos hace falta un traductor, una herramienta que trasforme ese lenguaje de programación, a un lenguaje máquina, a esta herramienta se le conoce como Compilador.

Ojo: Compilador transforma no ejecuta

Pero tambien tenemos otra herramienta llamada Interprete, la cual se encarga de transformar el codigo y a la vez ejecutarlo

Con esto podemos decir que: El nucleo, esa magía oculta que le da significado a eso que escribimos, son los compiladores y los interpretes, cada lenguaje utiliza uno de estos para funcionar y estos se encargan de construir las instrucciones, que luego son ejecutadas por una computadora.

### ¿Comó un compilador procesa la sintaxis de un lenguaje de programación?

Lo primero es que el compilador tiene definida las reglas de la sintaxis del leguaje que va a analizar, sabe cuales caracteres pertenecen a los numeros, operadores, como se debe definir una variable, como se declara un string, como se crean funciones, como se definen condicionales, bucles, y como se escriben los comentarios, todos esos caracteres o palabras especiales relacionadas a esas instrucciones del lenguaje, estan definidas dentro del compilador.

Con eso último establecido, el compilador toma el código fuente del lenguaje, y va leyendo cada carácter uno a uno, identificando a que categoria pertenece cada caracter, y clasificandolo segun su naturaleza, a este proceso se le llama tokenizar, y es donde se define que es cada elemento del codigo: una palabra reservada, un numero, un string, un signo de puntuación, un identificador etc..., solo analiza los caracteres.

Luego toma todos los tokens, y analiza la relación entre ellos uno a uno, y les da un significado y un orden, por ejemplo si a un identificador, le sigue un operador `=` y luego un string o numero o booleano, esto significa que se esta asignando un valor a una variable, lo cual sería una instrucción, analizando todos los tokens y la relacion entre ellos se crea un Arbol de Sintaxis Abstracto, lo cual es una estructura que contiene las instrucciones que se ejecutaran en el programa y esas instrucciones tienen más instrucciones dentro de si, las cuales pueden tambien tener más dentro de si.

Esto se hace para tener una estructura ordenada en la cual se detallan todas las instrucciones que se deben ejecutar y en el orden en que debe hacerse

Aquí pueden pasar 2 cosas, si es un compilador, tomaria el arbol de sintaxis y transformaria el arbol en el código maquina y crearia un archivo listo para ser ejecutado, en cambio, si fuese un insterprete, convertiria uno a uno cada elemento del arbol en codigo maquina y lo ejectuaria al instante, realizando las instrucciones escritas en el programa.

## ¿Cómo cree un lenguaje de programación?

Mejor dicho, ¿Comó creé un interprete a la sintaxis que quise utilizar?
Pues, ya no hay mucho misterio, siguiendo los pasos anteriormente mencionados, definí mi sintaxis y las reglas de mi sintaxis, leyendo los caracteres cree tokens, los cuales luego les di un significado y los converti en un arbol de sintaxis abstracto, y por ultimo lo ejecute, aunque, mi lenguaje no transforma mi codigo en codigo maquina, lo ejecuta directamente en un navegador. Y eso es lo bueno, que se pueden crear lenguajes de todo tipo para lo que sea. (Añadir ejemplos de distintos tipos de lenguajes)

Bien ahora echemos un vistazo a una herramienta que les creé para que interactuen con el ciclo de vida de un lenguaje


