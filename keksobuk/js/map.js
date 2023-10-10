console.log("hui");

var Copy_PlaceMark_DOM = document.querySelector("#map__card__templade").content.querySelector(".map__pin");
var Map_pins_list_DOM = document.querySelector(".map__pins");
var Copy_Map_Card_DOM = document.querySelector("#map__card__templade").content.querySelector(".map__card");
var ads_list_DOM = document.querySelector(".map");


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

var Fun_create_li_features = function(mas_features)
{
    var lu_stroka = "";
    for (var i = 0; i< mas_features[0].offer.features.length ;i++) 
    {
        lu_stroka = lu_stroka + "<li class='feature feature--"+mas_features[0].offer.features[i]+"'></li>"
        
    }; 
    console.log(mas_features[0].offer.features);
    return lu_stroka;
        
    
};

var Fun_create_Placemark_DOM = function(DOM,DOM_list,mass_advertisement,items)
{
    for (var i = 0; i<items;i++)
    {
        var New_DOM = DOM.cloneNode(true);
        New_DOM.style = "left: "+ mass_advertisement[i].location.x +"px; top: "+ mass_advertisement[i].location.y +"px;";
        New_DOM.querySelector("img").src = mass_advertisement[i].author.avatar;
        New_DOM.querySelector("img").alt = mass_advertisement[i].offer.title;
        DOM_list.appendChild(New_DOM);
    }
};

var Fun_create_map_card_DOM = function(DOM,mass_advertisement)
{
    var lu_str = Fun_create_li_features(mass_advertisement);
    var photos_str = "<li><img src='"+mass_advertisement[0].offer.photos[0]+ "'></li>" + "<li><img src='"+mass_advertisement[0].offer.photos[1]+ "'></li>" +"<li><img src='"+mass_advertisement[0].offer.photos[2]+ "'></li>";
    var New_DOM = DOM.cloneNode(true);
    New_DOM.querySelector(".popup__title").textContent = mass_advertisement[0].offer.title;
    New_DOM.querySelector(".popup__text--address").textContent = mass_advertisement[0].offer.adress;
    New_DOM.querySelector(".popup__type").textContent = mass_advertisement[0].offer.type;
    New_DOM.querySelector(".popup__text--capacity").textContent = mass_advertisement[0].offer.rooms + " комнат/ы для " + mass_advertisement[0].offer.guests + " гостя/гостей";
    New_DOM.querySelector(".popup__text--time").textContent = "Заезд после "+ mass_advertisement[0].offer.checkin + ", выезд до " + mass_advertisement[0].offer.checkout;
    New_DOM.querySelector(".popup__avatar").src = mass_advertisement[0].author.avatar;
    New_DOM.querySelector(".popup__price").textContent = mass_advertisement[0].offer.price +" руб./ночь";
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


 


Fun_create_Placemark_DOM(Copy_PlaceMark_DOM,Map_pins_list_DOM,advertisement,8); 
var zalupa = Copy_Map_Card_DOM.cloneNode(true); 
var hui = Fun_create_map_card_DOM(zalupa,advertisement); 
   
  
 
ads_list_DOM.appendChild(hui).before(".map__filters-container");   
document.querySelector(".map").classList.remove(".map--faded");
    



