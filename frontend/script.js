const loggedInUserEmail = null;
const signinbut=document.querySelector("#signincard"); 

signinbut.addEventListener("click",()=>{
    const signincard=document.querySelector(".signup");
    signincard.classList.add("signup-popup");
    const cross=document.querySelector("#close");
    cross.addEventListener("click",()=>{
        signincard.classList.remove("signup-popup");
    });
    const signinbutton=document.querySelector("#signinbut");
    signinbutton.addEventListener("click",()=>{
        signincard.classList.remove("signup-popup");
    });
});
const signedincardd=document.querySelector(".signedin");
const signedinbut=document.querySelector("#signedincard");
signedinbut.addEventListener("click",()=>{
    signedincardd.classList.add("signedin-popup");

});
const cross=document.querySelector("#close2");
    cross.addEventListener("click",()=>{
        signedincardd.classList.remove("signedin-popup");
    });
    const signinnbutton=document.getElementById("signinbut1");
    signinnbutton.addEventListener("click",()=>{
        signedincardd.classList.remove("signedin-popup");
    });
const gts=document.querySelector("#getstarted");
gts.addEventListener("click",()=>{
    const signedincardd=document.querySelector(".signedin");
    signedincardd.classList.add("signedin-popup");
});

const  profilecardd=document.querySelector("#profilecard");
const pinfo=document.querySelector(".profileinfo");
profilecardd.addEventListener("click",()=>{
    pinfo.classList.add("profileinfo-popup");
    const crossthird=document.querySelector("#close3");
    crossthird.addEventListener("click",()=>{
        pinfo.classList.remove("profileinfo-popup");
    });
});

const importancecard=document.querySelector("#impofex-card");
const impofexx=document.querySelector(".impofex");
importancecard.addEventListener("click",()=>{
    impofexx.classList.add("impofex-popup");
    const crossfour=document.querySelector("#close4");
    crossfour.addEventListener("click",()=>{
        impofexx.classList.remove("impofex-popup");
    });
});


const abtcard=document.querySelector("#aboutcard");
const abt=document.querySelector(".about");

abtcard.addEventListener("click",()=>{
    abt.classList.add("about-popup");
    const cross5=document.querySelector("#close5");
    cross5.addEventListener("click",()=>{
        abt.classList.remove("about-popup");
    });
});
// log out button implementation

const logout = document.querySelector("#logout");

logout.addEventListener("click", () => {
    const infoDiv = document.querySelector('.profileinfo .info');

    if (infoDiv.innerHTML.trim() === '') {
        alert("You are not logged in. Please log in first.");
    } else {
        clearUserInfo();
        localStorage.setItem(loggedInUserEmail,null);
        alert("Logout successful.");
    }
});

//connection
// auth.js
//sign - up [
document.addEventListener('DOMContentLoaded', () => {
    // Handle sign-in button click
    document.getElementById('signinbut1').addEventListener('click', async () => {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const fullname = document.getElementById('name').value;
      const weight = document.getElementById('weight').value;
      const height = document.getElementById('height').value;

      const response = await fetch('http://localhost:4001/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({fullname,height,weight, email, password })
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        displayUserInfo(data.user);
        localStorage.setItem(loggedInUserEmail, data.user.email);
        alert('Login successful');
    } else {
        console.log(data);
        alert(data.message || 'Login failed');
    }
    });
  });
  
//  ]
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('signinbut').addEventListener('click', async () => {
        const email = document.getElementById('emai').value;
        const password = document.getElementById('passwor').value;

        if (!email || !password) {
            alert('Please fill in both fields');
            return;
        }

        try {
            const response = await fetch('http://localhost:4001/user/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                console.log(data);
                displayUserInfo(data.user);
                localStorage.setItem(loggedInUserEmail, data.user.email);
                alert('Login successful');
            } else {
                console.log(data);
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An unexpected error occurred');
        }
    });
});

function displayUserInfo(user) {
    const infoDiv = document.querySelector('.profileinfo .info');
    if (user) {
        infoDiv.innerHTML = `
            <h3>Name: ${user.fullname || 'Not specified'}</h3>
            <h3>Email: ${user.email || 'Not specified'}</h3>
            <h3>Height: ${user.height || 'Not specified'}</h3>
            <h3>Weight: ${user.weight || 'Not specified'}</h3>
            <h3>BMI: ${ (user.weight/user.height) || 'Not specified'}</h3>
            <h3>Diet plan : ${'High protien Diet'}</h3>
            <h3>workout plan: ${'Full body plan'}</h3>

        `;
        document.querySelector('.profileinfo').style.display = 'block';
    } else {
        console.error('User object is undefined or null');
    }
}
 
function clearUserInfo() {
    const infoDiv = document.querySelector('.profileinfo .info');
    infoDiv.innerHTML = '';
    document.querySelector('.profileinfo').style.display = 'none';
}

  

  //AI
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchButton').addEventListener('click', async () => {
        const prompt = document.getElementById('searchInput').value;

        try {
            const response = await fetch('http://localhost:4001/user/ai-query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            document.getElementById('responseText').innerHTML = data.data;
            document.getElementById('popup1').style.display = 'flex'; // Show the popup
        } catch (error) {
            console.error('Error:', error.message);
            document.getElementById('responseText').innerText = 'Error: ' + (error.message || 'Something went wrong');
            document.getElementById('popup1').style.display = 'flex'; // Show the popup even on error
        }
    });
});




//pop up  close
function closePopup1() {
    const popup = document.getElementById('popup1'); // Ensure element exists
    if (popup) {
        popup.style.display = 'none'; // Hide the popup if found
    } else {
        console.error("Popup element not found."); // Log an error if element not found
    }
}

