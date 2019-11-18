/**31.02.2015
*Created by Balionezio
*Passed 
*Lab 2 chmo
*/

//Block of constants
	var
		a=0.2,
		b=3.0,
		y0=0,
		h0=0.2,
		h1=h0/5,
		h2=h0/25,
		eps=0.0001,
		arrayError1=[],
		arrayError2=[],
		arrayError3=[];

//Presize value of function
	function presireFunc(x){
		return (Math.pow(x,2)-1)/2;
	}

//My function
	function myFunc(x,y){
		return (y+Math.sqrt(Math.pow(x,2)+Math.pow(y,2)))/x;
	}

//Производная функция
	function functionderivative(x,y,h){
		return -1+60/137*h*((y/Math.sqrt(y*y+x*x)+1)/x);
	}

//Up function
	function functionup(a,b,c,x,y) {
		return (-y+c+b*myFunc(x,y));
	}


//FunctionNut
	function functionNut(a,b,c,x,y,h) {
		return (y - functionup(a,b,c,x,y)/functionderivative(x,y,h));
	}


//Ньютон
	function Nuton(h,x,y,x0,yArray){
		var
			ylast = 5,
			ynew = 6,
			a=y,
			b=60*h/137,
			c=(300*yArray[4]-300*yArray[3]+200*yArray[2]-75*yArray[1]+12*yArray[0])/137;
			ylast = functionNut(a,b,c,x,y,h);
			ynew = functionNut(a,b,c,x,ylast,h);
		while(true) {
			ylast = ynew;
			ynew = functionNut(a,b,c,x,ylast,h);
			if (Math.abs(ylast-ynew)<0.0001)
				break;
		}
		return ynew;
	}




//Method of Runge-Kutt
	function rungeKut(h,y,x){
		var k0 = h*myFunc(x,y),
			k1 = h*myFunc(x+1/4*h,y+1/4*k0),
			k2 = h*myFunc(x+3/8*h,y+3/32*k0+9/32*k1),
			k3 = h*myFunc(x+12/13*h,y+1932/2197*k0-7200/2197*k1+7296/2197*k2),
			k4 = h*myFunc(x+h,y+439/216*k0-8*k1+3680/513*k2-845/4104*k3),
			k5 = h*myFunc(x+h/2,y-8/27*k0+2*k1-3544/2565*k2+1859/4104*k3-11/40*k4);
		return y+16/135*k0+6656/12825*k2+28561/56430*k3-9/50*k4+2/55*k5;
	}

/*	function rungeKut(h,y,x){
		var k1 = h*myFunc(x,y),
			k2 = h*myFunc(x+h/2,y+k1/2),
			k3 = h*myFunc(x+h/2,y+k2/2),
			k4 = h*myFunc(x+h,y+k3);
		return y+(1/6)*(k1+2*k2+2*k3+k4);
	}*/

//Create header of table and first pole

	function headerFirstpoleTable(idtable){
		//Header of table
				$('<tr>\
						<td>X</td>\
						<td>Y(Xk)</td>\
						<td>Yk</td>\
						<td>D</td>\
						<td>(D/Y(Xk))*100</td>\
				</tr>')
					.appendTo($(idtable));
	}

	//Main function
		function main(h,idchart,idtable,flag,arrayEr){

			var
				y=presireFunc(a),
				j=1,
				i=1,
				arrayOfY=[],
				aMethodEyler=[],
				yk=presireFunc(a),
				aPresizeFunc=[],
				ykPlus1=0,
				aError=[0],
				aAbsError=[],
				aOfX=[],
				arrayTheoreticalError=[];


				arrayOfY.push(presireFunc(a));

			//Шапка таблицы
			headerFirstpoleTable(idtable);
			aPresizeFunc.push(presireFunc(a));
			aMethodEyler.push(presireFunc(a));
			aOfX.push(a);

			//вывод первой строки
			$('<tr>\
					<td>'+a+'</td>\
					<td> '+yk+'</td>\
					<td>\n '+yk+'</td>\
					<td>'+0+'</td>\
					<td>'+0+'</td>\
				</tr>')
				.appendTo($(idtable));

			for(var x=a+h;x<b+h;x+=h) {

				//занос икса в массив
				aOfX.push(x);
				if(i<5) {

					y=arrayOfY[arrayOfY.length-1];

					arrayOfY.push(rungeKut(h,y,x-h));
					i++;

					//Точное вычисление функциии
					aPresizeFunc.push(presireFunc(x));

					//Вычысление погрешности метода Ейлера и относительной погрешности и относительно теоретической погрешности
					aError.push(aPresizeFunc[aPresizeFunc.length-1]-aMethodEyler[aMethodEyler.length-1]);
					aAbsError.push(Math.abs(aError[aError.length-1]/aPresizeFunc[aPresizeFunc.length-1]*100));

					//вывод одной записи
					$('<tr>\
							<td>'+x+'</td>\
							<td> '+aPresizeFunc[aPresizeFunc.length-1]+'</td>\
							<td>\n '+arrayOfY[arrayOfY.length-1]+'</td>\
							<td>\n '+aError[aError.length-1]+'</td>\
							<td>'+aAbsError[aAbsError.length-1]+'</td>\
						</tr>')
						.appendTo($(idtable));
						//alert("Xyq0");
						aMethodEyler.push(arrayOfY[arrayOfY.length-1]);


				} else {
					aPresizeFunc.push(presireFunc(x));
					y = Nuton(h,x+h,y,x,arrayOfY);
						arrayOfY[0] = arrayOfY[1];
						arrayOfY[1] = arrayOfY[2];
						arrayOfY[2] = arrayOfY[3];
						arrayOfY[3] = arrayOfY[4];
						arrayOfY[4] = y;
						aMethodEyler.push(y);

						//Вычысление погрешности метода Ейлера и относительной погрешности и относительно теоретической погрешности
						aError.push(aPresizeFunc[aPresizeFunc.length-1]-aMethodEyler[aMethodEyler.length-1]);
						aAbsError.push(Math.abs(aError[aError.length-1]/aPresizeFunc[aPresizeFunc.length-1]*100));

				//вывод одной записи
				$('<tr>\
						<td>'+x+'</td>\
						<td> '+aPresizeFunc[aPresizeFunc.length-1]+'</td>\
						<td>\n '+y+'</td>\
						<td>\n '+aError[aError.length-1]+'</td>\
						<td>'+aAbsError[aAbsError.length-1]+'</td>\
					</tr>')
					.appendTo($(idtable));

				}

			}

			arrayEr.push([0.2,0])
			for(var i=0;i<aAbsError.length;i++) {
				arrayEr.push([aOfX[i+1],aAbsError[i]]);
			}


		//I do this, because for better looking on graphs
			for(var i=0;i<aOfX.length;i++){
				aOfX[i]=aOfX[i].toFixed(1);
			}

		//Draw gpaph
				var chart = new Chartist.Line(idchart, {
					labels: aOfX,
					series: [
						aPresizeFunc,
						aMethodEyler//,
						//arrayRungeKut
					]
				}, {
					high: 4,
					low: -0.5,
					axisY: {
						labelInterpolationFnc: function(value){
							return value.toFixed(2);
						}}
				});
		}


window.addEventListener("load",function() {

		main(h0,'.ct-chart1','#table1',true,arrayError1),
		main(h1,'.ct-chart2','#table2',true,arrayError2),
		main(h2,'.ct-chart3','#table3',true,arrayError3);

		console.log(arrayError1);
		//Draw gpaph
		$.plot($("#cha"), [arrayError1,arrayError2,arrayError3], {
			yaxis: { min: 0, max: 100 },
			xaxis: { min: 0, max: 3 }
		});


},false);
