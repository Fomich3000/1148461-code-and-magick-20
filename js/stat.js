'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var MAX_BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var LARGE_GAP = 20;
var SMALL_GAP = 10;
var TEXT_HEIGHT = 16;
var BLACK = '#000000';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X, CLOUD_Y + SMALL_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  ctx.fillStyle = BLACK;
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + LARGE_GAP, CLOUD_Y + LARGE_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + LARGE_GAP, CLOUD_Y + LARGE_GAP * 2);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < times.length; i++) {
    ctx.fillStyle = BLACK;
    ctx.fillText(players[i], CLOUD_X + BAR_GAP + ((BAR_GAP + BAR_WIDTH) * i), CLOUD_Y + CLOUD_HEIGHT - TEXT_HEIGHT - SMALL_GAP);
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(255, ' + ((Math.random() * 100) + 1) + '%, 50%)';
    }
    ctx.fillRect(CLOUD_X + BAR_GAP + ((BAR_GAP + BAR_WIDTH) * i), CLOUD_Y + CLOUD_HEIGHT - TEXT_HEIGHT - SMALL_GAP * 2, BAR_WIDTH, -MAX_BAR_HEIGHT * times[i] / maxTime);
    ctx.fillStyle = BLACK;
    ctx.fillText(Math.round(times[i]), CLOUD_X + BAR_GAP + ((BAR_GAP + BAR_WIDTH) * i), CLOUD_Y + CLOUD_HEIGHT - TEXT_HEIGHT - SMALL_GAP * 4 - (MAX_BAR_HEIGHT * times[i] / maxTime));
  }
};
