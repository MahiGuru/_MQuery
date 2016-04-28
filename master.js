_M(document).domReady(function(){

});
_M("#myID").insertBefore("<h2>Heading come Before </h2>");

_M("#myID").insertAfter("<h2>Heading comes After</h2>");

_M("#myID").next().append("<p>Adding Text from NEXT</p>");

_M("#myID").prev().append("<p>Adding Text from PREV</p>");

var arr = [
    {
        name: "Maks"
    }, {
        name: "lucky"
    }, {
        name: "mahi"
    }
];
_M.each(arr, function(val, i) {
    console.log(val);
})

_M(".myspan").each(function(val, i) {
    _M(val).addClass("grey");
})

_M("h2").click(function(){
  console.log(this);
  _M(this).addClass("blue");
});

_M(".inputName").blur(function(item){
  console.log("blur", _M(this).val());
});

_M(".inputName").mouseup(function(item){
  console.log("mouseup", this)//_M(this).val());
});

_M(".inputName").mousedown(function(item){
  console.log("mousedown", this)//_M(this).val());
});

_M(".inputName").mousemove(function(item){
//  console.log("mousemove", this)//_M(this).val());
});

_M(".inputName").keydown(function(event){
  console.log("keydown",event, event.keyCode)
});

_M(".inputName").keyup(function(event){
  console.log("keyup",event)
});

_M(".inputName").keypress(function(event){
  console.log("keypress",event)
});

_M(".lastName").focusin(function(event){
  console.log("focusin",event)
});

_M(".lastName").focusout(function(event){
  console.log("focusout",event)
});

_M(".dblClickBtn").dblClick(function(){
  console.log(this);
  _M(this).addClass("blue");
});
 
console.log(_M(".inputName").clone());

console.log(_M("#myID").lastChild());

_M(".selectName").change(function(event){
  console.log("Change", _M(this).val());
});


console.log("height ------ ", _M("#myID").height());
console.log("width ------ ", _M("#myID").width());















console.log(_M("#myID").children(".myspan"));

_M(".addBtn").click(function(){
    _M("#myID").append("<h2>Added text from Click</h2>");
});
//_M("#myID").find(".myClass1").find(".insideMySpan .insideInsideMySpan .insideInsideInsideMySpan").addClass("red");
_M("#myID").find(".myClass1").find(".insideMySpan").addClass("red");

_M("#myID").next().hide().prev().addClass("red");
_M("#myID").next().show().next().addClass("blue");
