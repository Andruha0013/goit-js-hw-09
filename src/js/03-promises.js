import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs={
  form:   document.querySelector(".form"),
};


refs.form.addEventListener("submit",(event)=>{
  event.preventDefault();

  let formData=getInputFormData(refs.form);

  for(let i=0;i<formData.amount;i++)
  {
    createPromise(i, formData.delay)
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    formData.delay+=formData.step;
    //console.log(`delay=${typeof formData.delay}`);
  }

});



function getInputFormData(form){
  let inputsData={};
  for(key in form.elements)
  {
    if(form.elements[key].tagName=="INPUT")
    {
      console.log(`key=${key}, val=${form.elements[key].tagName}`);
      console.log(form.elements[key].value);
      try{
        inputsData[form.elements[key].name]=Number(form.elements[key].value);
      }
      catch(error)
      {
        console.log(`error=${error.name} message=${error.message}`);
        console.log(error.stack);
      }
    }
    
  }
  return inputsData;
}

function createPromise(position, delay) {
  //--------------create--promise------------------
  const promise=new Promise((resolve,reject)=>{
    setTimeout(()=>{
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        
        resolve({"position":position,"delay":delay});
      } else {
        // Reject
        reject({"position":position,"delay":delay});
      }
    },delay);
  });
  //----------------the--end--of--creating--promise----------------
  return promise;
}