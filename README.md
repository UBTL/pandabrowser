# PandaBrowser
An offline E-hentai browser for archival purposes, keeping Hentai history around.

## Requirements

- Node.js 8+

- MySQL 5.3+ / MariaDB 10+

- Docker (optional)

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

0. Run `npm install` (or `yarn` if you prefer)

1. Install the provided database file (20240101-0_init_schema.sql) if you wish a clean version of the program which you will add your own data into or download the released database (panda_2024_01_01.sql) with already data into it and upload it into MySQL, the default database name being "panda" here.

2. Edit `config.js`, set database username, password, database name, etc. if you go with something different.

3. *Only* run these commands
    - If you want to update to latest galleries, run `npm run sync [host=e-hentai.org] [timestampOffset=0]`
    - If you want to resync gallery metadatas since a few hours ago, run `npm run resync [hour=24]`
    - If you want to mark all replaced galleries, run `npm run mark-replaced` (new galleries will mark them automatically)
    - If you want to get torrents from all galleries, run `npm run torrent-import [host=e-hentai.org]` (USE AT YOUR OWN RISK)
    - If you want to update torrents from torrent list, run `npm run torrent-sync [host=e-hentai.org]`
    - If you want to manually fetch some galleries, run `npm run fetch {gid}/{token} {gid}/{token} ...` or `npm run fetch [filename]`
Is not needed to use this and getting your IP banned by the system is quite sure on many cases, specially the older you are downloading this (this database ends in January 1st 2024).

4. Run `npm start`, the server should be run on `8880` port by default config

### No primary key in table `gid_tid`

I'm not sure should I add an `id` column, as I'm not using it to query. But if you want, try the following SQL, and it'll takes about 110 MB

```sql
ALTER TABLE `gid_tid` ADD `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST;
```

### The server quits when I exit the terminal  

Try `npm start &`, or use `PM2` or `forever` to keep it running in background

For pm2 you can do:
sudo pm2 start npm --name "PANDADB" -- start

## Where do I unzip the thumbnails zip?
Over frontend folder, there the pandathumbnails folder should be located at.

## Thanks to

- [Sachia Lanlus](https://forums.e-hentai.org/index.php?showuser=2351915), as he collects almost all the gallery metadatas before Ex went down initially and share the [gdata.json](https://forums.e-hentai.org/index.php?showtopic=201268&st=67900&p=5474857&#entry5474857) that kickstarted all these projects.

- [Tlaster / ehdb](https://github.com/Tlaster/ehdb), the table structures are based on his SQLite database, as I've almost forgot how to handle the tag list with gallery

- [Ccloli](https://github.com/ccloli), Who did all the dirty work of creating this functional program with a proper search feature and the works, this project couldn't be anywhere else without ccloli creating this.

- Andran with helping of the dumping and sorting of the thumbnails along side figuring out how to patch together missing stuff on myself and other IT related shenanigans.

- and you the community and specially those that has [Donated to keep me doing this stuff around](https://donate.unclebane.xyz/) , you are the Big Guys that allow me to crash these planes.

GPLv3
