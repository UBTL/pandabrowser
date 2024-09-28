
export type SearchOptions = {
    category: number,
    keyword: string,
    expunged: boolean,
    replaced: boolean,
    removed: boolean,
    minpage: string,
    maxpage: string,
    minrating: string,
    limit: number,
    mindate: string,
    maxdate: string,
    advance: boolean,
    fileSearch: boolean,
}

export type Category =
    'Misc'       |
    'Doujinshi'  |
    'Manga'      |
    'Artist CG'  |
    'Game CG'    |
    'Image Set'  |
    'Cosplay'    |
    'Asian Porn' |
    'Non-H'      |
    'Western'    |
    'private'

export type Gallery = {
    gid: number,
    token: string,
    archiver_key: string,
    title: string,
    title_jpn: string,
    category: Category,
    thumbnail_id: number,
    uploader: string,
    posted: number,
    filecount: number,
    filesize: number,
    expunged: boolean,
    removed: boolean,
    replaced: boolean,
    rating: string, // number?
    torrentcount: boolean,
    root_gid: number,
    bytorrent: boolean,
    thumb: string,
    bc: number,
    tags: string[],
    torrents: string[],
}

export type ImageSearchResult = Gallery & {bc: number}

export type PandaApiResponse<T> = {
    code: number,
    data: T[],
    message: string,
    total: number,
}

export type ImageSearchResponse = PandaApiResponse<ImageSearchResult>
