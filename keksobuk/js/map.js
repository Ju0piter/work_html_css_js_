console.log("hui");

var Copy_PlaceMark_DOM = document.querySelector("#map__card__templade").content.querySelector(".map__pin");
var Map_pins_list_DOM = document.querySelector(".map__pins");
var Copy_Map_Card_DOM = document.querySelector("#map__card__templade").content.querySelector(".map__card");
var ads_list_DOM = document.querySelector(".map");
var Map_pinsoverlay_main = document.querySelector(".map__pinsoverlay");
var Map_pinsoverlay_main_h2 = document.querySelector(".Tokyo");
var ViewBox_main = document.querySelector(".viewBox");
var Map_Pin_Main = document.querySelector(".map__pin");
var chet = 1;
var chet_pins = 1;
var StartPinX = -32;
var StartPinY = -32;
var StartX = 0;
var StartY = 0;

//------- ОБРАБОТЧИКИ---------
Map_Pin_Main.addEventListener("mousedown",function(evt)
{
    onMapPinsoverlayMouseUp(evt)
});

ads_list_DOM.addEventListener("click", function(evt)
{
    onClickMapPin(evt);
});

//--------------------------transform: translate(-50%, -50%);

var mass_title = 
[
    "Большая уютная квартира",
    "Маленькая неуютная квартира",
    "Огромный прекрасный дворец",
    "Маленький ужасный дворец",
    "Красивый гостевой домик",
    "Некрасивый негостеприимный домик",
    "Уютное бунгало далеко от моря",
    "Неуютное бунгало по колено в воде"
]
var mass_type = 
[
    "Дворец", "Квартира", "Дом","Бунгало"
]

var mass_check_in_out = 
[
    "12;00", "13:00", "14:00"
]

var mass_photos = 
[
    "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
     "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
      "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
]

var mass_features = 
[
    "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"
]


var onClickMapPin = function(evt)
{
    if (evt.target.classList == "map__pin map_pin_button_img" || evt.target.classList == "map_pin_button_img" )
    {
        var targetItem = evt.target;
        let item_index = parseInt(targetItem.id);
        let pattern_map_card = Copy_Map_Card_DOM.cloneNode(true); 
        var map_card = Fun_create_map_card_DOM(pattern_map_card,advertisement,item_index); 
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
    console.log(document.querySelector(".map__pin").style.transform);
    document.querySelector(".input_adress").placeholder = (evt.pageX -Xcord - 33) + ";" + (evt.pageY - Ycord - 33);
};


var onMouseUp = function() 
{
    document.removeEventListener("mousemove", onMouseMove)
    if (chet == 1)
    {
        Fun_create_Placemark_DOM(Copy_PlaceMark_DOM,Map_pins_list_DOM,advertisement,8);
        chet = 2;
    }
    document.querySelector(".input_adress").placeholder = (document.querySelector(".map__pin").offsetTop) + ";" + (document.querySelector(".map__pin").offsetLeft) ;
    document.removeEventListener("mouseup", onMouseUp);
};

var onMouseMove = function(evtMove)
{
    document.querySelector(".map__pin").style.top = (StartPinY - (StartY - evtMove.clientY) + "px");
    document.querySelector(".map__pin").style.left = (StartPinX - (StartX - evtMove.clientX) + "px");
};


var Fun_create_features = function(features)
{
    var mass_strok = [];
    var rand_start = Math.floor(Math.random()*(features.length-1));
    for (var i = 0;i<Math.floor(Math.random()*(features.length-rand_start)+1);i++)
    {
        var stroka = features[i+rand_start]; 
        mass_strok.push(stroka);
    }
    return mass_strok;
};
var Fun_gen_random_value = function()
{
    var random_value = [];
    var x = Math.floor(Math.random()*3+1);
    var y = Math.floor(Math.random()*3+1);
    var z = Math.floor(Math.random()*3+1);
    while(x==y ||x==z||y==z) 
    {
        y = Math.floor(Math.random()*3+1);
        z = Math.floor(Math.random()*3+1);
    }
    random_value.push(x,y,z);
    return random_value;
};


var Fun_create_advertisement = function(items,title,type,check_in_out,fun_features,mas_features,photos,gen_rand_value)
{
    var rand_value_mass = gen_rand_value();
    var mass_objects = [];
    for (var i = 0; i<items;i++) 
    {
        var object = 
        {
            "author": 
            {
                "avatar": "img/avatars/user0"+ Math.floor(Math.random()*8+1) +".png"
            },
            "offer":
            {
                "title": title[Math.floor(Math.random()*title.length)],
                "adress": Math.floor(Math.random()*1000) + "," + Math.floor(Math.random()*1000),
                "price": Math.floor(Math.random()*(1000000-1000)+1000),
                "type" : type[Math.floor(Math.random()*type.length)],
                "rooms": Math.floor(Math.random()*5+1),
                "guests": Math.floor(Math.random()*6+1),
                "checkin": check_in_out[Math.floor(Math.random()*check_in_out.length)],
                "checkout": check_in_out[Math.floor(Math.random()*check_in_out.length)],
                "features" : fun_features(mas_features),
                "description": "",
                "photos": [photos[rand_value_mass[0]-1],photos[rand_value_mass[1]-1],photos[rand_value_mass[2]-1]]
            },
            "location":
            {
                "x": Math.floor(Math.random()*(630-130)+130),
                "y": Math.floor(Math.random()*(630-130)+130)
            }
        }
        mass_objects.push(object);
    }
    return mass_objects;
};

var Fun_create_li_features = function(mas_features,item)
{
    var lu_stroka = "";
    for (var i = 0; i< mas_features[item].offer.features.length ;i++) 
    {
        lu_stroka = lu_stroka + "<li class='feature feature--"+mas_features[item].offer.features[i]+"'></li>"
        
    }; 
    return lu_stroka;
};

var Fun_create_Placemark_DOM = function(DOM,DOM_list,mass_advertisement,items)
{
    for (var i = 0; i<items;i++)
    {
        var New_DOM = DOM.cloneNode(true);
        New_DOM.classList.add("map_pin_button_img");
        New_DOM.id = i;
        New_DOM.querySelector("img").classList.add("map_pin_button_img");
        New_DOM.querySelector("img").id = i;
        New_DOM.style = "left: "+ mass_advertisement[i].location.x +"px; top: "+ mass_advertisement[i].location.y +"px;";
        New_DOM.querySelector("img").src = mass_advertisement[i].author.avatar;
        New_DOM.querySelector("img").alt = mass_advertisement[i].offer.title;
        DOM_list.appendChild(New_DOM);
    }
};

var Fun_create_map_card_DOM = function(DOM,mass_advertisement,item)
{
    var lu_str = Fun_create_li_features(mass_advertisement,item);
    var photos_str = "<li><img src='"+mass_advertisement[item].offer.photos[0]+ "'></li>" + "<li><img src='"+mass_advertisement[item].offer.photos[1]+ "'></li>" +"<li><img src='"+mass_advertisement[item].offer.photos[2]+ "'></li>";
    var New_DOM = DOM.cloneNode(true);
    New_DOM.querySelector(".popup__title").textContent = mass_advertisement[item].offer.title;
    New_DOM.querySelector(".popup__text--address").textContent = mass_advertisement[item].offer.adress;
    New_DOM.querySelector(".popup__type").textContent = mass_advertisement[item].offer.type;
    New_DOM.querySelector(".popup__text--capacity").textContent = mass_advertisement[item].offer.rooms + " комнат/ы для " + mass_advertisement[item].offer.guests + " гостя/гостей";
    New_DOM.querySelector(".popup__text--time").textContent = "Заезд после "+ mass_advertisement[item].offer.checkin + ", выезд до " + mass_advertisement[item].offer.checkout;
    New_DOM.querySelector(".popup__avatar").src = mass_advertisement[item].author.avatar;
    New_DOM.querySelector(".popup__price").textContent = mass_advertisement[item].offer.price +" руб./ночь";
    New_DOM.querySelector(".popup__pictures").innerHTML = "";
    New_DOM.querySelector(".popup__pictures").insertAdjacentHTML( 'beforeend', photos_str);
    New_DOM.querySelector(".popup__features").innerHTML = "";
    New_DOM.querySelector(".popup__features").insertAdjacentHTML( 'beforeend', lu_str);



    return New_DOM;

};
console.log(Fun_create_features(mass_features)); 
console.log(Fun_gen_random_value());
var advertisement = Fun_create_advertisement(8,mass_title,mass_type,mass_check_in_out,Fun_create_features,mass_features,mass_photos,Fun_gen_random_value);
console.log(Fun_create_advertisement(8,mass_title,mass_type,mass_check_in_out,Fun_create_features,mass_features,mass_photos,Fun_gen_random_value));


 


//Fun_create_Placemark_DOM(Copy_PlaceMark_DOM,Map_pins_list_DOM,advertisement,8); 
//var zalupa = Copy_Map_Card_DOM.cloneNode(true); 
//var hui = Fun_create_map_card_DOM(zalupa,advertisement); 
   
  
 
//ads_list_DOM.appendChild(hui).before(".map__filters-container");
ads_list_DOM.classList.remove(".map--faded")
//document.querySelector(".map").classList.remove("map--faded"); 





