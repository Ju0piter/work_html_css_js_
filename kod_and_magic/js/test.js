(function(){


var URL = "https://24.javascript.pages.academy/code-and-magick/data";
window.backend = {
"load" : function(onLoad,onError)
{
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("GET", URL);
    xhr.addEventListener("load", function()
    {
        console.log(xhr.response);
    });
    // xhr.addEventListener("error", function()
    // {
    //     onError(xhr.response);
    // })
    xhr.send();


},
"save" : function(data,onLoad,onError)
{




}}

})();