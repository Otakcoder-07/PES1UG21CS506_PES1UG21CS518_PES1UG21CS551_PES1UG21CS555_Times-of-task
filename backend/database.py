import mysql.connector
from mysql.connector import errorcode

class Database:
    def __init__(self, host, user, password, database):
        self.host = host
        self.user = user
        self.password = password
        self.database = database
        try:
            self.connection = mysql.connector.connect(
                host=self.host,
                user=self.user,
                password=self.password,
                database=self.database
            )
            self.cursor = self.connection.cursor()
            print("Connected to database successfully!")
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                print("Error: Access denied. Invalid username or password.")
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                print("Error: Database does not exist.")
            else:
                print("Error:", err)

    def create_user(self, username, password_hash, email):
        query = "INSERT INTO users (username, password_hash, email) VALUES (%s, %s, %s)"
        values = (username, password_hash, email)
        try:
            self.cursor.execute(query, values)
            self.connection.commit()
            print("User created successfully!")
        except mysql.connector.Error as err:
            print("Error:", err)

    def get_user_by_username(self, username):
        query = "SELECT * FROM users WHERE username = %s"
        values = (username,)
        self.cursor.execute(query, values)
        return self.cursor.fetchone()

    def create_task(self, title, description, status='Todo', priority='Low', category=None):
        query = "INSERT INTO tasks (title, description, status, priority, category) VALUES (%s, %s, %s, %s, %s)"
        values = (title, description, status, priority, category)
        try:
            self.cursor.execute(query, values)
            self.connection.commit()
            print("Task created successfully!")
        except mysql.connector.Error as err:
            print("Error:", err)

    def get_all_tasks(self):
        query = "SELECT * FROM tasks"
        self.cursor.execute(query)
        return self.cursor.fetchall()

    def update_task_status(self, task_id, status):
        query = "UPDATE tasks SET status = %s WHERE id = %s"
        values = (status, task_id)
        try:
            self.cursor.execute(query, values)
            self.connection.commit()
            print("Task status updated successfully!")
        except mysql.connector.Error as err:
            print("Error:", err)

    def close_connection(self):
        self.cursor.close()
        self.connection.close()
        print("Database connection closed.")

