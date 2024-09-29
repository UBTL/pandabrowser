
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

export type Torrent = {
    id: number,
    name: string,
    hash: string,
    added: number,
    tsize: number,
    fsize: number,
    addedstr: string,
    fsizestr: string,
    uploader: string,
    expunged: boolean,
}

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
    torrentcount: number,
    root_gid: number,
    bytorrent: boolean,
    thumb: string,
    bc: number,
    tags: string[],
    torrents: Torrent[],
}

export type ImageSearchResult = Gallery & {bc: number}

export type PandaApiResponse<T> = {
    code: number,
    data: T[],
    message: string,
    total: number,
}

export type ImageSearchResponse = PandaApiResponse<ImageSearchResult>


// https://anansi-project.github.io/docs/comicinfo/schemas/v2.1
export interface ComicInfo {
    Title?: string,
    Series?: string,
    // non-standard field from kavita https://github.com/anansi-project/comicinfo/issues/6
    LocalizedSeries?: string,
    Number?: string,
    Count?: number = -1,
    Volume?: number = -1,
    AlternateSeries?: string,
    AlternateNumber?: string,
    AlternateCount?: number = -1,
    Summary?: string,
    Notes?: string,
    Year?: number = -1,
    Month?: number = -1,
    Day?: number = -1,
    // creator fields
    Writer?: string,
    Penciller?: string,
    Inker?: string,
    Colorist?: string,
    Letterer?: string,
    CoverArtist?: string,
    Editor?: string,
    Translator?: string,
    //
    Publisher?: string,
    Imprint?: string,
    Genre?: string,
    Tags?: string,
    Web?: string,
    PageCount?: number = 0,
    LanguageISO?: string,
    Format?: string,
    BlackAndWhite?: 'Unknown' | 'No' | 'Yes' = 'Unknown',
    Manga?: 'Unknown' | 'No' | 'Yes' | 'YesAndRightToLeft' = 'Uknown',
    // multiple values are comma separated
    Characters?: string,
    Teams?: string,
    Locations?: string,
    ScanInformation?: string,
    StoryArc?: string,
    StoryArcNumber?: string,
    SeriesGroup?: string,
    AgeRating?: string = 'Unknown',
    // <xs:element minOccurs="0" maxOccurs="1" name="Pages" type="ArrayOfComicPageInfo"/>
    CommunityRating?: number,  // 0.0 - 5.0
    MainCharacterOrTeam?: string,
    Review?: string,
    GTIN?: string,
    [Key: string]: any;
}
