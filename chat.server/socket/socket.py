from dotenv import load_dotenv
import os
import socket as sock #🧦

load_dotenv()
HOSTNAME = os.getenv('HOSTNAME')
PORT = os.getenv('PORT')

def main():
    with sock.socket(sock.AF_INET, sock.SOCK_STREAM) as s:
        s.bind((HOSTNAME, PORT))
        s.listen()
        conn, addr = s.accept()

if __name__ == '__main__':
    main()