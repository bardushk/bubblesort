$(document).ready(function () {
    $("#startButton").click(function () {
        var intervalId = setInterval(function () { start(); }, 100);
    });
});