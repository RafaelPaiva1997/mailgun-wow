const MongoClient = require("mongodb").MongoClient;

const funcs = {
    callError: err => {
        if (err) reject(err);
        resolve();
    },
    callResult: (err, result) => {
        if (err) reject(err);
        if (result) resolve(result);
        reject(404);
    }
}

var libs = {}, out = {
    connect:  (url, req_libs) => {
        MongoClient.connect(
            url,
            (err, db) => {
                if (err) return console.log(err);
                for (lib of req_libs) libs[lib] = db.collection(lib);
            }
        );
    },

    getLibs:  () => libs,

    insert:  new Promise((lib, item) => {
        libs[lib].insert(item, {
            w:1
        }, funcs.callError);
    }),

    insertMany:  new Promise((lib, items) => {
        libs[lib].insertMany(items, {
            w:1
        }, funcs.callError);
    }),

    update:  new Promise((lib, key, update) => {
        libs[lib].update(key, update, {
            w:1
        }, funcs.callError);
    }),

    find:  new Promise((lib, key) => {
        libs[lib].find(key).toArray(funcs.callResult);
    }),

    findLimited:  new Promise((lib, key, inf, sup) => {
        libs[lib]
            .find(key)
            .sort({
                _id: 1
            })
            .skip(parseInt(inf) ? parseInt(inf) : 0)
            .limit(parseInt(sup) ? parseInt(sup) : 0)
            .toArray(funcs.callResult);
    }),

    findSort:  new Promise((lib, key, sort) => {
        libs[lib]
            .findSort(key)
            .sort(sort)
            .toArray(funcs.callResult);
    }),

    deleteOne:  new Promise((lib, key) => {
        libs[lib].deleteOne(key, funcs.callError);
    }),

    deleteMany:  new Promise((lib, key) => {
        libs[lib].deleteMany(key, funcs.callError);
    })
};

module.exports = out;