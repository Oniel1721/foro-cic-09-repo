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

## ¿Cómo la máquina ejecuta un lenguaje de programación?

La máquina no ejecuta un lenguaje de programación directamente, ellas solo procesan un lenguaje dificil de comprender y trabajar para los humanos (Binario), por ese motivo, se crearon lenguajes con una sintaxis más familiar para nosotros pero desconocido para las máquinas, por lo tanto, nos hace falta un traductor, una herramienta que trasforme ese lenguaje de programación, a un lenguaje máquina, a esta herramienta se le conoce como Compilador.

Ojo: Compilador transforma no ejecuta

Pero tambien tenemos otra herramienta llamada Interprete, la cual se encarga de transformar el codigo y a la vez ejecutarlo

