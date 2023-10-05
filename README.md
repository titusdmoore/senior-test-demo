# Titus' Example Senior Software Engineer Test

## Running the project
1. Start database by running `docker run --name <container name> -e MYSQL_ROOT_PASSWORD=<password> -e MYSQL_DATABASE=<DB Name> -p 3306:3306 -d mysql:<tag>`
    - This command requires docker to be installed, instructions can be viewed [here](https://www.docker.com/get-started/).
2. Configure `.env.local` by copying `.env.example` and populating values.
