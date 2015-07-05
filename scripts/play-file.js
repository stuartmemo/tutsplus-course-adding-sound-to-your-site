var context = new AudioContext();
var request = new XMLHttpRequest();
var audioBuffer;

request.open('GET', '../audio/success.mp3', true);
request.responseType = 'arraybuffer';

request.onload = function () {
    context.decodeAudioData(request.response, function (decodedAudioBuffer) {
        audioBuffer = decodedAudioBuffer;
    });
};

request.send();

var playAudioFile = function () {
    var source = context.createBufferSource();

    source.buffer = audioBuffer;
    source.connect(context.destination);
    source.start(context.currentTime);
};

var myFakeAjaxCall = function (callback) {
    setTimeout(function () {
        callback();
    }, 3000);
};

$('#buy-now-button').click(function () {
    var $btn = $(this).button('loading');

    myFakeAjaxCall(function () {
        playAudioFile();
        $btn.button('complete');
    });
});
