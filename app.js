const input=document.getElementById("taskinput");
const button=document.getElementById("addtask")

const tasklist=document.getElementById("tasklist")

button.addEventListener("click",()=>{
    const li=document.createElement("li");
    // li.textContent=input.value;
    tasklist.appendChild(li);

    const span=document.createElement("span")
    span.textContent=input.value;
    li.appendChild(span)

    input.value = "";
    
    const dltbtn=document.createElement("button")
    dltbtn.textContent="DELETE TASK"
    li.appendChild(dltbtn);
    
    const completecheck= document.createElement("input")
    completecheck.type = "checkbox";
    li.appendChild(completecheck)

    const editbtn=document.createElement("button")
    editbtn.textContent="Edit";
    li.appendChild(editbtn)


    let currentelement=span;

    editbtn.addEventListener("click",()=>{

        if(editbtn.textContent==='Edit'){
        console.log(span.textContent)
        const editinput=document.createElement("input")
        editinput.value=currentelement.textContent;
        currentelement.replaceWith(editinput)

        currentelement=editinput;
        editbtn.textContent='save';
    }
    else{
        const newspan=document.createElement("span")
        newspan.textContent=currentelement.value
        currentelement.replaceWith(newspan)

        currentelement=newspan;

        editbtn.textContent='Edit'

        }

    })



    dltbtn.addEventListener("click",()=>{
        li.remove();
    })

    completecheck.addEventListener("change", () => {
    li.classList.toggle("completed");

});

})