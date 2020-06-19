'use strict';

var wizardNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var wizardSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var wizardCoatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var wizardEyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballs = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];


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

var setup = document.querySelector('.setup');
var setupSimilar = document.querySelector('.setup-similar');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupUsername = setup.querySelector('.setup-user-name');

var closeSetupOnEsc = function (evt) {
  if (evt.key === 'Escape') {
    closeSetup();
  }
};

var stayOpenInUsername = function (evt) {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

var openSetup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', closeSetupOnEsc);
  setupUsername.addEventListener('keydown', stayOpenInUsername);
};

var closeSetup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', closeSetupOnEsc);
  setupUsername.removeEventListener('keydown', stayOpenInUsername);
};

setupSimilar.classList.remove('hidden');

setupOpen.addEventListener('click', function () {
  openSetup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openSetup();
  }
});

setupClose.addEventListener('click', function () {
  closeSetup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closeSetup();
  }
});

var showNotification = function (notificationText) {
  setupUsername.setCustomValidity(notificationText);
  setupUsername.reportValidity();
};

setupUsername.addEventListener('input', function () {
  if (setupUsername.validity.tooShort) {
    showNotification('Имя должно состоять минимум из 2-х символов');
  } else if (setupUsername.validity.tooLong) {
    showNotification('Имя не должно превышать 25 символов');
  } else if (setupUsername.validity.valueMissing) {
    showNotification('Введите имя, это обязательное поле');
  } else {
    setupUsername.setCustomValidity('');
  }
});

var mainWizard = setup.querySelector('.setup-wizard');
var mainWizardEyes = mainWizard.querySelector('.wizard-eyes');
var mainWizardCoat = mainWizard.querySelector('.wizard-coat');
var mainWizardFireball = setup.querySelector('.setup-fireball-wrap');
var eyesInput = setup.querySelector('input[name="eyes-color"]');
var coatInput = setup.querySelector('input[name="coat-color"]');
var fireballInput = mainWizardFireball.querySelector('input[name="fireball-color"]');


var changeWizardElementColor = function (element, elementInput, colorArray) {
  var elementColor = getRandomElement(colorArray);
  elementInput.value = elementColor;
  element.style.fill = elementColor;
};

var changeFireballColor = function (fireballElement, fireballName, fireballColors) {
  var fireballColor = getRandomElement(fireballColors);
  fireballName.value = fireballColor;
  fireballElement.style.backgroundColor = fireballColor;
};

mainWizardEyes.addEventListener('click', function () {
  changeWizardElementColor(mainWizardEyes, eyesInput, wizardEyesColors);
});

mainWizardCoat.addEventListener('click', function () {
  changeWizardElementColor(mainWizardCoat, coatInput, wizardCoatColors);
});

mainWizardFireball.addEventListener('click', function () {
  changeFireballColor(mainWizardFireball, fireballInput, fireballs);
});
