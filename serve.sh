#!/bin/bash

cd chat.client || exit
npm run dev &

cd ../chat.server || exit
php -S 127.0.0.1:8080
