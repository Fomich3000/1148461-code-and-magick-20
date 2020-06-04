'use strict';

var wizardNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var wizardSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var wizardCoatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var wizardEyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandomElement = function (elementsArray) {
  var randomElement = elementsArray[Math.floor(Math.random() * elementsArray.length)];
  return randomElement;
};

var getRandomName = function (names, surnames) {
  var randomName = getRandomElement(names);
  var randomSurname = getRandomElement(surnames);
  var name = randomName + ' ' + randomSurname;
  return name;
};

var wizardItem = document.querySelector('#similar-wizard-template').content;

var createWizard = function (wizard) {
  var wizardElement = wizardItem.cloneNode(true);
  var wizardNameElement = wizardElement.querySelector('.setup-similar-label');
  var wizardCoatElement = wizardElement.querySelector('.wizard-coat');
  var wizardEyesElement = wizardElement.querySelector('.wizard-eyes');

  wizardNameElement.textContent = wizard.name;
  wizardCoatElement.style.fill = wizard.coat;
  wizardEyesElement.style.fill = wizard.eyes;

  return wizardElement;
};

var renderWizard = function (placeToRender, wizardsToRender) {
  placeToRender.appendChild(wizardsToRender);
};


var wizards = [];
for (var i = 0; i < 4; i++) {
  var wizardName = getRandomName(wizardNames, wizardSurnames);
  var wizardCoat = getRandomElement(wizardCoatColors);
  var wizardEyes = getRandomElement(wizardEyesColors);

  wizards.push({
    name: wizardName,
    coat: wizardCoat,
    eyes: wizardEyes
  });
}

var wizardsFragment = document.createDocumentFragment();

for (var j = 0; j < wizards.length; j++) {
  var wizardElement = createWizard(wizards[j]);
  wizardsFragment.appendChild(wizardElement);
}

var wizardsList = document.querySelector('.setup-similar-list');
renderWizard(wizardsList, wizardsFragment);

var setupWindow = document.querySelector('.setup');
var setupSimilarWindow = document.querySelector('.setup-similar');
setupWindow.classList.remove('hidden');
setupSimilarWindow.classList.remove('hidden');
