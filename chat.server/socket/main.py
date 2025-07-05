from dotenv import load_dotenv
import os
import socket


load_dotenv()
HOSTNAME = os.getenv('HOSTNAME')
PORT = int(os.getenv('PORT'))
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOSTNAME, PORT))
    s.listen()
    print('server is listening')
    conn, addr = s.accept()
    with conn:
        print(f"Connected with addr {addr}")
        while True:
            data = conn.recv(1024)
            if not data:
                break
            conn.sendall(data)