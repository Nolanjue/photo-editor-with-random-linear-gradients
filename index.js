

const previewImg = document.querySelector('.preview-image img')
let filterPercent = document.querySelector('.filter-info .value')







const container = document.querySelector('.container');
const filter = document.querySelectorAll('.filter .options button')
const filterName = document.querySelector('.filter-info .name')
const filterSlider = document.querySelectorAll('.slider input')





container.classList.add('container-disable')

filterName.innerText = ''

for(let slider of filterSlider){
    slider.style.display='none'
}


let chooseImg = document.querySelector('.choose-image')
const fileInput = document.querySelector('.file-input')


chooseImg.addEventListener('click', ()=> 
    fileInput.click()//clicks this element(file-input) input to select image
)




//'change' represents selecting a file
fileInput.addEventListener('change', () => {
    let file = fileInput.files[0];//let the users chose image file be selected 
    console.log(file)
    previewImg.src = URL.createObjectURL(file);//creates url of file, displays in previewImage
    container.classList.remove('container-disable')
})




function getFilter(_this) {
    //reset all buttons, so that the only one being selected is the desired feature
    for(let type of filter) {
        type.classList.remove('active')
    }

    for(let slider of filterSlider){
        slider.style.display='none'
    }


    _this.classList.add('active')
    currentSlider = document.getElementById(_this.innerText)//trying to get the current slider that matches the desired button
    currentSlider.style.display = 'flex'
    filterName.innerText = _this.innerText//set filtername to equal the selected current button
    //innerText = innerHTML if only text, and if innerHTML is a p tag or like it 


    filterPercent.innerText =`${currentSlider.value}%`;//gets the value of the filter percent(will be starting value)


    brightness = document.getElementById('brightness')
    saturation = document.getElementById('saturation')
    grayscale= document.getElementById('grayscale')
    inversion = document.getElementById('inversion')
    opacity = document.getElementById('opacity')
    sepia = document.getElementById('sepia')
    contrast = document.getElementById('contrast')
    


    currentSlider.addEventListener('input', ()=> {//eventlisteners dont store data.
        filterPercent.innerText =`${currentSlider.value}%`;
        //listens for input event only, only changes the current percent to the new percent.
    
    
        previewImg.style.filter= `brightness(${brightness.value}%) saturate(${saturation.value}%)
        invert(${inversion.value}%) grayscale(${grayscale.value}%) opacity(${opacity.value}%) 
        sepia(${sepia.value}%) contrast(${contrast.value}%)`
    })


}
let rotate = 0, horizontal = 1, vertical = 1;
function Rotate(_this){
    _this.addEventListener('click', ()=>{
        if (_this.id === 'rotate-left'){//identifying the current button by id
            rotate -=90
        }
        else if(_this.id === 'rotate-right'){
            rotate +=90
        }
        else if(_this.id === 'horizontal') {
            horizontal = (horizontal === 1 ? -1 : 1);
        }
        else {
            vertical = (vertical === 1 ? -1 : 1);
        }

        previewImg.style.transform = `rotate(${rotate}deg) scale(${horizontal}, ${vertical})`

    })
}

function Reset() {
    brightness.value = 100;  
    saturation.value = 100;
    contrast.value = 100;
    inversion.value = 0;
    grayscale.value = 0;
    opacity.value = 100;
    sepia.value = 0;

    let rotate = 0, horizontal = 1, vertical = 1;

    previewImg.style.filter= `brightness(${brightness.value}%) saturate(${saturation.value}%)
    invert(${inversion.value}%) grayscale(${grayscale.value}%) opacity(${opacity.value}%) 
    sepia(${sepia.value}%) contrast(${contrast.value}%)`
    
    previewImg.style.transform = `rotate(${rotate}deg) scale(${horizontal}, ${vertical})`

    
}


function Save(){
    //need to create a canvas because we need to create another image with the filters applied
   const canvas = document.createElement('canvas');
   const context = canvas.getContext('2d');//basically the design of the canvas image.
   canvas.width = previewImg.width;
   canvas.height = previewImg.height;
   context.filter= `brightness(${brightness.value}%) saturate(${saturation.value}%)
   invert(${inversion.value}%) grayscale(${grayscale.value}%) opacity(${opacity.value}%)
   sepia(${sepia.value}%) contrast(${contrast.value}%)`

   //to get center: divide by 2
   context.translate(canvas.width / 2, canvas.height / 2);

   if (rotate != 0) {
    context.rotate(rotate * Math.PI /180)
   }

   context.scale(horizontal, vertical)
   context.drawImage(previewImg, -canvas.width /2, -canvas.height /2 , canvas.width, canvas.height);


   const link = document.createElement('a');
   link.download = 'image.jpg';
   
   link.href = canvas.toDataURL('image/jpeg');//downloads the new canvas url via link.href */
   link.click()
}






/*just some fun with linear gradients */


//my attempt at randomization:

body = document.querySelector('body');



const gradientList = 
    ['to top left',
    'to top right',
    'to bottom left',
    'to bottom right']



//get random index of the list

const randomGradient = (list = []) => {

    const randomIndex = Math.floor(Math.random() * list.length)
    const color1 = Math.floor(Math.random()* 256)
    const color2 = Math.floor(Math.random()* 256)
    const color3 = Math.floor(Math.random()* 256)
    const color4 = Math.floor(Math.random()* 256)
    const color5 = Math.floor(Math.random()* 256)
    const color6 = Math.floor(Math.random()* 256)
    let style =  `linear-gradient(${list[randomIndex]}, rgb(${color1}, ${color2},${color3}), rgb(${color4}, ${color5},${color6}) ) `
    return style //gets the random index and sets it as the function  value.
}

let continueFunction = true;

//need to leave it to access the entire scope.

//current problem: i cant set clearoutimeout without id, otherwise wont work

function cycleGradients(){
    if (!continueFunction) {
        clearTimeout(timerId)//need to clear timeout, as its still calling the function recursively.
        return ''//exits out of function, so function is stopped, and no operation is done further, this was causing a few errors, as operation was still continuing as no given value set. so make sure you define a null value to completely exit out.  
    }
    gradient = randomGradient(gradientList);
    body.style.background = gradient;
    let timerId = setTimeout(cycleGradients, 20000);
    //recursively calls, so it keeps calling it infinitely, should be the same as calling setTimeout outside the function, but the latter has errors.
}


cycleGradients();



function Switch(_this) {
   if(_this.innerText === 'Start color Transitions') {
        _this.innerText = 'Stop color Transitions'
        continueFunction = true;
        cycleGradients()
   }
   else{
        _this.innerText = 'Start color Transitions'
        continueFunction = false;
        cycleGradients()
   }

}

