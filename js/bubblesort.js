/// <reference path="jquery-1.11.2.min.js"/>

var container = $('#container'), intervalId;

var object = {
    status: 'init',
    // JQuery selector for visualisation
    //
    container: {},
    // Number of elements
    //
    count: 30,
    minValue: 0,
    maxValue: 1000,
    // Minimal width in pixels of visual elements
    //
    minWidth: 30,
    // Maximum visual width in pixels
    //
    maxWidth: 100,
    // Height of visual container
    //
    height: 500,
    // Width in pixels for the conteiner of elements
    //
    width: 200,
    array: [],
    colorMap: [
            '#47240E', '#452C1B', '#43342C', '#3F3F3F', '#3E4953', '#3E5569', '#3E6384', '#3E7CB2', '#3D98DE', '#40ABF8',
            '#51BAFF', '#6BC8FF', '#8AD5FF', '#A5DFFF', '#B6E6FF', '#C6EBFF', '#D6F0FF', '#E5F5FF', '#F1F9FF', '#FBFDFF'
    ],

    firstIndex: 0,

    secondIndex: 0,

    // Make one step of the sortin algorithm
    //
    doSortStep: function () {
        this.render();
        if (!this.bubbleSort.call(this)) {
            $('#log').html('сортировка завершена');
            clearInterval(intervalId);
        }
    },

    // Render visual representation of the array
    //
    render: function () {
        if (this.status === 'init') {
            $('#before').html('<h3>Исходные данные</h3>');
            for (var index = 0; index < this.array.length; index++) {
                var elemet = this.array[index];
                var value = this.array[index].value;
                var backgroundColor = this.getBackgroundColor(value);
                var color = this.getColor(value);
                var width = this.getWidth(value);
                var top = this.getTop(index);
                var left = this.getLeft();
                this.container.append('<div id="' + elemet.id + '" class = "item" style="left: ' + left + 'px; top: ' + top + 'px; width: ' + width + 'px; background: ' + backgroundColor + ';"><div style=" color: ' + color + '">' + value + '</div></div>');
                $('#before').append(value + ' ');
            }
        }
        else {
            $('#after').html('<h3>Текущее состояние</h3>');
            for (var index = 0; index < this.array.length; index++) {
                var element = this.array[index];
                element.top = this.getTop(index);
                $('#' + element.id).css('top', element.top + 'px');
                $('#' + element.id).css('left', element.left + 'px');
                $('#after').append(element.value + ' ');
            }
        }
    },

    // Initial settings for array
    //
    init: function (container) {
        this.height = container.height();
        this.width = container.width();
        this.container = container;
        this.fillRandom();
        this.firstIndex = 0;
        this.secondIndex = 0;
        this.status = 'init';
        this.container.html('');
        this.render();
        this.status = 'inProgress';
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
    },
    // Fill array with random values
    //
    fillRandom: function () {
        this.array = [];
        for (var index = 0; index < this.count; index++) {
            var value = Math.round(this.minValue + Math.random() * (this.maxValue - this.minValue));
            var backgroundColor = this.getBackgroundColor(value);
            var left = (index == 0) ? this.width / 2 : this.array[index - 1].left + (Math.random() - 0.5) * this.minWidth;
            var top = this.getTop(index);
            var color = this.getColor(value);
            var width = this.getWidth(value);
            this.array.push({ value: value, id: 'rectId' + index, sorted: false,  backgroundColor: backgroundColor, color: color, top: top, left: left, width: width });
        }
    },
    // Visual position from the top of the container
    //
    getTop: function(index){
        return Math.round(this.height / this.count * index);
    },
    // Visual position from the left
    //
    getLeft: function (index) {
        return Math.round(this.width /2 - this.maxWidth/2 +  this.maxWidth*(Math.random()-0.5));
    },
    // Bubble sorting algorithm
    // 
    bubbleSort: function () {
        if (this.firstIndex >= this.array.length) return false;
        if (this.array[this.secondIndex].value > this.array[this.secondIndex + 1].value) {
            var swap = this.array[this.secondIndex];
            this.array[this.secondIndex] = this.array[this.secondIndex + 1];
            this.array[this.secondIndex + 1] = swap;            
        }
        this.secondIndex++;
        if (this.secondIndex >= this.array.length - 1 - this.firstIndex) {
            debugger;
            this.secondIndex = 0;
            this.firstIndex++;
            var element = this.array[this.array.length - this.firstIndex];
            element.sorted = true;
            element.left = (this.width - element.width) / 2;
        }
        return true;
    }
}