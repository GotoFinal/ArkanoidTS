function isZero(vector) {
    return vector.x == 0 && vector.y == 0;
}
function removeFromArray(object, array) {
    var index = array.indexOf(object);
    if (index > -1) {
        array.splice(index, 1);
        return true;
    }
    return false;
}
//# sourceMappingURL=Utils.js.map