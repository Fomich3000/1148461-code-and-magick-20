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
var WHITE = '#ffffff';
var CLOUD_FONT = '16px PT Mono';
var RANDOM_SATURATION = ((Math.random() * 100) + 1);
var PLAYER_OWN_NAME = 'Вы';
var PLAYER_NAME_Y = CLOUD_Y + CLOUD_HEIGHT - TEXT_HEIGHT;
var FIRST_BAR_GAP = CLOUD_X + BAR_GAP;
var NEXT_BAR_GAP = BAR_GAP + BAR_WIDTH;


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderMainCloud = function (ctx) {
  renderCloud(ctx, CLOUD_X, CLOUD_Y + SMALL_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, WHITE);
};

var renderIntroText = function (ctx) {
  ctx.fillStyle = BLACK;
  ctx.font = CLOUD_FONT;
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + LARGE_GAP, CLOUD_Y + LARGE_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + LARGE_GAP, CLOUD_Y + LARGE_GAP * 2);
};

var renderPlayerName = function (ctx, name, index) {
  ctx.fillStyle = BLACK;
  ctx.fillText(name, FIRST_BAR_GAP + NEXT_BAR_GAP * index, PLAYER_NAME_Y - SMALL_GAP);
};

var renderBars = function (ctx, name, index, time, maxTime) {
  var barHeight = MAX_BAR_HEIGHT * time / maxTime;
  if (name === PLAYER_OWN_NAME) {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  } else {
    ctx.fillStyle = 'hsl(255, ' + RANDOM_SATURATION + '%, 50%)';
  }
  ctx.fillRect(FIRST_BAR_GAP + NEXT_BAR_GAP * index, PLAYER_NAME_Y - SMALL_GAP * 2, BAR_WIDTH, -barHeight);
  ctx.fillStyle = BLACK;
};

var renderPlayerTime = function (ctx, time, index, maxTime) {
  var barHeight = MAX_BAR_HEIGHT * time / maxTime;
  ctx.fillText(Math.round(time), FIRST_BAR_GAP + NEXT_BAR_GAP * index, PLAYER_NAME_Y - SMALL_GAP * 4 - barHeight);
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
  renderMainCloud(ctx);
  renderIntroText(ctx);
  var maxTime = getMaxElement(times);
  for (var i = 0; i < times.length; i++) {
    renderPlayerName(ctx, players[i], i);
    renderBars(ctx, players[i], i, times[i], maxTime);
    renderPlayerTime(ctx, times[i], i, maxTime);
  }
};
