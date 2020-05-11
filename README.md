# RecruitLete

## Deployed Site URL
`https://recruithub-dk.herokuapp.com`

If you do not want to clone the repository, you can use this URL.

## Description

An online recruiting platform for student-athletes to expose their athletic and academic abilities to college coaches around the nation. It's an easy platform for student-athletes to gain exposure and for coaches to find the right players who will make the most impact and fit their program.

## Installation

run this command in terminal:

```bash
git clone https://github.com/diyarkudrat/RecruitLete.git
```
- Ensure you have npm installed on machine
- Ensure you have the latest versions of all dependencies in the package.json file

## Docker

### Build Image

```bash
docker build -t image-name .
```

### Run Container

```bash
    docker run --rm --name container-name image-name
```

### Docker-Compose

- Run container of this application running the web image as well as the database image

``` bash
    docker-compose up --build
```
