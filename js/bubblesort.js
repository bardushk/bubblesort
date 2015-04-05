/// <reference path="jquery-1.11.2.min.js"/>

var container = $('#container'), intervalId;

var object = {
    minValue: 0,
    maxValue: 22,
    minWidth: 30,
    maxWidth: 90,
    array: [],
    colorMap: [
            '#47240E', '#452C1B', '#43342C', '#3F3F3F', '#3E4953', '#3E5569', '#3E6384', '#3E7CB2', '#3D98DE', '#40ABF8',
            '#51BAFF', '#6BC8FF', '#8AD5FF', '#A5DFFF', '#B6E6FF', '#C6EBFF', '#D6F0FF', '#E5F5FF', '#F1F9FF', '#FBFDFF'
    ],

    firstIndex: 0,

    secondIndex: 0,

    // Make one step of the sortin algorithm
    //
    doSortStep: function (container) {
        if (!bubbleSort.call(this, this.array)) {
            $('#log').html('сортировка завершена');
            this.firstIndex = 0;
            this.secondIndex = 0;
            clearInterval(intervalId);
        }
        this.render(container);
    },

    // Render visual representation of the array
    //
    render: function (container) {
        container.html('');
        for (var index = 0; index < this.array.length; index++) {
            var value = this.array[index];
            var backgroundColor = this.getBackgroundColor(value);
            var color = this.getColor(value);
            var width = this.getWidth(value);
            container.append('<div class = "item" style="width: ' + width + 'px; background: ' + backgroundColor + ';"><div style=" color: ' + color + '">' + value + '</div></div>');
        }
    },

    // Initial settings for array
    //
    init: function () {
        this.array = [].fillRandom(this.maxValue);
        firstIndex = 0;
        secondIndex = 0;
    },

    // Get visual width of an alement by its value 
    //
    getWidth: function (value) {
        return this.minWidth + (value - this.minValue) / (this.maxValue - this.minValue) * (this.maxWidth - this.minWidth);
    },

    // Define background color for a visual alement by its value
    //
    getBackgroundColor: function (value) {
        var index = this.colorMap.length - 1 - Math.floor(this.colorMap.length * value / (this.maxValue - this.minValue));
        return this.colorMap[index];
    },

    // Get text color for the visual element.
    //
    getColor: function (value)
    {
        return ((value - this.minValue) / (this.maxValue - this.minValue) < 0.5) ? this.colorMap[0] : this.colorMap[this.colorMap.length - 1];
    }
}

//
// Ўаг сортировки массива
//
function bubbleSort(array) {
    if (this.firstIndex >= array.length) return false;
    if (array[this.secondIndex] > array[this.secondIndex + 1]) {
        var swap = array[this.secondIndex];
        array[this.secondIndex] = array[this.secondIndex + 1];
        array[this.secondIndex + 1] = swap;
    }
    this.secondIndex++;
    if (this.secondIndex >= array.length - 1 - this.firstIndex) {
        this.secondIndex = 0;
        this.firstIndex++;
    }
    return true;
}


// «аполн€ем массив случайными числами
//
Array.prototype.fillRandom = function (count) {
    this.length = 0;
    var index, current;
    var container = [];
    for (index = 0; index < count; index++) {
        container.push(index);
    }
    for (var index = 0; index < count; index++) {
        current = Math.floor(Math.random() * container.length);
        this.push(container[current]);
        container.splice(current, 1);
    }
    return this;
}
