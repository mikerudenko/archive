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
		130, 134,140,143,

		300, 300, 300, 300,
		300, 320, 340, 360,
		300, 320, 340, 360,
		360, 380, 400, 420,
		360, 380, 400, 420,
		420,420,420,420,
		360,360,360,360,
		300, 320, 340, 360,
		360, 380, 400, 420
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
    		 236,240,242,243,

    		 300,320,340,360,
    		 300,295,290,285,
    		 300,305,310,315,
    		 285,290,295,300,
    		 315,310 ,305,300,
    		 300,320,340,360,
    		 317,337,357,377,
    		 360,366,370,377,
    		 377,370,366,360



    		];
    var i = 0, j = 0;	

    	context.beginPath();

	for(var ind = 0; ind < 32; ind++) {
	    context.moveTo(x[i++],y[j++]);
    		context.bezierCurveTo(x[i++],y[j++],x[i++],y[j++],x[i++],y[j++]);
	}


      context.lineWidth = 5;

      // line color
      context.strokeStyle = 'blue';
      context.stroke();

       canvas = document.getElementById('right');	
	context = canvas.getContext('2d');
	
	var _x, _y;
	var a = [[100,2.8,2.15],[-1,0.155,2.4],[4,0,0]];
	for(var i = 0; i < x.length; i++) {
		_x = x[i];
		_y = y[i];
		x[i] = ((a[0][0] + _x * a[0][1]+ _y * a[0][2]) / 
			(a[2][0] + _x * a[2][1]+ _y * a[2][2]));
		y[i] = ((a[1][0] + _x * a[1][1]+ _y * a[1][2]) /
			(a[2][0] + _x * a[2][1]+ _y * a[2][2]));
	}
	i = 0;
	j = 0;

	context.beginPath();

	for(var ind = 0; ind < 32; ind++) {
	    context.moveTo(x[i++],y[j++]);
    		context.bezierCurveTo(x[i++],y[j++],x[i++],y[j++],x[i++],y[j++]);
	}	

      context.lineWidth = 5;

      // line color
      context.strokeStyle = 'red';
      context.stroke();


};
