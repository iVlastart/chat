import socket as sock #🧦
from dotenv import load_dotenv

load_dotenv()

def main():
    with sock.socket(sock.AF_INET, sock.SOCK_STREAM) as s:
        s.bind(())

if __name__ == '__main__':
    main()