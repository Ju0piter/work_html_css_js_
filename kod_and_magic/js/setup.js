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
var wizzards = [
    { name : Mass_name[Math.floor(Math.random() * Mass_name.length)] 
             +" " + Mass_fam[Math.floor(Math.random() * Mass_fam.length)] ,
     coatColor : Mass_coatColor[Math.floor(Math.random() * Mass_coatColor.length)] ,
     eyesColor: Mass_eyesColor[Math.floor(Math.random() * Mass_eyesColor.length)]},
    { name : Mass_name[Math.floor(Math.random() * Mass_name.length)] 
        +" " + Mass_fam[Math.floor(Math.random() * Mass_fam.length)] ,
      coatColor : Mass_coatColor[Math.floor(Math.random() * Mass_coatColor.length)] ,
      eyesColor: Mass_eyesColor[Math.floor(Math.random() * Mass_eyesColor.length)]},
    { name : Mass_name[Math.floor(Math.random() * Mass_name.length)] 
        +" " + Mass_fam[Math.floor(Math.random() * Mass_fam.length)] ,
      coatColor : Mass_coatColor[Math.floor(Math.random() * Mass_coatColor.length)] ,
      eyesColor: Mass_eyesColor[Math.floor(Math.random() * Mass_eyesColor.length)]},
    { name : Mass_name[Math.floor(Math.random() * Mass_name.length)] 
        +" " + Mass_fam[Math.floor(Math.random() * Mass_fam.length)] ,
      coatColor : Mass_coatColor[Math.floor(Math.random() * Mass_coatColor.length)] ,
      eyesColor: Mass_eyesColor[Math.floor(Math.random() * Mass_eyesColor.length)]}
];
console.log(wizzards);

var SimularList = document.querySelector(".setup-similar-list"); 

for (var i = 0;i<4;i++){

    var WizardEllement = WizardCopy.cloneNode(true);
    WizardEllement.querySelector(".setup-similar-label").textContent = wizzards[i].name;
    WizardEllement.querySelector(".wizard-coat").style.fill = wizzards[i].coatColor;
    WizardEllement.querySelector(".wizard-eyes").style.fill = wizzards[i].eyesColor;


    SimularList.appendChild(WizardEllement);
};
