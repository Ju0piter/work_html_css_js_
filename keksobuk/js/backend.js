(function(){


    var URL_load = "https://24.javascript.pages.academy/keksobooking/data";
    var URL_upload = "https://24.javascript.pages.academy/keksobooking";
    window.backend = {
    "load" : function(onLoad,onError)
    {
        var xhr = new XMLHttpRequest(); 
        xhr.responseType = "json";
        xhr.timeout = 10000;
        xhr.addEventListener("load", function()
        {
            if(xhr.status === 200)
            {
                onLoad(xhr.response);
            }
    
            else
            {
                onError("ошибка статус: " + xhr.status + " " + xhr.statusText); 
            }
            
            
        });
        xhr.addEventListener("error", function()
        {
            onError("ошибка соединения");
        })
        xhr.addEventListener("timeout", function()
        {
            onError("timeout");
        })
        xhr.open("GET", URL_load);
        xhr.send();
    
    
    },
    "save" : function(data,onLoad,onError)
    {
        var xhr = new XMLHttpRequest(); 
        xhr.responseType = "json";
        xhr.timeout = 10000;
        xhr.addEventListener("load", function()
        {
            if(xhr.status === 200)
            {
                onLoad(xhr.response);
                alert("Успешно!");
            }
    
            else
            {
                onError("ошибка статус: " + xhr.status + " " + xhr.statusText); 
            }
        });
        xhr.addEventListener("error", function()
        {
            onError("ошибка соединения");
        })
        xhr.addEventListener("timeout", function()
        {
            onError("timeout");
        })
        xhr.open("POST", URL_upload);
        xhr.send(data);
    
    
    
    
    }}
    
    })();