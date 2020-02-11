# General description

The repository contains two Front-end projects written in [Angular](https://angular.io/) using [Angular Material design](https://material.angular.io/) and scripts for building a portable [Docker](https://www.docker.com/) container, which hosts the two applications using Apache httpd. 

You can find more information about the ticket reservation system in this [article](https://db-blog.web.cern.ch/blog/viktor-kozlovszky/2019-10-open-days-reservation-systems-high-level-overview-2019).

The content is orginized into different folders. You will find the description for each folder in this ReadMe. 

Overview about the folder structure:
* **application**: The ticket reservation application which served as the user interface for reserving the Open Days tickets. The application works by making API calls against the [back-end server](https://github.com/cerndb/open-days-registration-application-back-end) (business layer). Please note that in order to use or test the functionalities of the application you need to have a back-end server up and running which recieves and processes the API calls. The back-end project for can be found in this [repository](). For more detailed information check out the [ticket reservation application section](#Ticket-reservation-application).
* **application-welcome**: This is a language selector page, it was hosted at the root level of the web server. Based on the language selection choice it forwards the user to the selected language path forexample: "/en/index.html" or "/fr/index.html". For more detailed information check out the [langauge preference selector application section](#Langauge-preference-selector-application).
* **containerize**: This folder contains the helper files to build a container which hosts the two applications. For more detailed information check out the [container approach section](#Container-approach).

# Collaborators

The final application is the collaborated work of the following people:
* [Nuno Guilherme Matos de Barros](https://github.com/ngmatos)
* [Thomas Løkkeborg](https://github.com/tholok97)
* [Viktor Kozlovszky](https://github.com/kviktorman)

# Container approach

**environment variables**

In the docker file you need to set the following variables to their default values. Note that if you use Kubernetes for hosting the container you can override the default values in the deployment templates.

| variable name | description |
| --- | --- |
| REGISTRATION_API_URL | The URL of the back-end application server. You will see the following error message if the back-end server is not available as you load the front-end page "Network connection failure, please try the last action again." |
| RECAPTCHA_SITE_KEY | site key for google re-captcha. In case you don't want to use it set to any string value and set the RECAPTCHA_ENABLED to false. |
| RECAPTCHA_ENABLED | true or false value  |
| PIWIK_URL | The PIWIK server/service URL. |
| PIWIK_SITE_ID | site id provided by PIWIK. This can be set to any string in case you don't want to use it. If you don't set there will be an error message in the console of the browser, but the application will be fully functional. |
| PIWIK_DOMAIN | the url domain of your application for PIWIK. This can be set to any string in case you don't want to use it. If you don't set there will be an error message in the console of the browser, but the application will be fully functional. |

For reCAPTCHA the solution supports the google [reCAPTCHA v2](https://developers.google.com/recaptcha/intro). You will see the checkbox on request passcode page. In order to use the reCAPTCHA you will need your own recaptcha site configuration and include the site key in the ./Dockerfile or in the ./application/src/app/SharedObjects/contsants/generalSettings.ts

**URL redirect**

Each of the two applications are designed as [Single Page Applications](https://en.wikipedia.org/wiki/Single-page_application) (SPAs). This means that there is only one html file + several js and css files for the applications. To route the non existing locations back to the same index.html file we used ".htaccess" files. There in total 3 of these files one for the language selector application and one for the english and one for french reservation application. The english end french files have "_en" and "_fr" endings, these are removed during the Docker container build process.

Note that in the container we use the apache URL rewrite. That needs to be installed first on the machine if you don't want to use the container approach. 

**Containerize folder**

This folder contains helper files for the image build. 

- containerize folder content 
  * "apache" folder, contains the apache configurations for URL rewrite and a web-root** folder, more information [here](#URL-redirect)
  
**Note that the CERN specific logos and backgrounds are not included in the repository. These were originally under the "containerize/configuration/web-root/images". In case you want to build your container you need to create this folder and add images with the following names:
* opendays_background.png => background image of the application
* Site_web_logo.png =>  banner top left CERN Opendays reservation system logo 
* Site_web_opendays.png =>  banner top right CERN officiel site text logo

Currently there is an empty.txt for place holding purpose there. Thise file is removed during the container build process.

These files were hosted on the same level (top) as the language selector page. In case you don't provide these files you will see broken image icon in the browser once you load the application.

- scripts

Start up script which starts when container starts and runs the httpd as a foreground process.

# How to use the container

To run the image you need to have [Docker installed](https://docs.docker.com/install/).

Once your environemnt is ready you update the settings in the ./Dockerfile. 
Note that you need to use a RedHat or CentOS image. You can use for example the docker hub image : "centos:centos7"

From the root folder, where the Dockerfile is run the following command.

```
>docker build -t reservation-system-front-end -f ./Dockerfile .
```

To run the image you need to forward the port 

```
>docker run -it -p 80:80 --rm --name reservation-front-end reservation-system-front-end
```

You access your image via http://localhost

# Language preference selector application

For the language selector page first we went for a non-Angular solution, but during the testing we noticed that certain browsers on phones zoom the top banner for the Angular applications. In order to have the same banner size we decided to create an individual Angular application. This application you can find under the application-welcome folder. The built application was hosted at the root level of the web server.

* using development environment 

The application is written in Angular. For investigation and further development process it is recommended to install the node package manager and the angular-cli.
More information how to set up your environment can find [here](https://angular.io/guide/setup-local).

* background URL replacement

This is an optional setting, it is for setting the background image showing in the web interface.
Replace line 18 in "application-welcome/src/app/styles.scss" the final location of the background URL. 

```
  background: url(http://localhost/opendays_background.png) no-repeat center top/cover;
```

After the installation go to the folder application-welcome folder 

Install the dependency packages with the following command
```
>npm install
```

You can run the application with the following command. 
```
>ng serve
```

You access the application from the browser at the following URL: http://localhost:4200

* How to use the container

If you want only to see the front-end application in action you use the built container image. You can read more about this approach [here](#Use-the-container).

# Ticket reservation application

This Angular application located under the "application" folder is a the reservation application itself. It has the following functionalities:
| anonymous free space checking | without login makes API calls to see if there are still free spaces (/en/welcome or /fr/welcome)  |
| request passcode | sends a passcode generation request to back-end. |
| login with passcode | sends login credentials, recevices a JWT token. The token get sorted and navigates to dashboard |
| create new reservation | sends token, receives updated token, which contains the reservation id |
| select date | timetable load, auto time table refresh, time slot selection |
| provide visitors details | provide number of visitors and their age, fast track ticket selection possibility |
| select transport type | provide the arrival transport type |
| summary page | visualize reservation details |
| reservation dashboard | list of reservation for modification and cancel |
| dialog windows | for confirm cancel and changing from fast track to no fast track slot |
| API call error messages | show API call returned error messages |

* Front-end tracking 

We used an open digital analytics solution PIWIK (now called [Matamo](https://matomo.org/blog/2018/01/piwik-is-now-matomo/)) for tracking the front-end user activity. 

For tracking the front-end an online service is required. To avoid confusion we commented out the PIWIK settings. In case you want to use PIWIK you need to comment and update the settings in the application/src/index.html file.

* Bi-linguality

The reservation application was bi-lingual, in Angular terms this means you have multiple application dedicated for each language. For this we used Angular's internationalization. Here in [this article](https://db-blog.web.cern.ch/blog/viktor-kozlovszky/2019-11-internationalization-2019-open-days-reservation-system) you can find more information about the approach.

For generating the language resource files you need to execute the following commands (The commands are defined in the ./appliaction/package.json):
```
>npm run i18n:extract
>npm run extract-i18n
```
They will extract the i18n tags from the html files and generate the language resource files under application/src/i18n folder. Note that you need to execute this command from inside the application folder and if you haven't installed the npm packages you need to run "npm install" first.

You can use the application without changes as well, because the repository has already the extracted translation resources (located under ./application/src/i18n/). 

We used also environment settings also for the application for differentiating the french and english environemtns. The settings for these can be found under the application/src/environment folder. 

* background URL replacement
In case you want to have an image as a background. This is not necessary for playing with the application.
Replace line 48 in "application/src/app/styles.scss" the final location of the background URL. 
```
  background: url(http://localhost/opendays_background.png) no-repeat center top/cover;
```

* running the application 

For running the application on your desktop you need a working [back-end environment](https://github.com/cerndb/open-days-registration-application-back-end). You will see the following error message if the back-end server is not available as you load the front-end page "Network connection failure, please try the last action again.". For making the application running natively you need to install the node package manager and the angular-cli. More information how to set up your environment can find [here](https://angular.io/guide/setup-local).

To make the front-end part working, navigate to the "application" folder. Install the npm packages 

```
>npm install
```

You need to update the configuration files before usage. This can be found in the following files (search for "$"):
* /application/src/app/SharedObjects/constants/generalSettings.ts
* /application/src/index.html

The values you can find in the [Container approach environment variables](#Container-approach) section of this ReadMe.

You can run the application with the following command. 

```
>ng serve
```

 You access the application from the browser at the following URL: http://localhost:4200
 
* How to use the image

If you want only to see the front-end application in action you use the built container image. You can read more about this approach [here](#Use-the-container).