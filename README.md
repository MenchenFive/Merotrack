# Merotrack
Fleet tracking WebApp
Final project @ *IES Maestre de Calatrava*, 2019
Alberto Menchén Ruiz

[DEMO VIDEO](https://drive.google.com/file/d/1-AHN0oYK-R7Ww952cVysdSEwwJiVyqIa/view?usp=sharing)

# How to run:
### Backend:
  - Import backend folder as a Java project into a Gradle-compatible IDE (IntelliJ IDEA, Eclipse, ...)
  - Run main() method at MerotrackerApplication.java
  - NOTE: You will need a DBMS, like PostgreSQL, and you will need to configure Application.properties file with the DB access credentials and URL.

### Frontend:
  - Install Node.js, and therefore, NPM
  - In terminal, move to 'Frontend' directory
  - Run following commands:
```sh
npm i --save 
ng serve
```


# Technology stack:
### Backend:
- Java
- Spring boot
- Spring Data REST
- Spring Data JPA
- Spring Security
- PostgreSQL database 

### Frontend:
- Angular 7
- Nebular framework for angular
- Various PrimeNG components for angular
- Leaflet
- Leaflet Routing Machine
- Leaflet Control Geocoder

### Other:
- Arduino IDE for GPS tracker
- Mapbox API account
