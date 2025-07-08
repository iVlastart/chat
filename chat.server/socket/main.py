import asyncio
from dotenv import load_dotenv
import os
import websockets

load_dotenv()

HOSTNAME = os.getenv('HOSTNAME')
PORT = os.getenv('PORT')

async def handler(socket, path):
    print(f'Client connected: {socket.remote_address}')
    async for message in socket:
        print(f'Received a message: {message}')
        await socket.send(f'{message}')

async def main():
    print(f'WebSocket server starting on ws://{HOSTNAME}:{PORT}')
    async with websockets.serve(handler, HOSTNAME, PORT):
        await asyncio.Future()

if __name__ == '__main__':
    asyncio.run(main())