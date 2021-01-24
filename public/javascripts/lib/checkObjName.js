
function checkObjName(data, find) {
    return data.find(name => name === `${find}`)
};

module.exports = checkObjName;
