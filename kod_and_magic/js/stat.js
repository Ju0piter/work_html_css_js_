var x = 100;
var y = 10;
var X_coordinate = 420;
var Y_coordinate = 270;
var otstup = 50;
var СhartWidth = 40;

var value_per_1px = function(value){
    var per_1px = value/150;
    return per_1px;
}
var max_value = function(mass_times){
    var max_time = mass_times[0];
    for (i=0;i<mass_times.length;i++) {
        
        if (mass_times[i]> max_time)
        {
            max_time = mass_times[i];
        }

    }
    return max_time;
}

var otrisovka = function(ctx,x,y,X_coordinate, Y_coordinate, color,) {
    ctx.fillStyle = color;
    
    ctx.fillRect(x,y,X_coordinate,Y_coordinate);
    
}

var otrisovka_color = function(value){
    var color = "rgba(0,0,255," + value / 150 + ")";
    console.log(color);
    return color;

}



window.renderStatistics = function(ctx,times,names){
//console.log("zdarova")

otrisovka(ctx,x+10, y+10, X_coordinate,Y_coordinate,"rgba(0,0,0,0.3)");
otrisovka(ctx,x, y, X_coordinate,Y_coordinate,"rgba(255,255,255,1)");
ctx.fillStyle = "#000";
ctx.font = "16px PT Mono";
ctx.fillText("Ура вы победили!",230,35);
ctx.fillStyle = "#000";
ctx.font = "16px PT Mono";
ctx.fillText("Список результатов:",220,55);
var max_time = max_value(names);
var px1 = value_per_1px(max_time);

for (i=0;i<names.length;i++){

if (times[i] == "Вы"){
    otrisovka(ctx,(x+otstup+(i*otstup)+(i*СhartWidth)),(150-names[i]/px1)+95, СhartWidth,names[i]/px1,"rgba(255,0,0,1)");
ctx.fillStyle = "#000";
ctx.fillText(times[i],(x+otstup+(i*otstup)+(i*СhartWidth)),265);
ctx.fillText(Math.trunc(names[i]),(x+otstup+(i*otstup)+(i*СhartWidth)),(150-names[i]/px1)+90);
}
else{
    otrisovka(ctx,(x+otstup+(i*otstup)+(i*СhartWidth)),(150-names[i]/px1)+95, СhartWidth,names[i]/px1,otrisovka_color(names[i]/px1));
ctx.fillStyle = "#000";
ctx.fillText(times[i],(x+otstup+(i*otstup)+(i*СhartWidth)),265);
ctx.fillText(Math.trunc(names[i]),(x+otstup+(i*otstup)+(i*СhartWidth)),(150-names[i]/px1)+90);

}

//otrisovka(ctx,238, 60, 50,200,"rgba(0,0,0,1)","");
//otrisovka(ctx,332, 60, 50,200,"rgba(0,0,0,1)",""); 
//otrisovka(ctx,426 ,60, 50,200,"rgba(0,0,0,1)","");
}
console.log(max_value(names));

console.log(names);
 



 
};