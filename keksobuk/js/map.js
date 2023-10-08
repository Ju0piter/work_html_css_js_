console.log("hui");

var Copy_PlaceMark_DOM = document.querySelector("#map__card__templade").content.querySelector(".map__pin");
var Map_pins_list_DOM = document.querySelector(".map__pins");

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
    "palace", "flat", "house","bungalo"
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
console.log(Fun_create_features(mass_features));
console.log(Fun_gen_random_value());
var advertisement = Fun_create_advertisement(8,mass_title,mass_type,mass_check_in_out,Fun_create_features,mass_features,mass_photos,Fun_gen_random_value);
console.log(Fun_create_advertisement(8,mass_title,mass_type,mass_check_in_out,Fun_create_features,mass_features,mass_photos,Fun_gen_random_value));



console.log(Copy_PlaceMark_DOM);

Fun_create_Placemark_DOM(Copy_PlaceMark_DOM,Map_pins_list_DOM,advertisement,8);

