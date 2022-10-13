/**
 * Takes in an object and removes the keys specified in the following parameters
 * @param object the object to be modified
 * @param keys the keys to be deleted from the object
 * @returns {*} object with the removed keys
 */
export const keyExcluder = (object, ...keys) => {
    for (let key of keys) {
        delete object[key]
    }
    return object
}