# User Stories

The purpose of this document is to make a description of the functionalities that the system must incorporate, describing each functionality that you want to carry out.


## Problem Description.

My company has been developing software since 2008.

There are currently two different teams in the company. The Operations or Systems team and the Software Development team.
Every time that a developer wants to upload changes to a project, it must first go through the operations team that runs a series
scripts and deploys the new version.
There is no type of continuous integration or continuous delivery channel. Software development is slower since many times
it is necessary to debug the errors once the version is uploaded to the server and each upload to the servers requires the attention of the systems department,
taking away time to other maintenance or improvement tasks.

For this reason, it has been decided to adopt a more DevOps vision, implementing a Continuous Integration and Continuous Delivery channel.

## Continuous integration

Continuous integration is a way to develop software to be able to detect faults as soon as possible.
Integration consists of compiling and running tests on a project.

Continuous integration helps us with:
- Developers can detect faults or bugs quickly.
- Constant availability of a demo version or tests to show the client.
- Immediate execution of unit tests.
- Continuous monitoring of project metrics.

### Developers

- Como desarrollador puedo pedir que se construya una infraestructura para el desarrollo del software bajo demanda o auto construida.
- Como desarrollador puedo subir un cambio a cualquier rama del proyecto sin depender directamente del departamento de sistemas.
- Como desarrollador tengo clara consciencia del entorno donde se despliega la aplicación.
- Como desarrollador puede tener un entorno de prueba para un nuevo proyecto en menos de 1 hora.
- Como desarrollador necesito retroalimentación después de cada subida de el resultado.
- Como desarrollador puedo conocer el impacto que causa la aplicación en los sistemas. (Consumo de recursos).
- Como desarrollador debo recibir reportes periódicos del uso de la aplicación.
- Como desarrollador conozco los ficheros de configuración de los que depende la aplicación.
- Como desarrollador al subir una nueva versión puedo ejecutar una serie de tests que me digan que todo sigue funcionando correctamente.


### Systems administrator

The other side of the coin in the process is system administrators or sysadmins.

- As a system administrator I can configure a new server (bare metal) automatically with an IaC configuration file.
- As a system administrator I can deploy a virtualization system on a configured server through a configuration file.
- As a system administrator I can deploy a basic firewall-proxy-webserver infrastructure on a given virtualization system through a configuration file.
- As a system administrator I can deploy virtual machines on the infrastructure through a configuration file.
- As a system administrator I can provision virtual machines through a configuration file so that updating them is relatively easy.
