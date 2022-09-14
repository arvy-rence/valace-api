export const keyExcluder = (object, ...keys) => {
    for (let key of keys) {
        delete object[key]
    }
    return object
}