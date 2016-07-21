console.log("Running...");

var progress = 0;

var progressx = {
    
  0:"Pesant",
  10:"Farmer",
  20:"Knight",
  30:"Nobelmen",
  40:"Monarch",
  50:"Pope"
   
};

load();
function load()
{
    console.log("Getting Sample... ");
    
    $.get("sample.xml",function(e){
        console.log("Opening Sample... ");
        $xml = $(e);
        console.log($xml.find("shape1").html());
        $("body").append($xml.find("shape1").html());
        
        
         var stats = JSON.parse(localStorage.getItem("stats"));
    
        if(stats != null || promptInfo())
            updateProgress(JSON.parse(localStorage.stats).progress);
        
    });
}

function promptInfo(){
    
    var name = "";
    do{
        name = prompt("Please enter your name: ", "Your Name Here");
    }while(!nameIsValid(name));
    progress = 0;
    
    localStorage.setItem("stats",JSON.stringify({name:name,progress:0}));
    
    return true;
}

function nameIsValid(name){
    return (name != "Your Name Here" &&  name != "");
}

function adaptSize(){
    console.log("change");
    var w = $(document).width();
    
    $("#progress").attr({width:((r(w*.69))*((progress)/100)), height:r(w*.12), y:r(w*.1)});
    $("#shape1").attr({width:r(w*.71), height:r(w*.36)});
    $("#border").attr({width:r(w*.71), height:r(w*.36)});
    $("#name").attr({x:r(r(w*.05)), y:r(w*.05)});
    $("#status").attr({x:r(r(w*.35)), y:r(w*.05)});
    
}

function updateProgress(x){
    progress = x;

    
    adaptSize();
    
    $("#status").text("Status: "+getStatus());
    $("#name").text("Name: "+JSON.parse(localStorage.stats).name);
    $("#pro").text(progress+"%");
}
                        
function r(num){
        
        return Math.round(num);
}

function getStatus(){
    
    return progressx[Math.round(progress/20)*10];
    
}

