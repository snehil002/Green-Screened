let cnv;

let original;
let result;
let edited = false;
let ri, gi, bi, ai, rf, gf, bf, af;
let cnvWidth;


function windowResized(){
  if(windowWidth <= 600){
    cnvWidth = 0.98 * windowWidth;
  }
  else if (windowWidth <= 900) {
    cnvWidth = 0.7 * windowWidth;
  }
  else {
    cnvWidth = 0.5 * windowWidth;
  }
  
  resizeCanvas(cnvWidth, select("#cnvDiv").height);
}

function setup() {
  pixelDensity(1);

  if(windowWidth <= 600) {
    cnvWidth = 0.98 * windowWidth;
  }
  else if (windowWidth <= 900) {
    cnvWidth = 0.7 * windowWidth;
  }
  else {
    cnvWidth = 0.5 * windowWidth;
  }

  cnv = createCanvas(cnvWidth, select("#cnvDiv").height);
  cnv.parent("#cnvDiv");

  let fileInput = select("#fileInput").elt;
  fileInput.addEventListener("change", (event)=>{
    let selectedFile = event.target.files[0];
    edited = false;
    select("#loadedImageDiv").html("");

    if(selectedFile){
      console.log(selectedFile);
    
      if(selectedFile.type === "image/png" || selectedFile.type === "image/jpg" || selectedFile.type === "image/jpeg") {
        let url = URL.createObjectURL(selectedFile);
        original = loadImage(url);
        let x = createImg(url, "Original Input Image");
        x.class("input-image");
        x.parent("loadedImageDiv");
        showInputImage();
      }
      else {
        select("#loadedImageDiv").html("Wrong File! Sorry!");
      }

    }
    else {
      select("#loadedImageDiv").html("");
    }
  });

  let editButton = select("#editButton");
  editButton.mouseClicked(() => {
    if(original){
      edited = true;
      console.log(original);
      result = createGraphics(original.width, original.height);
      // resizeCanvas(cnvWidth, select("#cnvDiv").height);
      
      original.loadPixels();
      result.loadPixels();
      
      let civ = select("#initialColorInput").value();
      let cfv = select("#finalColorInput").value();
      
      ri = parseInt(civ.substring(1,3), 16);
      gi = parseInt(civ.substring(3,5), 16);
      bi = parseInt(civ.substring(5,7), 16);
      ai = select("#alphaI").value();
      rf = parseInt(cfv.substring(1,3), 16);
      gf = parseInt(cfv.substring(3,5), 16);
      bf = parseInt(cfv.substring(5,7), 16);
      af = select("#alphaF").value();

      // let arr = selectAll(".colors");
      // ri = arr[0];
      // gi = arr[1];
      // bi = arr[2];
      // ai = arr[3];
      // rf = arr[4];
      // gf = arr[5];
      // bf = arr[6];
      // af = arr[7];

      const rmin = Math.min(ri, rf),
      gmin = Math.min(gi, gf),
      bmin = Math.min(bi, bf),
      amin = Math.min(ai, af),
      rmax = Math.max(ri, rf),
      gmax = Math.max(gi, gf),
      bmax = Math.max(bi, bf),
      amax = Math.max(ai, af);
      
      // let isArrValid = validateArr(arr);
      // let errDiv = select("#errDiv");
      // if(isArrValid == -1){
      //   errDiv.html("Initial color should be less than final color!");
      //   return;
      // }else{
      //   errDiv.html("");
      // }

      // function validateArr(arrf){
      //   for(let i=0; i<4; i++){
      //     let isValid = validate(arrf[i].value(), arrf[i+4].value());
      //     if(!isValid) return -1;
      //   }
      //   return 1;
      // }
      
      // function validate(a, b){
      //   return a <= b;
      // }
      
      for (let j = 0; j < original.height; j++) {
        for (let i = 0; i < original.width; i++) {
          //choose index of pixels array from original image normally as always
          let index = (i + j * original.width) * 4;
          let red = original.pixels[index];
          let green = original.pixels[index + 1];
          let blue = original.pixels[index + 2];
          let alpha = original.pixels[index + 3];
          
          //brightness = average of all 4 colors in one pixel
          // let br = (red + green + blue ) / 3;

          //apply colors from 'original' image to 'result' image
          if(!(red >= rmin && red <= rmax && green >= gmin && green <= gmax && 
            blue >= bmin && blue <= bmax && alpha >= amin && alpha <= amax )) {
            result.pixels[index] = red;
            result.pixels[index + 1] = green;
            result.pixels[index + 2] = blue;
            result.pixels[index + 3] = alpha;
          }
        }
      }
      original.updatePixels();
      result.updatePixels();
      showOutputImage();
    }
  });   

  /*
  * pixel density means how many pixels in 1 pixel.
  * what is pixel density of image vs of screen ?
  * how to do with original pixel density ?
  * result contained 2 pictures with original pixel density
  * result size increased if done following:
  */

  
  let sb = select('#saveButton');
  sb.mouseClicked(() => {
    if(result){
      save(result, 'painting', 'png');
    }
  });
  imageMode(CENTER);

}


function showInputImage() {
  select("#loadedImageDiv").addClass("flex");
  select("#loadedImageDiv").removeClass("display-none");

  select("#cnvDiv").removeClass("display-block");
  select("#cnvDiv").addClass("display-none");
  resizeCanvas(cnvWidth, select("#cnvDiv").height);
}

function showOutputImage() {
  select("#loadedImageDiv").addClass("display-none");
  select("#loadedImageDiv").removeClass("flex");

  select("#cnvDiv").removeClass("display-none");
  select("#cnvDiv").addClass("display-block");
  resizeCanvas(cnvWidth, select("#cnvDiv").height);
}



function draw(){
  // background(221, 160, 221);
  if(result && edited){
    let imgWidth = result.width;
    let maxWidth = width;
    let imgHeight = result.height;
    let maxHeight = height;
    let ratio = imgWidth / imgHeight;

    if (imgWidth > maxWidth) {
      imgWidth = maxWidth;
      imgHeight = imgWidth / ratio;
    }
    if (imgHeight > maxHeight) {
      imgHeight = maxHeight;
      imgWidth = imgHeight * ratio;
    }
    image(result, width/2, height/2, imgWidth, imgHeight);
  }
}