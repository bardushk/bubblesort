$(document).ready(function () {
    $("#startButton").click(function () {
        object.init();
        $('#log').html('в процессе...');
        intervalId = setInterval(function () { object.doSortStep($('#container')); }, 50);
    });
});