# PandaBrowser
An offline E-hentai browser for archival purposes, keeping Hentai history around.

## Requirements

- Node.js 20+
- Bun 1.1 ( https://bun.sh/ )
  
## Optional
- MySQL 5.3+ / MariaDB 10+

- Docker

## Setup & Start Up using docker-compose

    # change dbHost to point to docker db container (or edit config.js manually)
    sed -i 's,localhost,mariadb,' config.js

    # run it
    docker-compose up -d

Docker installs mariadb+node images (<1GB total, to see what they contain try `docker history mariadb:lts`), it inserts SQL on first startup (takes a minute, DB persists on restart) and then starts app which accepts connections on http://localhost:6969/

If you're paranoid about app making undesired outgoing connection there's an alternate startup command in docker-compose.yml which sets up a firewall within the container (ofc then you also can't run sync script from the container).

To interact with the containers:

    # query db
    docker exec -it pandabrowser_mariadb_1 mariadb -p69 panda
    # run scripts
    docker exec -it pandabrowser_app_1 npm run fetch

## Setup & Start Up manually

0. Run `npm install` or `bun install`

1. Download the provided database metadata dump files (Either the SQLite or SQL files) for the SQLite files put them inside the /db/ folder and for the SQL files upload it into MySQL.

2. Edit `config.js`, set database username, password, database name, etc. if you go with something different.

3. Run `npm run build` or `bun run build` to build up webpack and then `npm start` or `bun start`, the server should be run on `8880` port by default config

### The server quits when I exit the terminal  

Try `npm start &`, or use `PM2` or `forever` to keep it running in background (for those using vanilla nodejs), for Windows users there is not much of an alternative to use here. 

For pm2 you can do:
sudo pm2 start npm --name "PANDADB" -- start

## Where do I unzip the thumbnails zip?
Over frontend folder, there the pandathumbnails folder should be located at.

## Thanks to

- [Sachia Lanlus](https://forums.e-hentai.org/index.php?showuser=2351915), as he collects almost all the gallery metadatas before Ex went down initially and share the gdata.json data dump that kickstarted all these projects.

- [Tlaster / ehdb](https://github.com/congzhou2603/ehdb), the table structures are based on his SQLite database, as I've almost forgot how to handle the tag list with gallery

- Andran with helping of the dumping and sorting of the thumbnails along side figuring out how to patch together missing stuff on myself and other IT related shenanigans.

- and you the community and specially those that has [Donated to keep me doing this stuff around](https://donate.unclebane.xyz/) , you are the Big Guys that allow me to crash these planes.

GPLv3
