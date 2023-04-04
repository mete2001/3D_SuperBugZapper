// Vertex shader program
var VSHADER_SOURCE =
    'attribute vec3 position;' +
    'uniform mat4 Pmatrix;'+ // projection matrix
    'uniform mat4 Vmatrix;'+ // view matrix
    'uniform mat4 Mmatrix;'+ // model matrix
    'attribute vec3 color;'+ // the color of the vertex
    'varying vec3 vColor;'+
  'void main() {\n' +
    'gl_Position = Pmatrix * Vmatrix * Mmatrix * vec4(position, 1.0);\n' +
    'vColor = color;'+
  '}\n';
  
// Fragment shader program
var FSHADER_SOURCE =
    'precision mediump float;'+
    'varying vec3 vColor;'+
  'void main() {\n' +
  '  gl_FragColor = vec4(vColor,1.0);\n' +
  '}\n';
  var red_status=true;
  var blue_status=true;
  var purple_status=true;
  var yellow_status=true;
  var green_status=true;

  var mo_matrix;
  var THETA = 0;
    var PHI = 0;
    var GROWING_RATE=3;
    var game_points=0;
var player_points=0;
var counter=0;
    
function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  //var gl = getWebGLContext(canvas);
  var gl = canvas.getContext("webgl", {preserveDrawingBuffer: true});


  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }
 
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }
  
  // Set the vertex information
  

  // Set the clear color and enable the depth test
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);
  // Clear color and depth buffer
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  

  var proj_matrix = new Matrix4();          
  // Specify the viewing volume - define the projection matrix
  proj_matrix.setPerspective(60, canvas.width/canvas.height,1, 100); //you can change the parameters to get the best view
   
  mo_matrix=[1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
  // mo_matrix=xRotate(mo_matrix,1.5708);
 


  
  
  var view_matrix = [ 1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1 ];
  view_matrix[14] = view_matrix[14]-6; // view matrix - move camera away from the object
  
 
  
  //var n = initVertexBuffers(gl,30,0,0);
  

  // Set the fragment color
  var u_FragColor = gl.getAttribLocation(gl.program, 'color');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
    }
   
    
    //gl.clearColor(0, 0, 0, 1);
  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
  
   

    // Draw the sphere
    //draw(gl,n,proj_matrix,view_matrix);
    currentSize=0;
    var a1=Math.floor(Math.random()*360);
    var b1=Math.floor(Math.random()*360);
    var a2=Math.floor(Math.random()*360);
    var b2=Math.floor(Math.random()*360);
    var a3=Math.floor(Math.random()*360);
    var b3=Math.floor(Math.random()*360);
    var a4=Math.floor(Math.random()*360);
    var b4=Math.floor(Math.random()*360);
    var a5=Math.floor(Math.random()*360);
    var b5=Math.floor(Math.random()*360);

    var tick = function() {
      if (currentSize<30){
      currentSize = animate(currentSize);
      //alert(5);
      }
      else{
        if(counter<5){
        
        document.getElementById("score").innerHTML = "Bacteria Win!"}}
    
    canvas.onmousedown = function(ev){ click(ev, gl, canvas,currentSize); };
   
      
      //alert(currentSize);
      mo_matrix=[1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];

        mo_matrix=yRotate(mo_matrix,THETA);
        mo_matrix=xRotate(mo_matrix,PHI);
        
        var growth=Math.floor(currentSize);
       // var n = initVertexBuffers(gl,growth,0,0);

        
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        // Clear color and depth buffer
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        var n=initVertexBuffers(gl,2,180,0,0,0,1,1);
        draw(gl,n,proj_matrix,view_matrix);
        if (red_status){
         n=initVertexBuffers(gl,2.001,growth,a1,b1,1,0,0);
        draw(gl,n,proj_matrix,view_matrix);
        }
        if(yellow_status){
        n=initVertexBuffers(gl,2.002,growth,a2,b2,1,1,0);
        draw(gl,n,proj_matrix,view_matrix);
        }
        if (blue_status){
        n=initVertexBuffers(gl,2.003,growth,a3,b3,0,0,1);
        draw(gl,n,proj_matrix,view_matrix);}
        if(purple_status){
        n=initVertexBuffers(gl,2.004,growth,a4,b4,1,0,1);
        draw(gl,n,proj_matrix,view_matrix);}
        if(green_status){
        n=initVertexBuffers(gl,2.005,growth,a5,b5,0,1,0);
        draw(gl,n,proj_matrix,view_matrix);}


        requestAnimationFrame(tick, canvas);
      
      
    }
    tick();


    var dragging = false;
    var lastClientX, lastClientY;
    canvas.addEventListener("mousedown", function(e) {

      
      lastClientX = e.clientX;
      lastClientY = e.clientY;
      var xcenter=310;
      var ycenter=310;
      var rad=140;
     // if(Math.pow(lastClientX-xcenter,2)+Math.pow(lastClientY-ycenter,2)<=Math.pow(rad,2))
//{
      dragging = true;

     // alert(lastClientX);
     // alert(lastClientY);
//}
    });
    
    canvas.addEventListener("mousemove", function(e) {
      if (dragging) {
        var dX = e.clientX - lastClientX;
        var dY = e.clientY - lastClientY;
        var degreeX= dX*180/280;
        var radianX= degreeX*(Math.PI/180.0);
        var degreeY=dY*180/280;
        var radianY=degreeY*(Math.PI/180.0);
        THETA+=radianX;
        PHI+=radianY;
        
        
       // mo_matrix=[1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];

       // mo_matrix=yRotate(mo_matrix,THETA);
       // mo_matrix=xRotate(mo_matrix,PHI);

        lastClientX = e.clientX;
        lastClientY = e.clientY;
       // draw(gl,n,proj_matrix,view_matrix);
      
      }
    });
    canvas.addEventListener("mouseup", function(e) {

      dragging = false;

    });
    
   
    }
    var g_last = Date.now();
function animate(size) {
  // Calculate the elapsed time
  var now = Date.now();
  var elapsed = now - g_last;
  g_last = now;
  // Update the current size (adjusted by the elapsed time)
  var newSize = size + (GROWING_RATE * elapsed) / 1000.0;
  return newSize;
}

function draw(gl,n,proj_matrix,view_matrix){

  _Pmatrix = gl.getUniformLocation(gl.program, "Pmatrix");
  _Vmatrix = gl.getUniformLocation(gl.program, "Vmatrix");
  _Mmatrix = gl.getUniformLocation(gl.program, "Mmatrix");
  // Pass the projection matrix to _Pmatrix
  gl.uniformMatrix4fv(_Pmatrix, false, proj_matrix.elements);
  gl.uniformMatrix4fv(_Vmatrix, false, view_matrix);
  gl.uniformMatrix4fv(_Mmatrix, false, mo_matrix);

 // gl.clearColor(1, 1, 1, 1);
  // Clear <canvas>
  //gl.clear(gl.COLOR_BUFFER_BIT);
  
   

    // Draw the sphere
    gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_SHORT, 0);
}

function click(ev, gl, canvas, currentSize) {
 // gl = canvas.getContext("webgl", {preserveDrawingBuffer: true});
 //var ctx= document.getElementById('my_Canvas').getContext('2d');
  var xL = ev.pageX; // x coordinate of a mouse pointer
  var yL = ev.pageY;
 

  var pixels=new Uint8Array(4);
  
//pixels[0]=3;
//alert(xL);
  gl.readPixels(
   
    xL-10,
    600-yL+10,
    1,
    1,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    pixels
  );
  console.log(xL+" "+yL)
  console.log(pixels);
  if (currentSize<30){
  if(pixels[0]==255&&pixels[1]==255)
  {yellow_status=false;
  counter++;}
  else if(pixels[0]==255&&pixels[2]==255)
  {purple_status=false;
  counter++;}
  else if(pixels[0]==255)
  {red_status=false;
  counter++;}
  else if(pixels[1]==255&&pixels[2]!=255)
  {green_status=false;
  counter++;}
  else if(pixels[1]!=255&&pixels[2]==255)
  {blue_status=false;
  counter++}}
  if(counter==5&&currentSize<30){
    document.getElementById("score").innerHTML = "You Win!"
  }
 
  //alert(pixels);
  //alert(5);
}
 


    function initVertexBuffers(gl,rad,growth,ALPHA,BETA,r,g,b) {
     // alert(growth);
     var sin_a=Math.sin(ALPHA*Math.PI/180.0);
     var cos_a=Math.cos(ALPHA*Math.PI/180.0);
     var sin_b=Math.sin(BETA*Math.PI/180.0);
     var cos_b=Math.cos(BETA*Math.PI/180.0);
    // Create a sphere
    var SPHERE_DIV = 180;
   
      var i, ai, si, ci;
      var j, aj, sj, cj;
      var p1, p2;
    
      var vertices = [];
      var colors = [];
    
      for (j = 0; j <= growth; j++) {
        aj = j * Math.PI / SPHERE_DIV;
        sj = rad*Math.sin(aj);
        cj = rad*Math.cos(aj);
        for (i = 0; i <= SPHERE_DIV; i++) {
          ai = i * 2 * Math.PI / SPHERE_DIV;
          si = Math.sin(ai);
          ci = Math.cos(ai);

          x_= si * sj;
          y_=cj;
          z_=ci * sj;

          x__=x_;
          y__=y_*cos_a-z_*sin_a;
          z__=y_*sin_a+z_*cos_a;

          x=x__*cos_b+z__*sin_b;
          y=y__;
          z=-x__*sin_b+z__*cos_b
    
          vertices.push(x);  // x
          vertices.push(y);       // y
          vertices.push(z);  // z
    
          colors.push(r);  // r
          colors.push(g);  // g
          colors.push(b);  // b
          colors.push(1);  // a
        }
      }
      
      var indices = [];
      for (j = 0; j < growth; j++) {
        for (i = 0; i < SPHERE_DIV; i++) {
          p1 = j * (SPHERE_DIV+1) + i;
          p2 = p1 + (SPHERE_DIV+1);
    
          indices.push(p1);
          indices.push(p2);
          indices.push(p1 + 1);
    
          indices.push(p1 + 1);
          indices.push(p2);
          indices.push(p2 + 1);
        }
      }

      var FSIZE = vertices.BYTES_PER_ELEMENT;
    // Write the vertex coordinates and color to the buffer object
  if (!initArrayBuffer(gl, new Float32Array(vertices), 3, gl.FLOAT, 'position',FSIZE*6,0))
  return -1;

if (!initArrayBuffer(gl, new Float32Array(colors), 4, gl.FLOAT, 'color',FSIZE*6,FSIZE*3))
  return -1;
     
      var indexBuffer = gl.createBuffer();
      if (!indexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
      }
    
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    
      return indices.length;
    }
    


    function initArrayBuffer(gl, data, num, type, attribute,stride,offset) {
      var buffer = gl.createBuffer();   // Create a buffer object
      if (!buffer) {
        console.log('Failed to create the buffer object');
        return false;
      }
      // Write date into the buffer object
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      // Assign the buffer object to the attribute variable
      var a_attribute = gl.getAttribLocation(gl.program, attribute);
      if (a_attribute < 0) {
        console.log('Failed to get the storage location of ' + attribute);
        return false;
      }
      gl.vertexAttribPointer(a_attribute, num, type, false, stride, offset);
      // Enable the assignment of the buffer object to the attribute variable
      gl.enableVertexAttribArray(a_attribute);
    
      return true;
    }



    function multiply(a, b) {
      var a00 = a[0 * 4 + 0];
      var a01 = a[0 * 4 + 1];
      var a02 = a[0 * 4 + 2];
      var a03 = a[0 * 4 + 3];
      var a10 = a[1 * 4 + 0];
      var a11 = a[1 * 4 + 1];
      var a12 = a[1 * 4 + 2];
      var a13 = a[1 * 4 + 3];
      var a20 = a[2 * 4 + 0];
      var a21 = a[2 * 4 + 1];
      var a22 = a[2 * 4 + 2];
      var a23 = a[2 * 4 + 3];
      var a30 = a[3 * 4 + 0];
      var a31 = a[3 * 4 + 1];
      var a32 = a[3 * 4 + 2];
      var a33 = a[3 * 4 + 3];
      var b00 = b[0 * 4 + 0];
      var b01 = b[0 * 4 + 1];
      var b02 = b[0 * 4 + 2];
      var b03 = b[0 * 4 + 3];
      var b10 = b[1 * 4 + 0];
      var b11 = b[1 * 4 + 1];
      var b12 = b[1 * 4 + 2];
      var b13 = b[1 * 4 + 3];
      var b20 = b[2 * 4 + 0];
      var b21 = b[2 * 4 + 1];
      var b22 = b[2 * 4 + 2];
      var b23 = b[2 * 4 + 3];
      var b30 = b[3 * 4 + 0];
      var b31 = b[3 * 4 + 1];
      var b32 = b[3 * 4 + 2];
      var b33 = b[3 * 4 + 3];
      return [
        b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
        b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
        b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
        b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
        b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
        b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
        b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
        b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
        b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
        b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
        b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
        b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
        b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
        b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
        b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
        b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
      ];
    }

    function xRotation(angleInRadians) {
      var c = Math.cos(angleInRadians);
      var s = Math.sin(angleInRadians);
  
      return [
        1, 0, 0, 0,
        0, c, s, 0,
        0, -s, c, 0,
        0, 0, 0, 1,
      ];
    }

    function yRotation(angleInRadians) {
      var c = Math.cos(angleInRadians);
      var s = Math.sin(angleInRadians);
  
      return [
        c, 0, -s, 0,
        0, 1, 0, 0,
        s, 0, c, 0,
        0, 0, 0, 1,
      ];
    }
  
     function zRotation(angleInRadians) {
      var c = Math.cos(angleInRadians);
      var s = Math.sin(angleInRadians);
  
      return [
         c, s, 0, 0,
        -s, c, 0, 0,
         0, 0, 1, 0,
         0, 0, 0, 1,
      ];
    }

     function xRotate(m, angleInRadians) {
      return multiply(m, xRotation(angleInRadians));
    }
  
     function yRotate(m, angleInRadians) {
      return multiply(m, yRotation(angleInRadians));
    }
  
     function zRotate(m, angleInRadians) {
      return multiply(m, zRotation(angleInRadians));
    }

     function projection(width, height, depth) {
      // Note: This matrix flips the Y axis so 0 is at the top.
      return [
         2 / width, 0, 0, 0,
         0, -2 / height, 0, 0,
         0, 0, 2 / depth, 0,
        -1, 1, 0, 1,
      ];
    }