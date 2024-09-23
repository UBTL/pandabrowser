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


## Available APIs

All the params can be pass as a part of URL, or put it in search query. Like `/api/gallery/:gid/:token`, you can call it like `/api/gallery/123456/abcdef1234` or `/api/gallery?gid=123456&token=abcdef1234`.

The response type of all APIs are JSON, and follow the format below.

```js
{
    "code": 200,          // 200 = success
    "data": {...},        // response data
    "message": "success", // error message
    "total": 100          // result counts (if `data` is a list)
}
```

`data` should normally be a metadata, or a list of metadata, or `null` if any error happens. The format of metadata is based on E-Hentai's offical gallery JSON API, you can check it on [EHWiki](https://ehwiki.org/wiki/API). But data type may be a little different from offical API, like using `int` for `posted` and `filecount` instead of `string`.

```json
{
    "gid": 592178,
    "token": "41cc263dc7",
    "archiver_key": "434486--1617c38d90630b5e399e730d62dea241363cdce6",
    "title": "(Shota Scratch 5) [Studio Zealot (Various)] Bokutachi! Shotappuru!! (Boku no Pico)",
    "title_jpn": "(ショタスクラッチ5) [Studio Zealot (よろず)] ぼくたち!しょたっぷる!! (ぼくのぴこ)",
    "category": "Doujinshi",
    "thumb": "https://ehgt.org/4c/6a/4c6ad39fffcdefcb2cd35218a95395af2e5ad74d-1854978-2118-3000-jpg_l.jpg",
    "uploader": "tooecchi",
    "posted": 1368418878,
    "filecount": 63,
    "filesize": 75630519,
    "expunged": 0,
    "removed": 0,
    "replaced": 0,
    "rating": "4.54",
    "torrentcount": 1, // useless, count it by `torrents` instead
    "root_gid": 592178,
    "tags": [
        "male:crossdressing",
        "male:shotacon",
        "male:tomgirl",
        "male:yaoi",
        "artist:tower",
        "artist:mokkouyou bond",
        "male:anal",
        "male:schoolgirl uniform",
        "male:catboy",
        "artist:murasaki nyaa",
        "artist:po-ju",
        "artist:rustle",
        "artist:miyakawa hajime",
        "artist:fujinomiya yuu",
        "artist:tanuma yuuichirou",
        "male:school swimsuit",
        "artist:mikami hokuto",
        "artist:azuma kyouto",
        "male:josou seme",
        "parody:boku no pico",
        "male:frottage",
        "male:bloomers",
        "artist:nemunemu",
        "group:studio zealot",
        "artist:aoi madoka"
    ],
    "torrents": [
        {
            "id": 632947,
            "name": "(Shota Scratch 5) [Studio Zealot (Various)] Bokutachi! Shotappuru!! (Boku no Pico)",
            "hash": "2a4641feba9943b0e028927879ff6567e74bf0ae",
            "addedstr": "2019-02-28 00:39",
            "fsizestr": "72.13 MB",
            "uploader": "Hyenacub"
        }
    ]
}
```

### `/api/gallery/:gid/:token`

Alias: `/api/g/:gid/:token`

Get gallery metadata.

Query params:  
- `gid`: Gallery ID _(required)_
- `token`: Gallery token _(required)_

Returns: `metadata`

### `/api/list`  

Get a list of galleries.

Query params:  
- `page`: Page number _(default: `1`)_
- `limit`: Gallery number per page _(default: `10`, <= `25`)_

Returns: `metadata[]`

### `/api/category/:category`

Alias: `/api/cat/:category?page={page=1}&limit={limit=10}`

Get a list of galleries which matches one of specific categories, `category` can be a list split with `,`, then it will returns the matched galleries.

`category` can be a list of string or a number (use xor, and if you want to exclude some category, use negative number, like if you want to get a list of `Non-H` galleries, the `category` can be one of `Non-H`, `256` or `-767`)

```
Misc                1           (1 << 0)
Doujinshi           2           (1 << 1)
Manga               4           (1 << 2)
Artist CG           8           (1 << 3)
Game CG             16          (1 << 4)
Image Set           32          (1 << 5)
Cosplay             64          (1 << 6)
Asian Porn          128         (1 << 7)
Non-H               256         (1 << 8)
Western             512         (1 << 9)
```

Query params:  
- `category`: Gallery category _(required)_
- `page`: Page number _(default: `1`)_
- `limit`: Gallery number per page _(default: `10`, <= `25`)_

Returns: `metadata[]`

### `/api/tag/:tag`  

Get a list of galleries which matches ALL of specific tags, `tag` can be a list split with `,`, then it will returns the matched galleries.

The tag should include the category type of tag, like if you want to search some full-colored Chinese translated furry galleries with male fox, you can try `/api/tag/language:chinese,male:furry,male:fox,full%20color`.

Query params:  
- `tag`: Tags _(required)_
- `page`: Page number _(default: `1`)_
- `limit`: Gallery number per page _(default: `10`, <= `25`)_

Returns: `metadata[]`

### `/api/uploader/:uploader`  

Get a list of galleries which uploaded by soneone.

Query params:  
- `uploader`: Uploader _(required)_
- `page`: Page number _(default: `1`)_
- `limit`: Gallery number per page _(default: `10`, <= `25`)_

Returns: `metadata[]`

### `/api/search`  

Get a list of galleries which matches all the query requests.

The rule of `keyword` supports most operators of [E-Hentai](https://ehwiki.org/wiki/Gallery_Searching):

- Search for gallery title and Japanese title
- Exact terms (`" "`) with spaces
    - Underscore (_) is not supported (use Quotation `" "` instead)
- Wildcard (`*`/`%`) at the end of the pattern (though the query will add `%` by default)
- Exclude (`-`) specific terms
- Or (`~`), matching any one of them [v0.3.1]
- Colon namespaces (`:`) for tags
    - Supports a subset of qualifiers tags: `tag:`, `uploader:`, `gid:` [v0.3.1]
    - Terms without `:` will be treated as title keyword (probably like `title:`?)
- Exact match for tags (`$`)
    - Tags without `$` can be used for prefix match [v0.3.1]
- Shorten tag namespaces (`character:` -> `char:` / `c:`) [v0.3.1]

For usage examples, see [EHWiki](https://ehwiki.org/wiki/Gallery_Searching#Examples).


<details>
<summary>Before v0.3.1:</summary>

- If you want to search an uploader, use `uploader:{uploader}`
- If you want to search a tag, use `{tagType}:{tagName}$`, and if `tagName` contains space, quote it and `$`, like `{tagType}:"{tagName}$"`
- If you want to search a word, just put it, and if it contains space, quote it like `"{keyword}"`

</details>

You can use multiple keywords, split them with space `%20`, relations between all the keywords are `AND` (except `uploder` uses `OR`), so in theory more keywords will get more accure results

Query params:  
- `keyword`: Search keywords, split them with space `%20`
- `category`: Gallery category, same as `/api/category`
- `expunged`: Show expunged gallery _(default: `0`)_
- `removed`: Show removed gallery _(default: `0`)_
- `replaced`: Show replaced gallery _(default: `0`)_
- `minpage`: Show gallery with page count larger than this _(default: `0`)_
- `maxpage`: Show gallery with page count smaller than this _(default: `0`)_
- `minrating`: Show gallery with minimal stars (includes minus half stars) _(default: `0`, <= `5`)_
- `page`: Page number _(default: `1`)_
- `limit`: Gallery number per page _(default: `10`, <= `25`)_

Returns: `metadata[]`

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
