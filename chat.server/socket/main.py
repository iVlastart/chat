import asyncio
from dotenv import load_dotenv
import os
import websockets

load_dotenv()

HOSTNAME = os.getenv('HOSTNAME')
PORT = os.getenv('PORT')
connected_clients = set()

async def handler(socket, path):
    print(f'Client connected: {socket.remote_address}')
    connected_clients.add(socket)

    try:
        async for msg in socket:
            await asyncio.gather(
                *[client.send(msg) for client in connected_clients if client.open]
            )
    except websockets.exceptions.ConnectionClosedError:
        print('client disconnected: '+socket.remotre_address)
    finally:
        connected_clients.remove(socket)

async def main():
    print(f'WebSocket server starting on ws://{HOSTNAME}:{PORT}')
    async with websockets.serve(handler, HOSTNAME, PORT):
        await asyncio.Future()

if __name__ == '__main__':
    asyncio.run(main())