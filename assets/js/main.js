"use strict";

let loadTeam = () => {
    let team = [
        {name: 'Neil Pretorius', role: 'Chief Executive Officer', email: 'neilxpretorius@gmail.com', image: 'neil.png'},
        {name: 'Joseph Ogundare', role: 'Chief Operations Officer', email: 'ogundareaduragbemi@gmail.com', image: 'joseph.png'},
        {name: 'Elvis Smart', role: 'Chief Technical Officer', email: 'elvissmart2020@gmail.com', image: 'elvo.png'},
        {name: 'Chinwe Igiri', role: 'Chief Marketing Officer', email: 'chynkemdirim@gmail.com', image: 'chinwe.png'},
        {name: 'Ikeogu Franklin', role: 'Chief Financial Officer', email: 'ikeogufranklin1@gmail.com', image: 'frank.png'},
        {name: 'Nelson Ewelike', role: 'Chief Data Officer', email: 'emekaewelike&gmail.com', image: 'nelson.png'},
        {name: 'Osuji Jeremiah', role: 'Chief Research Officer', email: 'jerryuche87@gmail.com', image: 'jerry.png'},
    ];

    let teamContainer = document.getElementById('team-row');
    let sroot = location.origin + ((location.origin.indexOf('localhost') > -1) ? '/crypto/images/' : '/images/');

    if(page() == 'contact'){

        for (var i = 0; i < team.length; i++) {
            let member = team[i];

            let memberComponent = `
                <div class="col-xl-3 col-lg-3 col-md-6">
                    <div class="single-team text-center mb-120 wow fadeInUp" data-wow-delay=".2s">
                        <div class="team-img mb-20">
                            <img src="${member.image ? sroot + member.image : ''}" alt="">
                            <div class="team-social-links">
                                <ul>
                                    <li style="color: white; font-size: .8rem;">${member.email}</li>
                                </ul>
                            </div>
                            <div class="team-info">
                                <h5>${member.name}</h5>
                                <span>${member.role}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            teamContainer.innerHTML = teamContainer.innerHTML + memberComponent;
        }

    }

    // console.log();
}

if (document.readyState === 'loading') {  // Loading hasn't finished yet
  document.addEventListener('DOMContentLoaded', loadTeam);
} else {  // `DOMContentLoaded` has already fired
  loadTeam();
}

window.onload = function() { window.setTimeout(fadeout, 500); }

function fadeout() {
    document.querySelector('.preloader').style.opacity = '0';
    document.querySelector('.preloader').style.display = 'none';
}

window.onscroll = function() {
    var header_navbar = document.querySelector(".navbar-area");
    var sticky = header_navbar.offsetTop;
    if (window.pageYOffset > sticky) {
        header_navbar.classList.add("sticky");
    } else {
        //header_navbar.classList.remove("sticky");
    }

    var backToTo = document.querySelector(".scroll-top");
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        backToTo.style.display = "block";
    } else {
        backToTo.style.display = "none";
    }
};

new WOW().init();
const countDownClock = (number = 100, format = 'seconds') => {
    const d = document;
    const daysElement = d.querySelector('.days');
    const hoursElement = d.querySelector('.hours');
    const minutesElement = d.querySelector('.minutes');
    const secondsElement = d.querySelector('.seconds');
    let countdown;
    convertFormat(format);

    function convertFormat(format) { switch (format) {
            case 'seconds':
                return timer(number);
            case 'minutes':
                return timer(number * 60);
            case 'hours':
                return timer(number * 60 * 60);
            case 'days':
                return timer(number * 60 * 60 * 24); } }

    function timer(seconds) {
        const now = Date.now();
        const then = now + seconds * 1000;
        countdown = setInterval(() => {
            const secondsLeft = Math.round((then - Date.now()) / 1000);
            if (secondsLeft <= 0) {
                clearInterval(countdown);
                return;
            };

            // displayTimeLeft(secondsLeft);
        }, 1000);
    }

    function displayTimeLeft(seconds) {
        //daysElement.textContent=Math.floor(seconds/86400);
        hoursElement.textContent = Math.floor((seconds % 86400) / 3600);
        minutesElement.textContent = Math.floor((seconds % 86400) % 3600 / 60);
        secondsElement.textContent = seconds % 60 < 10 ? `0${seconds%60}` : seconds % 60;
    }
}

if (window.location.pathname.split('/').pop() == "index.html") { countDownClock(6, "hours"); };

if (location.href.indexOf('contact') > -1) {
    document.getElementById("contact-form").onsubmit = function() { myFunction() };
}

function myFunction() {
    alert("Thanks for your feedback, The customer care team will get back to you");
}

const page = () => {
    return (location.href.split('/').pop()).split('.').shift();
}

document.querySelectorAll(".page-scroll").forEach((e) => {
    e.classList.remove('active');
    if (
    	page() == e.textContent.toLowerCase() || 
    	(page() == 'index' && e.textContent.toLowerCase() == 'home')
    ) {
        e.classList.add('active');
    }
});


var AUSD = {
    currentAccount: null,
    walletButton: document.querySelector('.address-btn'),
    web3: null,

    init(){
        // console.log(this);
        if(window.ethereum){
            this.web3 = new Web3(window.ethereum);
            this.web3.currentProvider.on('accountsChanged', this.handleAccountsChanged);

            if(this.walletButton){
                this.walletButton.addEventListener('click', this.signInOrOut);
            }
        }else{
            console.log('Please install MetaMask');
        }
    },

    addWalletFunc() {
        AUSD.web3.currentProvider.request({ method: 'eth_requestAccounts' })
        .then(AUSD.handleAccountsChanged)
        .catch((err) => {
            if(err.code === 4001){
                window.location.reload();
            }else if(err.code === -32002){
                alert('Wallet connection in progress. kindly complete it to continue');
            }
        });
    },

    signInOrOut(e){
        e.preventDefault();
        AUSD.addWalletFunc();
        // console.log(AUSD.web3);
    },

    handleAccountsChanged(accounts) {
      if (accounts.length === 0) {
        console.log('Please connect to MetaMask.');
      } else if (accounts[0] !== AUSD.currentAccount) {
        AUSD.currentAccount = accounts[0];
        AUSD.accountActive();
        // console.log(AUSD, accounts)
      }
    },

    accountActive(){
        let len = AUSD.currentAccount.length;
        AUSD.walletButton.textContent = AUSD.currentAccount.substr(0, 6) + '...' + AUSD.currentAccount.substr(len - 6, len);
        AUSD.walletButton.style.backgroundColor = 'azure';
        AUSD.walletButton.style.color = '#B8B8B8';
    }



}

AUSD.init();