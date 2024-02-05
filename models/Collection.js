import lz from 'lz-string'


/*
    TESTING
*/

// const exampleCollection = {
//     artists: {
//         'ob3lk': 'Aphex Twin',
//         'jj8ll': 'Radiohead',
//         '33znm': 'Deerhoof'   
//     },
//     columns: [
//         'artist',
//         'album',
//         'year',
//         'len',
//         'rating',
//         'fam',
//         'id'
//     ],
//     items: [
//         ['33znm', 'The Man, The King, The Girl', 1997, 41, 7, 3, 'abcde'],
//         ['jj8ll', 'Kid A', 2000, 50, 8, 3, 'fghij'],
//         ['33znm', 'Milk Man', 2004, 34, 10, 3, 'klmno'],
//         ['ob3lk', 'Syro', 2014, 65, 8, 3, 'pqrst']
//     ]
// }

// let addition = {
//     artist: 'aphex twin',
//     album: '...I Care Because You Do',
//     year: 1997,
//     len: 60,
//     rating: 8.5,
//     fam: 3
// }

// let unparsed = lz.compressToUTF16(JSON.stringify(exampleCollection))

/*
    HELPERS
*/

function createUID(ids) {
    let chars = "qwertyuiopasdfghjklzxcvbnm1234567890"
    const makeId = () => {
        let id = ""
        for (let i = 0; i < 5; i++) {
            id += chars[Math.floor(Math.random()*chars.length)]
        }
        return id
    }
    do {
        var result = makeId()
    } while (ids.includes(result))
    return result
}

function sanitizeName(str) {
    return str.toLowerCase().replaceAll(/\s+/gm,' ').trim()
}

function findMatch(collection, key, value) {
    return collection.find(item => {
        return sanitizeName(item[key]) === sanitizeName(value)
    })
}

/*
    PARSE
*/
function parseCollection(str) {
    if (!str) return []
    let pkg = JSON.parse(lz.decompressFromUTF16(str)||"[]")
    return pkg.items.map((
        [
            artistId,
            album,
            year,
            len,
            rating,
            fam,
            tags,
            id,
            tracks = []
        ]
    ) => {
        let artist = pkg.artists[artistId] || 'Unknown'
        tags = Array.isArray(tags) ? tags : typeof tags === 'string' ? tags.split(' ') : []
        return {
            artist,
            album,
            year: Number(year),
            len: Number(len),
            rating: Number(rating),
            fam,
            tags,
            id,
            tracks
        }
    })
}

/*
    COMPRESS
*/
function compressCollection(collection) {
    const pkg = {
        artists: {},
        columns: [],
        items: []
    }
    const artists = [...new Set(collection.map(item => item.artist))]
    const artistIds = []
    const artistIdMap = {}
    artists.forEach(artist => {
        const artistId = createUID(artistIds)
        pkg.artists[artistId] = artist
        artistIdMap[artist] = artistId
    })
    collection.forEach((item, i) => {
        Object.entries(item).forEach(([column, value], j) => {
            if (!pkg.columns.includes(column)) pkg.columns.push(column)
            if (!pkg.items[i]) pkg.items.push([])
            pkg.items[i].push(j ? value : artistIdMap[value])
        })
    })
    return lz.compressToUTF16(JSON.stringify(pkg))
}


/*
    ADD
*/
function addToCollection(unparsed, newItem, returnUncompressed) {
    const collection = parseCollection(unparsed)
    let artistMatch = findMatch(collection, 'artist', newItem.artist)
    if (artistMatch) {
        newItem.artist = artistMatch.artist
        let albumMatch = findMatch(collection, 'album', newItem.album)
        if (albumMatch) {
            throw new Error(`Album "${albumMatch.album}" by "${albumMatch.artist}" already exists. Maybe you should edit collection instead?`)
        }
    }
    let ids = collection.map(i => i.id)
    newItem.id = createUID(ids)
    collection.push(newItem)
    return returnUncompressed ? collection : compressCollection(collection)
}


/*
    UPDATE
*/
function updateInCollection(unparsed, id, update, returnUncompressed) {
    const collection = parseCollection(unparsed)
    let itemIndex = collection.findIndex(i => i.id === id)
    if (itemIndex < 0) {
        throw new Error(`item "${id}" not found.`)
    }
    Object.entries(update).forEach(([k, v]) => {
        if (!collection[itemIndex][k]) return
        collection[itemIndex][k] = v
    })
    return returnUncompressed ? collection : compressCollection(collection)
}

/*
    DELETE
*/
function deleteFromCollection(unparsed, id, returnUncompressed) {
    const collection = parseCollection(unparsed)
    let itemIndex = collection.findIndex(i => i.id === id)
    if (itemIndex < 0) {
        throw new Error(`item "${id}" not found.`)
    }
    collection.splice(itemIndex, 1)
    return returnUncompressed ? collection : compressCollection(collection)
}




export {
    parseCollection,
    compressCollection,
    addToCollection,
    updateInCollection,
    deleteFromCollection
}