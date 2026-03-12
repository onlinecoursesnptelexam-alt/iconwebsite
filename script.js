const captions = [

"You look like moonlight wrapped in elegance",
"Your smile makes everything brighter",
"You look magical in this moment",
"You are pure elegance",
"There is something unforgettable in your eyes",
"Your charm is impossible to ignore",
"You look stunning in every way",
"You shine like sunshine in every frame",
"Your presence feels wonderful",
"You look like a beautiful dream",
"You inspire smiles without even trying",
"Your eyes tell a mesmerizing story",
"You carry grace so naturally",
"You are effortlessly adorable",
"You look lovely beyond words",
"Your glow is truly radiant",
"You make everything look amazing",
"Your smile is incredibly special",
"You are my favorite person in every moment ❤️"
];

const container = document.getElementById("heartContainer");

for(let i=1;i<=19;i++){

let heart=document.createElement("div");

heart.className="heart";

heart.innerHTML=`<span>${i}</span>`;

heart.onclick=()=>openImage(i);

container.appendChild(heart);

}

function toggleAudio(){
let player=document.getElementById("musicPlayer");
let control=document.getElementById("audioControl");

if(player.paused){
player.play();
control.textContent="❚❚";
}else{
player.pause();
control.textContent="▶";
}

}

function openImage(num){

// Track heart click
trackHeartClick(num);

// Hide special message and gift box when heart is clicked
hideGiftMessage();

let viewer=document.getElementById("viewer");
viewer.style.display="flex";
setTimeout(()=>viewer.classList.add("show"),10);

document.getElementById("mainImage").src="images/CHIKU"+num+".jpeg";

document.getElementById("captionPath").textContent=captions[num-1];

let player=document.getElementById("musicPlayer");
let visualizer=document.getElementById("audioVisualizer");
let control=document.getElementById("audioControl");

player.src="music/song"+num+".mpeg";
player.play().catch(e => console.log("Audio play failed:", e));
visualizer.classList.remove("hidden");
control.textContent="❚❚";

}

function hideGiftMessage(){
const message = document.getElementById("specialMessage");
const giftWrapper = document.querySelector(".gift-wrapper");
if(message){
message.classList.remove("show");
}
if(giftWrapper){
giftWrapper.style.opacity = "0.3";
giftWrapper.style.pointerEvents = "none";
}
}

function trackHeartClick(heartNumber){
console.log('Tracking heart click:', heartNumber);

// Save to localStorage (100% reliable)
const clicks = JSON.parse(localStorage.getItem('heartClicks') || '[]');
clicks.push({
  heartNumber: heartNumber,
  timestamp: new Date().toISOString(),
  userAgent: navigator.userAgent
});
localStorage.setItem('heartClicks', JSON.stringify(clicks));

console.log('Stored to localStorage:', clicks[clicks.length - 1]);
console.log('Total clicks stored:', clicks.length);

// Use the correct Form ID and entry ID from your HTML
const formId = '1VkSgVwC9PDVtsuXv7owG_ZLkLci2Rw_QFhVb9w3CV30';
const url = `https://docs.google.com/forms/u/0/d/e/${formId}/formResponse`;

// Use the actual entry ID from your form data: 1483474202
const entryId = 'entry.1483474202';
const data = `${entryId}=${encodeURIComponent(heartNumber)}&submit=Submit`;

fetch(url, {
  method: 'POST',
  mode: 'no-cors',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: data
}).then(() => {
  console.log('Google Form submitted successfully for heart:', heartNumber);
}).catch(err => {
  console.log('Google Form failed (data is safe in localStorage):', err);
});
}

function toggleMessage(){
const message = document.getElementById('specialMessage');
message.classList.toggle('show');
}

function closeViewer(){
let viewer=document.getElementById("viewer");
viewer.classList.remove("show");
setTimeout(()=>{
viewer.style.display="none";
},500);

let player=document.getElementById("musicPlayer");
let visualizer=document.getElementById("audioVisualizer");
let control=document.getElementById("audioControl");

player.pause();
player.currentTime=0;
visualizer.classList.add("hidden");

// Show gift box again when viewer is closed
const giftWrapper = document.querySelector(".gift-wrapper");
if(giftWrapper){
giftWrapper.style.opacity = "1";
giftWrapper.style.pointerEvents = "auto";
}
}
