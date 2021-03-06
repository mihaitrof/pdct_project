1) Install Docker:

* [Mac](https://docs.docker.com/docker-for-mac/install/)

* [Windows](https://docs.docker.com/docker-for-windows/install/)

2) In the root folder, run in the terminal/cmd `[sudo] docker build .` and then `[sudo] docker-compose up`.

	You should see now that the application is listening to port 9000.

3) Import the tables. Database is already created, but the tables must be imported. In order to do this, apply the following command in your terminal, from the root folder:

	`cat init.pgsql | docker exec -i pdct_project_postgres_1 psql pdct -U postgres`

	*`NOTE`: The docker should run when applying this command*

4) If you want to access the database, type in your terminal:

	`docker exec -it pdct_project_postgres_1 psql -U postgres`

	Then choose the database:

	`\c pdct`

	And then you can see the tables by using:

	`\dt`

	For other information, go to [PSQL documentation](https://www.postgresql.org/docs/10/app-psql.html).