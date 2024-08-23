
const viewButtons = document.querySelectorAll(".dpbutton");
const dropdowns = document.querySelectorAll(".dpdropdown");
const followbuttons=document.querySelectorAll(".follow");
const loggedInUserEmail1 = localStorage.getItem('loggedInUserEmail');

viewButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        dropdowns.forEach((dropdown, dropdownIndex) => {
            if (index === dropdownIndex) {
                dropdown.classList.toggle("dpdropdown-popup");
            } else {
                dropdown.classList.remove("dpdropdown-popup");
            }
        });
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

//diet plan 
async function sendDietPlan(planType) {
    if (!loggedInUserEmail) {
        alert("You are not logged in. Please log in first to follow diet plan");
        return;
    }

    try {
        const response = await fetch('http://localhost:4001/user/api/followDietPlan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ planType, userEmail: loggedInUserEmail1 })
        });

        if (response.ok) {
            alert("Diet plan followed successfully and email sent!");
        } else {
            alert("Failed to follow the diet plan.");
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred while following the diet plan.');
    }
}

//sending diet-plan to backend
document.getElementById('a').addEventListener('click', () => {
    const selectedPlanType = 'High-Protein Diet';
    sendDietPlan(selectedPlanType);
});
document.getElementById('b').addEventListener('click', () => {
    const selectedPlanType = 'Balanced Diet'; 
    sendDietPlan(selectedPlanType);
});
document.getElementById('c').addEventListener('click', () => {
    const selectedPlanType = 'Plant-Based or Vegan Diet';
    sendDietPlan(selectedPlanType);
});
