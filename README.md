## asp-team54
# PIXELPULSE

An educational art-gallery for new and prospective CS students for the UOL. 
We aim to both display what prospective students will learn, and teach basic concepts to new students, in a graphical way.
Leaderboards, achievements and a liking system will be implemented for further user-engagement. 

## Project Setup
To set up the project, follow the steps below:

1. Clone the project from the repository:
   ```
   git clone https://github.com/riccovi/asp-team54.git
   ```

2. Navigate to the project directory:
   ```
   cd asp-team54
   ```

3. Install the required dependencies:
   ```
   npm install
   ```

4. Import the database. Using MySQL Workbench, first create a new database and then import the `database_dump.sql` file to create the database structure and data. For terminal users, execute the following commands (replace the placeholder values with your actual credentials and database name):
   ```
   mysql -u USERNAME -pPASSWORD -e "CREATE DATABASE new_database_name;"
   mysql -u USERNAME -pPASSWORD new_database_name < path/to/database_dump.sql
   ```

5. Create a `.env` file in the project root directory and add the following content:

   ```
   DB_HOST=localhost
   DB_USER=username
   DB_PASS=password
   DB_NAME=database_name
   ```

   Replace 'username', 'password', and 'database_name' with the appropriate local MySQL credentials and database name.

6. Start the server:
   ```
   node server.js
   ```
