

var SIMPLE = true;
var isOperatorLater = false;
var PRESICION = 4;
var lastNumberBuffer = "";
var numbersClassName = "num";
var isLastButtonNumber = false;
var isOpenQuote        = false;
var isGrad             = false;
var lastPositionBuffer = 0;
var isCalculated = false;

// Containers
var containerCalculator;

var containerField;
var containerButtons;
var containerNumbers;
var containerButton_del;

var containerButton_plus;
var containerButton_minus;
var containerButton_mult;
var containerButton_div;
var containerButton_sqrt;
var containerButton_pow;

var containerButton_sin;
var containerButton_cos;
var containerButton_tg;
var containerButton_ctg;
var containerButton_pi;

var containerButton_dot;
var containerButton_q1;
var containerButton_q2;

var containerButton_reset;
var containerButton_equ_main;
var containerButton_equ_add;
var containerButton_equ_radd;

var containerGrad;
var containerRad;

var containerSettingsBlock;
var containerClearBlock;



$(document).ready(function() {

    // Containers
    containerCalculator = $(".calculator")
    containerField   = $("#main_field");
    containerButtons = $(".button");
    containerNumbers = $(".num");
    containerButton_del = $(".del");

    containerButton_plus  = $("#plus");
    containerButton_minus = $("#minus");
    containerButton_mult  = $("#mult");
    containerButton_div   = $("#div");
    containerButton_sqrt  = $("#sqrt");
    containerButton_pow   = $("#pow");

    containerButton_sin   = $("#sin");
    containerButton_cos   = $("#cos");
    containerButton_tg    = $("#tg");
    containerButton_ctg   = $("#ctg");
    containerButton_pi    = $("#pi");

    containerButton_q1  = $("#q1");
    containerButton_q2  = $("#q2");
    containerButton_dot = $("#dot")

    containerButton_reset = $(".reset");
    containerButton_equ_main = $("#equ_main");

    containerGrad = $("#grad");
    containerRad  = $("#rad");

    containerSettingsBlock = $(".settings");
    containerClearBlock = $(".clear_block");

    containerButton_equ_add = $(".equ1");
    containerButton_equ_radd = $(".equ2");

})