# Historias Usuarios

El propósito de este documento es realizar una descripción de las funcionalidades que debe incorporar el sistema describiendo la funcionalidad que se desea realizar.

Una historia de usuario estará comprendida por. 

Número.
Usuario: ¿Quién va a realizar la acción?
Prioridad.
Descripción.


## Descripción del problema.
La empresa Intelligenia SA. lleva desarrollando software desde 2008.

Actualmente hay dos equipos diferenciados en la empresa. El equipo de Operaciones o sistemas y el equipo de Desarrollo de Software.
Cada vez que un desarrollador quiere subir cambios a un proyecto, primero debe pasar por el equipo de operaciones que ejecutan una serie
de scripts y suben la nueva versión al servidor.
No hay ningún tipo de cauce de integración contínua ni de entrega contínua. El desarrollo del software se hace más lento ya que muchas veces
hay que depurar los fallos una vez subida la versión al servidor y cada subida a los servidores requiere la atención del departamento de sistemas,
quitando tiempo a éste de otras tareas de mantenimiento o mejora.

Es por lo anterior que se ha decidido adoptar una visión más DevOps implementando un cauce de Integración Contínua y Entrega Contínua.

## Integración Contínua
La integración contínua es una forma de desarrollar software para poder detectar fallos cuanto antes.
La integración consiste en la compiĺación y ejecución de pruebas de un proyecto. 

La integración contínua nos ayuda con:
- Desarrolladores pueden detectar fallos o bugs de manera rápida.
- Disponibilidad constante de una versión demo o de pruebas para mostrar al cliente.
- Ejecución inmediata de las pruebas unitarias.
- Monitorización contínua de las métricas del proyecto


### Historias de Usuario relacionadas con Integración contínua
### Desarrolladores
- Como desarrollador puedo pedir que se construya una infraestructura para el desarrollo del software bajo demanda o auto construida.
- Como desarrollador puedo subir un cambio a cualquier rama del proyecto sin depender directamente del departamento de sistemas.
- Como desarrollador tengo clara consciencia del entorno donde se despliega la aplicación.
- Como desarrollador puede tener un entorno de prueba para un nuevo proyecto en menos de 1 hora.
- Como desarrollador necesito retroalimentación después de cada subida de el resultado.
- Como desarrollador puedo conocer el impacto que causa la aplicación en los sistemas. (Consumo de recursos).
- Como desarrollador debo recibir reportes periódicos del uso de la aplicación.
- Como desarrollador conozco los ficheros de configuración de los que depende la aplicación.
- Como desarrollador al subir una nueva versión puedo ejecutar una serie de tests que me digan que todo sigue funcionando correctamente.


### Administradores de Sistemas
La otra cara de la moneda en el proceso son los administradores de sistemas o sysadmins. En la empresa Intelligenia S.A actualmente hay una clara diferenciación entre desarrolladores y sistemas.

- Como administrador de sistemas puedo configurar un nuevo servidor (bare metal) de forma automática con un un fichero de configuración IaC.
- Como administrador de sistemas puedo desplegar un sistema de virtualización sobre un servidor configurado a través de un fichero de configuración.
- Como administrador de sistemas puedo desplegar una infraestructura básica firewall-proxy-webserver sobre un sistema de virtualización dado mediante un fichero de configuración.
- Como administrador de sistemas puedo desplegar máquinas virtuales sobre la infraestructura a través de un fichero de configuración.
- Como administrador de sistemas puedo aprovisionar las máquinas virtuales a través de un fichero de configuración de forma que sea relativamente fácil la actualización de éstas.
