$(document).ready(function () {
    $("#startButton").click(function () {
        object.init($('#container'));
        $('#log').html('в процессе...');
        intervalId = setInterval(function () { object.doSortStep(); }, 50);
    });
    $(window).resize(function () {
        object.init($('#container'));
    });
});