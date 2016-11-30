function isZero(vector: SAT.Vector): boolean {
    return vector.x == 0 && vector.y == 0;
}
function removeFromArray(object: any, array: Array<any>): boolean {
    var index = array.indexOf(object);
    if (index > -1) {
        array.splice(index, 1);
        return true;
    }
    return false;
}