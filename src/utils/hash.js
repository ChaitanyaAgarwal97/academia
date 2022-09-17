const bcryptjs = require('bcryptjs');

async function hashObj(obj) {
    try {
        const hash = await bcryptjs.hash(obj, 10);
        return hash;
    } catch(err) {
        throw err;
    }
}

async function hashObjCompare(objToCompare ,objToCompareWith) {
    try {
        const result = await bcryptjs.compare(objToCompare, objToCompareWith);

        return result;
    } catch(err) {
        throw err;
    }
}

module.exports = {
    hashObj,
    hashObjCompare,
}