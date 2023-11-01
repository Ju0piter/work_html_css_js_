var BlockSetup = document.querySelector('.setup');
//BlockSetup.classList.remove('hidden');

var BlockSetupFooter = document.querySelector('.setup-similar');
//BlockSetupFooter.classList.remove('hidden');

var OpenSetup = document.querySelector('.setup-open');
var CloseSetup = document.querySelector('.setup-close');
var InputUserName = document.querySelector(".setup-user-name");
var ButtonSetupSubmit = document.querySelector(".setup-submit");
var SetupWizzard = document.querySelector(".setup-wizard");
var SetupFireBall = document.querySelector(".setup-fireball-wrap");
var SetupWizzardInput = document.querySelector(".setup-wizard-appearance");
var SetupWizzardForm = document.querySelector(".setup-wizard-form");
var imageX = 0;
var imageX = 0;
var startX = 0;
var startY = 0;
var dragged = true;
var load_wizzards = [];
var colorCoat = SetupWizzard.querySelector(".wizard-coat").style.fill;
var colorEyes = SetupWizzard.querySelector(".wizard-eyes").style.fill;
var render = true

var succesHandler = function(wizards)
{
  load_wizzards = wizards;
}

var errorHandler = function(errorMessage)
{
  var node = document.createElement('div');
  node.style = 'z-index: 100; margin: 0 auto; text-align:center; background-color: red;';
  node.style.position = 'absolute';
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize ='30px';
  node.textContent = errorMessage;
  document.body.insertAdjacentElement('afterbegin', node); 
};

window.backend.load(succesHandler, errorHandler);

SetupWizzardForm.addEventListener("submit", function(evt)
{
  window.backend.save(new FormData(SetupWizzardForm), function(response)
  {
    BlockSetup.classList.add("hidden");
  },errorHandler)
  evt.preventDefault();
})

document.querySelector(".upload").addEventListener("mousedown", function(evt)
{
  onMouseDown(evt)
})

var onMouseDown = function(evtDown)
{ 
  imageY = document.querySelector(".overlay").offsetTop;
  imageX = document.querySelector(".overlay").offsetLeft;
  startX = evtDown.clientX;
  startY = evtDown.clientY;
  dragged = true;
  document.addEventListener("mousemove", OnMouseMove); 
  document.addEventListener("mouseup", OnMouseUp);
  document.querySelector(".upload").addEventListener("click", onClickPreventDefault); 
};

var OnMouseMove = function(evtMove) 
{
  document.querySelector(".overlay").style.top = (imageY - (startY - evtMove.clientY) ) + "px"; 
  document.querySelector(".overlay").style.left = (imageX - (startX - evtMove.clientX) ) + "px";
  dragged = false;
};


var OnMouseUp = function(evtUp) 
{
  document.removeEventListener("mousemove", OnMouseMove);
  document.removeEventListener("mouseup", OnMouseUp);
  console.log(dragged);
  if (dragged)
  {
    document.querySelector(".upload").removeEventListener("click", onClickPreventDefault);
   
  }
};

var onClickPreventDefault = function(evtdef)
{
  evtdef.preventDefault();
};




SetupFireBall.addEventListener("click", function()
{
  let i = Fun_random(Mass_FireBallColor);
  SetupFireBall.style.background = i;
  SetupFireBall.querySelector(".setup-fireball-input").value = i;
}) 



SetupWizzard.querySelector(".wizard-coat").addEventListener("click", function()
{
  let i = Fun_random(Mass_coatColor);
  SetupWizzard.querySelector(".wizard-coat").style.fill = i;
  colorCoat = i;
  SetupWizzardInput.querySelector(".coat-color-input1").value = i;
  var sort_wizards = Sort_wizards(load_wizzards);
  UpDate_wizards(sort_wizards);
})

SetupWizzard.querySelector(".wizard-eyes").addEventListener("click", function()
{
  let i = Fun_random(Mass_eyesColor);
  SetupWizzard.querySelector(".wizard-eyes").style.fill = i;
  colorEyes = i;
  SetupWizzardInput.querySelector(".coat-color-input2").value = i;
  var sort_wizards = Sort_wizards(load_wizzards);
  UpDate_wizards(sort_wizards);
})


InputUserName.addEventListener('focus',function()
{
  document.removeEventListener("keydown", onPopupEscPress);
  
})

InputUserName.addEventListener('blur',function()
{
  document.addEventListener("keydown", onPopupEscPress);
  
})

ButtonSetupSubmit.addEventListener('click',function()
{
  ClosePopup();
});
ButtonSetupSubmit.addEventListener("keydown",function(evt)
{
  if (evt.keyCode === 13){
  ClosePopup();}
});



OpenSetup.addEventListener('click',function()
{
  OpenPopup();
  if(render)
  {
    var sort_wizards = Sort_wizards(load_wizzards);
    Fun_Render_wizards(sort_wizards);
    render = false;
    var update_wizards = document.querySelectorAll(".setup-similar-item");
    console.log(update_wizards);
  };
});

OpenSetup.addEventListener("keydown",function(evt)
{
  if (evt.keyCode === 13){
  OpenPopup();}
});

CloseSetup.addEventListener('click',function()
{
  ClosePopup();
});

CloseSetup.addEventListener("keydown",function(evt)
{
  if (evt.keyCode === 13){
  ClosePopup();}
});

var onPopupEscPress = function(evt)
{
  if(evt.keyCode === 27){
    ClosePopup();
  }
};

var ClosePopup = function()
{
  BlockSetup.classList.add('hidden');
  BlockSetupFooter.classList.add('hidden');
  document.removeEventListener("keydown", onPopupEscPress);

};

var OpenPopup = function()
{
  BlockSetup.classList.remove('hidden');
  BlockSetupFooter.classList.remove('hidden');
  document.addEventListener("keydown", onPopupEscPress);

};
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

var Mass_FireBallColor = ["#ee4830",
                      "#30a8ee",
                      "#5ce6c0",
                      "#e848d5",
                      "#e6e848"];
//------------------------------------------------------------------------------------------------------
var Fun_random = function(mass){ 
  var stroka = mass[Math.floor(Math.random() * mass.length)]
  return stroka;
};


var Get_Rang = function(wizard)
{
  var rang_wizard = 0;
  if(wizard.colorCoat === colorCoat) {
    rang_wizard += 2;
  }
  if(wizard.colorEyes === colorEyes) {
    rang_wizard += 1;
  }
  return rang_wizard;
};

var Sort_wizards = function(wizards)
{
  var copy_load_wizards = wizards.map(function(wizard)
  {
    var rang = Get_Rang(wizard);
    wizard.rang = rang;
    return wizard;
  })
  copy_load_wizards.sort((left,right)=> right.rang-left.rang);
  return copy_load_wizards;
};



var Fun_Render_wizards = function(wizards)
{
  var element = document.createDocumentFragment();
  for(var i = 0; i<4; i++)
  { elementItem = Fun_Create_wizard(wizards[i]);
    elementItem.classList.add("ssi"+ i);
    element.appendChild(elementItem);
  }
  SimularList.appendChild(element);

};

var UpDate_wizards = function(wizards) 
{
  for(var i = 0; i<4; i++)
  {
    let update_wizard = document.querySelector(".ssi" + i)
    update_wizard.querySelector('.setup-similar-label').textContent = wizards[i].name;
    update_wizard.querySelector('.wizard-coat').style.fill = wizards[i].colorCoat;
    update_wizard.querySelector('.wizard-eyes').style.fill = wizards[i].colorEyes;
  }
};







var Fun_Create_wizard = function(wizard)
{
  var WizardEllement = WizardCopy.cloneNode(true);
  WizardEllement.querySelector('.setup-similar-label').textContent = wizard.name;
  WizardEllement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
  WizardEllement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
  return WizardEllement;
};

// var Fun_Create_DOM = function(WizardCopy_El, wizzards_El){
//   var WizardEllement = WizardCopy_El.cloneNode(true);
//   WizardEllement.querySelector(".setup-similar-label").textContent = wizzards_El[i].name;
//   WizardEllement.querySelector(".wizard-coat").style.fill = wizzards_El[i].coatColor;
//   WizardEllement.querySelector(".wizard-eyes").style.fill = wizzards_El[i].eyesColor;
//   return WizardEllement;
// };

// var Fun_Insert_DOM = function(SimularList_El,WizardEllement_El) {
//   SimularList_El.appendChild(WizardEllement_El);
// };

// var wizzards = [
//     { name : Fun_random(Mass_name) + " " + Fun_random(Mass_fam) ,
//      coatColor : Fun_random(Mass_coatColor) ,
//      eyesColor: Fun_random(Mass_eyesColor)},
//      { name : Fun_random(Mass_name) + " " + Fun_random(Mass_fam) ,
//      coatColor : Fun_random(Mass_coatColor) ,
//      eyesColor: Fun_random(Mass_eyesColor)},
//      { name : Fun_random(Mass_name) + " " + Fun_random(Mass_fam) ,
//      coatColor : Fun_random(Mass_coatColor) ,
//      eyesColor: Fun_random(Mass_eyesColor)},
//      { name : Fun_random(Mass_name) + " " + Fun_random(Mass_fam) ,
//      coatColor : Fun_random(Mass_coatColor) ,
//      eyesColor: Fun_random(Mass_eyesColor)}
// ];
// console.log(wizzards);

var SimularList = document.querySelector(".setup-similar-list"); 


// for (var i = 0;i<4;i++){
//   var Create_DOM = Fun_Create_DOM(WizardCopy, wizzards);
//   Fun_Insert_DOM(SimularList,Create_DOM);
// };
// console.log(Mass_coatColor[0]);
