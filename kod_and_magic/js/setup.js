var BlockSetup = document.querySelector('.setup');
BlockSetup.classList.remove('hidden');

var BlockSetupFooter = document.querySelector('.setup-similar');
BlockSetupFooter.classList.remove('hidden');

var WizardCopy = document.querySelector("#similar-wizard-template").content.querySelector(".setup-similar-item");

var Mass_name = ["Иван","Хуан Себастьян","Мария","Кристоф","Виктор","Юлия","Люпита","Вашингтон",];
var Mass_fam = ["да Марья","Верон","Мирабелла","Вальц","Онопко","Топольницкая","Нионго","Ирвинг",];
var Mass_coatColor = ["rgb(101, 137, 164)",
                      "rgb(241, 43, 107)",
                      "rgb(146, 100, 161)",
                      "rgb(56, 159, 117)",
                      "rgb(215, 210, 55)",
                      "rgb(0, 0, 0)"];

var Mass_eyesColor = ["black",
                      "red",
                      "blue",
                      "yellow",
                      "green"];

var Fun_random = function(mass){
  var stroka = mass[Math.floor(Math.random() * mass.length)]
  return stroka;
};

var Fun_Create_DOM = function(WizardCopy_El, wizzards_El){
  var WizardEllement = WizardCopy_El.cloneNode(true);
  WizardEllement.querySelector(".setup-similar-label").textContent = wizzards_El[i].name;
  WizardEllement.querySelector(".wizard-coat").style.fill = wizzards_El[i].coatColor;
  WizardEllement.querySelector(".wizard-eyes").style.fill = wizzards_El[i].eyesColor;
  return WizardEllement;
};

var Fun_Insert_DOM = function(SimularList_El,WizardEllement_El) {
  SimularList_El.appendChild(WizardEllement_El);
};

var wizzards = [
    { name : Fun_random(Mass_name) + " " + Fun_random(Mass_fam) ,
     coatColor : Fun_random(Mass_coatColor) ,
     eyesColor: Fun_random(Mass_eyesColor)},
     { name : Fun_random(Mass_name) + " " + Fun_random(Mass_fam) ,
     coatColor : Fun_random(Mass_coatColor) ,
     eyesColor: Fun_random(Mass_eyesColor)},
     { name : Fun_random(Mass_name) + " " + Fun_random(Mass_fam) ,
     coatColor : Fun_random(Mass_coatColor) ,
     eyesColor: Fun_random(Mass_eyesColor)},
     { name : Fun_random(Mass_name) + " " + Fun_random(Mass_fam) ,
     coatColor : Fun_random(Mass_coatColor) ,
     eyesColor: Fun_random(Mass_eyesColor)}
];
console.log(wizzards);

var SimularList = document.querySelector(".setup-similar-list"); 

for (var i = 0;i<4;i++){
  var Create_DOM = Fun_Create_DOM(WizardCopy, wizzards);
  Fun_Insert_DOM(SimularList,Create_DOM);
};
