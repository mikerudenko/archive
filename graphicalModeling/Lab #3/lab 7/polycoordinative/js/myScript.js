window.onload=function(){
	var canvas = document.getElementById('left');
	var context = canvas.getContext('2d');


var x = [10, 50, 150,155,
		50, 90, 130,155,  
		155, 175, 185,190,
		190, 200,210, 220,
		220, 235,230, 220,
		220,180,205, 140,
		140, 100, 80,50,
		50, 35, 20, 10,
		200, 202,203,204,
		100, 107,110,120,
		110, 112,114,116,
		110, 114,117,120,
		120, 127,130,140,
		130, 134,136,140,
		130, 134,140,143
		];

    var y = [240, 160, 100,125,
    		210, 190, 200,135,
   	 		 125, 120, 105, 90,
    		 90,  80, 80, 90,
    		 90, 95, 93, 100,
    		 100, 130, 190, 220,
    		 220, 230, 235, 210,
    		 210, 215,220,240,
    		 94, 93, 92,91,
    		 230,235,250,240,
    		 242,251,252,253,
    		 242,244,245,246,
    		 224,231,246,236,
    		 236,241,244,250,
    		 236,240,242,243
    		];

    var i = 0, j = 0;

    context.beginPath();

	for(var ind = 0; ind < 32; ind++) {
	    context.moveTo(x[i++],y[j++]);
    		context.bezierCurveTo(x[i++],y[j++],x[i++],y[j++],x[i++],y[j++]);
	}
    /*context.moveTo(x[i++],y[j++]);
    context.bezierCurveTo(x[i++],y[j++],x[i++],y[j++],x[i++],y[j++]);
    context.bezierCurveTo(x[i++],y[j++],x[i++],y[j++],x[i++],y[j++]);
    context.bezierCurveTo(x[i++],y[j++],x[i++],y[j++],x[i++],y[j++]);
    context.bezierCurveTo(x[i++],y[j++],x[i++],y[j++],x[i++],y[j++]);
    context.bezierCurveTo(x[i++],y[j++],x[i++],y[j++],x[i++],y[j++]);
    context.bezierCurveTo(x[i++],y[j++],x[i++],y[j++],x[i++],y[j++]);*/


      context.lineWidth = 4;

      // line color
      context.strokeStyle = 'blue';
      context.stroke();


   context.beginPath();

	var a = [7, -10, -1];
	var b = [-2, -2, -7];
	var c = [-200, 3000, 1000];

	context.lineWidth = 1;
	for(var i = 0; i < a.length; i++) {
	  var X = 0;
	  var Y = (a[i] * 0 + c[i]) / (-b[i]);
	  context.moveTo(X, Y);

	  for(X = 50; X < 500; X += 50) {
	    Y = (a[i] * X + c[i]) / (-b[i]);
	    context.lineTo(X, Y);
	    context.moveTo(X, Y);
	  }
	}
	context.stroke();

       canvas = document.getElementById('right');
	context = canvas.getContext('2d');

   	context.beginPath();

	var A = [5, -11, -2];
	var B = [-5.2, -5.6, -5];
	var C = [-200, 3400, 2000];

	context.lineWidth = 1;
	for(var i = 0; i < a.length; i++) {
	  X = 0;
	  Y = (A[i] * 0 + C[i]) / (-B[i]);
	  context.moveTo(X, Y);

	  for(X = 50; X < 500; X += 50) {
	    Y = (A[i] * X + C[i]) / (-B[i]);
	    context.lineTo(X, Y);
	    context.moveTo(X, Y);
	  }
	}
	context.stroke();

	var _x, _y;

	for(var index = 0; index < x.length; index++) {
		_x = x[index];
		_y = y[index];
		var Dx = 0, Dy = 0, D = 0;
		var Gx = 0, Gy = 0, G = 0;

		for(var i = 0; i < 3; i++) {
		  for(var j = 0; j < 3; j++) {
		    Dx += Math.pow(((A[i] / (a[i] * _x + b[i] * _y + c[i]))
			   - (A[j] / (a[j] * _x + b[j] * _y + c[j]))), 2);

		    Dy += ((A[i] / (a[i] * _x + b[i] * _y + c[i]))
			   - (A[j] / (a[j] * _x + b[j] * _y + c[j])))
			   * ((B[i] / (a[i] * _x + b[i] * _y + c[i]))
				 - (B[j] / (a[j] * _x + b[j] * _y + c[j])));

				D += ((A[i] / (a[i] * _x + b[i] * _y + c[i]))
			   - (A[j] / (a[j] * _x + b[j] * _y + c[j])))
			   * ((C[i] / (a[i] * _x + b[i] * _y + c[i]))
				 - (C[j] / (a[j] * _x + b[j] * _y + c[j])));

				 Gx += ((A[i] / (a[i] * _x + b[i] * _y + c[i]))
 			   - (A[j] / (a[j] * _x + b[j] * _y + c[j])))
 			   * ((B[i] / (a[i] * _x + b[i] * _y + c[i]))
 				 - (B[j] / (a[j] * _x + b[j] * _y + c[j])));

				 Gy += Math.pow(((B[i] / (a[i] * _x + b[i] * _y + c[i]))
 			   - (B[j] / (a[j] * _x + b[j] *_y + c[j]))), 2);

				 G += ((B[i] / (a[i] * _x + b[i] * _y + c[i]))
 			   - (B[j] / (a[j] * _x + b[j] * _y + c[j])))
 			   * ((C[i] / (a[i] * _x + b[i] * _y + c[i]))
 				 - (C[j] / (a[j] * _x + b[j] * _y + c[j])));
		  }
		}

		x[index] =  (-D * Gy - Dy * (-G)) / (Dx * Gy - Dy * Gx);  
		y[index] =  (Dx * (-G) - (-D * Gx)) / (Dx * Gy - Dy * Gx); 
	}
	i = 0;
	j = 0;


	context.beginPath();

	for(var ind = 0; ind < 32; ind++) {
	    context.moveTo(x[i++],y[j++]);
    		context.bezierCurveTo(x[i++],y[j++],x[i++],y[j++],x[i++],y[j++]);
	}	

	/*context.moveTo(x[i++],y[j++]);
	context.bezierCurveTo(x[i++],y[j++],x[i++],y[j++],x[i++],y[j++]);
	context.bezierCurveTo(x[i++],y[j++],x[i++],y[j++],x[i++],y[j++]);
	context.bezierCurveTo(x[i++],y[j++],x[i++],y[j++],x[i++],y[j++]);
	context.bezierCurveTo(x[i++],y[j++],x[i++],y[j++],x[i++],y[j++]);
	context.bezierCurveTo(x[i++],y[j++],x[i++],y[j++],x[i++],y[j++]);
	context.bezierCurveTo(x[i++],y[j++],x[i++],y[j++],x[i++],y[j++]);*/
      context.lineWidth = 4;

      // line color
      context.strokeStyle = 'red';
      context.stroke();


};
