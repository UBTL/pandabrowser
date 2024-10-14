
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
    ],
    "bc": 4  // only with imageSearch
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

### `/api/comicInfo`

Generates Comicinfo XML for the given gallery gid, the XML schema can be seen at https://anansi-project.github.io/docs/comicinfo/schemas/v2.1

Query params:  
- `gid`: Gallery ID _(required)_

Returns: xml

Example:
- http://localhost:6969/api/comicInfo/?gid=838471

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

### POST `/api/imageSearch`

Calculates perceptual hash for the uploaded image, checks the thumbnail table for likeness to any known cover images and returns all the hits with hamming distance of < 9.

Requires that `npm run thumbs-phash` has been run for the known thumbnails.

Example usecase:

    $ function unzipfirstfile { 7z x -so "$1" "$(zipinfo -1 "$1" | grep -v '/$' | sort -n | head -n1)"; }
    
    $ unzipfirstfile pon8.part2.cbz | curl -sF file=@- 'http://0:6969/api/searchImage?out=gid' | jq .
    {
    "code": 200,
    "data": [
        {
        "bc": 4,
        "gid": 922730
        }
    ],
    "message": "success",
    "total": 1
    }

After identifying the gallery (if multiple responses upload date or page count could be used to choose) rename the cbz to include the gid and use `/api/comicInfo/` to put the xml inside the cbz so that when it's imported into a compatible reader app the metainfo can be used to organize the albums.

Form:
- `file`: jpg/png to be searched for

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
