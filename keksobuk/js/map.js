var Copy_PlaceMark_DOM = document.querySelector("#map__card__templade").content.querySelector(".map__pin");
var Map_pins_list_DOM = document.querySelector(".map__pins");
var Copy_Map_Card_DOM = document.querySelector("#map__card__templade").content.querySelector(".map__card");
var ads_list_DOM = document.querySelector(".map");
var Map_pinsoverlay_main = document.querySelector(".map__pinsoverlay");
var Map_pinsoverlay_main_h2 = document.querySelector(".Tokyo");
var ViewBox_main = document.querySelector(".viewBox");
var Map_Pin_Main = document.querySelector(".map__pin");
var Notice_Form_sumbit = document.querySelector(".notice__form");
var chet = 1;
var chet_pins = 1;
var StartPinX = -32;
var StartPinY = -32;
var StartX = 0;
var StartY = 0;
var load_advertisement;



var succesHandler_load_advertisement = function (mas_load_advertisement) 
{
    Fun_create_Placemark_DOM(Copy_PlaceMark_DOM,Map_pins_list_DOM,mas_load_advertisement,8);
    load_advertisement = mas_load_advertisement;

}


var errorHandler = function(errorMessage)
{
  var node = document.createElement('div');
  node.classList.add("error-div")
  Notice_Form_sumbit.id = "error";
  node.style = 'z-index: 100; margin: 0 auto; text-align:center; background-color: red;';
  node.style.position = 'absolute';
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize ='30px';
  node.textContent = errorMessage;
  document.body.insertAdjacentElement('afterbegin', node); 
};

//window.backend.load(succesHandler,errorHandler);

//------- ОБРАБОТЧИКИ---------
Map_Pin_Main.addEventListener("mousedown",function(evt)
{
    onMapPinsoverlayMouseUp(evt)
});

ads_list_DOM.addEventListener("click", function(evt) 
{
    onClickMapPin(evt);
});

Notice_Form_sumbit.addEventListener("submit", function(evt) 
{
    window.backend.save(new FormData(Notice_Form_sumbit), function(response)
    {
        if(Notice_Form_sumbit.id === "error")
        {
            let elem = document.querySelector(".error-div");
            elem.remove();
            Notice_Form_sumbit.id = "";
        }
        Notice_Form_sumbit.reset();
    },errorHandler)
    evt.preventDefault();
})

//--------------------------transform: translate(-50%, -50%);


var mass_type =
{
    "palace":"Дворец", "flat":"Квартира", "house":"Дом","bungalow":"Бунгало", "hotel": "Отель"
}

var onClickMapPin = function(evt)
{
    if (evt.target.classList == "map__pin map_pin_button_img" || evt.target.classList == "map_pin_button_img" )
    {
        var targetItem = evt.target;
        let item_index = parseInt(targetItem.id);
        let pattern_map_card = Copy_Map_Card_DOM.cloneNode(true); 
        var map_card = Fun_create_map_card_DOM(pattern_map_card,load_advertisement,item_index); 
        if (chet_pins == 2)
        {
            let elem = ads_list_DOM.querySelector(".map__card");
            elem.remove();
            chet_pins = 1;
        }
        ads_list_DOM.appendChild(map_card);
        chet_pins =2;
        document.querySelector(".popup__close").addEventListener("click",function()
        {
            let elem = ads_list_DOM.querySelector(".map__card");
            elem.remove();
            chet_pins = 1;
        });
    };
};

var onMapPinsoverlayMouseUp = function(evt)
{
    StartX = evt.clientX;
    StartY = evt.clientY;
    StartPinY = document.querySelector(".map__pin").offsetTop;
    StartPinX = document.querySelector(".map__pin").offsetLeft;
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    ads_list_DOM.classList.remove("map--faded");
    document.querySelector(".notice__form").classList.remove("notice__form--disabled");
};


var onMouseUp = function() 
{
    document.removeEventListener("mousemove", onMouseMove)
    if (chet == 1)
    {
        window.backend.load(succesHandler_load_advertisement,errorHandler);
        chet = 2;
    }
    document.querySelector(".input_adress").value = (document.querySelector(".map__pin").offsetTop) + ";" + (document.querySelector(".map__pin").offsetLeft) ;
    document.removeEventListener("mouseup", onMouseUp);
};

var onMouseMove = function(evtMove)
{
    document.querySelector(".map__pin").style.top = (StartPinY - (StartY - evtMove.clientY) + "px");
    document.querySelector(".map__pin").style.left = (StartPinX - (StartX - evtMove.clientX) + "px");
};



var Fun_create_li_features = function(mas_features,item)
{
    var lu_stroka = "";
    if(mas_features[item].offer.features) 
    {
        for (var i = 0; i< mas_features[item].offer.features.length ;i++) 
        {
            lu_stroka = lu_stroka + "<li class='feature feature--"+mas_features[item].offer.features[i]+"'></li>"
        }; 
    }
    return lu_stroka;
};

var Fun_create_li_photos = function(mas_photos,item)
{
    var lu_stroka = "";
    if(mas_photos[item].offer.photos) 
    {
        for (var i = 0; i< mas_photos[item].offer.photos.length ;i++) 
        {
            lu_stroka = lu_stroka + "<li><img src='"+mas_photos[item].offer.photos[i]+"'></li>"
        }; 
    }
    return lu_stroka;
};


var Fun_create_Placemark_DOM = function(DOM,DOM_list,mass_advertisement,items)
{
    for (var i = 0; i<items;i++)
    {
        let rand_item = Math.floor(Math.random()*50)
        var New_DOM = DOM.cloneNode(true);
        New_DOM.classList.add("map_pin_button_img"); 
        New_DOM.id = rand_item;
        New_DOM.querySelector("img").classList.add("map_pin_button_img"); 
        New_DOM.querySelector("img").id = rand_item;
        New_DOM.style = "left: "+ (document.querySelector(".map__pin").offsetLeft + (Math.floor((35.67 - mass_advertisement[rand_item].location.lat)*7000))) +
        "px; top: "+ (document.querySelector(".map__pin").offsetTop + (Math.floor((139.73 - mass_advertisement[rand_item].location.lng)*3000))) +"px;";
        New_DOM.querySelector("img").src = mass_advertisement[rand_item].author.avatar; 
        New_DOM.querySelector("img").alt = mass_advertisement[rand_item].offer.title; 
        DOM_list.appendChild(New_DOM);
    }
};

var Fun_create_map_card_DOM = function(DOM,mass_advertisement,item)
{
    var lu_str = Fun_create_li_features(mass_advertisement,item);
    var photos_str = Fun_create_li_photos(mass_advertisement,item)
    var New_DOM = DOM.cloneNode(true);
    let type_item = mass_advertisement[item].offer.type;
    New_DOM.querySelector(".popup__title").textContent = mass_advertisement[item].offer.title;
    New_DOM.querySelector(".popup__text--address").textContent = mass_advertisement[item].offer.adress;
    New_DOM.querySelector(".popup__type").textContent = mass_type[type_item];
    New_DOM.querySelector(".popup__text--capacity").textContent = mass_advertisement[item].offer.rooms + " комнат/ы для " + mass_advertisement[item].offer.guests + " гостя/гостей";
    New_DOM.querySelector(".popup__text--time").textContent = "Заезд после "+ mass_advertisement[item].offer.checkin + ", выезд до " + mass_advertisement[item].offer.checkout;
    New_DOM.querySelector(".popup__avatar").src = mass_advertisement[item].author.avatar;
    New_DOM.querySelector(".popup__price").textContent = mass_advertisement[item].offer.price +" руб./ночь";
    New_DOM.querySelector(".popup__description").textContent = mass_advertisement[item].offer.description;
    New_DOM.querySelector(".popup__pictures").innerHTML = "";
    New_DOM.querySelector(".popup__pictures").insertAdjacentHTML( 'beforeend', photos_str);
    New_DOM.querySelector(".popup__features").innerHTML = "";
    New_DOM.querySelector(".popup__features").insertAdjacentHTML( 'beforeend', lu_str);
    return New_DOM;
};










