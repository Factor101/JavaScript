/**
* If you are running in ES5, replace "const" with "var", and add the Object.prototype.values method below to your code.
*/

/*
Object.prototype.values = function(obj) {
    var values = [];
    Object.keys(obj).forEach(function (key) {
        values.push(obj[key]);
    });
    return values;
}
*/

const float = {
    /**
     * @param {(Float[] | ...Float)} arr - Either an array of floats, or indefinite amount of floats
     * @example
     *      float.add([1.0, 2.4]);
     *      float.add(1.0, 2.4, 3.1);
     * @returns {Float} - sum of arguments
     */
    add: function(arr) {
        if( typeof arr !== 'object' ) {
            arr = Object.values(arguments);
        }
        const prec = this.getPrec(arr);
        return (this.toInt(arr, prec).reduce(function(a, b){return a + b;}, 0)) / Math.pow(10, prec);
    },

    /**
     * @param {Float} x - Number being subtracted from 
     * @param {Flaot} y - Number being subtracted
     * @returns {Float} - Difference of x and y
     */
    sub: function(x, y) {
        const prec = this.getPrec(Object.values(arguments));
        const ints = this.toInt(Object.values(arguments), prec);
        return (ints[0] - ints[1]) / Math.pow(10, prec);
    },
    /**
     * @param {(Float[] | ...Float)} arr - Either an array of floats, or indefinite amount of floats
     * @example
     *      float.mult([1.0, 2.4]);
     *      float.mult(1.0, 2.4, 3.1);
     * @returns {Float} - Product of arguments
     */
    mult: function(arr) {
        if( typeof arr !== 'object' ) {
            arr = Object.values(arguments);
        }
        const prec = this.getPrec(arr);
        return (this.toInt(arr, prec).reduce(function(a, b){return a * b}, 1)) / Math.pow(10, 2 * prec);
    },
    /**
     * @description - Returns the average of a set of floats.
     * 
     * @param {(Float[] | ...Float)} arr - Either an array of floats, or indefinite amount of floats
     * @example
     *      float.avg([1.0, 2.4]);
     *      float.avg(1.0, 2.4, 3.1);
     * @returns {number}
     */
    avg: function(arr) {
        if( typeof arr !== 'object' ) {
            arr = Object.values(arguments);
        }
        const prec = this.getPrec(arr);
        return ((this.toInt(arr, prec).reduce(function(a, b){return a + b}, 0)) / arr.length) / Math.pow(10, prec);
    },
    /**
     * @param {(Float[] | ...Float)} arr - Either an array of floats, or indefinite amount of floats
     * @example
     *      float.getPrec([1.0123, 2.42]);
     *      float.getPrec(1.0, 2.412312, 3.1);
     * @returns {int} - Returns the largest amount of decimal places in a set of floats
     */
    getPrec: function(arr) {
        if( typeof arr !== 'object' ) {
            arr = Object.values(arguments);
        }
        return Math.max.apply(null, arr.map(function(a){return a.toString().length !== 1 ? a.toString().split('.')[1].length : a.toFixed(1);}));
    },
    /**
     * @description - Converts a set of floats into integers.
     * 
     * @param {(Float[] | ...Float)} arr - Either an array of floats, or indefinite amount of floats
     * @param {int} prec - Largest amount of decimal places of all floats in ${arr}
     * 
     * @example 
     *      float.toInt([12.43242, 4.3244, 1.3], 5)
     *      float.toInt(1.34, 12.444, 12.44, 3)
     * @returns {int[]}
     */
    toInt: function(arr, prec) {
        if( typeof arr !== 'object' ) {
            arr = Object.values(arguments);
            return arr.map(function(a, b){if(b !== arr.length - 1) { return a * Math.pow(10, arr[arr.length - 1]); } else { return null; }}).filter(function(a){return a !== null;});
        } else {
            return arr.map(function(a){return a * Math.pow(10, prec)});
        }
    },
    /**
     * @description - Checks if two floats are equal up to a certain amount of decimal places
     * 
     * @param {(Float[] | ...Float)} arr - Either an array of two floats, or two seperate float arguments.
     * @param {int} tol - Amount of decimal places to check
     * 
     * @example
     *      float.assertSimilar([14.344443, 14.344441], 5)
     *      float.assertSimilar(12.3334, 12.3332, 3)
     * @returns {Boolean}
     */
    assertSimilar: function(arr, tol) {
        return Boolean(arr[0].toFixed(tol) === arr[1].toFixed(tol));
    }
};
