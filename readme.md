#How to run application (Intellij IDEA)
- open as project folder `backend` in source folder.
- install Lombok plugin into Intellij if you don't have it
- set correct SDK and wait for maven to import files, make sure IDE display backend folder as a project folder.
-- if not go to file, project settings and import maven project.
- download and install database(MySQL or postgreSQL) use credentials from file in next step.
- create database pizzakaktus in your database manager
- check settings in `src/main/resources/application.properties` that you have correct driver and credentials for your database.
- press run application
