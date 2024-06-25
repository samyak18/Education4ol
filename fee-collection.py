import sqlite3
import csv
from tkinter import Tk, Label, Entry, Button, messagebox, StringVar, IntVar

def create_connection(db_file):
    """ Create a database connection to the SQLite database specified by db_file """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        return conn
    except sqlite3.Error as e:
        print(e)
    return conn

def create_table(conn):
    """ Create students table if it doesn't exist """
    try:
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS students (
                username TEXT PRIMARY KEY,
                password TEXT,
                pending_fee REAL
            )
        """)
        conn.commit()
    except sqlite3.Error as e:
        print(e)

def insert_student(conn, student):
    """ Insert a student record into the students table """
    try:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT OR IGNORE INTO students (username, password, pending_fee)
            VALUES (?, ?, ?)
        """, student)
        conn.commit()
    except sqlite3.Error as e:
        print(e)

def process_payment(conn, student_username):
    """ Process payment for a student """
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT pending_fee FROM students WHERE username = ?", (student_username,))
        pending_fee = cursor.fetchone()
        
        if pending_fee and pending_fee[0] > 0:
            # For demonstration, we will consider full payment is done
            cursor.execute("UPDATE students SET pending_fee = 0 WHERE username = ?", (student_username,))
            conn.commit()
            messagebox.showinfo("Payment Successful", f"Payment for {student_username} is successful! Your pending fee is now 0.")
        else:
            messagebox.showinfo("No Pending Fee", "No pending fee to pay or student not found.")
    except sqlite3.Error as e:
        print(e)

def authenticate_user(conn, username, password):
    """ Authenticate user credentials """
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM students WHERE username = ?", (username,))
        student_data = cursor.fetchone()
        
        if student_data and student_data[1] == password:
            return student_data
        else:
            return None
    except sqlite3.Error as e:
        print(e)
        return None

def save_student_data_to_csv(filename, student_data):
    """ Save student data to a CSV file with different column names """
    try:
        with open(filename, mode='a', newline='') as file:
            writer = csv.writer(file)
            # Write header if file is empty
            if file.tell() == 0:
                writer.writerow(["Student Username", "Student Password", "Outstanding Fee"])
            writer.writerow(student_data)
    except IOError as e:
        print(f"Error writing to CSV file: {e}")

def login():
    username = username_var.get()
    password = password_var.get()

    student_data = authenticate_user(conn, username, password)
    
    if student_data:
        messagebox.showinfo("Login Successful", f"Hello, {username}!\nPending fee: {student_data[2]}")
        save_student_data_to_csv("student_data.csv", student_data)
        
        if messagebox.askyesno("Payment", "Do you want to pay now?"):
            process_payment(conn, username)
        else:
            messagebox.showinfo("Thank you", "Thank you for using our app!")
    else:
        messagebox.showerror("Login Failed", "Invalid credentials. Please try again.")

def main():
    global conn
    database = "fee--collection.db"
    conn = create_connection(database)
    
    if conn is not None:
        create_table(conn)
        students = [
            ("arun", "Arun@213", 500),
            ("bob", "Bob@2004", 750),
            ("charlie", "Charlie#222", 3000),
            ("david", "David@400", 4500),
            ("eve", "Eve@18", 6000),
            ("varun", "Varun@113", 350),
            ("grace", "grace", 50000),
            ("heidi", "Hei#di218", 7000),
            ("ivan", "Ivan@333", 400),
            ("judy", "judy@444", 650),
            ("karl", "Karl@555", 8000),
            ("mike", "Mike@666", 6000),
            ("nancy", "Nancy@777", 45000),
            ("oscar", "Oscar@888", 5000),
            ("peggy", "Peggy@999", 300),
        ]
        
        for student in students:
            insert_student(conn, student)
        
        root = Tk()
        root.title("Fee Collection App")
        
        global username_var, password_var
        username_var = StringVar()
        password_var = StringVar()
        
        Label(root, text="Username").grid(row=0, column=0, padx=10, pady=10)
        Entry(root, textvariable=username_var).grid(row=0, column=1, padx=10, pady=10)
        
        Label(root, text="Password").grid(row=1, column=0, padx=10, pady=10)
        Entry(root, textvariable=password_var, show="*").grid(row=1, column=1, padx=10, pady=10)
        
        Button(root, text="Login", command=login).grid(row=2, column=0, columnspan=2, pady=10)
        
        root.mainloop()
        
        conn.close()
    else:
        print("Error! Cannot connect to the database.")

if __name__ == "__main__":
    main()
