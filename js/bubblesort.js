/// <reference path="jquery-1.11.2.min.js"/>

var colorMap = [
        '#47240E', '#452C1B', '#43342C', '#3F3F3F', '#3E4953', '#3E5569', '#3E6384', '#3E7CB2', '#3D98DE', '#40ABF8',
        '#51BAFF', '#6BC8FF', '#8AD5FF', '#A5DFFF', '#B6E6FF', '#C6EBFF', '#D6F0FF', '#E5F5FF', '#F1F9FF', '#FBFDFF'
];

var minValue = 0, maxValue = 22, 
    object = {}, array = [], container = $('#container'), intervalId;

$(document).ready(function () {
    container = $('#container');
    array = [].fillRandom(maxValue);
});

var object = {
    firstIndex: 0,
    secondIndex: 0,
    func: function (container, array) {
        if (!bubbleSort.call(this, array)) {
            $('#log').html('Готово');
            clearInterval(intervalId);
        }
        array.render(container);
    }
}

function start() {
    intervalId = setInterval(function () { object.func.call(object, container, array); }, 300);
};


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
        var backgroundColor = getBackgroundColor(colorMap, element, minValue, maxValue);
        var color = getColor(element, 4, '#333', '#fff');
        var width = getWidth(element, 30, 100, 0, 20);
        container.append('<div class = "item" style="width: ' + width + 'px; background: ' + backgroundColor + ';"><div style=" color: ' + color + '">' + element + '</div></div>');
    }
}

// Заполняем массив случайными числами
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

// Определяет ширину элемента по его значению 
//
function getWidth(value, minWidth, maxWidth, minValue, maxValue) {
    if (minWidth === maxWidth) return minWidth;
    if (value < minValue) {
        value = minValue;
    }
    if (value > maxValue) {
        value = maxValue;
    }
    return minWidth + (value - minValue) / (maxValue - minValue) * (maxWidth - minWidth);
}

// Определяем текущий фоновый цвет из палитры по значению
//
function getBackgroundColor(colorMap, value, minValue, maxValue) {
    if(minValue === maxValue) return colorMap[Math.floor(colorMap.length/2)];
    var index = colorMap.length - 1 - Math.floor(colorMap.length * value / (maxValue - minValue));
    return colorMap[index];
}

// Определяем цвет текста
//
function getColor(value, threshold, lightColor, darkColor)
{
    return (value > threshold) ? darkColor : lightColor;
}
