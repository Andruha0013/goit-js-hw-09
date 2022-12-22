const refs={
    body:     document.querySelector("body"),
    startBtn: document.querySelector("[data-start]"),
    stopBtn:  document.querySelector("[data-stop]"),
};
let timerID=null;

refs.startBtn.addEventListener("click",()=>{
    refs.stopBtn.removeAttribute("disabled");
    refs.startBtn.setAttribute("disabled","disabled");
    timerID=setInterval(()=>{changeColor(getRandomHexColor(),refs.body);},1000);
});

refs.stopBtn.addEventListener("click",(event)=>{
    refs.startBtn.removeAttribute("disabled");
    refs.stopBtn.setAttribute("disabled","disabled");
    console.log(refs.startBtn);
    clearInterval(timerID);
});

function changeColor(color,element){
    element.setAttribute("style",`background-color:${color}`);
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}