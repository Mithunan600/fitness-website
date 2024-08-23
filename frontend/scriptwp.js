const tabels=document.querySelectorAll(".tabless");
const viewButtons=document.querySelectorAll(".wpbutton");
const followbuttons=document.querySelectorAll(".followwp");


viewButtons.forEach((button,i)=>{
    button.addEventListener("click",()=>{
        tabels.forEach((tabel,ind)=>{
             if(i==ind){
                tabel.classList.toggle("tables-popup");
                console.log(i)
            }
            else{
                tabel.classList.remove("tables-popup");
            }
        });
        if(i==1){
            tabels[2].classList.toggle("tables-popup")
        }
 
        if(i==2){
            tabels[3].classList.toggle("tables-popup")
            tabels[2].classList.remove("tables-popup")

        }
    });
});

followbuttons.forEach((button,i)=>{
    button.addEventListener("click",()=>{
        if(button.classList.contains('unfollow')){
            button.classList.remove("unfollow");
            button.innerText="follow"
        }else{
            button.classList.add("unfollow");
            button.innerText="Unfollow"
        }
    })
})
