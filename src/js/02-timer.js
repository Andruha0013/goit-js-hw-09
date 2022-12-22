import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Report } from 'notiflix/build/notiflix-report-aio';
const refs={
    datetimePicker: document.querySelector("#datetime-picker"),
    startBtn:       document.querySelector("[data-start]"),
    daysOut:        document.querySelector("[data-days"),
    hoursOut:       document.querySelector("[data-hours]"),
    minutesOut:     document.querySelector("[data-minutes]"),
    secondsOut:     document.querySelector("[data-seconds]"),
};
const myTimerOptions={
    timeMS: 0,
    timerdecrement:1000,
    timerID: null,
};

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        myTimerOptions.timeMS=comparisonCurentDate(selectedDates[0]);
        if(myTimerOptions.timeMS!==false){
            refs.startBtn.removeAttribute("disabled");
        }
        else
        {
            //alert("Please choose a date in the future");
            Report.failure(
                'the date is not valid',
                'Please choose a date in the future',
                'Okay',
            );
        }
    },
};

function comparisonCurentDate(DateForComparison){
    const currentDate=new Date();
    //console.log(`currentDate= ${currentDate}`);
    if(currentDate<=DateForComparison)
    {
        return DateForComparison-currentDate;
    }
    else
    {
        return false;
    }
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value,maxLength)
{
    return value.toString().padStart(maxLength,"0");
}


function myTimer(){
    if(myTimerOptions.timeMS<=0)
    {
        clearInterval(myTimerOptions.timerID);
        refs.startBtn.setAttribute("disabled","disabled");
        return false;
    }
    let outTime=convertMs(myTimerOptions.timeMS);
    //console.log(myTimerOptions.timeMS);
    refs.daysOut.textContent=addLeadingZero(outTime.days,2);
    refs.hoursOut.textContent=addLeadingZero(outTime.hours,2);
    refs.secondsOut.textContent=addLeadingZero(outTime.seconds,2);
    refs.minutesOut.textContent=addLeadingZero(outTime.minutes,2);
    myTimerOptions.timeMS=myTimerOptions.timeMS-myTimerOptions.timerdecrement;
}

flatpickr(refs.datetimePicker,options);

window.addEventListener("load",()=>{
    refs.startBtn.setAttribute("disabled","disabled");
});

refs.startBtn.addEventListener("click",()=>{
    if(myTimerOptions.timeMS!==false)
    {
        myTimerOptions.timerID=setInterval(myTimer,1000);
    }
});