function operationInstall(str) {
	containerField.val(containerField.val() + str);
	alert(str);
}

function addVal(str) {
	var currentVal = containerField.val();
	var result = parse(currentVal, str);
	containerField.val(currentVal + str)
}

function backSpace() {
	var val = containerField.val().slice(0, -1);
	containerField.val(val);
	notEmpty();
	updateNumBuffer();
}

function addNumber() {
	ifZeroOnly();

	if(isCalculated && !isOperatorLater) {
		containerField.val("")
		isCalculated = false;
	}
	addVal($(this).text())
}

function isMainOperations(str) {
	switch (str[0]) {
		case "+" : {return true; break;}
		case "-" : {return true; break;}
		case "*" : {return true; break;}
		case "/" : {return true; break;}
		default : return false;
	}
}

function parse(val, str) {
	isMainOperations(str)
	lastSymbol = val[val.length - 1];
}


function addPlus() {addVal("+")}
function addMinus(){addVal("-")}
function addMult() {addVal("*")}
function addDiv()  {addVal("/")}
function addQ1()   {addVal("(")}
function addQ2()   {addVal(")")}
function addDot()  {addVal(".")}
function addSqrt() {addVal("sqrt(")}
function addPow()  {addVal("pow(")}
function addSin()  {addVal("sin(")}

function addMult_() {

	var char = getLastChar();

	if (!isNaN(char))
		addMult();

	if (char == ".") {
		addVal("0");
		addMult();
	}
}

function cQ1() {
	addMult_();
	addQ1();

	isOpenQuote = true;
};

function cQ2() {
	addQ2();

	isOpenQuote = false;
}

function cPlus() {
	if (!isOpenQuote && isOperatorLater) calculate_main();
	addPlus();
	isOperatorLater = true;
}

function cMinus() {
	if (!isOpenQuote && isOperatorLater) calculate_main();
	addMinus();
	isOperatorLater = true;
}

function cMult() {
	if (!isOpenQuote && isOperatorLater) calculate_main();
	addMult();
	isOperatorLater = true;
}

function cDiv() {
	if (!isOpenQuote && isOperatorLater) calculate_main();
	addDiv();
	isOperatorLater = true;
}

function cPi() {
	addMult_();
	addVal(ToFixed(Math.PI, PRESICION))
}

function cSqrt() {
	notEmpty();
	var val = containerField.val();

	updateNumBuffer();

	if (isOperatorLater || isOpenQuote) {
		containerField.val(clearLastNumbers(val))
		addVal(ToFixed(Math.sqrt(getLastNumber()), PRESICION));
		isOperatorLater = true;
	}
	else {
		if (Number(eval(val)) < 0) {
			alert("Решение не входит в область действительных чисел\nКомплексное решение: " + Math.abs(eval(val)) + "i")
			return;
		}
		containerField.val("Math.sqrt(" + val + ")");
		calculate_main();
	}
}

function cPow() {
	notEmpty();
	var val = containerField.val();

	updateNumBuffer();

	containerField.val(clearLastNumbers(val))
	addPow();
	addVal(getLastNumber() + ",")
	isOperatorLater = true;
	isOpenQuote = true;
}

function cSin() {
	updateNumBuffer();

	var val = containerField.val();
	containerField.val(clearLastNumbers(val));

	var x      = getLastNumber();
	if (isGrad) x = x / 180 * Math.PI;
	var result = Math.sin(x);
	result = ToFixed(result, PRESICION)

	if (result > 0)
		addVal(result)
	else if (isOperatorLater) {
		cQ1();
		addVal(result);
		cQ2();
	}
	else
		addVal(result)
}

function cCos() {
	updateNumBuffer();

	var val = containerField.val();
	containerField.val(clearLastNumbers(val));

	var x      = getLastNumber();
	if (isGrad) x = x / 180 * Math.PI;
	var result = Math.cos(x);
	result = ToFixed(result, PRESICION)

	if (result > 0)
		addVal(result)
	else if (isOperatorLater) {
		cQ1();
		addVal(result);
		cQ2();
	}
	else
		addVal(result)
}

function cTg() {
	updateNumBuffer();

	var val = containerField.val();
	containerField.val(clearLastNumbers(val));

	var x      = getLastNumber();
	if (isGrad) x = x / 180 * Math.PI;
	var result = Math.tan(x);
	result = ToFixed(result, PRESICION)

	if (result > 0)
		addVal(result)
	else if (isOperatorLater) {
		cQ1();
		addVal(result);
		cQ2();
	}
	else
		addVal(result)
}

function cCtg() {
	updateNumBuffer();

	var val = containerField.val();
	containerField.val(clearLastNumbers(val));

	var x      = getLastNumber();
	if (isGrad) x = x / 180 * Math.PI;
	var result = 1 / Math.tan(x);
	result = ToFixed(result, PRESICION)

	if (result > 0)
		addVal(result)
	else if (isOperatorLater) {
		cQ1();
		addVal(result);
		cQ2();
	}
	else
		addVal(result)
}

function calculate_main() {
	var val = scan();
	if (isOpenQuote)
		val += ")";

	var ev = eval(val);

	if (ev && isOpenQuote)
		isOpenQuote = false;

	containerField.val(ev);

	isOperatorLater = false;
	isCalculated = true;
}

function addNumToBuffer() {

	if ($(this).hasClass(numbersClassName)) {

		if (!isLastButtonNumber) {
			lastNumberBuffer   = "";
			lastPositionBuffer = containerField.val().length;
		}

		lastNumberBuffer += $(this).text();

		isLastButtonNumber = true;
	}
	else
		isLastButtonNumber = false;

	updateNumBuffer();
}

function updateNumBuffer() {
	lastNumberBuffer = clearLastNumbers(containerField.val(), true);
}

function getLastNumber() {
	return Number(lastNumberBuffer);
}


//
function clearLastNumbers(str, returnDeletePart) {
	var count = 0;
	var isQuote = false;
	var res = "";


	if (str[str.length - 1] == ")")
		isQuote = true;

	count = str.length - 1;

	if(isQuote) count--;

	while (count >= 0) {
		if (!isNaN(str[count]) || str[count] == ".")
			res += str[count];
		else
			break;

		count--;
	}

	res = res.split('').reverse().join('');

	if(isQuote) {
		if(str[count] == "-")
			res = "-" + res;
	}

	if(returnDeletePart) return res;

	if(isQuote)
		return str.substr(0, str.length - res.length - 2);
	else
		return str.substr(0, str.length - res.length);
}

function getLastChar() {
	return containerField.val()[containerField.val().length - 1]
}

function ifZeroOnly() {
	var str = containerField.val();

	if (str.length == 1)
		if(str[0] == "0") {
			containerField.val("");
			return;
		}

	if (str[0] == "0" && !isOperatorLater && str[1] != '.') {
		if (str.length > 1)
			containerField.val(str.substr(1, str.length - 1))
		else
			containerField.val("");
	}
}

function notEmpty() {
	if (containerField.val() == "")
		containerField.val(0);
}

function reset() {
	containerField.val("0");
	lastNumberBuffer = "0"

	isOperatorLater = false;
	isOpenQuote     = false;
}

function scan() {
	var str = containerField.val();

	var pow = "pow";
	var sin = "sin";

	str = replace(pow, fromMath(pow), str)
	str = replace(sin, fromMath(sin), str)

	return str;
}

function replace(search, replace, subject){
	var ra = replace instanceof Array,
		sa = subject instanceof Array,
		l = (search = [].concat(search)).length,
		replace = [].concat(replace),
		i = (subject = [].concat(subject)).length;
	while(j = 0, i--)
		while(subject[i] = subject[i].split(search[j]).join(ra ? replace[j] || "" : replace[0]), ++j < l);
	return sa ? subject : subject[0];
}

function fromMath(str) {
	return "Math." + str;
}

function plusNaMinus(number) {
	if (number < 0) {
		var val = containerField.val();

		if (val[val.length - 1] == "+")
			val[val.length - 1] = "";

		containerField.val(val);
	}
}

function ToFixed(num, n) {
	var str = num.toString();
	var hasDot = false;

	var i;
	for (i = 0; i < str.length; i++)
		if (str[i] == '.') {
			hasDot = true;
			break;
		}

	if (!hasDot) return num;

	var length = str.length - i - 1;

	if (length > n)
		return num.toFixed(n);
	else
		return num;
}

function setRad() {
	isGrad = false;
	containerRad.addClass("on");
	containerGrad.removeClass("on");
}

function setGrad() {
	isGrad = true;
	containerGrad.addClass("on");
	containerRad.removeClass("on");
}

function updateGradsStatus() {
	if(isGrad)
		setGrad();
	else
		setRad();
}

function clearBlock() {
	$(this).parent().parent().remove();
}

function addBlock() {

	var block_title = containerField.val();

	if (block_title.length <= 1)
		if (block_title[0] == "0" || block_title[0] == "" || !block_title[0])
			return;

		calculate_main();
		var block_body  = containerField.val();

		var block = "" +
			"<div class='saved_block'>" +
	"<div class='top_line'>"+
		"<div class='operations_line'>" + block_title + "</div>"+
	   "<div class='clear_block'>x</div>"+
	"</div>"+

		"<div class='field_line'>"+
		   "<div class='button insert_in'>↖</div>"+
			"<input type='text' class='field_saved' value='" + block_body + "'>"+
			"</div>"+
		"</div>";

		containerSettingsBlock.append(block);
}

function insertIn() {
	addMult_();
	addVal($(this).next().val());
}

function resetAllBlocks() {
	$(".saved_block").remove();

	addBlock();
}