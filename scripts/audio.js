var context = new AudioContext();

var playNote = function (frequency, startTime, duration) {
    var osc = context.createOscillator(),
        osc2 = context.createOscillator(),
        volume = context.createGain();

    // Multiplies the incoming signal by 0.25
    volume.gain.value = 0.25;

    // Make sure the gain value is at 0.25, 0.05 seconds before the note stops.
    volume.gain.setValueAtTime(0.25, startTime + duration - 0.05);
    volume.gain.linearRampToValueAtTime(0, startTime + duration);

    osc.frequency.value = frequency;
    osc.type = 'triangle';

    osc2.frequency.value = frequency;
    osc2.type = 'triangle';

    osc.detune.value = -10;
    osc2.detune.value = 10;

    osc.connect(volume);
    volume.connect(context.destination);

    osc2.connect(volume);

    osc.start(startTime);
    osc.stop(startTime + duration);

    osc2.start(startTime);
    osc2.stop(startTime + duration);
};

var playSuccessSound = function () {
    playNote(493.883, context.currentTime, 0.12);
    playNote(659.255, context.currentTime + 0.12, 0.24);
};

var myFakeAjaxCall = function (callback) {
    setTimeout(function () {
        callback();
    }, 3000);
};

$('#buy-now-button').click(function () {
    var $btn = $(this).button('loading');

    myFakeAjaxCall(function () {
        playSuccessSound();
        $btn.button('complete');
    });
});
