/// <reference path="jquery-1.11.2.min.js"/>

$(document).ready(function () {
    var object = {
        firstIndex: 0,
        secondIndex: 0,
        func: function (container, array) {
            if (!bubbleSort.call(this, array)) {
                clearInterval(intervalId);
            }
            array.render(container);
        }
    }
    var container = $('#container');
    var array = [].fillRandom(25);
    var intervalId = setInterval(function () { object.func.call(object, container, array); }, 100);
});


//
// Шаг сортировки массива
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

// Визуально отображаем числовой массив
//
Array.prototype.render = function (container) {
    container.html('');
    for (var index = 0; index < this.length; index++) {
        var element = this[index];
        container.append('<div>' + element + '</div>');
    }
}

// Заполняем массив случайными числами
//
Array.prototype.fillRandom = function (count) {
    this.length = 0;
    for (var index = 0; index < count; index++) {
        this.push(Math.round(Math.random()*100));
    }
    return this;
}