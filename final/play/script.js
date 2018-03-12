// shown in the header text
var QUIZ_SUBJECT = 'CSS';

// shown in the sub-header text
var QUIZ_DETAILED_SUBJECT = 'CSS3 properties';

// the time limit, in minutes
var QUIZ_TIME_LIMIT = 5;

// array of all the correct answers
var QUIZ_ANSWERS = ['align-content', 'align-items', 'align-self', 'alignment-adjust', 'alignment-baseline', 'all', 'anchor-point', 'animation', 'animation-delay', 'animation-direction', 'animation-duration', 'animation-fill-mode', 'animation-iteration-count', 'animation-name', 'animation-play-state', 'animation-timing-function', 'appearance', 'azimuth', 'backface-visibility', 'background', 'background-attachment', 'background-clip', 'background-color', 'background-image', 'background-origin', 'background-position', 'background-repeat', 'background-size', 'baseline-shift', 'binding', 'bleed', 'bookmark-label', 'bookmark-level', 'bookmark-state', 'bookmark-target', 'border', 'border-bottom', 'border-bottom-color', 'border-bottom-left-radius', 'border-bottom-right-radius', 'border-bottom-style', 'border-bottom-width', 'border-collapse', 'border-color', 'border-image', 'border-image-outset', 'border-image-repeat', 'border-image-slice', 'border-image-source', 'border-image-width', 'border-left', 'border-left-color', 'border-left-style', 'border-left-width', 'border-radius', 'border-right', 'border-right-color', 'border-right-style', 'border-right-width', 'border-spacing', 'border-style', 'border-top', 'border-top-color', 'border-top-left-radius', 'border-top-right-radius', 'border-top-style', 'border-top-width', 'border-width', 'bottom', 'box-decoration-break', 'box-shadow', 'box-sizing', 'break-after', 'break-before', 'break-inside', 'caption-side', 'chains', 'clear', 'clip', 'clip-path', 'clip-rule', 'color', 'color-interpolation-filters', 'color-profile', 'column-count', 'column-fill', 'column-gap', 'column-rule', 'column-rule-color', 'column-rule-style', 'column-rule-width', 'column-span', 'column-width', 'columns', 'contain', 'content', 'counter-increment', 'counter-reset', 'crop', 'cue', 'cue-after', 'cue-before', 'cursor', 'direction', 'display', 'dominant-baseline', 'drop-initial-after-adjust', 'drop-initial-after-align', 'drop-initial-before-adjust', 'drop-initial-before-align', 'drop-initial-size', 'drop-initial-value', 'elevation', 'empty-cells', 'filter', 'flex', 'flex-basis', 'flex-direction', 'flex-flow', 'flex-grow', 'flex-shrink', 'flex-wrap', 'float', 'float-offset', 'flood-color', 'flood-opacity', 'flow-from', 'flow-into', 'font', 'font-family', 'font-feature-settings', 'font-kerning', 'font-language-override', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-synthesis', 'font-variant', 'font-variant-alternates', 'font-variant-caps', 'font-variant-east-asian', 'font-variant-ligatures', 'font-variant-numeric', 'font-variant-position', 'font-weight', 'grid', 'grid-area', 'grid-auto-columns', 'grid-auto-flow', 'grid-auto-position', 'grid-auto-rows', 'grid-column', 'grid-column-end', 'grid-column-start', 'grid-row', 'grid-row-end', 'grid-row-start', 'grid-template', 'grid-template-areas', 'grid-template-columns', 'grid-template-rows', 'hanging-punctuation', 'height', 'hyphens', 'icon', 'image-orientation', 'image-resolution', 'ime-mode', 'inline-box-align', 'justify-content', 'justify-items', 'justify-self', 'left', 'letter-spacing', 'lighting-color', 'line-break', 'line-height', 'line-stacking', 'line-stacking-ruby', 'line-stacking-shift', 'line-stacking-strategy', 'list-style', 'list-style-image', 'list-style-position', 'list-style-type', 'margin', 'margin-bottom', 'margin-left', 'margin-right', 'margin-top', 'marks', 'mask', 'mask-box', 'mask-box-outset', 'mask-box-repeat', 'mask-box-slice', 'mask-box-source', 'mask-box-width', 'mask-clip', 'mask-image', 'mask-origin', 'mask-position', 'mask-repeat', 'mask-size', 'mask-source-type', 'mask-type', 'max-height', 'max-lines', 'max-width', 'min-height', 'min-width', 'move-to', 'nav-down', 'nav-index', 'nav-left', 'nav-right', 'nav-up', 'object-fit', 'object-position', 'opacity', 'order', 'orphans', 'outline', 'outline-color', 'outline-offset', 'outline-style', 'outline-width', 'overflow', 'overflow-wrap', 'overflow-x', 'overflow-y', 'padding', 'padding-bottom', 'padding-left', 'padding-right', 'padding-top', 'page', 'page-break-after', 'page-break-before', 'page-break-inside', 'page-policy', 'pause', 'pause-after', 'pause-before', 'perspective', 'perspective-origin', 'pitch', 'pitch-range', 'play-during', 'position', 'presentation-level', 'quotes', 'region-fragment', 'rendering-intent', 'resize', 'rest', 'rest-after', 'rest-before', 'richness', 'right', 'rotation', 'rotation-point', 'ruby-align', 'ruby-overhang', 'ruby-position', 'ruby-span', 'shape-image-threshold', 'shape-outside', 'shape-margin', 'size', 'speak', 'speak-as', 'speak-header', 'speak-numeral', 'speak-punctuation', 'speech-rate', 'stress', 'string-set', 'tab-size', 'table-layout', 'target', 'target-name', 'target-new', 'target-position', 'text-align', 'text-align-last', 'text-combine-horizontal', 'text-decoration', 'text-decoration-color', 'text-decoration-line', 'text-decoration-skip', 'text-decoration-style', 'text-emphasis', 'text-emphasis-color', 'text-emphasis-position', 'text-emphasis-style', 'text-height', 'text-indent', 'text-justify', 'text-orientation', 'text-outline', 'text-overflow', 'text-shadow', 'text-space-collapse', 'text-transform', 'text-underline-position', 'text-wrap', 'top', 'transform', 'transform-origin', 'transform-style', 'transition', 'transition-delay', 'transition-duration', 'transition-property', 'transition-timing-function', 'unicode-bidi', 'vertical-align', 'visibility', 'voice-balance', 'voice-duration', 'voice-family', 'voice-pitch', 'voice-range', 'voice-rate', 'voice-stress', 'voice-volume', 'volume', 'white-space', 'widows', 'width', 'word-break', 'word-spacing', 'word-wrap', 'wrap-flow', 'wrap-through', 'writing-mode', 'z-index'];

/*

You don't need to mess with anything past this point. Unless you want to, of course. :)

*/

var HAPPY_TIME = 1000; // how long to stay happy, in ms
var NEUTRAL_TIME = 20000; // how long to stay neutral, in ms

// timers
var toastMoodTimeout;
var timeInterval;

// other global variables
var answers;
var timeRemaining;
var score;

$(function () {
  // fill in the blanks
  $('.subject').text(QUIZ_SUBJECT);
  $('.detailed-subject').text(QUIZ_DETAILED_SUBJECT);
  $('.time-limit').text(QUIZ_TIME_LIMIT + ' ' + (QUIZ_TIME_LIMIT === 1 ? 'minute' : 'minutes'));

  // bind events
  $('.start').on('click', startQuiz);
  $('.input').on('input', checkInput);
  $('.toggle').on('click', toggleAnswers);
  $('.reset').on('click', reset);

  // preload other toast moods
  preloadImage('https://s3-us-west-2.amazonaws.com/s.cdpn.io/77020/toasty-quiz-happy.png');
  preloadImage('https://s3-us-west-2.amazonaws.com/s.cdpn.io/77020/toasty-quiz-neutral.png');
});

function preloadImage(src) {
  var img = new Image();
  img.src = src;
}

function startQuiz() {
  // init some variables
  initAnswers();
  timeRemaining = Math.round(QUIZ_TIME_LIMIT * 60);
  score = 0;

  // prepare UI
  $('.time-remaining').text(getTimeString());
  $('.score').text(score);
  $('.total').text(QUIZ_ANSWERS.length);
  $('.start').hide();
  $('.started').show();
  $('.input').focus();

  // start the clock
  timeInterval = setInterval(reduceTime, 1000);
  setToastMood('neutral');
}

function initAnswers() {
  answers = {};
  QUIZ_ANSWERS.forEach(function(item) {
    var answer = item.trim().toLowerCase()
    answers[answer] = false;
  });
}

function setToastMood(mood, isPermanent) {
  $('.toast')
    .removeClass('neutral-toast happy-toast sad-toast')
    .addClass(mood + '-toast');

  clearTimeout(toastMoodTimeout);
  if (!isPermanent) {
    if (mood === 'happy') {
      // happy toast becomes neutral toast
      toastMoodTimeout = setTimeout(setToastMood.bind(undefined, 'neutral'), HAPPY_TIME);
    } else if (mood === 'neutral') {
      // neutral toast becomes sad toast
      toastMoodTimeout = setTimeout(setToastMood.bind(undefined, 'sad'), NEUTRAL_TIME);
    }
  }
}

function reduceTime() {
  timeRemaining--;
  if (timeRemaining === 0) {
    endQuiz();
  } else {
    $('.time-remaining').text(getTimeString());
  }
}

function checkInput(event) {
  var input = event.currentTarget.value.trim().toLowerCase();
  if (answers.hasOwnProperty(input) && !answers[input]) {
    // give credit
    answers[input] = true;
    score++;
    $('.score').text(score);
    $('.scored-answers').prepend(createAnswerItem(input));
    setToastMood('happy');

    // clear input
    $('.input').val('');

    // check if user beat the quiz
    if (score === QUIZ_ANSWERS.length) {
      endQuiz();
    }
  }
}

function endQuiz() {
  // freeze
  clearTimeout(timeInterval);
  $('.input').prop('disabled', true);

  // calculate percentage
  var percent = Math.round(score / QUIZ_ANSWERS.length * 100);
  $('.percent').text(percent);

  // change status stuff
  $('.status-timer, .status-current-score').hide();
  $('.status-final-results').show();
  $('.footnote').show();

  // score-dependent stuff
  if (score === QUIZ_ANSWERS.length) {
    // happy
    $('.end-greeting').text('Perfect, with ' + getTimeString() + ' remaining!');
    setToastMood('happy', true);
  } else if (score > 0) {
    // neutral
    $('.end-greeting').text('Time\'s up!');
    setToastMood('neutral', true);
    renderMissedAnswers();
    $('.status-toggle-answers').show();
  } else {
    // sad
    $('.end-greeting').text('Nothing...');
    setToastMood('sad', true);
    renderMissedAnswers();
    $('.scored-answers').hide();
    $('.missed-answers').show();
  }
}

function renderMissedAnswers() {
  QUIZ_ANSWERS.forEach(function(item) {
    var answer = item.trim().toLowerCase()
    if (!answers[answer]) {
      $('.missed-answers').append(createAnswerItem(answer));
    }
  });
}

function toggleAnswers(event) {
  event.preventDefault();

  if ($('.scored-answers').is(':visible')) {
    // switch to missed answers
    $('.toggle').text('see what you got');
    $('.scored-answers').hide();
    $('.missed-answers').show();
  } else {
    // switch to scored answers
    $('.toggle').text('see what you missed');
    $('.missed-answers').hide();
    $('.scored-answers').show();
  }
}

function createAnswerItem(answer) {
  return $('<li>', { text: answer });
}

function getTimeString() {
  if (timeRemaining <= 0) {
    return '0:00';
  } else {
    var minutes = Math.floor(timeRemaining / 60);
    var seconds = timeRemaining % 60;
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return minutes + ':' + seconds;
  }
}

function reset() {
  // put everything back the way it was
  $('.started, .status-final-results, .status-toggle-answers, .missed-answers, .footnote').hide();
  $('.start, .status-timer, .status-current-score, .scored-answers').show();
  $('.input').prop('disabled', false).val('');
  $('.answers').empty();
  $('.toggle').text('see what you missed');
  setToastMood('neutral', true);
}
