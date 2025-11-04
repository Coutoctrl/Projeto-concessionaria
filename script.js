const cars=[
{name:"Honda Civic",img:"https://via.placeholder.com/250x150?text=Honda+Civic",brand:"Honda",type:"Sedan"},
{name:"Hyundai HB20",img:"https://via.placeholder.com/250x150?text=Hyundai+HB20",brand:"Hyundai",type:"Hatch"},
{name:"Ford Ka",img:"https://via.placeholder.com/250x150?text=Ford+Ka",brand:"Ford",type:"Hatch"},
{name:"Chevrolet Onix",img:"https://via.placeholder.com/250x150?text=Chevrolet+Onix",brand:"Chevrolet",type:"Hatch"},
{name:"Honda Fit",img:"https://via.placeholder.com/250x150?text=Honda+Fit",brand:"Honda",type:"Hatch"},
{name:"Hyundai Tucson",img:"https://via.placeholder.com/250x150?text=Hyundai+Tucson",brand:"Hyundai",type:"SUV"},
{name:"Toyota Corolla",img:"https://via.placeholder.com/250x150?text=Toyota+Corolla",brand:"Toyota",type:"Sedan"},
{name:"Nissan Versa",img:"https://via.placeholder.com/250x150?text=Nissan+Versa",brand:"Nissan",type:"Sedan"}];

const carousel=document.getElementById('carousel');
const modal=document.getElementById('modal');
const modalImg=document.getElementById('modal-img');
const searchInput=document.getElementById('search-input');
const searchResults=document.getElementById('search-results');
const brandFilter=document.getElementById('brand-filter');
const typeFilter=document.getElementById('type-filter');
const scrollTopBtn=document.getElementById('scroll-top');
const loginBtn=document.getElementById('login-btn');
let visibleCars=0;

function getFilteredCars(){
return cars.filter(car=>{
let brandMatch=!brandFilter.value||car.brand===brandFilter.value;
let typeMatch=!typeFilter.value||car.type===typeFilter.value;
return brandMatch && typeMatch;
});
}

function loadCars(filteredCars=getFilteredCars()){
const nextCars=filteredCars.slice(visibleCars,visibleCars+4);
nextCars.forEach(car=>{
const div=document.createElement('div');
div.className='car-card';
const img=document.createElement('img');
img.src=car.img;
img.alt=car.name;
div.appendChild(img);
carousel.appendChild(div);
img.addEventListener('click',()=>{
modal.style.display='flex';
modalImg.src=img.src;
});
});
visibleCars+=4;
}

function resetCarousel(){
carousel.innerHTML='';
visibleCars=0;
loadCars();
}

brandFilter.addEventListener('change',resetCarousel);
typeFilter.addEventListener('change',resetCarousel);

window.addEventListener('scroll',()=>{
if(window.innerHeight+window.scrollY>=document.body.offsetHeight-100){
if(visibleCars<getFilteredCars().length) loadCars();
}
scrollTopBtn.style.display=(window.scrollY>200)?'block':'none';
});

modal.addEventListener('click',()=>{modal.style.display='none';modalImg.src='';});

scrollTopBtn.addEventListener('click',()=>{window.scrollTo({top:0,behavior:'smooth'});});

searchInput.addEventListener('input',()=>{
const query=searchInput.value.toLowerCase();
searchResults.innerHTML='';
if(query){
const filtered=cars.filter(car=>car.name.toLowerCase().includes(query));
filtered.forEach(car=>{
const div=document.createElement('div');
div.textContent=car.name;
div.addEventListener('click',()=>{
searchResults.innerHTML='';
searchInput.value=car.name;
const carImg=Array.from(document.querySelectorAll('.car-card img')).find(img=>img.alt===car.name);
if(carImg) carImg.scrollIntoView({behavior:'smooth',inline:'center'});
});
searchResults.appendChild(div);
});
}
});

loginBtn.addEventListener('click',()=>{
const email=document.getElementById('email').value;
const password=document.getElementById('password').value;
if(email&&password){
alert(`Login realizado com sucesso!\nEmail: ${email}`);
}else{
alert('Preencha email e senha');
}
});

// Inicializa carrossel
loadCars();