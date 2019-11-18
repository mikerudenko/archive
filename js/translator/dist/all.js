"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Compiler = function () {
    function Compiler(poliz, labels) {
        _classCallCheck(this, Compiler);

        this.poliz = poliz;
        this.labels = labels;
        this.stack = [];
        this.programContext = {};
        this.hasErrors = false;
        this.fromLetters = /[a-z]+/;
        this.isLabel = /m[0-9]+/;
        this.isNumber = /[0-9]+/;
    }

    _createClass(Compiler, [{
        key: "assignOperation",
        value: function assignOperation() {
            var assignPart = this.stack.pop(),
                variable = this.stack.pop();
            this.programContext[variable] = assignPart;
            console.log(this.programContext);
        }
    }, {
        key: "inspectRead",
        value: function inspectRead() {
            var variable = this.stack.pop();
            this.programContext[variable] = parseInt(prompt("Please, enter variable " + variable + ": "));
        }
    }, {
        key: "inspectWrite",
        value: function inspectWrite() {
            var variable = this.stack.pop();
            //alert("Value of the variable " + variable + ": " + this.programContext[variable]);
            giveError("Value of the variable " + variable + ": " + this.programContext[variable]);
        }
    }, {
        key: "logicalArifmeticalOperation",
        value: function logicalArifmeticalOperation(operation) {
            var rightPart = this.stack.pop(),
                leftPart = this.stack.pop();

            //Inspect of the variables
            if (typeof rightPart != "number") {
                rightPart = this.programContext[rightPart];
            }

            if (typeof leftPart != "number") {
                leftPart = this.programContext[leftPart];
            }

            console.log("****************Operands*****************");
            console.log("Right part" + rightPart);
            console.log("Left part" + leftPart);
            console.log("****************Operands*****************");

            //Error hadling here-----------------------------------------------------------------------/
            if (rightPart == undefined || rightPart == undefined) {
                this.hasErrors = true;
                giveError("Uninitialized variable in your code");
                return;
            }

            //Error hadling here-----------------------------------------------------------------------/

            switch (operation) {
                case ">=":
                    return leftPart >= rightPart;
                    break;
                case "<=":
                    return leftPart <= rightPart;
                    break;
                case "==":
                    return leftPart == rightPart;
                    break;
                case "<>":
                    return leftPart != rightPart;
                    break;
                case ">":
                    return leftPart > rightPart;
                    break;
                case "<":
                    return leftPart < rightPart;
                    break;
                case "-":
                    return leftPart - rightPart;
                    break;
                case "+":
                    return leftPart + rightPart;
                    break;
                case "*":
                    return leftPart * rightPart;
                    break;
                case "/":
                    return leftPart / rightPart;
                    break;
                case "^":
                    return Math.pow(leftPart, rightPart);
                    break;
            }
        }
    }, {
        key: "compile",
        value: function compile() {
            for (var i = 0; i < this.poliz.length; i++) {

                //Inspetion of the element from letters
                if (this.poliz[i] !== "Write" && this.poliz[i] !== "Read" && this.poliz[i].search(this.fromLetters) !== -1) {
                    //Inspection of the label
                    if (this.poliz[i].search(this.isLabel) !== -1) {
                        console.log("Label: " + this.poliz[i]);
                        //Inspection of the If statement
                        if (this.poliz[i + 1] == "УПЛ") {
                            console.log("equals UPL");
                            var booleanValue = this.stack.pop();
                            if (!booleanValue) {
                                var label = this.poliz[i],
                                    index = i + 2;
                                while (true) {
                                    if (label == this.poliz[index] && ":" == this.poliz[index + 1] && index < this.poliz.length) {
                                        break;
                                    }
                                    if (this.poliz.length < index) {
                                        break;
                                    }
                                    index++;
                                }

                                if (this.poliz.length < index) {
                                    var index2 = i;
                                    index2--;
                                    while (true) {
                                        if (label == this.poliz[index2] && ":" == this.poliz[index2 + 1]) {
                                            break;
                                        }
                                        index2--;
                                    }

                                    i = index2;
                                } else {
                                    i = index;
                                }
                            }
                        } else if (this.poliz[i + 1] == "БП") {
                            console.log("equals BP");
                            var label = this.poliz[i],
                                index = i + 2;

                            while (true) {
                                if (label == this.poliz[index] && ":" == this.poliz[index + 1] && index < this.poliz.length) {
                                    break;
                                }
                                if (this.poliz.length < index) {
                                    break;
                                }
                                index++;
                            }

                            if (this.poliz.length < index) {
                                var index2 = i;
                                index2--;
                                while (true) {
                                    if (label == this.poliz[index2] && ":" == this.poliz[index2 + 1]) {
                                        break;
                                    }
                                    index2--;
                                    console.log("BP cicle 1");
                                }

                                i = index2;
                            } else {
                                i = index;
                            }
                        }
                    } else {
                        //push the variable into the stack
                        this.stack.push(this.poliz[i]);
                    }
                } else if (this.poliz[i].search(this.isNumber) !== -1) {
                    //Inspection of the digit number
                    this.stack.push(parseInt(this.poliz[i]));
                } else {
                    //Inspection of the operation
                    switch (this.poliz[i]) {
                        case "=":
                            this.assignOperation();
                            break;
                        case ">=":
                            var result = this.logicalArifmeticalOperation(this.poliz[i]);
                            if (this.hasErrors) return;
                            this.stack.push(result);
                            break;
                        case "<=":
                            var result = this.logicalArifmeticalOperation(this.poliz[i]);
                            if (this.hasErrors) return;
                            this.stack.push(result);
                            break;
                        case "==":
                            var result = this.logicalArifmeticalOperation(this.poliz[i]);
                            if (this.hasErrors) return;
                            this.stack.push(result);
                            break;
                        case "<>":
                            var result = this.logicalArifmeticalOperation(this.poliz[i]);
                            if (this.hasErrors) return;
                            this.stack.push(result);
                            break;
                        case ">":
                            var result = this.logicalArifmeticalOperation(this.poliz[i]);
                            if (this.hasErrors) return;
                            this.stack.push(result);
                            break;
                        case "<":
                            var result = this.logicalArifmeticalOperation(this.poliz[i]);
                            if (this.hasErrors) return;
                            this.stack.push(result);
                            break;
                        case "Write":
                            this.inspectWrite();
                            break;
                        case "Read":
                            this.inspectRead();
                            break;
                        case "-":
                            var result = this.logicalArifmeticalOperation(this.poliz[i]);
                            if (this.hasErrors) return;
                            this.stack.push(result);
                            break;
                        case "+":
                            var result = this.logicalArifmeticalOperation(this.poliz[i]);
                            if (this.hasErrors) return;
                            this.stack.push(result);
                            break;
                        case "*":
                            var result = this.logicalArifmeticalOperation(this.poliz[i]);
                            if (this.hasErrors) return;
                            this.stack.push(result);
                            break;
                        case "/":
                            var result = this.logicalArifmeticalOperation(this.poliz[i]);
                            if (this.hasErrors) return;
                            this.stack.push(result);
                            break;
                        case "^":
                            var result = this.logicalArifmeticalOperation(this.poliz[i]);
                            if (this.hasErrors) return;
                            this.stack.push(result);
                            break;
                        default:
                            console.log("Left this symbol: " + this.poliz[i]);
                            break;
                    }
                }
                console.log(this.stack);
            }
        }
    }]);

    return Compiler;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LexicalAnalyzer = function () {
	function LexicalAnalyzer() {
		_classCallCheck(this, LexicalAnalyzer);

		this.arrayCodeLines = window.localStorage.getItem("sourceCode").split('\n');
		this.arrayIds = [];
		this.arrayConstants = [];
		this.countIDs = 0;
		this.countConstants = 0;
		this.arrLexems = [];
		this.state = 1;
		this.substr = "";
		this.arrVars = [];
		this.canDefine = true;
		this.symbRegexpr = /\(|\)|\[|\]|\{|\}|\+|\-|\*|\/|\:|\,|\;|\^|\n/;
		this.errorsInLexicalAnalyzer = false;
		this.hasErrors = false;
		this.tableLexems = [{ id: 1, name: "Program" }, { id: 2, name: ";" }, { id: 3, name: "Var" }, { id: 4, name: "Begin" }, { id: 5, name: "End" }, { id: 6, name: "EndPr" }, { id: 7, name: ":" }, { id: 8, name: "integer" }, { id: 9, name: "," }, { id: 10, name: "=" }, { id: 11, name: "Read" }, { id: 12, name: "Write" }, { id: 13, name: "Do" }, { id: 14, name: "To" }, { id: 15, name: "By" }, { id: 16, name: "While" }, { id: 17, name: "If" }, { id: 18, name: "Then" }, { id: 19, name: "+" }, { id: 20, name: "-" }, { id: 21, name: "*" }, { id: 22, name: "/" }, { id: 23, name: "^" }, //stepen
		{ id: 24, name: "Or" }, { id: 25, name: "Not" }, { id: 26, name: "(" }, { id: 27, name: ")" }, { id: 28, name: "<" }, { id: 29, name: "<=" }, { id: 30, name: ">" }, { id: 31, name: ">=" }, { id: 32, name: "<>" }, { id: 33, name: "==" }, { id: 34, name: "id" }, { id: 35, name: "constant" }, { id: 36, name: "[" }, { id: 37, name: "]" }, { id: 38, name: "And" }, { id: 39, name: "{" }, { id: 40, name: "}" }];
	}

	_createClass(LexicalAnalyzer, [{
		key: "printRow",
		value: function printRow(arr, i, index, table) {
			if (arr[i].hasOwnProperty('codeLexem')) {
				$('<tr>' + '<td>' + arr[i].str + '</td>' + '<td>' + arr[i].codeLexem + '</td>' + '<td>' + (arr[i].linenmb + 1) + '</td>' + '<td>' + index + '</td>' + '<tr>').appendTo($('.first-table tbody'));
			} else {
				$('<tr>' + '<td>' + arr[i].str + '</td>' + '<td>' + arr[i].number + '</td>' + '<tr>').appendTo($(table));
			}
		}
	}, {
		key: "showTables",
		value: function showTables() {
			for (var i = 0; i < this.arrLexems.length; i++) {
				if (this.arrLexems[i].codeLexem == 34) {
					this.countIDs++;
					this.arrayIds.push({ str: this.arrLexems[i].str, number: this.countIDs });
					this.printRow(this.arrLexems, i, this.countIDs);
				} else if (this.arrLexems[i].codeLexem == 35) {
					this.countConstants++;
					this.arrayConstants.push({ str: this.arrLexems[i].str, number: this.countConstants });
					this.printRow(this.arrLexems, i, this.countConstants);
				} else {
					this.printRow(this.arrLexems, i, null);
				}
			}

			for (i = 0; i < this.arrayIds.length; i++) {
				this.printRow(this.arrayIds, i, null, '.second-table tbody');
			}

			for (i = 0; i < this.arrayConstants.length; i++) {
				this.printRow(this.arrayConstants, i, null, '.third-table tbody');
			}
		}
	}, {
		key: "toInitialState",
		value: function toInitialState(linenmb, str, codeLexem) {
			this.arrLexems.push({ linenmb: linenmb, str: str, codeLexem: codeLexem });
			this.substr = "";
			this.state = 1;
		}
	}, {
		key: "isGap",
		value: function isGap(linenmb, symb, substr) {
			if (symb == " " && this.state == 1) {
				this.substr = '';
				return true;
			} else if (symb == " " && this.state == 3) {
				this.toInitialState(linenmb, this.substr, 35);
				return true;
			}
			return false;
		}
	}, {
		key: "isSymbolLexem",
		value: function isSymbolLexem(linenmb, symb) {
			if (symb.search(this.symbRegexpr) != -1 && this.state == 1) {
				for (var i = 0; i < this.tableLexems.length; i++) {
					if (this.tableLexems[i].name == symb) {
						this.arrLexems.push({ linenmb: linenmb, str: symb, codeLexem: this.tableLexems[i].id });
					}
				}
				this.substr = '';
				return true;
			}
			return false;
		}
	}, {
		key: "checkLines",
		value: function checkLines() {

			for (var i = 0; i < this.arrayCodeLines.length; i++) {

				var line = this.arrayCodeLines[i];
				line += '\n';

				for (var j = 0; j < line.length; j++) {

					if (this.isGap(i, line[j])) {
						continue;
					}
					if (this.isSymbolLexem(i, line[j])) {
						continue;
					}

					this.state = this.incpectState(line[j]);

					switch (this.state) {
						case 'error':
							giveError('Error on line ' + i + '. Please check your syntax');
							this.hasErrors = true;
							break;
						case 'j':
							if (this.substr == "Begin") {
								this.canDefine = false;
							}
							for (var k = 0; k < this.tableLexems.length; k++) {
								if (this.substr == this.tableLexems[k].name) {
									//circle is working even when number is find
									this.arrLexems.push({ linenmb: i, str: this.substr, codeLexem: this.tableLexems[k].id });
								}
							}
							this.substr = line[j];
							this.state = 1;
							j--;
							break;
						case 'id':
							if (!this.canDefine) {
								for (var k = 0; k < this.arrVars.length; k++) {
									if (this.arrVars[k] == this.substr) {
										this.arrLexems.push({ linenmb: i, str: this.substr, codeLexem: 34 });
										break;
									}
									if (k == this.arrVars.length - 1) {
										giveError("Undefined variable : " + this.substr + ". Line " + i);
										this.hasErrors = true;
									}
								}
							} else {
								this.arrVars.push(this.substr);
								this.arrLexems.push({ linenmb: i, str: this.substr, codeLexem: 34 });
							}
							this.substr = line[j];
							this.state = 1;
							j--;
							break;
						case 'con':
							this.arrLexems.push({ linenmb: i, str: this.substr, codeLexem: 35 });
							this.substr = line[j];
							this.state = 1;
							j--;
							break;
						case '=':
							this.toInitialState(i, "=", 10);
							j--;
							break;
						case '==':
							this.toInitialState(i, "==", 33);
							break;
						case '<=':
							this.toInitialState(i, "<=", 29);
							break;
						case '<':
							this.toInitialState(i, "<", 28);
							j--;
							break;
						case '>=':
							this.toInitialState(i, ">=", 31);
							break;
						case '>':
							this.toInitialState(i, ">", 30);
							j--;
							break;
						case '<>':
							this.toInitialState(i, "<>", 32);
							break;
						default:
							this.substr += line[j];
							break;
					}
				}
			}
		}
	}, {
		key: "incpectState",
		value: function incpectState(symb) {
			switch (this.state) {
				case 1:
					if (symb.search(/[A-Za-z]/) != -1) {
						return 2;
					} else if (symb.search(/[0-9]/) != -1) {
						return 3;
					} else if (symb == '<') {
						return 4;
					} else if (symb == '>') {
						return 5;
					} else if (symb == '=') {
						return 6;
					} else if (symb.search(this.symbRegexpr) != -1) {
						return 'j';
					} else {
						return 'error';
					}
					break;
				case 2:
					if (symb.search(/[A-Za-z0-9]/) != -1) {
						return 2;
					} else {
						for (var i = 0; i < this.tableLexems.length; i++) {
							if (this.substr == this.tableLexems[i].name) {
								return 'j';
							}
						}
						return 'id';
					}
					break;
				case 3:
					if (symb.search(/[0-9]/) != -1) {
						return 3;
					} else if (symb.search(this.symbRegexpr) != -1) {
						return 'con';
					} else {
						return 'error';
					}
					break;
				case 4:
					if (symb == '=') {
						return '<=';
					} else if (symb == '>') {
						return '<>';
					} else {
						return '<';
					}
					break;
				case 5:
					if (symb == '=') {
						return '>=';
					} else {
						return '>';
					}
					break;
				case 6:
					if (symb == '=') {
						return '==';
					} else {
						return '=';
					}
					break;
				default:
					return 'error';
					break;
			}
		}
	}]);

	return LexicalAnalyzer;
}();
'use strict';

$(document).ready(function () {
	$('.tabs-container a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	});

	var defaultSorceCode = "Program myProgram;\n\ Var i,k:integer;\n\ Begin\n\ k = 10;\n\ i = 5;\n\ If (k<=45) Then {\n\  k = i+15/k;\n\ };\n\ Do k = 2 To 12 By 2 While(k<7)\n\   k = i+15/k;\n\ End;\n\ Read (k);\n\ Write (i);\n\ EndPr";

	//inspection source code from localStorage
	if (!window.localStorage.getItem("sourceCode")) {
		window.localStorage.setItem("sourceCode", defaultSorceCode);
		$('.input-sourceCode-area').val(window.localStorage.getItem("sourceCode"));
	} else {
		$('.input-sourceCode-area').val(window.localStorage.getItem("sourceCode"));
	}

	// Handlers
	$('.save-btn').click(saveSourceCode);
	$('.la-btn').click(lexicalAnalyze);
	$('.reset-btn').click(resetFunc);
	$('.default-source-code').click(defaultSourceCodeFunc);
	$('.sa-btn').click(syntaxAnalyze);
	$('.co-btn').click(compileFunc);

	function defaultSourceCodeFunc() {
		$('.input-sourceCode-area').val(defaultSorceCode);
		saveSourceCode();
	}
});

function saveSourceCode() {
	window.localStorage.setItem("sourceCode", $('.input-sourceCode-area').val());
	$("<div class='succsess-msg'>New source code was saved.</div>").appendTo($('.console .panel-body'));
}

function giveError(str) {
	$("<div class='error-msg'>" + str + "</div>").appendTo($('.console .panel-body'));
}

function lexicalAnalyze() {
	saveSourceCode();
	//resetFunc();
	var la = new LexicalAnalyzer();
	la.checkLines();
	if (!la.hasErrors) {
		$("<div class='succsess-msg'>Lexical analyzer completed successfully.</div>").appendTo($('.console .panel-body'));
	};

	window.resultLA = !la.hasErrors;

	la.showTables();
	window.arrayOfLexems = la.arrLexems;
}

function resetFunc() {
	$('tbody').remove();
	$('<tbody></tbody>').appendTo('table');
	$('.console .panel-body').html('');
}

function syntaxAnalyze() {
	if (window.resultLA) {
		var sa = new SyntaxAnalyzer(window.arrayOfLexems),
		    resultSA = sa.analyze();
		if (resultSA) {
			$("<div class='succsess-msg'>Syntax analyzer completed successfully.</div>").appendTo($('.console .panel-body'));
		}
		window.resultSA = resultSA;
	} else {
		giveError("There is problem in your lexical analyzer!");
	}
}

function compileFunc() {
	resetFunc();
	lexicalAnalyze();
	syntaxAnalyze();
	if (window.resultLA) {
		var pol = new Poliz(window.arrayOfLexems);
		pol.makeInPoliz();
		var com = new Compiler(pol.poliz, pol.labels);
		com.compile();
	} else {
		giveError("There is problem in your lexicalor or syntax analyzers!");
	}
}
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Poliz = function () {
	function Poliz(arrLexems) {
		_classCallCheck(this, Poliz);

		this.arrLexems = arrLexems;
		this.stack = [];
		this.poliz = [];
		this.polizOperator = [];
		this.countLabels = 0;
		this.labels = [];
		this.index = 0;
		this.priorities = [{ str: "(", priority: 0, codeLexem: 26 }, { str: ")", priority: 1, codeLexem: 27 }, { str: "[", priority: 0, codeLexem: 36 }, { str: "]", priority: 1, codeLexem: 37 }, { str: "=", priority: 2, codeLexem: 10 }, { str: "Or", priority: 3, codeLexem: 24 }, { str: "And", priority: 4, codeLexem: 38 }, { str: "Not", priority: 5, codeLexem: 25 }, { str: "<", priority: 6, codeLexem: 28 }, { str: ">", priority: 6, codeLexem: 30 }, { str: "==", priority: 6, codeLexem: 33 }, { str: "<>", priority: 6, codeLexem: 32 }, { str: ">=", priority: 6, codeLexem: 31 }, { str: "<=", priority: 6, codeLexem: 29 }, { str: "+", priority: 7, codeLexem: 19 }, { str: "-", priority: 7, codeLexem: 20 }, { str: "*", priority: 8, codeLexem: 21 }, { str: "/", priority: 8, codeLexem: 22 }, { str: "@", priority: 8, codeLexem: 20 }, { str: "^", priority: 9, codeLexem: 23 }, { str: "If", priority: 0, codeLexem: 17 }, { str: "Then", priority: 1, codeLexem: 18 }, { str: "While", priority: 0, codeLexem: 16 }, { str: "Do", priority: 1, codeLexem: 13 }];
	}

	_createClass(Poliz, [{
		key: "isAnyBinaryOperator",
		value: function isAnyBinaryOperator(str) {
			for (var i = 0; i < this.priorities.length; i++) {
				if (str == this.priorities[i].str) {
					return true;
				}
			}
			return false;
		}
	}, {
		key: "inspectUnaryMinus",
		value: function inspectUnaryMinus() {
			if (this.arrLexems[this.index].str == "-" && this.isAnyBinaryOperator(this.arrLexems[this.index - 1].str)) {
				return true;
			}
			return false;
		}
	}, {
		key: "changeToStackElement",
		value: function changeToStackElement() {
			for (var i = 0; i < this.priorities.length; i++) {

				if (this.inspectUnaryMinus()) {
					return { str: "@", priority: 8 };
				}

				if (this.priorities[i].codeLexem == this.arrLexems[this.index].codeLexem) {
					return this.priorities[i];
				}
			}
		}
	}, {
		key: "pullBetweenBrakets",
		value: function pullBetweenBrakets(bracket) {
			while (this.stack[this.stack.length - 1].str !== bracket) {
				this.polizOperator.push(this.stack.pop().str);
			}
			this.stack.pop();
		}

		//-> anyAssignment

	}, {
		key: "magazineOperation",
		value: function magazineOperation() {

			if (this.arrLexems[this.index].codeLexem == 34 || this.arrLexems[this.index].codeLexem == 35) {
				this.polizOperator.push(this.arrLexems[this.index].str);
				this.index++;
				return;
			}
			var element = this.changeToStackElement();

			if (this.stack.length == 0) {
				this.stack.push(element);
				this.index++;
			} else {

				if (element.priority > this.stack[this.stack.length - 1].priority) {
					this.stack.push(element);
					this.index++;
				} else if (element.priority == this.stack[this.stack.length - 1].priority || element.priority < this.stack[this.stack.length - 1].priority) {

					if (element.str == "(" || element.str == "[") {
						this.stack.push(element);
						this.index++;
					} else if (element.str == ")" || element.str == "]") {

						if (element.str == ")") this.pullBetweenBrakets("(");
						if (element.str == "]") this.pullBetweenBrakets("[");

						this.index++;
						return "close bracket signal";
					} else {
						this.polizOperator.push(this.stack.pop().str);
						this.magazineOperation();
					}
				}
			}
		}

		//Read/Write

	}, {
		key: "polizReadWrite",
		value: function polizReadWrite(word) {
			while (this.arrLexems[this.index].codeLexem !== 2) {
				if (this.arrLexems[this.index].codeLexem == 34) {
					this.polizOperator.push(this.arrLexems[this.index].str);
					this.polizOperator.push(word);
				}
				this.index++;
			}
			this.index++;
		}

		//While Do poliz

	}, {
		key: "polizDo",
		value: function polizDo(objLabels) {

			console.log("In do cicle");

			var Id = this.arrLexems[this.index].str;
			var whileLeft = false;

			while (this.arrLexems[this.index].codeLexem !== 2) {

				if (this.arrLexems[this.index].codeLexem == 14 || this.arrLexems[this.index].codeLexem == 15 || this.arrLexems[this.index].codeLexem == 16) {

					//To
					if (this.arrLexems[this.index].codeLexem == 14) {
						while (this.stack[this.stack.length - 1].codeLexem !== 13) {
							this.polizOperator.push(this.stack.pop().str);
						}
						this.polizOperator.push(objLabels.mi);
						this.polizOperator.push("БП");
						this.polizOperator.push(objLabels.mi_plus2);
						this.polizOperator.push(":");
						this.polizOperator.push(Id);

						this.index++;

						console.log(this.polizOperator);
					}

					//By
					if (this.arrLexems[this.index].codeLexem == 15) {

						while (this.stack[this.stack.length - 1].codeLexem !== 13) {
							this.polizOperator.push(this.stack.pop().str);
						}
						this.polizOperator.push("<=");
						this.polizOperator.push(objLabels.mi_plus3);
						this.polizOperator.push("УПЛ");
						this.polizOperator.push(objLabels.mi);
						this.polizOperator.push("БП");
						this.polizOperator.push(objLabels.mi_plus1);
						this.polizOperator.push(":");
						this.polizOperator.push(Id);
						this.polizOperator.push(Id);

						this.index++;

						console.log(this.polizOperator);
					}

					//While
					if (this.arrLexems[this.index].codeLexem == 16) {
						while (this.stack[this.stack.length - 1].codeLexem !== 13) {
							this.polizOperator.push(this.stack.pop().str);
						}
						this.polizOperator.push("+");
						this.polizOperator.push("=");
						this.polizOperator.push(objLabels.mi_plus2);
						this.polizOperator.push("БП");
						this.polizOperator.push(objLabels.mi);
						this.polizOperator.push(":");

						this.stack.push(this.priorities[22]);
						this.index++;

						console.log(this.polizOperator);
						whileLeft = true;
					}
				}

				var res = this.magazineOperation();
				if (res == "close bracket signal" && whileLeft) {
					while (this.stack[this.stack.length - 1].codeLexem !== 16) {
						this.polizOperator.push(this.stack.pop().str);
					}

					this.polizOperator.push(objLabels.mi_plus3);
					this.polizOperator.push("УПЛ");
					//this.index++;

					console.log(this.polizOperator);

					while (this.arrLexems[this.index].codeLexem !== 5) {
						console.log(this.arrLexems[this.index].codeLexem + "-codelexem");
						console.log(this.arrLexems[this.index].str + "-str");
						this.polizOfOperator();
					}

					while (this.stack[this.stack.length - 1].codeLexem !== 16) {
						this.polizOperator.push(this.stack.pop().str);
					}

					this.stack.pop();

					this.polizOperator.push(objLabels.mi_plus1);
					this.polizOperator.push("БП");
					this.polizOperator.push(objLabels.mi_plus3);
					this.polizOperator.push(":");

					this.index++;

					console.log(this.arrLexems[this.index].codeLexem + "-codelexem");
					console.log(this.arrLexems[this.index].str + "-str");
				}
			}

			this.index++;
		}

		//If poliz

	}, {
		key: "polizIf",
		value: function polizIf() {
			while (this.arrLexems[this.index].codeLexem !== 2) {
				if (this.arrLexems[this.index].codeLexem == 18) {
					this.pullBetweenIfThen();
					this.index += 2;
					this.polizOfOperator(true);

					while (true) {
						if (this.stack[this.stack.length - 1].codeLexem == 17 && this.stack[this.stack.length - 1].str != "If") {
							this.polizOperator.push(this.stack.pop().str);
							this.stack.pop();
							this.index++;
							break;
						} else {
							this.polizOperator.push(this.stack.pop().str);
						}
					}
					break;
				}

				this.magazineOperation();
			}

			this.polizOperator.push(":");
			this.index++;
		}
	}, {
		key: "generateNewLabel",
		value: function generateNewLabel() {
			this.countLabels++;
			this.labels.push("m" + this.countLabels);
			return "m" + this.countLabels;
		}
	}, {
		key: "pullBetweenIfThen",
		value: function pullBetweenIfThen() {
			while (this.stack[this.stack.length - 1].codeLexem !== 17) {
				this.polizOperator.push(this.stack.pop().str);
			}
			var newLabel = this.generateNewLabel();
			this.polizOperator.push(newLabel);
			this.polizOperator.push("УПЛ");

			this.stack.push({ str: newLabel, priority: 0, codeLexem: 17 });
		}
	}, {
		key: "polizAssignment",
		value: function polizAssignment() {
			while (this.arrLexems[this.index].codeLexem !== 2) {
				this.magazineOperation();
			}

			//Push to poliz sign of assignment
			while (true) {
				if (this.stack[this.stack.length - 1].str == "=") {
					this.polizOperator.push(this.stack.pop().str);
					break;
				}
				this.polizOperator.push(this.stack.pop().str);
			}

			this.index++;
		}
	}, {
		key: "polizOfOperator",
		value: function polizOfOperator(clearPolizOperator) {

			switch (this.arrLexems[this.index].codeLexem) {
				case 11:
					this.index++;
					this.polizReadWrite("Read");

					this.printPolizOperator("Read");
					if (!clearPolizOperator) {
						this.poliz = this.poliz.concat(this.polizOperator);
						this.polizOperator.length = 0;
					}

					break;
				case 12:
					this.index++;
					this.polizReadWrite("Write");
					this.printPolizOperator("Write");

					if (!clearPolizOperator) {
						this.poliz = this.poliz.concat(this.polizOperator);
						this.polizOperator.length = 0;
					}

					break;
				case 17:
					this.stack.push(this.priorities[20]);
					this.index++;
					this.polizIf();
					this.printPolizOperator("If");

					if (!clearPolizOperator) {
						this.poliz = this.poliz.concat(this.polizOperator);
						this.polizOperator.length = 0;
					}
					break;
				case 13:
					var objLabels = {
						mi: this.generateNewLabel(),
						mi_plus1: this.generateNewLabel(),
						mi_plus2: this.generateNewLabel(),
						mi_plus3: this.generateNewLabel()
					};
					this.stack.push(this.priorities[23]);

					this.index++;
					this.polizDo(objLabels);

					this.printPolizOperator("While");

					if (!clearPolizOperator) {
						this.poliz = this.poliz.concat(this.polizOperator);
						this.polizOperator.length = 0;
					}
					break;
				case 34:
					this.polizOperator.push(this.arrLexems[this.index].str);
					this.index++;
					this.polizAssignment();
					this.printPolizOperator("Assignment");

					if (!clearPolizOperator) {
						this.poliz = this.poliz.concat(this.polizOperator);
						this.polizOperator.length = 0;
					}
					break;
				default:
					alert("Error in your code!");
					this.index++;
					break;
			}
		}
	}, {
		key: "printPolizOperator",
		value: function printPolizOperator(operator) {
			$("<tr>\
			<td>" + operator + "</td>\
			<td>" + this.polizOperator.join(" ") + "</td>\
			</tr>").appendTo($('.table-poliz tbody'));
		}
	}, {
		key: "makeInPoliz",
		value: function makeInPoliz() {
			for (this.index = 0; this.index < this.arrLexems.length; this.index++) {
				if (this.arrLexems[this.index].codeLexem === 4) {
					this.index++;
					break;
				}
			}

			while (this.arrLexems[this.index].codeLexem !== 6) {
				this.polizOfOperator();
			}
			console.log("%c End of compiler", "color: red");
			console.log(this.poliz);
			$("<tr>\
			<td colspan='2' class='common-poliz'>" + this.poliz.join(" ") + "</td>\
			</tr>").appendTo($('.table-poliz tbody'));
		}
	}]);

	return Poliz;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SyntaxAnalyzer = function () {
	function SyntaxAnalyzer(arrLexems) {
		_classCallCheck(this, SyntaxAnalyzer);

		this.index = 0;
		this.arrLexems = arrLexems;
		this.stack = [];
		this.hasErrors = false;
	}

	//Method of checking stack


	_createClass(SyntaxAnalyzer, [{
		key: "checkStack",
		value: function checkStack(params) {
			if (!this.hasErrors) {
				if (this.stack.length == params.depth && this.arrLexems[this.index].codeLexem == params.codeLexem) {
					this.stack.push(this.arrLexems[this.index]);

					console.log(this.arrLexems[this.index].str + " is Ok");

					this.index++;
				} else {
					giveError(params.errorMsg + " Line: " + this.arrLexems[this.index].linenmb);
					this.hasErrors = true;
				}
			}
		}
	}, {
		key: "checkNameProgram",
		value: function checkNameProgram() {
			this.checkStack({
				depth: 0,
				codeLexem: 1,
				errorMsg: "There is no word \"Program\" in your code!"
			});
			if (this.hasErrors) return;

			this.checkStack({
				depth: 1,
				codeLexem: 34,
				errorMsg: "There is no name of your program in your code!"
			});
			if (this.hasErrors) return;

			this.checkStack({
				depth: 2,
				codeLexem: 2,
				errorMsg: "You forgot \";\" statement!"
			});
			if (this.hasErrors) return;

			this.stack.length = 0;
		}
	}, {
		key: "checkVarStatement",
		value: function checkVarStatement() {
			this.stack.length = 0;

			this.checkStack({
				depth: 0,
				codeLexem: 3,
				errorMsg: "You forgot Var  word in your code !"
			});
			if (this.hasErrors) return;

			this.checkIdList();
			if (this.hasErrors) return;

			this.checkStack({
				depth: 0,
				codeLexem: 7,
				errorMsg: "There  must be : symbol in your code Declaration!"
			});
			if (this.hasErrors) return;

			this.checkStack({
				depth: 1,
				codeLexem: 8,
				errorMsg: "There  must be integer type in your code Declaration!"
			});
			if (this.hasErrors) return;

			this.checkStack({
				depth: 2,
				codeLexem: 2,
				errorMsg: "You forgot \";\" statement!"
			});
			if (this.hasErrors) return;

			this.stack.length = 0;
		}
	}, {
		key: "checkIdList",
		value: function checkIdList() {
			var depth = 1;

			this.checkStack({
				depth: depth,
				codeLexem: 34,
				errorMsg: "You forgot ID your code !"
			});
			if (this.hasErrors) return;

			while (this.arrLexems[this.index].codeLexem == 9) {
				depth++;
				this.index++;

				this.checkStack({
					depth: depth,
					codeLexem: 34,
					errorMsg: "You forgot ID your code !"
				});
				if (this.hasErrors) return;
			}
			this.stack.length = 0;
		}
	}, {
		key: "checkDeclaration",
		value: function checkDeclaration() {
			this.checkNameProgram();
			if (this.hasErrors) return;

			this.checkVarStatement();
			if (this.hasErrors) return;
			this.stack.length = 0;
		}
	}, {
		key: "checkBody",
		value: function checkBody() {
			this.stack.length = 0;
			while (this.arrLexems[this.index].codeLexem !== 6) {
				this.inspectOperator();
				if (this.hasErrors) return;
			}
			this.stack.length = 0;
		}
	}, {
		key: "inspectReadWrite",
		value: function inspectReadWrite() {
			this.stack.length = 0;

			this.checkStack({
				depth: 0,
				codeLexem: 26,
				errorMsg: "You forgot ( in your Read/Write statement!"
			});
			if (this.hasErrors) return;

			this.checkIdList();
			if (this.hasErrors) return;

			this.checkStack({
				depth: 0,
				codeLexem: 27,
				errorMsg: "You forgot ) in your Read/Write statement!"
			});
			if (this.hasErrors) return;

			this.checkStack({
				depth: 1,
				codeLexem: 2,
				errorMsg: "You forgot \";\" statement!"
			});
			if (this.hasErrors) return;

			this.stack.length = 0;
		}
	}, {
		key: "inspectMnoj",
		value: function inspectMnoj() {
			this.stack.length = 0;

			if (this.arrLexems[this.index].codeLexem == 34) {
				console.log("Mnoj id is ok");
				this.index++;
				return;
			} else if (this.arrLexems[this.index].codeLexem == 35) {
				console.log("Mnoj constant is ok");
				this.index++;
				return;
			} else if (this.arrLexems[this.index].codeLexem == 36) {
				console.log("Mnoj ( is ok");
				this.index++;
				this.inspectStatement();
				if (this.hasErrors) return;

				this.checkStack({
					depth: 0,
					codeLexem: 37,
					errorMsg: "Yo forgot ) in your code!"
				});
				if (this.hasErrors) return;
			} else {
				this.hasErrors = true;
				giveError("Unexpexted Token! Line: " + (this.arrLexems[this.index].linenmb + 1));
			}

			this.stack.length = 0;
		}
	}, {
		key: "inspectTerminator",
		value: function inspectTerminator() {
			var p = true;
			this.stack.length = 0;

			this.inspectMnoj();
			if (this.hasErrors) return;

			while (this.arrLexems[this.index].codeLexem == 21 || this.arrLexems[this.index].codeLexem == 22 || this.arrLexems[this.index].codeLexem == 23) {
				this.index++;

				console.log("Stament *|/ is ok");
				this.inspectMnoj();
				if (this.hasErrors) return;
				console.log("Terminator Mnojitel is Ok");
			}

			this.stack.length = 0;
		}
	}, {
		key: "inspectStatement",
		value: function inspectStatement() {
			this.stack.length = 0;

			if (this.arrLexems[this.index].codeLexem == 20) {
				console.log("Statement - is Ok");
				this.index++;
			}

			this.inspectTerminator();
			if (this.hasErrors) return;

			while (this.arrLexems[this.index].codeLexem == 19 || this.arrLexems[this.index].codeLexem == 20) {
				this.index++;
				console.log("Stament +|- is ok");

				this.inspectTerminator();
				if (this.hasErrors) return;
			}

			this.stack.length = 0;
		}

		//Assigment inspection

	}, {
		key: "inspectAssignment",
		value: function inspectAssignment() {
			this.stack.length = 0;

			this.checkStack({
				depth: 0,
				codeLexem: 10,
				errorMsg: "You forgot = in  your code !"
			});
			if (this.hasErrors) return;

			this.inspectStatement();
			if (this.hasErrors) return;

			this.checkStack({
				depth: 0,
				codeLexem: 2,
				errorMsg: "You forgot ; in your code!"
			});
			if (this.hasErrors) return;

			this.stack.length = 0;
		}
	}, {
		key: "inspectOperator",
		value: function inspectOperator() {
			switch (this.arrLexems[this.index].codeLexem) {
				case 11:
					this.index++;
					this.inspectReadWrite();
					break;
				case 12:
					this.index++;
					this.inspectReadWrite();
					break;
				case 17:
					this.index++;
					this.inspectIf();
					break;
				case 13:
					this.index++;
					this.inspectDo();
					break;
				case 34:
					this.index++;
					this.inspectAssignment();
					break;
				default:
					giveError("Error! Unexpected token! Line: " + (this.arrLexems[this.index].linenmb + 1));
					this.hasErrors = true;
					if (this.hasErrors) return;
					break;
			}
		}

		//Inspection of if

	}, {
		key: "inspectIf",
		value: function inspectIf() {
			this.stack.length = 0;

			this.checkStack({
				depth: 0,
				codeLexem: 26,
				errorMsg: "You forgot ( in your code your code !"
			});
			if (this.hasErrors) return;

			this.inspectLogicalExpression();
			if (this.hasErrors) return;

			console.log("End of logical if expression");

			this.checkStack({
				depth: 0,
				codeLexem: 27,
				errorMsg: "You forgot ) in your code your code !"
			});
			if (this.hasErrors) return;

			this.checkStack({
				depth: 1,
				codeLexem: 18,
				errorMsg: "You forgot Then in your code your code !"
			});
			if (this.hasErrors) return;

			this.checkStack({
				depth: 2,
				codeLexem: 39,
				errorMsg: "You forgot { in your code your code !"
			});
			if (this.hasErrors) return;

			this.inspectOperator();
			if (this.hasErrors) return;

			this.checkStack({
				depth: 0,
				codeLexem: 40,
				errorMsg: "You forgot } in your code your code !"
			});
			if (this.hasErrors) return;

			this.checkStack({
				depth: 1,
				codeLexem: 2,
				errorMsg: "You forgot ; in your code your code !"
			});
			if (this.hasErrors) return;

			this.stack.length = 0;
		}
	}, {
		key: "inspectLogicalExpression",
		value: function inspectLogicalExpression() {
			this.stack.length = 0;

			this.inspectLogicalTerminator();
			if (this.hasErrors) return;
			console.log("LOGEXP logterm ok...");

			while (this.arrLexems[this.index].codeLexem == 24) {
				console.log("LOGEXP or ok...");
				this.index++; //////////////////////////////////////////////////////////////////index++
				this.inspectLogicalTerminator();
				if (this.hasErrors) return;
				console.log("LOGEXP logterm ok...");
			}

			this.stack.length = 0;
		}
	}, {
		key: "inspectLogicalTerminator",
		value: function inspectLogicalTerminator() {
			this.stack.length = 0;

			this.inspectLogicalMnoj();
			if (this.hasErrors) return;
			console.log("LOGTERM logmnoj ok...");

			while (this.arrLexems[this.index].codeLexem == 38) {
				this.index++;
				this.inspectLogicalMnoj();
				console.log("LOGTERM logmnoj ok...");
				if (this.hasErrors) return;
			}

			this.stack.length = 0;
		}
	}, {
		key: "inspectLogicalMnoj",
		value: function inspectLogicalMnoj() {
			this.stack.length = 0;

			if (this.arrLexems[this.index].codeLexem == 25) {
				while (this.arrLexems[this.index].codeLexem == 25) {
					this.index++;
					console.log("LOGMNOJ not ok...");
					if (this.arrLexems[this.index].codeLexem != 35) {

						this.inspectStatement();
						if (this.hasErrors) return;
						console.log("LOGMNOJ not ok...");

						if (this.arrLexems[this.index].codeLexem >= 28 && this.arrLexems[this.index].codeLexem <= 33) {
							console.log("LOGMNOJ znak otnosh ok...");
							this.index++;
						} else {
							giveError("Error! Unexpected token! Line: " + (this.arrLexems[this.index].linenmb + 1));
							this.hasErrors = true;
						}
						if (this.hasErrors) return;

						this.inspectStatement();
						if (this.hasErrors) return;
						console.log("LOGMNOJ stmt ok...");
					} else if (this.arrLexems[this.index].codeLexem == 36) {
						console.log("LOGMNOJ [ ok...");
						this.index++;
						this.inspectLogicalExpression();
						if (this.hasErrors) return;

						this.checkStack({
							depth: 0,
							codeLexem: 37,
							errorMsg: "You forgot ] in your code your code !"
						});
					} else {
						giveError("Error! Unexpected token! Line: " + (this.arrLexems[this.index].linenmb + 1));
						this.hasErrors = true;
					}
				}
			} else {
				if (this.arrLexems[this.index].codeLexem !== 36) {
					this.inspectStatement();
					console.log("LOGMNOJ stmt ok...");
					console.log(this.arrLexems[this.index]);

					if (this.arrLexems[this.index].codeLexem >= 28 && this.arrLexems[this.index].codeLexem <= 33) {
						console.log("LOGMNOJ znak otnosh ok...");
						this.index++;
					} else {
						giveError("Error! Unexpected token! Line: " + (this.arrLexems[this.index].linenmb + 1));
						this.hasErrors = true;
					}
					this.inspectStatement();
					if (this.hasErrors) return;
					console.log("LOGMNOJ stmt ok...");
				} else if (this.arrLexems[this.index].codeLexem == 36) {
					console.log("LOGMNOJ [ ok...");
					this.index++;
					this.inspectLogicalExpression();
					if (this.hasErrors) return;

					this.checkStack({
						depth: 0,
						codeLexem: 37,
						errorMsg: "You forgot ] in your code your code !"
					});
				} else {
					giveError("Error! Unexpected token! Line: " + (this.arrLexems[this.index].linenmb + 1));
					this.hasErrors = true;
				}
			}

			this.stack.length = 0;
		}

		//Inspect Do

	}, {
		key: "inspectDo",
		value: function inspectDo() {
			this.stack.length = 0;
			console.log("OPERATOR DO is ok...");

			//Inspect assignment
			this.checkStack({
				depth: 0,
				codeLexem: 34,
				errorMsg: "You forgot ID in your code !"
			});
			if (this.hasErrors) return;

			this.checkStack({
				depth: 1,
				codeLexem: 10,
				errorMsg: "You forgot = in  your code !"
			});
			if (this.hasErrors) return;

			this.inspectStatement();
			if (this.hasErrors) return;
			console.log("OPERATOR Assignment ok...");
			//Inspect assignment

			this.checkStack({
				depth: 0,
				codeLexem: 14,
				errorMsg: "You forgot To in your code !"
			});
			if (this.hasErrors) return;

			this.inspectStatement();
			if (this.hasErrors) return;
			console.log("OPERATOR stmt ok...");

			this.checkStack({
				depth: 0,
				codeLexem: 15,
				errorMsg: "You forgot By in your code !"
			});
			if (this.hasErrors) return;

			this.inspectStatement();
			if (this.hasErrors) return;
			console.log("OPERATOR stmt ok...");

			this.checkStack({
				depth: 0,
				codeLexem: 16,
				errorMsg: "You forgot While in your code !"
			});
			if (this.hasErrors) return;

			this.checkStack({
				depth: 1,
				codeLexem: 26,
				errorMsg: "You forgot ( in your code !"
			});
			if (this.hasErrors) return;

			this.inspectLogicalExpression();
			if (this.hasErrors) return;

			this.checkStack({
				depth: 0,
				codeLexem: 27,
				errorMsg: "You forgot ) in  your code !"
			});
			if (this.hasErrors) return;

			//List operators must me here
			while (this.arrLexems[this.index].codeLexem !== 5) {
				this.inspectOperator();
				if (this.hasErrors) return;
			}

			// giveError(this.arrLexems[this.index].codeLexem);
			// console.log(this.stack);

			this.checkStack({
				depth: 0,
				codeLexem: 5,
				errorMsg: "You forgot End in  your code !"
			});
			if (this.hasErrors) return;

			this.checkStack({
				depth: 1,
				codeLexem: 2,
				errorMsg: "You forgot ; in  your code !"
			});
			if (this.hasErrors) return;

			this.stack.length = 0;
		}
	}, {
		key: "analyze",
		value: function analyze() {
			this.checkDeclaration();
			if (this.hasErrors) return;

			console.log("Declaration was inspected, no errors!");
			this.checkStack({
				depth: 0,
				codeLexem: 4,
				errorMsg: "You forgot Begin in your code !"
			});
			if (this.hasErrors) return;

			this.checkBody();
			if (this.hasErrors) return;

			this.checkStack({
				depth: 0,
				codeLexem: 6,
				errorMsg: "You forgot EndPr in your code !"
			});
			if (this.hasErrors) return;

			console.log("Syntax analyzer is done mazafaka!!!");
			return true;
		}
	}]);

	return SyntaxAnalyzer;
}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL2NvbS5qcyIsImpzL2xhLmpzIiwianMvbWFpbi5qcyIsImpzL3BvbC5qcyIsImpzL3NhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztJQUFNO0FBQ0YsYUFERSxRQUNGLENBQVksS0FBWixFQUFtQixNQUFuQixFQUEyQjs4QkFEekIsVUFDeUI7O0FBQ3ZCLGFBQUssS0FBTCxHQUFhLEtBQWIsQ0FEdUI7QUFFdkIsYUFBSyxNQUFMLEdBQWMsTUFBZCxDQUZ1QjtBQUd2QixhQUFLLEtBQUwsR0FBYSxFQUFiLENBSHVCO0FBSXZCLGFBQUssY0FBTCxHQUFzQixFQUF0QixDQUp1QjtBQUt2QixhQUFLLFNBQUwsR0FBaUIsS0FBakIsQ0FMdUI7QUFNdkIsYUFBSyxXQUFMLEdBQW1CLFFBQW5CLENBTnVCO0FBT3ZCLGFBQUssT0FBTCxHQUFlLFNBQWYsQ0FQdUI7QUFRdkIsYUFBSyxRQUFMLEdBQWdCLFFBQWhCLENBUnVCO0tBQTNCOztpQkFERTs7MENBWWdCO0FBQ2QsZ0JBQUksYUFBYSxLQUFLLEtBQUwsQ0FBVyxHQUFYLEVBQWI7Z0JBQ0EsV0FBVyxLQUFLLEtBQUwsQ0FBVyxHQUFYLEVBQVgsQ0FGVTtBQUdkLGlCQUFLLGNBQUwsQ0FBb0IsUUFBcEIsSUFBZ0MsVUFBaEMsQ0FIYztBQUlkLG9CQUFRLEdBQVIsQ0FBWSxLQUFLLGNBQUwsQ0FBWixDQUpjOzs7O3NDQU9KO0FBQ1YsZ0JBQUksV0FBVyxLQUFLLEtBQUwsQ0FBVyxHQUFYLEVBQVgsQ0FETTtBQUVWLGlCQUFLLGNBQUwsQ0FBb0IsUUFBcEIsSUFBZ0MsU0FBUyxPQUFPLDRCQUE0QixRQUE1QixHQUF1QyxJQUF2QyxDQUFoQixDQUFoQyxDQUZVOzs7O3VDQUtDO0FBQ1gsZ0JBQUksV0FBVyxLQUFLLEtBQUwsQ0FBVyxHQUFYLEVBQVg7O0FBRE8scUJBR1gsQ0FBVSwyQkFBMkIsUUFBM0IsR0FBc0MsSUFBdEMsR0FBNkMsS0FBSyxjQUFMLENBQW9CLFFBQXBCLENBQTdDLENBQVYs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Qjs7QUFFQSxRQUFLLFNBQUwsR0FaUztBQWFULE9BQUcsS0FBSyxTQUFMLEVBQWdCLE9BQW5COztBQUVBLFFBQUssVUFBTCxDQUFnQjtBQUNmLFdBQU0sQ0FBTjtBQUNBLGVBQVUsQ0FBVjtBQUNBLGNBQVMsaUNBQVQ7SUFIRCxFQWZTO0FBb0JULE9BQUcsS0FBSyxTQUFMLEVBQWdCLE9BQW5COztBQUVBLFdBQVEsR0FBUixDQUFZLHFDQUFaLEVBdEJTO0FBdUJULFVBQU8sSUFBUCxDQXZCUzs7OztRQTdqQkwiLCJmaWxlIjoiYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQ29tcGlsZXIge1xyXG4gICAgY29uc3RydWN0b3IocG9saXosIGxhYmVscykge1xyXG4gICAgICAgIHRoaXMucG9saXogPSBwb2xpejtcclxuICAgICAgICB0aGlzLmxhYmVscyA9IGxhYmVscztcclxuICAgICAgICB0aGlzLnN0YWNrID0gW107XHJcbiAgICAgICAgdGhpcy5wcm9ncmFtQ29udGV4dCA9IHt9O1xyXG4gICAgICAgIHRoaXMuaGFzRXJyb3JzID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mcm9tTGV0dGVycyA9IC9bYS16XSsvO1xyXG4gICAgICAgIHRoaXMuaXNMYWJlbCA9IC9tWzAtOV0rLztcclxuICAgICAgICB0aGlzLmlzTnVtYmVyID0gL1swLTldKy87XHJcbiAgICB9XHJcblxyXG4gICAgYXNzaWduT3BlcmF0aW9uKCkge1xyXG4gICAgICAgIHZhciBhc3NpZ25QYXJ0ID0gdGhpcy5zdGFjay5wb3AoKSxcclxuICAgICAgICAgICAgdmFyaWFibGUgPSB0aGlzLnN0YWNrLnBvcCgpO1xyXG4gICAgICAgIHRoaXMucHJvZ3JhbUNvbnRleHRbdmFyaWFibGVdID0gYXNzaWduUGFydDtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnByb2dyYW1Db250ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICBpbnNwZWN0UmVhZCgpIHtcclxuICAgICAgICB2YXIgdmFyaWFibGUgPSB0aGlzLnN0YWNrLnBvcCgpO1xyXG4gICAgICAgIHRoaXMucHJvZ3JhbUNvbnRleHRbdmFyaWFibGVdID0gcGFyc2VJbnQocHJvbXB0KFwiUGxlYXNlLCBlbnRlciB2YXJpYWJsZSBcIiArIHZhcmlhYmxlICsgXCI6IFwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5zcGVjdFdyaXRlKCkge1xyXG4gICAgICAgIHZhciB2YXJpYWJsZSA9IHRoaXMuc3RhY2sucG9wKCk7XHJcbiAgICAgICAgLy9hbGVydChcIlZhbHVlIG9mIHRoZSB2YXJpYWJsZSBcIiArIHZhcmlhYmxlICsgXCI6IFwiICsgdGhpcy5wcm9ncmFtQ29udGV4dFt2YXJpYWJsZV0pO1xyXG4gICAgICAgIGdpdmVFcnJvcihcIlZhbHVlIG9mIHRoZSB2YXJpYWJsZSBcIiArIHZhcmlhYmxlICsgXCI6IFwiICsgdGhpcy5wcm9ncmFtQ29udGV4dFt2YXJpYWJsZV0pO1xyXG4gICAgfVxyXG5cclxuICAgIGxvZ2ljYWxBcmlmbWV0aWNhbE9wZXJhdGlvbihvcGVyYXRpb24pIHtcclxuICAgICAgICB2YXIgcmlnaHRQYXJ0ID0gdGhpcy5zdGFjay5wb3AoKSxcclxuICAgICAgICAgICAgbGVmdFBhcnQgPSB0aGlzLnN0YWNrLnBvcCgpO1xyXG5cclxuICAgICAgICAvL0luc3BlY3Qgb2YgdGhlIHZhcmlhYmxlc1xyXG4gICAgICAgIGlmICh0eXBlb2YgcmlnaHRQYXJ0ICE9IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgcmlnaHRQYXJ0ID0gdGhpcy5wcm9ncmFtQ29udGV4dFtyaWdodFBhcnRdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBsZWZ0UGFydCAhPSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgIGxlZnRQYXJ0ID0gdGhpcy5wcm9ncmFtQ29udGV4dFtsZWZ0UGFydF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIioqKioqKioqKioqKioqKipPcGVyYW5kcyoqKioqKioqKioqKioqKioqXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmlnaHQgcGFydFwiICsgcmlnaHRQYXJ0KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkxlZnQgcGFydFwiICsgbGVmdFBhcnQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiKioqKioqKioqKioqKioqKk9wZXJhbmRzKioqKioqKioqKioqKioqKipcIik7XHJcblxyXG4gICAgICAgIC8vRXJyb3IgaGFkbGluZyBoZXJlLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0vXHJcbiAgICAgICAgaWYgKHJpZ2h0UGFydCA9PSB1bmRlZmluZWQgfHwgcmlnaHRQYXJ0ID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmhhc0Vycm9ycyA9IHRydWU7XHJcbiAgICAgICAgICAgIGdpdmVFcnJvcihcIlVuaW5pdGlhbGl6ZWQgdmFyaWFibGUgaW4geW91ciBjb2RlXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL0Vycm9yIGhhZGxpbmcgaGVyZS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tL1xyXG5cclxuICAgICAgICBzd2l0Y2ggKG9wZXJhdGlvbikge1xyXG4gICAgICAgICAgICBjYXNlIFwiPj1cIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBsZWZ0UGFydCA+PSByaWdodFBhcnQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjw9XCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGVmdFBhcnQgPD0gcmlnaHRQYXJ0O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCI9PVwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxlZnRQYXJ0ID09IHJpZ2h0UGFydDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiPD5cIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBsZWZ0UGFydCAhPSByaWdodFBhcnQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIj5cIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBsZWZ0UGFydCA+IHJpZ2h0UGFydDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiPFwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxlZnRQYXJ0IDwgcmlnaHRQYXJ0O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCItXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGVmdFBhcnQgLSByaWdodFBhcnQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIitcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBsZWZ0UGFydCArIHJpZ2h0UGFydDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiKlwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxlZnRQYXJ0ICogcmlnaHRQYXJ0O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIvXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbGVmdFBhcnQgLyByaWdodFBhcnQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIl5cIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLnBvdyhsZWZ0UGFydCwgcmlnaHRQYXJ0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgY29tcGlsZSgpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucG9saXoubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIC8vSW5zcGV0aW9uIG9mIHRoZSBlbGVtZW50IGZyb20gbGV0dGVyc1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wb2xpeltpXSAhPT0gXCJXcml0ZVwiICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvbGl6W2ldICE9PSBcIlJlYWRcIiAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wb2xpeltpXS5zZWFyY2godGhpcy5mcm9tTGV0dGVycykgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAvL0luc3BlY3Rpb24gb2YgdGhlIGxhYmVsXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wb2xpeltpXS5zZWFyY2godGhpcy5pc0xhYmVsKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxhYmVsOiBcIiArIHRoaXMucG9saXpbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vSW5zcGVjdGlvbiBvZiB0aGUgSWYgc3RhdGVtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucG9saXpbaSArIDFdID09IFwi0KPQn9CbXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlcXVhbHMgVVBMXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYm9vbGVhblZhbHVlID0gdGhpcy5zdGFjay5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFib29sZWFuVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsYWJlbCA9IHRoaXMucG9saXpbaV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBpICsgMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhYmVsID09IHRoaXMucG9saXpbaW5kZXhdICYmIFwiOlwiID09IHRoaXMucG9saXpbaW5kZXggKyAxXSAmJiBpbmRleCA8IHRoaXMucG9saXoubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wb2xpei5sZW5ndGggPCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wb2xpei5sZW5ndGggPCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRleDIgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4Mi0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYWJlbCA9PSB0aGlzLnBvbGl6W2luZGV4Ml0gJiYgXCI6XCIgPT0gdGhpcy5wb2xpeltpbmRleDIgKyAxXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXgyLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gaW5kZXgyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucG9saXpbaSArIDFdID09IFwi0JHQn1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXF1YWxzIEJQXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGFiZWwgPSB0aGlzLnBvbGl6W2ldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBpICsgMjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWwgPT0gdGhpcy5wb2xpeltpbmRleF0gJiYgXCI6XCIgPT0gdGhpcy5wb2xpeltpbmRleCArIDFdICYmIGluZGV4IDwgdGhpcy5wb2xpei5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBvbGl6Lmxlbmd0aCA8IGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wb2xpei5sZW5ndGggPCBpbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4MiA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleDItLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhYmVsID09IHRoaXMucG9saXpbaW5kZXgyXSAmJiBcIjpcIiA9PSB0aGlzLnBvbGl6W2luZGV4MiArIDFdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleDItLTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkJQIGNpY2xlIDFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IGluZGV4MjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPSBpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vcHVzaCB0aGUgdmFyaWFibGUgaW50byB0aGUgc3RhY2tcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWNrLnB1c2godGhpcy5wb2xpeltpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wb2xpeltpXS5zZWFyY2godGhpcy5pc051bWJlcikgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAvL0luc3BlY3Rpb24gb2YgdGhlIGRpZ2l0IG51bWJlclxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFjay5wdXNoKHBhcnNlSW50KHRoaXMucG9saXpbaV0pKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vSW5zcGVjdGlvbiBvZiB0aGUgb3BlcmF0aW9uXHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMucG9saXpbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiPVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFzc2lnbk9wZXJhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiPj1cIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMubG9naWNhbEFyaWZtZXRpY2FsT3BlcmF0aW9uKHRoaXMucG9saXpbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXNFcnJvcnMpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFjay5wdXNoKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCI8PVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5sb2dpY2FsQXJpZm1ldGljYWxPcGVyYXRpb24odGhpcy5wb2xpeltpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmhhc0Vycm9ycykgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWNrLnB1c2gocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIj09XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLmxvZ2ljYWxBcmlmbWV0aWNhbE9wZXJhdGlvbih0aGlzLnBvbGl6W2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzRXJyb3JzKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2sucHVzaChyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiPD5cIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMubG9naWNhbEFyaWZtZXRpY2FsT3BlcmF0aW9uKHRoaXMucG9saXpbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXNFcnJvcnMpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFjay5wdXNoKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCI+XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLmxvZ2ljYWxBcmlmbWV0aWNhbE9wZXJhdGlvbih0aGlzLnBvbGl6W2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzRXJyb3JzKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2sucHVzaChyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiPFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5sb2dpY2FsQXJpZm1ldGljYWxPcGVyYXRpb24odGhpcy5wb2xpeltpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmhhc0Vycm9ycykgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWNrLnB1c2gocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIldyaXRlXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zcGVjdFdyaXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJSZWFkXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zcGVjdFJlYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIi1cIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMubG9naWNhbEFyaWZtZXRpY2FsT3BlcmF0aW9uKHRoaXMucG9saXpbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXNFcnJvcnMpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFjay5wdXNoKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCIrXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLmxvZ2ljYWxBcmlmbWV0aWNhbE9wZXJhdGlvbih0aGlzLnBvbGl6W2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzRXJyb3JzKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2sucHVzaChyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiKlwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5sb2dpY2FsQXJpZm1ldGljYWxPcGVyYXRpb24odGhpcy5wb2xpeltpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmhhc0Vycm9ycykgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWNrLnB1c2gocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIi9cIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMubG9naWNhbEFyaWZtZXRpY2FsT3BlcmF0aW9uKHRoaXMucG9saXpbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXNFcnJvcnMpIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFjay5wdXNoKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJeXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLmxvZ2ljYWxBcmlmbWV0aWNhbE9wZXJhdGlvbih0aGlzLnBvbGl6W2ldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzRXJyb3JzKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhY2sucHVzaChyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxlZnQgdGhpcyBzeW1ib2w6IFwiICsgdGhpcy5wb2xpeltpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhY2spO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImNsYXNzIExleGljYWxBbmFseXplciB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuYXJyYXlDb2RlTGluZXMgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJzb3VyY2VDb2RlXCIpLnNwbGl0KCdcXG4nKTtcblx0XHR0aGlzLmFycmF5SWRzPVtdO1xuXHRcdHRoaXMuYXJyYXlDb25zdGFudHM9W107XG5cdFx0dGhpcy5jb3VudElEcz0wO1xuXHRcdHRoaXMuY291bnRDb25zdGFudHM9MDtcblx0XHR0aGlzLmFyckxleGVtcz1bXTtcblx0XHR0aGlzLnN0YXRlPTE7XG5cdFx0dGhpcy5zdWJzdHI9XCJcIjtcblx0XHR0aGlzLmFyclZhcnM9W107XG5cdFx0dGhpcy5jYW5EZWZpbmU9dHJ1ZTtcblx0XHR0aGlzLnN5bWJSZWdleHByPS9cXCh8XFwpfFxcW3xcXF18XFx7fFxcfXxcXCt8XFwtfFxcKnxcXC98XFw6fFxcLHxcXDt8XFxefFxcbi87XG5cdFx0dGhpcy5lcnJvcnNJbkxleGljYWxBbmFseXplciA9IGZhbHNlO1xuXHRcdHRoaXMuaGFzRXJyb3JzID0gZmFsc2U7XG5cdFx0dGhpcy50YWJsZUxleGVtcz0gW1xuXHRcdFx0e2lkOjEsIG5hbWU6IFwiUHJvZ3JhbVwifSxcblx0XHRcdHtpZDoyLCBuYW1lOiBcIjtcIn0sXG5cdFx0XHR7aWQ6MywgbmFtZTogXCJWYXJcIn0sXG5cdFx0XHR7aWQ6NCwgbmFtZTogXCJCZWdpblwifSxcblx0XHRcdHtpZDo1LCBuYW1lOiBcIkVuZFwifSxcblx0XHRcdHtpZDo2LCBuYW1lOiBcIkVuZFByXCJ9LFxuXHRcdFx0e2lkOjcsIG5hbWU6IFwiOlwifSxcblx0XHRcdHtpZDo4LCBuYW1lOiBcImludGVnZXJcIn0sXG5cdFx0XHR7aWQ6OSwgbmFtZTogXCIsXCJ9LFxuXHRcdFx0e2lkOjEwLCBuYW1lOiBcIj1cIn0sXG5cdFx0XHR7aWQ6MTEsIG5hbWU6IFwiUmVhZFwifSxcblx0XHRcdHtpZDoxMiwgbmFtZTogXCJXcml0ZVwifSxcblx0XHRcdHtpZDoxMywgbmFtZTogXCJEb1wifSxcblx0XHRcdHtpZDoxNCwgbmFtZTogXCJUb1wifSxcblx0XHRcdHtpZDoxNSwgbmFtZTogXCJCeVwifSxcblx0XHRcdHtpZDoxNiwgbmFtZTogXCJXaGlsZVwifSxcblx0XHRcdHtpZDoxNywgbmFtZTogXCJJZlwifSxcblx0XHRcdHtpZDoxOCwgbmFtZTogXCJUaGVuXCJ9LFxuXHRcdFx0e2lkOjE5LCBuYW1lOiBcIitcIn0sXG5cdFx0XHR7aWQ6MjAsIG5hbWU6IFwiLVwifSxcblx0XHRcdHtpZDoyMSwgbmFtZTogXCIqXCJ9LFxuXHRcdFx0e2lkOjIyLCBuYW1lOiBcIi9cIn0sXG5cdFx0XHR7aWQ6MjMsIG5hbWU6IFwiXlwifSwgLy9zdGVwZW5cblx0XHRcdHtpZDoyNCwgbmFtZTogXCJPclwifSxcblx0XHRcdHtpZDoyNSwgbmFtZTogXCJOb3RcIn0sXG5cdFx0XHR7aWQ6MjYsIG5hbWU6IFwiKFwifSxcblx0XHRcdHtpZDoyNywgbmFtZTogXCIpXCJ9LFxuXHRcdFx0e2lkOjI4LCBuYW1lOiBcIjxcIn0sXG5cdFx0XHR7aWQ6MjksIG5hbWU6IFwiPD1cIn0sXG5cdFx0XHR7aWQ6MzAsIG5hbWU6IFwiPlwifSxcblx0XHRcdHtpZDozMSwgbmFtZTogXCI+PVwifSxcblx0XHRcdHtpZDozMiwgbmFtZTogXCI8PlwifSxcblx0XHRcdHtpZDozMywgbmFtZTogXCI9PVwifSxcblx0XHRcdHtpZDozNCwgbmFtZTogXCJpZFwifSxcblx0XHRcdHtpZDozNSwgbmFtZTogXCJjb25zdGFudFwifSxcblx0XHRcdHtpZDozNiwgbmFtZTpcIltcIn0sXG5cdFx0XHR7aWQ6MzcsIG5hbWUgOlwiXVwifSxcblx0XHRcdHtpZDozOCwgbmFtZSA6XCJBbmRcIn0sXG5cdFx0XHR7aWQ6MzksIG5hbWU6IFwie1wifSxcblx0XHRcdHtpZDo0MCwgbmFtZTogXCJ9XCJ9LFxuXHRcdF07XG5cdH1cblxuXHRwcmludFJvdyhhcnIsaSxpbmRleCx0YWJsZSkge1xuXHRcdGlmKGFycltpXS5oYXNPd25Qcm9wZXJ0eSgnY29kZUxleGVtJykpIHtcblx0XHRcdCQoJzx0cj4nK1xuXHRcdFx0XHRcdCc8dGQ+JythcnJbaV0uc3RyKyc8L3RkPicrXG5cdFx0XHRcdFx0Jzx0ZD4nK2FycltpXS5jb2RlTGV4ZW0rJzwvdGQ+Jytcblx0XHRcdFx0XHQnPHRkPicrKGFycltpXS5saW5lbm1iKzEpKyc8L3RkPicrXG5cdFx0XHRcdFx0Jzx0ZD4nK2luZGV4Kyc8L3RkPicrXG5cdFx0XHRcdCc8dHI+JykuYXBwZW5kVG8oJCgnLmZpcnN0LXRhYmxlIHRib2R5JykpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkKCc8dHI+Jytcblx0XHRcdFx0XHQnPHRkPicrYXJyW2ldLnN0cisnPC90ZD4nK1xuXHRcdFx0XHRcdCc8dGQ+JythcnJbaV0ubnVtYmVyKyc8L3RkPicrXG5cdFx0XHRcdCc8dHI+JykuYXBwZW5kVG8oJCh0YWJsZSkpO1xuXHRcdH1cblx0fTtcblxuXHRzaG93VGFibGVzKCkge1xuXHRcdGZvcih2YXIgaT0wO2k8dGhpcy5hcnJMZXhlbXMubGVuZ3RoO2krKykge1xuXHRcdFx0aWYodGhpcy5hcnJMZXhlbXNbaV0uY29kZUxleGVtPT0zNCkge1xuXHRcdFx0XHR0aGlzLmNvdW50SURzKys7XG5cdFx0XHRcdHRoaXMuYXJyYXlJZHMucHVzaCh7c3RyOnRoaXMuYXJyTGV4ZW1zW2ldLnN0ciwgbnVtYmVyOnRoaXMuY291bnRJRHN9KTtcblx0XHRcdFx0dGhpcy5wcmludFJvdyh0aGlzLmFyckxleGVtcyxpLHRoaXMuY291bnRJRHMpO1xuXHRcdFx0fSBlbHNlIGlmKHRoaXMuYXJyTGV4ZW1zW2ldLmNvZGVMZXhlbT09MzUpIHtcblx0XHRcdFx0dGhpcy5jb3VudENvbnN0YW50cysrO1xuXHRcdFx0XHR0aGlzLmFycmF5Q29uc3RhbnRzLnB1c2goe3N0cjp0aGlzLmFyckxleGVtc1tpXS5zdHIsIG51bWJlcjp0aGlzLmNvdW50Q29uc3RhbnRzfSk7XG5cdFx0XHRcdHRoaXMucHJpbnRSb3codGhpcy5hcnJMZXhlbXMsaSx0aGlzLmNvdW50Q29uc3RhbnRzKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMucHJpbnRSb3codGhpcy5hcnJMZXhlbXMsaSxudWxsKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmb3IoaT0wOyBpPHRoaXMuYXJyYXlJZHMubGVuZ3RoO2krKykge1xuXHRcdFx0dGhpcy5wcmludFJvdyh0aGlzLmFycmF5SWRzLGksbnVsbCwnLnNlY29uZC10YWJsZSB0Ym9keScpO1xuXHRcdH1cblxuXHRcdGZvcihpPTA7IGk8dGhpcy5hcnJheUNvbnN0YW50cy5sZW5ndGg7aSsrKSB7XG5cdFx0XHR0aGlzLnByaW50Um93KHRoaXMuYXJyYXlDb25zdGFudHMsaSxudWxsLCcudGhpcmQtdGFibGUgdGJvZHknKTtcblx0XHR9XG5cdH07XG5cblx0dG9Jbml0aWFsU3RhdGUobGluZW5tYixzdHIsY29kZUxleGVtKSB7XG5cdFx0dGhpcy5hcnJMZXhlbXMucHVzaCh7bGluZW5tYjpsaW5lbm1iLCBzdHI6c3RyLGNvZGVMZXhlbTpjb2RlTGV4ZW19KTtcblx0XHR0aGlzLnN1YnN0ciA9IFwiXCI7XG5cdFx0dGhpcy5zdGF0ZSA9IDE7XG5cdH07XG5cblx0aXNHYXAobGluZW5tYixzeW1iLHN1YnN0cikge1xuXHRcdGlmKHN5bWIgPT0gXCIgXCIgJiYgdGhpcy5zdGF0ZSA9PSAxKSB7XG5cdFx0XHR0aGlzLnN1YnN0ciA9ICcnO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSBlbHNlIGlmKHN5bWIgPT0gXCIgXCIgJiYgdGhpcy5zdGF0ZSA9PSAzKSB7XG5cdFx0XHR0aGlzLnRvSW5pdGlhbFN0YXRlKGxpbmVubWIsdGhpcy5zdWJzdHIsMzUpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcblxuXHRpc1N5bWJvbExleGVtKGxpbmVubWIsc3ltYikge1xuXHRcdGlmKHN5bWIuc2VhcmNoKHRoaXMuc3ltYlJlZ2V4cHIpIT0tMSAmJiB0aGlzLnN0YXRlID09IDEpIHtcblx0XHRcdGZvcih2YXIgaT0wO2k8dGhpcy50YWJsZUxleGVtcy5sZW5ndGg7aSsrKSB7XG5cdFx0XHRcdGlmKHRoaXMudGFibGVMZXhlbXNbaV0ubmFtZT09c3ltYikge1xuXHRcdFx0XHRcdHRoaXMuYXJyTGV4ZW1zLnB1c2goe2xpbmVubWI6bGluZW5tYixzdHI6c3ltYixjb2RlTGV4ZW06dGhpcy50YWJsZUxleGVtc1tpXS5pZH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnN1YnN0ciA9ICcnO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcblxuXHRjaGVja0xpbmVzKCkge1xuXG5cdFx0Zm9yKHZhciBpPTA7aTx0aGlzLmFycmF5Q29kZUxpbmVzLmxlbmd0aDtpKyspIHtcblxuXHRcdFx0dmFyIGxpbmUgPXRoaXMuYXJyYXlDb2RlTGluZXNbaV07XG5cdFx0XHRsaW5lKz0nXFxuJztcblxuXHRcdFx0Zm9yKHZhciBqPTA7ajxsaW5lLmxlbmd0aDtqKyspIHtcblxuXHRcdFx0XHRpZih0aGlzLmlzR2FwKGksbGluZVtqXSkpIHsgY29udGludWU7fVxuXHRcdFx0XHRpZih0aGlzLmlzU3ltYm9sTGV4ZW0oaSxsaW5lW2pdKSkgeyBjb250aW51ZTt9XG5cblx0XHRcdFx0dGhpcy5zdGF0ZSA9IHRoaXMuaW5jcGVjdFN0YXRlKGxpbmVbal0pO1xuXG5cdFx0XHRcdHN3aXRjaCAodGhpcy5zdGF0ZSkge1xuXHRcdFx0XHRcdGNhc2UgJ2Vycm9yJzpcblx0XHRcdFx0XHRcdGdpdmVFcnJvcignRXJyb3Igb24gbGluZSAnK2krJy4gUGxlYXNlIGNoZWNrIHlvdXIgc3ludGF4Jyk7XG5cdFx0XHRcdFx0XHR0aGlzLmhhc0Vycm9ycyA9IHRydWU7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnaic6XG5cdFx0XHRcdFx0XHRpZih0aGlzLnN1YnN0ciA9PSBcIkJlZ2luXCIpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5jYW5EZWZpbmU9ZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRmb3IodmFyIGs9MDtrPHRoaXMudGFibGVMZXhlbXMubGVuZ3RoOyBrKyspIHtcblx0XHRcdFx0XHRcdFx0aWYgKHRoaXMuc3Vic3RyID09IHRoaXMudGFibGVMZXhlbXNba10ubmFtZSkge1xuXHRcdFx0XHRcdFx0XHRcdC8vY2lyY2xlIGlzIHdvcmtpbmcgZXZlbiB3aGVuIG51bWJlciBpcyBmaW5kXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5hcnJMZXhlbXMucHVzaCh7bGluZW5tYjppLHN0cjp0aGlzLnN1YnN0cixjb2RlTGV4ZW06dGhpcy50YWJsZUxleGVtc1trXS5pZH0pO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR0aGlzLnN1YnN0ciA9IGxpbmVbal07XG5cdFx0XHRcdFx0XHR0aGlzLnN0YXRlID0gMTtcblx0XHRcdFx0XHRcdGotLTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICdpZCc6XG5cdFx0XHRcdFx0XHRpZighdGhpcy5jYW5EZWZpbmUpIHtcblx0XHRcdFx0XHRcdFx0Zm9yKHZhciBrPTA7azx0aGlzLmFyclZhcnMubGVuZ3RoO2srKykge1xuXHRcdFx0XHRcdFx0XHRcdGlmKHRoaXMuYXJyVmFyc1trXT09dGhpcy5zdWJzdHIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuYXJyTGV4ZW1zLnB1c2goe2xpbmVubWI6aSxzdHI6dGhpcy5zdWJzdHIsY29kZUxleGVtOjM0fSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0aWYoaz09KHRoaXMuYXJyVmFycy5sZW5ndGgtMSkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGdpdmVFcnJvcihcIlVuZGVmaW5lZCB2YXJpYWJsZSA6IFwiK3RoaXMuc3Vic3RyK1wiLiBMaW5lIFwiK2kpO1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5oYXNFcnJvcnMgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5hcnJWYXJzLnB1c2godGhpcy5zdWJzdHIpO1xuXHRcdFx0XHRcdFx0XHR0aGlzLmFyckxleGVtcy5wdXNoKHtsaW5lbm1iOmksc3RyOnRoaXMuc3Vic3RyLGNvZGVMZXhlbTozNH0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0dGhpcy5zdWJzdHIgPSBsaW5lW2pdO1xuXHRcdFx0XHRcdFx0dGhpcy5zdGF0ZSA9IDE7XG5cdFx0XHRcdFx0XHRqLS07XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnY29uJzpcblx0XHRcdFx0XHRcdHRoaXMuYXJyTGV4ZW1zLnB1c2goe2xpbmVubWI6aSxzdHI6dGhpcy5zdWJzdHIsY29kZUxleGVtOjM1fSk7XG5cdFx0XHRcdFx0XHR0aGlzLnN1YnN0ciA9IGxpbmVbal07XG5cdFx0XHRcdFx0XHR0aGlzLnN0YXRlID0gMTtcblx0XHRcdFx0XHRcdGotLTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICc9Jzpcblx0XHRcdFx0XHRcdHRoaXMudG9Jbml0aWFsU3RhdGUoaSxcIj1cIiwxMCk7XG5cdFx0XHRcdFx0XHRqLS07XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnPT0nOlxuXHRcdFx0XHRcdFx0dGhpcy50b0luaXRpYWxTdGF0ZShpLFwiPT1cIiwzMyk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnPD0nOlxuXHRcdFx0XHRcdFx0dGhpcy50b0luaXRpYWxTdGF0ZShpLFwiPD1cIiwyOSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnPCc6XG5cdFx0XHRcdFx0XHR0aGlzLnRvSW5pdGlhbFN0YXRlKGksXCI8XCIsMjgpO1xuXHRcdFx0XHRcdFx0ai0tO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJz49Jzpcblx0XHRcdFx0XHRcdHRoaXMudG9Jbml0aWFsU3RhdGUoaSxcIj49XCIsMzEpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJz4nOlxuXHRcdFx0XHRcdFx0dGhpcy50b0luaXRpYWxTdGF0ZShpLFwiPlwiLDMwKTtcblx0XHRcdFx0XHRcdGotLTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICc8Pic6XG5cdFx0XHRcdFx0XHR0aGlzLnRvSW5pdGlhbFN0YXRlKGksXCI8PlwiLDMyKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0dGhpcy5zdWJzdHIrPWxpbmVbal07XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH07XG5cblx0aW5jcGVjdFN0YXRlKHN5bWIpIHtcblx0c3dpdGNoICh0aGlzLnN0YXRlKSB7XG5cdFx0Y2FzZSAxOlxuXHRcdFx0aWYoc3ltYi5zZWFyY2goL1tBLVphLXpdLykhPS0xKSB7XG5cdFx0XHRcdHJldHVybiAyO1xuXHRcdFx0fSBlbHNlIGlmKHN5bWIuc2VhcmNoKC9bMC05XS8pIT0tMSkge1xuXHRcdFx0XHRyZXR1cm4gMztcblx0XHRcdH0gZWxzZSBpZiAoc3ltYiA9PSAnPCcpIHtcblx0XHRcdFx0cmV0dXJuIDQ7XG5cdFx0XHR9IGVsc2UgaWYgKHN5bWIgPT0gJz4nKSB7XG5cdFx0XHRcdHJldHVybiA1O1xuXHRcdFx0fSBlbHNlIGlmIChzeW1iID09ICc9Jykge1xuXHRcdFx0XHRyZXR1cm4gNjtcblx0XHRcdH0gZWxzZSBpZihzeW1iLnNlYXJjaCh0aGlzLnN5bWJSZWdleHByKSE9LTEpIHtcblx0XHRcdFx0cmV0dXJuICdqJztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiAnZXJyb3InO1xuXHRcdFx0fVxuXHRcdGJyZWFrO1xuXHRcdGNhc2UgMjpcblx0XHRcdGlmKHN5bWIuc2VhcmNoKC9bQS1aYS16MC05XS8pIT0tMSkge1xuXHRcdFx0XHRyZXR1cm4gMjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZvcih2YXIgaT0wO2k8dGhpcy50YWJsZUxleGVtcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdGlmICh0aGlzLnN1YnN0ciA9PSB0aGlzLnRhYmxlTGV4ZW1zW2ldLm5hbWUpIHtcblx0XHRcdFx0XHRcdHJldHVybiAnaic7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiAnaWQnO1xuXHRcdFx0fVxuXHRcdGJyZWFrO1xuXHRcdGNhc2UgMzpcblx0XHRcdGlmIChzeW1iLnNlYXJjaCgvWzAtOV0vKSE9IC0xKSB7XG5cdFx0XHRcdHJldHVybiAzO1xuXHRcdFx0fSBlbHNlIGlmKHN5bWIuc2VhcmNoKHRoaXMuc3ltYlJlZ2V4cHIpIT0tMSkge1xuXHRcdFx0XHRyZXR1cm4gJ2Nvbic7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gJ2Vycm9yJztcblx0XHRcdH1cblx0XHRicmVhaztcblx0XHRjYXNlIDQ6XG5cdFx0XHRpZihzeW1iID09ICc9Jykge1xuXHRcdFx0XHRyZXR1cm4gJzw9Jztcblx0XHRcdH0gZWxzZSBpZiAoc3ltYiA9PSAnPicpIHtcblx0XHRcdFx0cmV0dXJuICc8Pic7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gJzwnO1xuXHRcdFx0fVxuXHRcdGJyZWFrO1xuXHRcdGNhc2UgNTpcblx0XHRcdGlmKHN5bWIgPT0gJz0nKSB7XG5cdFx0XHRcdHJldHVybiAnPj0nO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuICc+Jztcblx0XHRcdH1cblx0XHRicmVhaztcblx0XHRjYXNlIDY6XG5cdFx0XHRpZihzeW1iID09ICc9Jykge1xuXHRcdFx0XHRyZXR1cm4gJz09Jztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiAnPSc7XG5cdFx0XHR9XG5cdFx0YnJlYWs7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiAnZXJyb3InO1xuXHRcdGJyZWFrO1xuXHR9XG59O1xuXG59IiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG5cdCQoJy50YWJzLWNvbnRhaW5lciBhJykuY2xpY2soZnVuY3Rpb24oZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdCQodGhpcykudGFiKCdzaG93Jylcblx0fSk7XG5cblxuXHR2YXIgZGVmYXVsdFNvcmNlQ29kZSA9IFwiUHJvZ3JhbSBteVByb2dyYW07XFxuXFwgVmFyIGksazppbnRlZ2VyO1xcblxcIEJlZ2luXFxuXFwgayA9IDEwO1xcblxcIGkgPSA1O1xcblxcIElmIChrPD00NSkgVGhlbiB7XFxuXFwgIGsgPSBpKzE1L2s7XFxuXFwgfTtcXG5cXCBEbyBrID0gMiBUbyAxMiBCeSAyIFdoaWxlKGs8NylcXG5cXCAgIGsgPSBpKzE1L2s7XFxuXFwgRW5kO1xcblxcIFJlYWQgKGspO1xcblxcIFdyaXRlIChpKTtcXG5cXCBFbmRQclwiO1xuXG5cblx0Ly9pbnNwZWN0aW9uIHNvdXJjZSBjb2RlIGZyb20gbG9jYWxTdG9yYWdlXG5cdGlmICghd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwic291cmNlQ29kZVwiKSkge1xuXHRcdHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInNvdXJjZUNvZGVcIiwgZGVmYXVsdFNvcmNlQ29kZSlcblx0XHQkKCcuaW5wdXQtc291cmNlQ29kZS1hcmVhJykudmFsKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInNvdXJjZUNvZGVcIikpO1xuXHR9IGVsc2Uge1xuXHRcdCQoJy5pbnB1dC1zb3VyY2VDb2RlLWFyZWEnKS52YWwod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwic291cmNlQ29kZVwiKSk7XG5cdH1cblxuXG5cdC8vIEhhbmRsZXJzXG5cdCQoJy5zYXZlLWJ0bicpLmNsaWNrKHNhdmVTb3VyY2VDb2RlKTtcblx0JCgnLmxhLWJ0bicpLmNsaWNrKGxleGljYWxBbmFseXplKTtcblx0JCgnLnJlc2V0LWJ0bicpLmNsaWNrKHJlc2V0RnVuYyk7XG5cdCQoJy5kZWZhdWx0LXNvdXJjZS1jb2RlJykuY2xpY2soZGVmYXVsdFNvdXJjZUNvZGVGdW5jKTtcblx0JCgnLnNhLWJ0bicpLmNsaWNrKHN5bnRheEFuYWx5emUpO1xuXHQkKCcuY28tYnRuJykuY2xpY2soY29tcGlsZUZ1bmMpXG5cblxuXHRmdW5jdGlvbiBkZWZhdWx0U291cmNlQ29kZUZ1bmMoKSB7XG5cdFx0JCgnLmlucHV0LXNvdXJjZUNvZGUtYXJlYScpLnZhbChkZWZhdWx0U29yY2VDb2RlKTtcblx0XHRzYXZlU291cmNlQ29kZSgpO1xuXHR9XG59KTtcblxuZnVuY3Rpb24gc2F2ZVNvdXJjZUNvZGUoKSB7XG5cdHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInNvdXJjZUNvZGVcIiwgJCgnLmlucHV0LXNvdXJjZUNvZGUtYXJlYScpLnZhbCgpKTtcblx0JChcIjxkaXYgY2xhc3M9J3N1Y2NzZXNzLW1zZyc+TmV3IHNvdXJjZSBjb2RlIHdhcyBzYXZlZC48L2Rpdj5cIilcblx0XHRcdC5hcHBlbmRUbygkKCcuY29uc29sZSAucGFuZWwtYm9keScpKTtcbn1cblxuZnVuY3Rpb24gZ2l2ZUVycm9yKHN0cikge1xuXHQkKFwiPGRpdiBjbGFzcz0nZXJyb3ItbXNnJz5cIiArIHN0ciArIFwiPC9kaXY+XCIpLmFwcGVuZFRvKCQoJy5jb25zb2xlIC5wYW5lbC1ib2R5JykpO1xufVxuXG5mdW5jdGlvbiBsZXhpY2FsQW5hbHl6ZSgpIHtcblx0c2F2ZVNvdXJjZUNvZGUoKTtcblx0Ly9yZXNldEZ1bmMoKTtcblx0dmFyIGxhID0gbmV3IExleGljYWxBbmFseXplcigpO1xuXHRsYS5jaGVja0xpbmVzKCk7XG5cdGlmKCFsYS5oYXNFcnJvcnMpIHtcblx0XHQkKFwiPGRpdiBjbGFzcz0nc3VjY3Nlc3MtbXNnJz5MZXhpY2FsIGFuYWx5emVyIGNvbXBsZXRlZCBzdWNjZXNzZnVsbHkuPC9kaXY+XCIpXG5cdFx0XHQuYXBwZW5kVG8oJCgnLmNvbnNvbGUgLnBhbmVsLWJvZHknKSk7XG5cdH07XG5cblx0d2luZG93LnJlc3VsdExBID0gIWxhLmhhc0Vycm9ycztcblxuXHRsYS5zaG93VGFibGVzKCk7XG5cdHdpbmRvdy5hcnJheU9mTGV4ZW1zID0gbGEuYXJyTGV4ZW1zO1xuXG59XG5cbmZ1bmN0aW9uIHJlc2V0RnVuYygpIHtcblx0JCgndGJvZHknKS5yZW1vdmUoKTtcblx0JCgnPHRib2R5PjwvdGJvZHk+JykuYXBwZW5kVG8oJ3RhYmxlJyk7XG5cdCQoJy5jb25zb2xlIC5wYW5lbC1ib2R5JykuaHRtbCgnJyk7XG59XG5cbmZ1bmN0aW9uIHN5bnRheEFuYWx5emUoKSB7XG5cdGlmKHdpbmRvdy5yZXN1bHRMQSkge1xuXHRcdHZhciBzYSA9IG5ldyBTeW50YXhBbmFseXplcih3aW5kb3cuYXJyYXlPZkxleGVtcyksXG5cdFx0XHRyZXN1bHRTQSA9IHNhLmFuYWx5emUoKTtcblx0XHRcdGlmKHJlc3VsdFNBKSB7XG5cdFx0XHRcdCQoXCI8ZGl2IGNsYXNzPSdzdWNjc2Vzcy1tc2cnPlN5bnRheCBhbmFseXplciBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LjwvZGl2PlwiKVxuXHRcdFx0XHRcdC5hcHBlbmRUbygkKCcuY29uc29sZSAucGFuZWwtYm9keScpKTtcblx0XHRcdH1cblx0XHRcdHdpbmRvdy5yZXN1bHRTQSA9IHJlc3VsdFNBXG5cdH0gZWxzZSB7XG5cdFx0Z2l2ZUVycm9yKFwiVGhlcmUgaXMgcHJvYmxlbSBpbiB5b3VyIGxleGljYWwgYW5hbHl6ZXIhXCIpO1xuXHR9XG59XG5cblxuZnVuY3Rpb24gY29tcGlsZUZ1bmMoKSB7XG5cdHJlc2V0RnVuYygpO1xuXHRsZXhpY2FsQW5hbHl6ZSgpO1xuXHRzeW50YXhBbmFseXplKCk7XG5cdGlmKHdpbmRvdy5yZXN1bHRMQSkge1xuXHRcdHZhciBwb2wgPSBuZXcgUG9saXood2luZG93LmFycmF5T2ZMZXhlbXMpO1xuXHRcdHBvbC5tYWtlSW5Qb2xpeigpO1xuXHRcdHZhciBjb20gPSBuZXcgQ29tcGlsZXIocG9sLnBvbGl6LHBvbC5sYWJlbHMpO1xuXHRcdGNvbS5jb21waWxlKCk7XG5cdH0gZWxzZSB7XG5cdFx0Z2l2ZUVycm9yKFwiVGhlcmUgaXMgcHJvYmxlbSBpbiB5b3VyIGxleGljYWxvciBvciBzeW50YXggYW5hbHl6ZXJzIVwiKTtcblx0fVxufSIsImNsYXNzIFBvbGl6IHtcblx0Y29uc3RydWN0b3IoYXJyTGV4ZW1zKSB7XG5cdFx0dGhpcy5hcnJMZXhlbXMgPSBhcnJMZXhlbXM7XG5cdFx0dGhpcy5zdGFjayA9IFtdO1xuXHRcdHRoaXMucG9saXogPSBbXTtcblx0XHR0aGlzLnBvbGl6T3BlcmF0b3IgPSBbXTtcblx0XHR0aGlzLmNvdW50TGFiZWxzID0gMDtcblx0XHR0aGlzLmxhYmVscyA9IFtdO1xuXHRcdHRoaXMuaW5kZXggPSAwO1xuXHRcdHRoaXMucHJpb3JpdGllcyA9IFtcblx0XHRcdHtzdHI6IFwiKFwiLCAgICAgcHJpb3JpdHk6IDAsICBjb2RlTGV4ZW06MjYgIH0sXG5cdFx0XHR7c3RyOiBcIilcIiwgICAgIHByaW9yaXR5OiAxLCAgY29kZUxleGVtOjI3ICB9LFxuXHRcdFx0e3N0cjogXCJbXCIsICAgICBwcmlvcml0eTogMCwgIGNvZGVMZXhlbTozNiAgfSxcblx0XHRcdHtzdHI6IFwiXVwiLCAgICAgcHJpb3JpdHk6IDEsICBjb2RlTGV4ZW06MzcgIH0sXG5cdFx0XHR7c3RyOiBcIj1cIiwgICAgIHByaW9yaXR5OiAyLCAgY29kZUxleGVtOjEwICB9LFxuXHRcdFx0e3N0cjogXCJPclwiLCAgICBwcmlvcml0eTogMywgIGNvZGVMZXhlbToyNCAgfSxcblx0XHRcdHtzdHI6IFwiQW5kXCIsICAgcHJpb3JpdHk6IDQsICBjb2RlTGV4ZW06MzggIH0sXG5cdFx0XHR7c3RyOiBcIk5vdFwiLCAgIHByaW9yaXR5OiA1LCAgY29kZUxleGVtOjI1ICB9LFxuXHRcdFx0e3N0cjogXCI8XCIsICAgICBwcmlvcml0eTogNiwgIGNvZGVMZXhlbToyOCAgfSxcblx0XHRcdHtzdHI6IFwiPlwiLCAgICAgcHJpb3JpdHk6IDYsICBjb2RlTGV4ZW06MzAgIH0sXG5cdFx0XHR7c3RyOiBcIj09XCIsICAgIHByaW9yaXR5OiA2LCAgY29kZUxleGVtOjMzICB9LFxuXHRcdFx0e3N0cjogXCI8PlwiLCAgICBwcmlvcml0eTogNiwgIGNvZGVMZXhlbTozMiAgfSxcblx0XHRcdHtzdHI6IFwiPj1cIiwgICAgcHJpb3JpdHk6IDYsICBjb2RlTGV4ZW06MzEgIH0sXG5cdFx0XHR7c3RyOiBcIjw9XCIsICAgIHByaW9yaXR5OiA2LCAgY29kZUxleGVtOjI5ICB9LFxuXHRcdFx0e3N0cjogXCIrXCIsICAgICBwcmlvcml0eTogNywgIGNvZGVMZXhlbToxOSAgfSxcblx0XHRcdHtzdHI6IFwiLVwiLCAgICAgcHJpb3JpdHk6IDcsICBjb2RlTGV4ZW06MjAgIH0sXG5cdFx0XHR7c3RyOiBcIipcIiwgICAgIHByaW9yaXR5OiA4LCAgY29kZUxleGVtOjIxICB9LFxuXHRcdFx0e3N0cjogXCIvXCIsICAgICBwcmlvcml0eTogOCwgIGNvZGVMZXhlbToyMiAgfSxcblx0XHRcdHtzdHI6IFwiQFwiLCAgICAgcHJpb3JpdHk6IDgsICBjb2RlTGV4ZW06MjAgIH0sXG5cdFx0XHR7c3RyOiBcIl5cIiwgICAgIHByaW9yaXR5OiA5LCAgY29kZUxleGVtOjIzICB9LFxuXHRcdFx0e3N0cjogXCJJZlwiLCAgICBwcmlvcml0eTogMCwgIGNvZGVMZXhlbToxNyAgfSxcblx0XHRcdHtzdHI6IFwiVGhlblwiLCAgcHJpb3JpdHk6IDEsICBjb2RlTGV4ZW06MTggIH0sXG5cdFx0XHR7c3RyOiBcIldoaWxlXCIsIHByaW9yaXR5OiAwLCAgY29kZUxleGVtOjE2ICB9LFxuXHRcdFx0e3N0cjogXCJEb1wiLCAgICBwcmlvcml0eTogMSwgIGNvZGVMZXhlbToxMyAgfSxcblx0XHRdO1xuXHR9XG5cblx0aXNBbnlCaW5hcnlPcGVyYXRvcihzdHIpIHtcblx0XHRmb3IodmFyIGkgPSAwOyBpPHRoaXMucHJpb3JpdGllcy5sZW5ndGg7aSsrKSB7XG5cdFx0XHRpZihzdHI9PXRoaXMucHJpb3JpdGllc1tpXS5zdHIpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGluc3BlY3RVbmFyeU1pbnVzKCkge1xuXHRcdGlmKHRoaXMuYXJyTGV4ZW1zW3RoaXMuaW5kZXhdLnN0cj09XCItXCJcblx0XHRcdCYmIHRoaXMuaXNBbnlCaW5hcnlPcGVyYXRvcih0aGlzLmFyckxleGVtc1t0aGlzLmluZGV4LTFdLnN0cikpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRjaGFuZ2VUb1N0YWNrRWxlbWVudCgpIHtcblx0XHRmb3IodmFyIGkgPSAwOyBpPHRoaXMucHJpb3JpdGllcy5sZW5ndGg7IGkrKykge1xuXG5cdFx0XHRpZih0aGlzLmluc3BlY3RVbmFyeU1pbnVzKCkpIHtcblx0XHRcdFx0cmV0dXJuIHtzdHI6IFwiQFwiLCBwcmlvcml0eTogOH07XG5cdFx0XHR9XG5cblx0XHRcdGlmKHRoaXMucHJpb3JpdGllc1tpXS5jb2RlTGV4ZW09PXRoaXMuYXJyTGV4ZW1zW3RoaXMuaW5kZXhdLmNvZGVMZXhlbSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5wcmlvcml0aWVzW2ldO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHB1bGxCZXR3ZWVuQnJha2V0cyhicmFja2V0KXtcblx0XHR3aGlsZSh0aGlzLnN0YWNrW3RoaXMuc3RhY2subGVuZ3RoLTFdLnN0ciE9PWJyYWNrZXQgKSB7XG5cdFx0XHR0aGlzLnBvbGl6T3BlcmF0b3IucHVzaCh0aGlzLnN0YWNrLnBvcCgpLnN0cik7XG5cdFx0fVxuXHRcdHRoaXMuc3RhY2sucG9wKCk7XG5cdH1cblxuXHQvLy0+IGFueUFzc2lnbm1lbnRcblx0bWFnYXppbmVPcGVyYXRpb24oKSB7XG5cblx0XHRpZih0aGlzLmFyckxleGVtc1t0aGlzLmluZGV4XS5jb2RlTGV4ZW09PTM0IHx8XG5cdFx0XHR0aGlzLmFyckxleGVtc1t0aGlzLmluZGV4XS5jb2RlTGV4ZW09PTM1KSB7XG5cdFx0XHR0aGlzLnBvbGl6T3BlcmF0b3IucHVzaCh0aGlzLmFyckxleGVtc1t0aGlzLmluZGV4XS5zdHIpO1xuXHRcdFx0dGhpcy5pbmRleCsrO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR2YXIgZWxlbWVudCA9IHRoaXMuY2hhbmdlVG9TdGFja0VsZW1lbnQoKTtcblxuXHRcdGlmKHRoaXMuc3RhY2subGVuZ3RoPT0wKSB7XG5cdFx0XHR0aGlzLnN0YWNrLnB1c2goZWxlbWVudCk7XG5cdFx0XHR0aGlzLmluZGV4Kys7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRpZihlbGVtZW50LnByaW9yaXR5PnRoaXMuc3RhY2tbdGhpcy5zdGFjay5sZW5ndGgtMV0ucHJpb3JpdHkpIHtcblx0XHRcdFx0dGhpcy5zdGFjay5wdXNoKGVsZW1lbnQpO1xuXHRcdFx0XHR0aGlzLmluZGV4Kys7XG5cdFx0XHR9IGVsc2UgaWYoZWxlbWVudC5wcmlvcml0eSA9PSB0aGlzLnN0YWNrW3RoaXMuc3RhY2subGVuZ3RoLTFdLnByaW9yaXR5IHx8XG5cdFx0XHRcdGVsZW1lbnQucHJpb3JpdHk8dGhpcy5zdGFja1t0aGlzLnN0YWNrLmxlbmd0aC0xXS5wcmlvcml0eSkge1xuXG5cdFx0XHRcdGlmKGVsZW1lbnQuc3RyPT1cIihcIiB8fCBlbGVtZW50LnN0cj09XCJbXCIpIHtcblx0XHRcdFx0XHR0aGlzLnN0YWNrLnB1c2goZWxlbWVudCk7XG5cdFx0XHRcdFx0dGhpcy5pbmRleCsrO1xuXHRcdFx0XHR9IGVsc2UgaWYoZWxlbWVudC5zdHI9PVwiKVwiIHx8IGVsZW1lbnQuc3RyPT1cIl1cIikge1xuXG5cblx0XHRcdFx0XHRpZihlbGVtZW50LnN0cj09XCIpXCIpIHRoaXMucHVsbEJldHdlZW5CcmFrZXRzKFwiKFwiKTtcblx0XHRcdFx0XHRpZihlbGVtZW50LnN0cj09XCJdXCIpIHRoaXMucHVsbEJldHdlZW5CcmFrZXRzKFwiW1wiKTtcblxuXG5cdFx0XHRcdFx0dGhpcy5pbmRleCsrO1xuXHRcdFx0XHRcdHJldHVybiBcImNsb3NlIGJyYWNrZXQgc2lnbmFsXCI7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5wb2xpek9wZXJhdG9yLnB1c2godGhpcy5zdGFjay5wb3AoKS5zdHIpO1xuXHRcdFx0XHRcdHRoaXMubWFnYXppbmVPcGVyYXRpb24oKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vUmVhZC9Xcml0ZVxuXHRwb2xpelJlYWRXcml0ZSh3b3JkKSB7XG5cdFx0d2hpbGUodGhpcy5hcnJMZXhlbXNbdGhpcy5pbmRleF0uY29kZUxleGVtIT09Mikge1xuXHRcdFx0aWYodGhpcy5hcnJMZXhlbXNbdGhpcy5pbmRleF0uY29kZUxleGVtPT0zNCkge1xuXHRcdFx0XHR0aGlzLnBvbGl6T3BlcmF0b3IucHVzaCh0aGlzLmFyckxleGVtc1t0aGlzLmluZGV4XS5zdHIpO1xuXHRcdFx0XHR0aGlzLnBvbGl6T3BlcmF0b3IucHVzaCh3b3JkKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuaW5kZXgrKztcblx0XHR9XG5cdFx0dGhpcy5pbmRleCsrO1xuXHR9XG5cblx0Ly9XaGlsZSBEbyBwb2xpelxuXHRwb2xpekRvKG9iakxhYmVscykge1xuXG5cdFx0Y29uc29sZS5sb2coXCJJbiBkbyBjaWNsZVwiKTtcblxuXHRcdHZhciBJZCA9IHRoaXMuYXJyTGV4ZW1zW3RoaXMuaW5kZXhdLnN0cjtcblx0XHR2YXIgd2hpbGVMZWZ0ID0gZmFsc2U7XG5cblx0XHR3aGlsZSh0aGlzLmFyckxleGVtc1t0aGlzLmluZGV4XS5jb2RlTGV4ZW0hPT0yKSB7XG5cblx0XHRcdGlmKHRoaXMuYXJyTGV4ZW1zW3RoaXMuaW5kZXhdLmNvZGVMZXhlbSA9PSAxNCB8fFxuXHRcdFx0XHR0aGlzLmFyckxleGVtc1t0aGlzLmluZGV4XS5jb2RlTGV4ZW0gPT0gMTUgfHxcblx0XHRcdFx0dGhpcy5hcnJMZXhlbXNbdGhpcy5pbmRleF0uY29kZUxleGVtID09IDE2KSB7XG5cblx0XHRcdFx0Ly9Ub1xuXHRcdFx0XHRpZih0aGlzLmFyckxleGVtc1t0aGlzLmluZGV4XS5jb2RlTGV4ZW0gPT0gMTQpIHtcblx0XHRcdFx0XHR3aGlsZSh0aGlzLnN0YWNrW3RoaXMuc3RhY2subGVuZ3RoLTFdLmNvZGVMZXhlbSE9PTEzKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnBvbGl6T3BlcmF0b3IucHVzaCh0aGlzLnN0YWNrLnBvcCgpLnN0cik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRoaXMucG9saXpPcGVyYXRvci5wdXNoKG9iakxhYmVscy5taSk7XG5cdFx0XHRcdFx0dGhpcy5wb2xpek9wZXJhdG9yLnB1c2goXCLQkdCfXCIpO1xuXHRcdFx0XHRcdHRoaXMucG9saXpPcGVyYXRvci5wdXNoKG9iakxhYmVscy5taV9wbHVzMik7XG5cdFx0XHRcdFx0dGhpcy5wb2xpek9wZXJhdG9yLnB1c2goXCI6XCIpO1xuXHRcdFx0XHRcdHRoaXMucG9saXpPcGVyYXRvci5wdXNoKElkKTtcblxuXHRcdFx0XHRcdHRoaXMuaW5kZXgrKztcblxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKHRoaXMucG9saXpPcGVyYXRvcik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvL0J5XG5cdFx0XHRcdGlmKHRoaXMuYXJyTGV4ZW1zW3RoaXMuaW5kZXhdLmNvZGVMZXhlbSA9PSAxNSkge1xuXG5cdFx0XHRcdFx0d2hpbGUodGhpcy5zdGFja1t0aGlzLnN0YWNrLmxlbmd0aC0xXS5jb2RlTGV4ZW0hPT0xMykge1xuXHRcdFx0XHRcdFx0dGhpcy5wb2xpek9wZXJhdG9yLnB1c2godGhpcy5zdGFjay5wb3AoKS5zdHIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aGlzLnBvbGl6T3BlcmF0b3IucHVzaChcIjw9XCIpO1xuXHRcdFx0XHRcdHRoaXMucG9saXpPcGVyYXRvci5wdXNoKG9iakxhYmVscy5taV9wbHVzMyk7XG5cdFx0XHRcdFx0dGhpcy5wb2xpek9wZXJhdG9yLnB1c2goXCLQo9Cf0JtcIik7XG5cdFx0XHRcdFx0dGhpcy5wb2xpek9wZXJhdG9yLnB1c2gob2JqTGFiZWxzLm1pKTtcblx0XHRcdFx0XHR0aGlzLnBvbGl6T3BlcmF0b3IucHVzaChcItCR0J9cIik7XG5cdFx0XHRcdFx0dGhpcy5wb2xpek9wZXJhdG9yLnB1c2gob2JqTGFiZWxzLm1pX3BsdXMxKTtcblx0XHRcdFx0XHR0aGlzLnBvbGl6T3BlcmF0b3IucHVzaChcIjpcIik7XG5cdFx0XHRcdFx0dGhpcy5wb2xpek9wZXJhdG9yLnB1c2goSWQpO1xuXHRcdFx0XHRcdHRoaXMucG9saXpPcGVyYXRvci5wdXNoKElkKTtcblxuXHRcdFx0XHRcdHRoaXMuaW5kZXgrKztcblxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKHRoaXMucG9saXpPcGVyYXRvcik7XG5cdFx0XHRcdH1cblxuXG5cdFx0XHRcdC8vV2hpbGVcblx0XHRcdFx0aWYodGhpcy5hcnJMZXhlbXNbdGhpcy5pbmRleF0uY29kZUxleGVtID09IDE2KSB7XG5cdFx0XHRcdFx0d2hpbGUodGhpcy5zdGFja1t0aGlzLnN0YWNrLmxlbmd0aC0xXS5jb2RlTGV4ZW0hPT0xMykge1xuXHRcdFx0XHRcdFx0dGhpcy5wb2xpek9wZXJhdG9yLnB1c2godGhpcy5zdGFjay5wb3AoKS5zdHIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aGlzLnBvbGl6T3BlcmF0b3IucHVzaChcIitcIik7XG5cdFx0XHRcdFx0dGhpcy5wb2xpek9wZXJhdG9yLnB1c2goXCI9XCIpO1xuXHRcdFx0XHRcdHRoaXMucG9saXpPcGVyYXRvci5wdXNoKG9iakxhYmVscy5taV9wbHVzMik7XG5cdFx0XHRcdFx0dGhpcy5wb2xpek9wZXJhdG9yLnB1c2goXCLQkdCfXCIpO1xuXHRcdFx0XHRcdHRoaXMucG9saXpPcGVyYXRvci5wdXNoKG9iakxhYmVscy5taSk7XG5cdFx0XHRcdFx0dGhpcy5wb2xpek9wZXJhdG9yLnB1c2goXCI6XCIpO1xuXG5cdFx0XHRcdFx0dGhpcy5zdGFjay5wdXNoKHRoaXMucHJpb3JpdGllc1syMl0pO1xuXHRcdFx0XHRcdHRoaXMuaW5kZXgrKztcblxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKHRoaXMucG9saXpPcGVyYXRvcik7XG5cdFx0XHRcdFx0d2hpbGVMZWZ0ID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR2YXIgcmVzID0gdGhpcy5tYWdhemluZU9wZXJhdGlvbigpO1xuXHRcdFx0aWYocmVzID09IFwiY2xvc2UgYnJhY2tldCBzaWduYWxcIiAmJiB3aGlsZUxlZnQpIHtcblx0XHRcdFx0d2hpbGUodGhpcy5zdGFja1t0aGlzLnN0YWNrLmxlbmd0aC0xXS5jb2RlTGV4ZW0hPT0xNikge1xuXHRcdFx0XHRcdHRoaXMucG9saXpPcGVyYXRvci5wdXNoKHRoaXMuc3RhY2sucG9wKCkuc3RyKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMucG9saXpPcGVyYXRvci5wdXNoKG9iakxhYmVscy5taV9wbHVzMyk7XG5cdFx0XHRcdHRoaXMucG9saXpPcGVyYXRvci5wdXNoKFwi0KPQn9CbXCIpO1xuXHRcdFx0XHQvL3RoaXMuaW5kZXgrKztcblxuXHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzLnBvbGl6T3BlcmF0b3IpO1xuXG5cdFx0XHRcdHdoaWxlKHRoaXMuYXJyTGV4ZW1zW3RoaXMuaW5kZXhdLmNvZGVMZXhlbSE9PTUpIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzLmFyckxleGVtc1t0aGlzLmluZGV4XS5jb2RlTGV4ZW0rXCItY29kZWxleGVtXCIpO1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKHRoaXMuYXJyTGV4ZW1zW3RoaXMuaW5kZXhdLnN0citcIi1zdHJcIik7XG5cdFx0XHRcdFx0dGhpcy5wb2xpek9mT3BlcmF0b3IoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHdoaWxlKHRoaXMuc3RhY2tbdGhpcy5zdGFjay5sZW5ndGgtMV0uY29kZUxleGVtIT09MTYpIHtcblx0XHRcdFx0XHR0aGlzLnBvbGl6T3BlcmF0b3IucHVzaCh0aGlzLnN0YWNrLnBvcCgpLnN0cik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLnN0YWNrLnBvcCgpO1xuXG5cdFx0XHRcdHRoaXMucG9saXpPcGVyYXRvci5wdXNoKG9iakxhYmVscy5taV9wbHVzMSk7XG5cdFx0XHRcdHRoaXMucG9saXpPcGVyYXRvci5wdXNoKFwi0JHQn1wiKTtcblx0XHRcdFx0dGhpcy5wb2xpek9wZXJhdG9yLnB1c2gob2JqTGFiZWxzLm1pX3BsdXMzKTtcblx0XHRcdFx0dGhpcy5wb2xpek9wZXJhdG9yLnB1c2goXCI6XCIpO1xuXG5cdFx0XHRcdHRoaXMuaW5kZXgrKztcblxuXHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzLmFyckxleGVtc1t0aGlzLmluZGV4XS5jb2RlTGV4ZW0rXCItY29kZWxleGVtXCIpO1xuXHRcdFx0XHRjb25zb2xlLmxvZyh0aGlzLmFyckxleGVtc1t0aGlzLmluZGV4XS5zdHIrXCItc3RyXCIpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMuaW5kZXgrKztcblxuXHR9XG5cblx0Ly9JZiBwb2xpelxuXHRwb2xpeklmKCkge1xuXHRcdHdoaWxlKHRoaXMuYXJyTGV4ZW1zW3RoaXMuaW5kZXhdLmNvZGVMZXhlbSE9PTIpIHtcblx0XHRcdGlmKHRoaXMuYXJyTGV4ZW1zW3RoaXMuaW5kZXhdLmNvZGVMZXhlbSA9PSAxOCkge1xuXHRcdFx0XHR0aGlzLnB1bGxCZXR3ZWVuSWZUaGVuKCk7XG5cdFx0XHRcdHRoaXMuaW5kZXgrPTI7XG5cdFx0XHRcdHRoaXMucG9saXpPZk9wZXJhdG9yKHRydWUpO1xuXG5cdFx0XHRcdHdoaWxlKHRydWUpIHtcblx0XHRcdFx0XHRpZih0aGlzLnN0YWNrW3RoaXMuc3RhY2subGVuZ3RoLTFdLmNvZGVMZXhlbT09MTcgJiZcblx0XHRcdFx0XHRcdHRoaXMuc3RhY2tbdGhpcy5zdGFjay5sZW5ndGgtMV0uc3RyIT1cIklmXCIpIHtcblx0XHRcdFx0XHRcdHRoaXMucG9saXpPcGVyYXRvci5wdXNoKHRoaXMuc3RhY2sucG9wKCkuc3RyKTtcblx0XHRcdFx0XHRcdHRoaXMuc3RhY2sucG9wKCk7XG5cdFx0XHRcdFx0XHR0aGlzLmluZGV4Kys7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhpcy5wb2xpek9wZXJhdG9yLnB1c2godGhpcy5zdGFjay5wb3AoKS5zdHIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5tYWdhemluZU9wZXJhdGlvbigpO1xuXHRcdH1cblxuXHRcdHRoaXMucG9saXpPcGVyYXRvci5wdXNoKFwiOlwiKTtcblx0XHR0aGlzLmluZGV4Kys7XG5cdH1cblxuXG5cdGdlbmVyYXRlTmV3TGFiZWwoKSB7XG5cdFx0dGhpcy5jb3VudExhYmVscysrO1xuXHRcdHRoaXMubGFiZWxzLnB1c2goXCJtXCIrdGhpcy5jb3VudExhYmVscyk7XG5cdFx0cmV0dXJuIFwibVwiK3RoaXMuY291bnRMYWJlbHM7XG5cdH1cblxuXG5cdHB1bGxCZXR3ZWVuSWZUaGVuKCkge1xuXHRcdHdoaWxlKHRoaXMuc3RhY2tbdGhpcy5zdGFjay5sZW5ndGgtMV0uY29kZUxleGVtIT09MTcpIHtcblx0XHRcdHRoaXMucG9saXpPcGVyYXRvci5wdXNoKHRoaXMuc3RhY2sucG9wKCkuc3RyKTtcblx0XHR9XG5cdFx0dmFyIG5ld0xhYmVsID0gdGhpcy5nZW5lcmF0ZU5ld0xhYmVsKCk7XG5cdFx0dGhpcy5wb2xpek9wZXJhdG9yLnB1c2gobmV3TGFiZWwpO1xuXHRcdHRoaXMucG9saXpPcGVyYXRvci5wdXNoKFwi0KPQn9CbXCIpO1xuXG5cdFx0dGhpcy5zdGFjay5wdXNoKHtzdHI6IG5ld0xhYmVsLCBwcmlvcml0eTogMCwgY29kZUxleGVtOjE3fSlcblx0fVxuXG5cblx0cG9saXpBc3NpZ25tZW50KCkge1xuXHRcdHdoaWxlKHRoaXMuYXJyTGV4ZW1zW3RoaXMuaW5kZXhdLmNvZGVMZXhlbSE9PTIpIHtcblx0XHRcdHRoaXMubWFnYXppbmVPcGVyYXRpb24oKTtcblx0XHR9XG5cblx0XHQvL1B1c2ggdG8gcG9saXogc2lnbiBvZiBhc3NpZ25tZW50XG5cdFx0d2hpbGUodHJ1ZSkge1xuXHRcdFx0aWYodGhpcy5zdGFja1t0aGlzLnN0YWNrLmxlbmd0aC0xXS5zdHI9PVwiPVwiKSB7XG5cdFx0XHRcdHRoaXMucG9saXpPcGVyYXRvci5wdXNoKHRoaXMuc3RhY2sucG9wKCkuc3RyKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnBvbGl6T3BlcmF0b3IucHVzaCh0aGlzLnN0YWNrLnBvcCgpLnN0cik7XG5cdFx0fVxuXG5cdFx0dGhpcy5pbmRleCsrO1xuXHR9XG5cblx0cG9saXpPZk9wZXJhdG9yKGNsZWFyUG9saXpPcGVyYXRvcikge1xuXG5cdFx0c3dpdGNoICh0aGlzLmFyckxleGVtc1t0aGlzLmluZGV4XS5jb2RlTGV4ZW0pIHtcblx0XHRcdGNhc2UgMTE6XG5cdFx0XHRcdHRoaXMuaW5kZXgrKztcblx0XHRcdFx0dGhpcy5wb2xpelJlYWRXcml0ZShcIlJlYWRcIik7XG5cblx0XHRcdFx0dGhpcy5wcmludFBvbGl6T3BlcmF0b3IoXCJSZWFkXCIpO1xuXHRcdFx0XHRpZighY2xlYXJQb2xpek9wZXJhdG9yKSB7XG5cdFx0XHRcdFx0dGhpcy5wb2xpeiA9IHRoaXMucG9saXouY29uY2F0KHRoaXMucG9saXpPcGVyYXRvcik7XG5cdFx0XHRcdFx0dGhpcy5wb2xpek9wZXJhdG9yLmxlbmd0aCA9IDA7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgMTI6XG5cdFx0XHRcdHRoaXMuaW5kZXgrKztcblx0XHRcdFx0dGhpcy5wb2xpelJlYWRXcml0ZShcIldyaXRlXCIpO1xuXHRcdFx0XHR0aGlzLnByaW50UG9saXpPcGVyYXRvcihcIldyaXRlXCIpO1xuXG5cdFx0XHRcdGlmKCFjbGVhclBvbGl6T3BlcmF0b3IpIHtcblx0XHRcdFx0XHR0aGlzLnBvbGl6ID0gdGhpcy5wb2xpei5jb25jYXQodGhpcy5wb2xpek9wZXJhdG9yKTtcblx0XHRcdFx0XHR0aGlzLnBvbGl6T3BlcmF0b3IubGVuZ3RoID0gMDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAxNzpcblx0XHRcdFx0dGhpcy5zdGFjay5wdXNoKHRoaXMucHJpb3JpdGllc1syMF0pO1xuXHRcdFx0XHR0aGlzLmluZGV4Kys7XG5cdFx0XHRcdHRoaXMucG9saXpJZigpO1xuXHRcdFx0XHR0aGlzLnByaW50UG9saXpPcGVyYXRvcihcIklmXCIpO1xuXG5cdFx0XHRcdGlmKCFjbGVhclBvbGl6T3BlcmF0b3IpIHtcblx0XHRcdFx0XHR0aGlzLnBvbGl6ID0gdGhpcy5wb2xpei5jb25jYXQodGhpcy5wb2xpek9wZXJhdG9yKTtcblx0XHRcdFx0XHR0aGlzLnBvbGl6T3BlcmF0b3IubGVuZ3RoID0gMDtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgMTM6XG5cdFx0XHRcdGxldCBvYmpMYWJlbHMgPSB7XG5cdFx0XHRcdFx0bWkgICAgICA6IHRoaXMuZ2VuZXJhdGVOZXdMYWJlbCgpLFxuXHRcdFx0XHRcdG1pX3BsdXMxOiB0aGlzLmdlbmVyYXRlTmV3TGFiZWwoKSxcblx0XHRcdFx0XHRtaV9wbHVzMjogdGhpcy5nZW5lcmF0ZU5ld0xhYmVsKCksXG5cdFx0XHRcdFx0bWlfcGx1czM6IHRoaXMuZ2VuZXJhdGVOZXdMYWJlbCgpLFxuXHRcdFx0XHR9O1xuXHRcdFx0XHR0aGlzLnN0YWNrLnB1c2godGhpcy5wcmlvcml0aWVzWzIzXSk7XG5cblx0XHRcdFx0dGhpcy5pbmRleCsrO1xuXHRcdFx0XHR0aGlzLnBvbGl6RG8ob2JqTGFiZWxzKTtcblxuXHRcdFx0XHR0aGlzLnByaW50UG9saXpPcGVyYXRvcihcIldoaWxlXCIpO1xuXG5cdFx0XHRcdGlmKCFjbGVhclBvbGl6T3BlcmF0b3IpIHtcblx0XHRcdFx0XHR0aGlzLnBvbGl6ID0gdGhpcy5wb2xpei5jb25jYXQodGhpcy5wb2xpek9wZXJhdG9yKTtcblx0XHRcdFx0XHR0aGlzLnBvbGl6T3BlcmF0b3IubGVuZ3RoID0gMDtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgMzQ6XG5cdFx0XHRcdHRoaXMucG9saXpPcGVyYXRvci5wdXNoKHRoaXMuYXJyTGV4ZW1zW3RoaXMuaW5kZXhdLnN0cik7XG5cdFx0XHRcdHRoaXMuaW5kZXgrKztcblx0XHRcdFx0dGhpcy5wb2xpekFzc2lnbm1lbnQoKTtcblx0XHRcdFx0dGhpcy5wcmludFBvbGl6T3BlcmF0b3IoXCJBc3NpZ25tZW50XCIpO1xuXG5cdFx0XHRcdGlmKCFjbGVhclBvbGl6T3BlcmF0b3IpIHtcblx0XHRcdFx0XHR0aGlzLnBvbGl6ID0gdGhpcy5wb2xpei5jb25jYXQodGhpcy5wb2xpek9wZXJhdG9yKTtcblx0XHRcdFx0XHR0aGlzLnBvbGl6T3BlcmF0b3IubGVuZ3RoID0gMDtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdGFsZXJ0KFwiRXJyb3IgaW4geW91ciBjb2RlIVwiKTtcblx0XHRcdFx0dGhpcy5pbmRleCsrO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXHRwcmludFBvbGl6T3BlcmF0b3Iob3BlcmF0b3IpIHtcblx0XHQkKFwiPHRyPlxcXG5cdFx0XHQ8dGQ+XCIrb3BlcmF0b3IrXCI8L3RkPlxcXG5cdFx0XHQ8dGQ+XCIrIHRoaXMucG9saXpPcGVyYXRvci5qb2luKFwiIFwiKSArXCI8L3RkPlxcXG5cdFx0XHQ8L3RyPlwiKVxuXHRcdFx0XHQuYXBwZW5kVG8oJCgnLnRhYmxlLXBvbGl6IHRib2R5JykpO1xuXHR9XG5cblx0bWFrZUluUG9saXooKSB7XG5cdFx0Zm9yKHRoaXMuaW5kZXggPSAgMDsgdGhpcy5pbmRleDwgdGhpcy5hcnJMZXhlbXMubGVuZ3RoOyB0aGlzLmluZGV4KyspIHtcblx0XHRcdGlmKHRoaXMuYXJyTGV4ZW1zW3RoaXMuaW5kZXhdLmNvZGVMZXhlbT09PTQpIHtcblx0XHRcdFx0dGhpcy5pbmRleCsrO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHR3aGlsZSh0aGlzLmFyckxleGVtc1t0aGlzLmluZGV4XS5jb2RlTGV4ZW0hPT02KSB7XG5cdFx0XHR0aGlzLnBvbGl6T2ZPcGVyYXRvcigpO1xuXHRcdH1cblx0XHRjb25zb2xlLmxvZyhcIiVjIEVuZCBvZiBjb21waWxlclwiLCBcImNvbG9yOiByZWRcIik7XG5cdFx0Y29uc29sZS5sb2codGhpcy5wb2xpeik7XG5cdFx0JChcIjx0cj5cXFxuXHRcdFx0PHRkIGNvbHNwYW49JzInIGNsYXNzPSdjb21tb24tcG9saXonPlwiK3RoaXMucG9saXouam9pbihcIiBcIikrXCI8L3RkPlxcXG5cdFx0XHQ8L3RyPlwiKVxuXHRcdFx0XHQuYXBwZW5kVG8oJCgnLnRhYmxlLXBvbGl6IHRib2R5JykpO1xuXHR9XG59IiwiY2xhc3MgU3ludGF4QW5hbHl6ZXIge1xuXHRjb25zdHJ1Y3RvcihhcnJMZXhlbXMpIHtcblx0XHR0aGlzLmluZGV4PTA7XG5cdFx0dGhpcy5hcnJMZXhlbXM9YXJyTGV4ZW1zO1xuXHRcdHRoaXMuc3RhY2s9W107XG5cdFx0dGhpcy5oYXNFcnJvcnMgPSBmYWxzZTtcblx0fVxuXG5cdC8vTWV0aG9kIG9mIGNoZWNraW5nIHN0YWNrXG5cdGNoZWNrU3RhY2socGFyYW1zKSB7XG5cdFx0aWYoIXRoaXMuaGFzRXJyb3JzKSB7XG5cdFx0XHRpZih0aGlzLnN0YWNrLmxlbmd0aD09cGFyYW1zLmRlcHRoXG5cdFx0XHRcdCYmIHRoaXMuYXJyTGV4ZW1zW3RoaXMuaW5kZXhdLmNvZGVMZXhlbT09cGFyYW1zLmNvZGVMZXhlbSkge1xuXHRcdFx0XHR0aGlzLnN0YWNrLnB1c2godGhpcy5hcnJMZXhlbXNbdGhpcy5pbmRleF0pO1xuXG5cdFx0XHRcdGNvbnNvbGUubG9nKHRoaXMuYXJyTGV4ZW1zW3RoaXMuaW5kZXhdLnN0cisgXCIgaXMgT2tcIik7XG5cblx0XHRcdFx0dGhpcy5pbmRleCsrO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Z2l2ZUVycm9yKHBhcmFtcy5lcnJvck1zZytcIiBMaW5lOiBcIisodGhpcy5hcnJMZXhlbXNbdGhpcy5pbmRleF0ubGluZW5tYikpO1xuXHRcdFx0XHR0aGlzLmhhc0Vycm9ycyA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Y2hlY2tOYW1lUHJvZ3JhbSgpIHtcblx0XHR0aGlzLmNoZWNrU3RhY2soe1xuXHRcdFx0ZGVwdGg6MCxcblx0XHRcdGNvZGVMZXhlbToxLFxuXHRcdFx0ZXJyb3JNc2c6XCJUaGVyZSBpcyBubyB3b3JkIFxcXCJQcm9ncmFtXFxcIiBpbiB5b3VyIGNvZGUhXCJcblx0XHR9KTtcblx0XHRpZih0aGlzLmhhc0Vycm9ycykgcmV0dXJuO1xuXG5cdFx0dGhpcy5jaGVja1N0YWNrKHtcblx0XHRcdGRlcHRoOjEsXG5cdFx0XHRjb2RlTGV4ZW06MzQsXG5cdFx0XHRlcnJvck1zZzpcIlRoZXJlIGlzIG5vIG5hbWUgb2YgeW91ciBwcm9ncmFtIGluIHlvdXIgY29kZSFcIlxuXHRcdH0pO1xuXHRcdGlmKHRoaXMuaGFzRXJyb3JzKSByZXR1cm47XG5cblx0XHR0aGlzLmNoZWNrU3RhY2soe1xuXHRcdFx0ZGVwdGg6Mixcblx0XHRcdGNvZGVMZXhlbToyLFxuXHRcdFx0ZXJyb3JNc2c6XCJZb3UgZm9yZ290IFxcXCI7XFxcIiBzdGF0ZW1lbnQhXCJcblx0XHR9KTtcblx0XHRpZih0aGlzLmhhc0Vycm9ycykgcmV0dXJuO1xuXG5cdFx0dGhpcy5zdGFjay5sZW5ndGg9MDtcblx0fVxuXG5cdGNoZWNrVmFyU3RhdGVtZW50KCkge1xuXHRcdHRoaXMuc3RhY2subGVuZ3RoID0gMDtcblxuXHRcdHRoaXMuY2hlY2tTdGFjayh7XG5cdFx0XHRkZXB0aDowLFxuXHRcdFx0Y29kZUxleGVtOjMsXG5cdFx0XHRlcnJvck1zZzpcIllvdSBmb3Jnb3QgVmFyICB3b3JkIGluIHlvdXIgY29kZSAhXCJcblx0XHR9KTtcblx0XHRpZih0aGlzLmhhc0Vycm9ycykgcmV0dXJuO1xuXG5cdFx0dGhpcy5jaGVja0lkTGlzdCgpO1xuXHRcdGlmKHRoaXMuaGFzRXJyb3JzKSByZXR1cm47XG5cblxuXHRcdHRoaXMuY2hlY2tTdGFjayh7XG5cdFx0XHRkZXB0aDowLFxuXHRcdFx0Y29kZUxleGVtOjcsXG5cdFx0XHRlcnJvck1zZzpcIlRoZXJlICBtdXN0IGJlIDogc3ltYm9sIGluIHlvdXIgY29kZSBEZWNsYXJhdGlvbiFcIlxuXHRcdH0pO1xuXHRcdGlmKHRoaXMuaGFzRXJyb3JzKSByZXR1cm47XG5cblx0XHR0aGlzLmNoZWNrU3RhY2soe1xuXHRcdFx0ZGVwdGg6MSxcblx0XHRcdGNvZGVMZXhlbTo4LFxuXHRcdFx0ZXJyb3JNc2c6XCJUaGVyZSAgbXVzdCBiZSBpbnRlZ2VyIHR5cGUgaW4geW91ciBjb2RlIERlY2xhcmF0aW9uIVwiXG5cdFx0fSk7XG5cdFx0aWYodGhpcy5oYXNFcnJvcnMpIHJldHVybjtcblxuXHRcdHRoaXMuY2hlY2tTdGFjayh7XG5cdFx0XHRkZXB0aDoyLFxuXHRcdFx0Y29kZUxleGVtOjIsXG5cdFx0XHRlcnJvck1zZzpcIllvdSBmb3Jnb3QgXFxcIjtcXFwiIHN0YXRlbWVudCFcIlxuXHRcdH0pO1xuXHRcdGlmKHRoaXMuaGFzRXJyb3JzKSByZXR1cm47XG5cblx0XHR0aGlzLnN0YWNrLmxlbmd0aCA9IDA7XG5cdH1cblxuXHRjaGVja0lkTGlzdCgpIHtcblx0XHR2YXIgZGVwdGggPSAxO1xuXG5cdFx0dGhpcy5jaGVja1N0YWNrKHtcblx0XHRcdGRlcHRoOmRlcHRoLFxuXHRcdFx0Y29kZUxleGVtOjM0LFxuXHRcdFx0ZXJyb3JNc2c6XCJZb3UgZm9yZ290IElEIHlvdXIgY29kZSAhXCJcblx0XHR9KTtcblx0XHRpZih0aGlzLmhhc0Vycm9ycykgcmV0dXJuO1xuXG5cdFx0d2hpbGUodGhpcy5hcnJMZXhlbXNbdGhpcy5pbmRleF0uY29kZUxleGVtPT05KSB7XG5cdFx0XHRkZXB0aCsrO1xuXHRcdFx0dGhpcy5pbmRleCsrO1xuXG5cdFx0XHR0aGlzLmNoZWNrU3RhY2soe1xuXHRcdFx0XHRkZXB0aDpkZXB0aCxcblx0XHRcdFx0Y29kZUxleGVtOjM0LFxuXHRcdFx0XHRlcnJvck1zZzpcIllvdSBmb3Jnb3QgSUQgeW91ciBjb2RlICFcIlxuXHRcdFx0fSk7XG5cdFx0XHRpZih0aGlzLmhhc0Vycm9ycykgcmV0dXJuO1xuXHRcdH1cblx0XHR0aGlzLnN0YWNrLmxlbmd0aCA9IDA7XG5cdH1cblxuXHRjaGVja0RlY2xhcmF0aW9uKCkge1xuXHRcdHRoaXMuY2hlY2tOYW1lUHJvZ3JhbSgpO1xuXHRcdGlmKHRoaXMuaGFzRXJyb3JzKSByZXR1cm47XG5cblx0XHR0aGlzLmNoZWNrVmFyU3RhdGVtZW50KCk7XG5cdFx0aWYodGhpcy5oYXNFcnJvcnMpIHJldHVybjtcblx0XHR0aGlzLnN0YWNrLmxlbmd0aCA9IDA7XG5cdH1cblxuXHRjaGVja0JvZHkoKSB7XG5cdFx0dGhpcy5zdGFjay5sZW5ndGggPSAwO1xuXHRcdHdoaWxlKHRoaXMuYXJyTGV4ZW1zW3RoaXMuaW5kZXhdLmNvZGVMZXhlbSE9PTYpIHtcblx0XHRcdHRoaXMuaW5zcGVjdE9wZXJhdG9yKCk7XG5cdFx0XHRpZih0aGlzLmhhc0Vycm9ycykgcmV0dXJuO1xuXHRcdH1cblx0XHR0aGlzLnN0YWNrLmxlbmd0aCA9IDA7XG5cdH1cblxuXHRpbnNwZWN0UmVhZFdyaXRlKCkge1xuXHRcdHRoaXMuc3RhY2subGVuZ3RoID0gMDtcblxuXHRcdHRoaXMuY2hlY2tTdGFjayh7XG5cdFx0XHRkZXB0aDowLFxuXHRcdFx0Y29kZUxleGVtOjI2LFxuXHRcdFx0ZXJyb3JNc2c6XCJZb3UgZm9yZ290ICggaW4geW91ciBSZWFkL1dyaXRlIHN0YXRlbWVudCFcIlxuXHRcdH0pO1xuXHRcdGlmKHRoaXMuaGFzRXJyb3JzKSByZXR1cm47XG5cblx0XHR0aGlzLmNoZWNrSWRMaXN0KCk7XG5cdFx0aWYodGhpcy5oYXNFcnJvcnMpIHJldHVybjtcblxuXHRcdHRoaXMuY2hlY2tTdGFjayh7XG5cdFx0XHRkZXB0aDowLFxuXHRcdFx0Y29kZUxleGVtOjI3LFxuXHRcdFx0ZXJyb3JNc2c6XCJZb3UgZm9yZ290ICkgaW4geW91ciBSZWFkL1dyaXRlIHN0YXRlbWVudCFcIlxuXHRcdH0pO1xuXHRcdGlmKHRoaXMuaGFzRXJyb3JzKSByZXR1cm47XG5cblx0XHR0aGlzLmNoZWNrU3RhY2soe1xuXHRcdFx0ZGVwdGg6MSxcblx0XHRcdGNvZGVMZXhlbToyLFxuXHRcdFx0ZXJyb3JNc2c6XCJZb3UgZm9yZ290IFxcXCI7XFxcIiBzdGF0ZW1lbnQhXCJcblx0XHR9KTtcblx0XHRpZih0aGlzLmhhc0Vycm9ycykgcmV0dXJuO1xuXG5cdFx0dGhpcy5zdGFjay5sZW5ndGggPSAwO1xuXHR9XG5cblx0aW5zcGVjdE1ub2ooKSB7XG5cdFx0dGhpcy5zdGFjay5sZW5ndGggPSAwO1xuXG5cdFx0aWYodGhpcy5hcnJMZXhlbXNbdGhpcy5pbmRleF0uY29kZUxleGVtPT0zNCkge1xuXHRcdFx0Y29uc29sZS5sb2coXCJNbm9qIGlkIGlzIG9rXCIpO1xuXHRcdFx0dGhpcy5pbmRleCsrO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH0gZWxzZSBpZih0aGlzLmFyckxleGVtc1t0aGlzLmluZGV4XS5jb2RlTGV4ZW09PTM1KSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcIk1ub2ogY29uc3RhbnQgaXMgb2tcIik7XG5cdFx0XHR0aGlzLmluZGV4Kys7XG5cdFx0XHRyZXR1cm47XG5cdFx0fSBlbHNlIGlmKHRoaXMuYXJyTGV4ZW1zW3RoaXMuaW5kZXhdLmNvZGVMZXhlbT09MzYpIHtcblx0XHRcdGNvbnNvbGUubG9nKFwiTW5vaiAoIGlzIG9rXCIpO1xuXHRcdFx0dGhpcy5pbmRleCsrO1xuXHRcdFx0dGhpcy5pbnNwZWN0U3RhdGVtZW50KCk7XG5cdFx0XHRpZih0aGlzLmhhc0Vycm9ycykgcmV0dXJuO1xuXG5cblx0XHRcdHRoaXMuY2hlY2tTdGFjayh7XG5cdFx0XHRcdGRlcHRoOjAsXG5cdFx0XHRcdGNvZGVMZXhlbTozNyxcblx0XHRcdFx0ZXJyb3JNc2c6XCJZbyBmb3Jnb3QgKSBpbiB5b3VyIGNvZGUhXCJcblx0XHRcdH0pO1xuXHRcdFx0aWYodGhpcy5oYXNFcnJvcnMpIHJldHVybjtcblxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmhhc0Vycm9ycyA9IHRydWU7XG5cdFx0XHRnaXZlRXJyb3IoXCJVbmV4cGV4dGVkIFRva2VuISBMaW5lOiBcIisodGhpcy5hcnJMZXhlbXNbdGhpcy5pbmRleF0ubGluZW5tYisxKSk7XG5cdFx0fVxuXG5cdFx0dGhpcy5zdGFjay5sZW5ndGggPSAwO1xuXHR9XG5cblx0aW5zcGVjdFRlcm1pbmF0b3IoKXtcblx0XHR2YXIgcCA9IHRydWU7XG5cdFx0XHR0aGlzLnN0YWNrLmxlbmd0aCA9IDA7XG5cblx0XHR0aGlzLmluc3BlY3RNbm9qKCk7XG5cdFx0aWYodGhpcy5oYXNFcnJvcnMpIHJldHVybjtcblxuXHRcdHdoaWxlKHRoaXMuYXJyTGV4ZW1zW3RoaXMuaW5kZXhdLmNvZGVMZXhlbT09MjEgfHxcblx0XHRcdCAgdGhpcy5hcnJMZXhlbXNbdGhpcy5pbmRleF0uY29kZUxleGVtID09IDIyIHx8XG5cdFx0XHQgIHRoaXMuYXJyTGV4ZW1zW3RoaXMuaW5kZXhdLmNvZGVMZXhlbSA9PSAyMyApIHtcblx0XHRcdHRoaXMuaW5kZXgrKztcblxuXHRcdFx0Y29uc29sZS5sb2coXCJTdGFtZW50ICp8LyBpcyBva1wiKTtcblx0XHRcdHRoaXMuaW5zcGVjdE1ub2ooKTtcblx0XHRcdGlmKHRoaXMuaGFzRXJyb3JzKSByZXR1cm47XG5cdFx0XHRjb25zb2xlLmxvZyhcIlRlcm1pbmF0b3IgTW5vaml0ZWwgaXMgT2tcIik7XG5cblx0XHR9XG5cblx0XHR0aGlzLnN0YWNrLmxlbmd0aCA9IDA7XG5cdH1cblxuXHRpbnNwZWN0U3RhdGVtZW50KCkge1xuXHRcdHRoaXMuc3RhY2subGVuZ3RoID0gMDtcblxuXHRcdGlmKHRoaXMuYXJyTGV4ZW1zW3RoaXMuaW5kZXhdLmNvZGVMZXhlbT09MjApIHtcblx0XHRcdGNvbnNvbGUubG9nKFwiU3RhdGVtZW50IC0gaXMgT2tcIik7XG5cdFx0XHR0aGlzLmluZGV4Kys7XG5cdFx0fVxuXG5cdFx0dGhpcy5pbnNwZWN0VGVybWluYXRvcigpO1xuXHRcdGlmKHRoaXMuaGFzRXJyb3JzKSByZXR1cm47XG5cblxuXHRcdHdoaWxlKHRoaXMuYXJyTGV4ZW1zW3RoaXMuaW5kZXhdLmNvZGVMZXhlbSA9PSAxOVxuXHRcdFx0IHx8IHRoaXMuYXJyTGV4ZW1zW3RoaXMuaW5kZXhdLmNvZGVMZXhlbSA9PSAyMCkge1xuXHRcdFx0dGhpcy5pbmRleCsrO1xuXHRcdFx0Y29uc29sZS5sb2coXCJTdGFtZW50ICt8LSBpcyBva1wiKTtcblxuXHRcdFx0dGhpcy5pbnNwZWN0VGVybWluYXRvcigpO1xuXHRcdFx0aWYodGhpcy5oYXNFcnJvcnMpIHJldHVybjtcblx0XHR9XG5cblx0XHR0aGlzLnN0YWNrLmxlbmd0aCA9IDA7XG5cdH1cblxuXG4vL0Fzc2lnbWVudCBpbnNwZWN0aW9uXG5cdGluc3BlY3RBc3NpZ25tZW50KCkge1xuXHRcdHRoaXMuc3RhY2subGVuZ3RoID0gMDtcblxuXHRcdHRoaXMuY2hlY2tTdGFjayh7XG5cdFx0XHRkZXB0aDowLFxuXHRcdFx0Y29kZUxleGVtOjEwLFxuXHRcdFx0ZXJyb3JNc2c6XCJZb3UgZm9yZ290ID0gaW4gIHlvdXIgY29kZSAhXCJcblx0XHR9KTtcblx0XHRpZih0aGlzLmhhc0Vycm9ycykgcmV0dXJuO1xuXG5cdFx0dGhpcy5pbnNwZWN0U3RhdGVtZW50KCk7XG5cdFx0aWYodGhpcy5oYXNFcnJvcnMpIHJldHVybjtcblxuXHRcdHRoaXMuY2hlY2tTdGFjayh7XG5cdFx0XHRkZXB0aDowLFxuXHRcdFx0Y29kZUxleGVtOjIsXG5cdFx0XHRlcnJvck1zZzpcIllvdSBmb3Jnb3QgOyBpbiB5b3VyIGNvZGUhXCJcblx0XHR9KTtcblx0XHRpZih0aGlzLmhhc0Vycm9ycykgcmV0dXJuO1xuXG5cdFx0dGhpcy5zdGFjay5sZW5ndGggPSAwO1xuXHR9XG5cblx0aW5zcGVjdE9wZXJhdG9yKCkge1xuXHRcdHN3aXRjaCh0aGlzLmFyckxleGVtc1t0aGlzLmluZGV4XS5jb2RlTGV4ZW0pIHtcblx0XHRcdGNhc2UgMTE6XG5cdFx0XHRcdHRoaXMuaW5kZXgrKztcblx0XHRcdFx0dGhpcy5pbnNwZWN0UmVhZFdyaXRlKCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAxMjpcblx0XHRcdFx0dGhpcy5pbmRleCsrO1xuXHRcdFx0XHR0aGlzLmluc3BlY3RSZWFkV3JpdGUoKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDE3OlxuXHRcdFx0XHR0aGlzLmluZGV4Kys7XG5cdFx0XHRcdHRoaXMuaW5zcGVjdElmKCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAxMzpcblx0XHRcdFx0dGhpcy5pbmRleCsrO1xuXHRcdFx0XHR0aGlzLmluc3BlY3REbygpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgMzQ6XG5cdFx0XHRcdHRoaXMuaW5kZXgrKztcblx0XHRcdFx0dGhpcy5pbnNwZWN0QXNzaWdubWVudCgpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdGdpdmVFcnJvcihcIkVycm9yISBVbmV4cGVjdGVkIHRva2VuISBMaW5lOiBcIisodGhpcy5hcnJMZXhlbXNbdGhpcy5pbmRleF0ubGluZW5tYiArIDEpKTtcblx0XHRcdFx0dGhpcy5oYXNFcnJvcnMgPSB0cnVlO1xuXHRcdFx0XHRpZih0aGlzLmhhc0Vycm9ycykgcmV0dXJuO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblxuXG4vL0luc3BlY3Rpb24gb2YgaWZcblx0aW5zcGVjdElmKCkge1xuXHRcdHRoaXMuc3RhY2subGVuZ3RoID0gMDtcblxuXHRcdHRoaXMuY2hlY2tTdGFjayh7XG5cdFx0XHRkZXB0aDowLFxuXHRcdFx0Y29kZUxleGVtOjI2LFxuXHRcdFx0ZXJyb3JNc2c6XCJZb3UgZm9yZ290ICggaW4geW91ciBjb2RlIHlvdXIgY29kZSAhXCJcblx0XHR9KTtcblx0XHRpZih0aGlzLmhhc0Vycm9ycykgcmV0dXJuO1xuXG5cblx0XHR0aGlzLmluc3BlY3RMb2dpY2FsRXhwcmVzc2lvbigpO1xuXHRcdGlmKHRoaXMuaGFzRXJyb3JzKSByZXR1cm47XG5cblx0XHRjb25zb2xlLmxvZyhcIkVuZCBvZiBsb2dpY2FsIGlmIGV4cHJlc3Npb25cIilcblxuXHRcdHRoaXMuY2hlY2tTdGFjayh7XG5cdFx0XHRkZXB0aDowLFxuXHRcdFx0Y29kZUxleGVtOjI3LFxuXHRcdFx0ZXJyb3JNc2c6XCJZb3UgZm9yZ290ICkgaW4geW91ciBjb2RlIHlvdXIgY29kZSAhXCJcblx0XHR9KTtcblx0XHRpZih0aGlzLmhhc0Vycm9ycykgcmV0dXJuO1xuXG5cdFx0dGhpcy5jaGVja1N0YWNrKHtcblx0XHRcdGRlcHRoOjEsXG5cdFx0XHRjb2RlTGV4ZW06MTgsXG5cdFx0XHRlcnJvck1zZzpcIllvdSBmb3Jnb3QgVGhlbiBpbiB5b3VyIGNvZGUgeW91ciBjb2RlICFcIlxuXHRcdH0pO1xuXHRcdGlmKHRoaXMuaGFzRXJyb3JzKSByZXR1cm47XG5cblx0XHR0aGlzLmNoZWNrU3RhY2soe1xuXHRcdFx0ZGVwdGg6Mixcblx0XHRcdGNvZGVMZXhlbTozOSxcblx0XHRcdGVycm9yTXNnOlwiWW91IGZvcmdvdCB7IGluIHlvdXIgY29kZSB5b3VyIGNvZGUgIVwiXG5cdFx0fSk7XG5cdFx0aWYodGhpcy5oYXNFcnJvcnMpIHJldHVybjtcblxuXHRcdHRoaXMuaW5zcGVjdE9wZXJhdG9yKCk7XG5cdFx0aWYodGhpcy5oYXNFcnJvcnMpIHJldHVybjtcblxuXHRcdHRoaXMuY2hlY2tTdGFjayh7XG5cdFx0XHRkZXB0aDowLFxuXHRcdFx0Y29kZUxleGVtOjQwLFxuXHRcdFx0ZXJyb3JNc2c6XCJZb3UgZm9yZ290IH0gaW4geW91ciBjb2RlIHlvdXIgY29kZSAhXCJcblx0XHR9KTtcblx0XHRpZih0aGlzLmhhc0Vycm9ycykgcmV0dXJuO1xuXG5cdFx0dGhpcy5jaGVja1N0YWNrKHtcblx0XHRcdGRlcHRoOjEsXG5cdFx0XHRjb2RlTGV4ZW06Mixcblx0XHRcdGVycm9yTXNnOlwiWW91IGZvcmdvdCA7IGluIHlvdXIgY29kZSB5b3VyIGNvZGUgIVwiXG5cdFx0fSk7XG5cdFx0aWYodGhpcy5oYXNFcnJvcnMpIHJldHVybjtcblxuXHRcdHRoaXMuc3RhY2subGVuZ3RoID0gMDtcblx0fVxuXG5cdGluc3BlY3RMb2dpY2FsRXhwcmVzc2lvbigpIHtcblx0XHR0aGlzLnN0YWNrLmxlbmd0aCA9IDA7XG5cblx0XHR0aGlzLmluc3BlY3RMb2dpY2FsVGVybWluYXRvcigpO1xuXHRcdGlmKHRoaXMuaGFzRXJyb3JzKSByZXR1cm47XG5cdFx0Y29uc29sZS5sb2coXCJMT0dFWFAgbG9ndGVybSBvay4uLlwiKTtcblxuXHRcdHdoaWxlKHRoaXMuYXJyTGV4ZW1zW3RoaXMuaW5kZXhdLmNvZGVMZXhlbSA9PSAyNCkge1xuXHRcdFx0Y29uc29sZS5sb2coXCJMT0dFWFAgb3Igb2suLi5cIik7XG5cdFx0XHR0aGlzLmluZGV4Kys7IC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL2luZGV4Kytcblx0XHRcdHRoaXMuaW5zcGVjdExvZ2ljYWxUZXJtaW5hdG9yKCk7XG5cdFx0XHRpZih0aGlzLmhhc0Vycm9ycykgcmV0dXJuO1xuXHRcdFx0Y29uc29sZS5sb2coXCJMT0dFWFAgbG9ndGVybSBvay4uLlwiKTtcblx0XHR9XG5cblx0XHR0aGlzLnN0YWNrLmxlbmd0aCA9IDA7XG5cdH1cblxuXHRpbnNwZWN0TG9naWNhbFRlcm1pbmF0b3IoKSB7XG5cdFx0dGhpcy5zdGFjay5sZW5ndGggPSAwO1xuXG5cdFx0dGhpcy5pbnNwZWN0TG9naWNhbE1ub2ooKTtcblx0XHRpZih0aGlzLmhhc0Vycm9ycykgcmV0dXJuO1xuXHRcdGNvbnNvbGUubG9nKFwiTE9HVEVSTSBsb2dtbm9qIG9rLi4uXCIpO1xuXG5cdFx0d2hpbGUodGhpcy5hcnJMZXhlbXNbdGhpcy5pbmRleF0uY29kZUxleGVtID09IDM4KSB7XG5cdFx0XHR0aGlzLmluZGV4Kys7XG5cdFx0XHR0aGlzLmluc3BlY3RMb2dpY2FsTW5vaigpO1xuXHRcdFx0Y29uc29sZS5sb2coXCJMT0dURVJNIGxvZ21ub2ogb2suLi5cIik7XG5cdFx0XHRpZih0aGlzLmhhc0Vycm9ycykgcmV0dXJuO1xuXHRcdH1cblxuXHRcdHRoaXMuc3RhY2subGVuZ3RoID0gMDtcblx0fVxuXG5cdGluc3BlY3RMb2dpY2FsTW5vaigpIHtcblx0XHR0aGlzLnN0YWNrLmxlbmd0aCA9IDA7XG5cblx0XHRpZih0aGlzLmFyckxleGVtc1t0aGlzLmluZGV4XS5jb2RlTGV4ZW0gPT0gMjUpIHtcblx0XHRcdHdoaWxlKHRoaXMuYXJyTGV4ZW1zW3RoaXMuaW5kZXhdLmNvZGVMZXhlbSA9PSAyNSkge1xuXHRcdFx0XHR0aGlzLmluZGV4Kys7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiTE9HTU5PSiBub3Qgb2suLi5cIik7XG5cdFx0XHRcdGlmKHRoaXMuYXJyTGV4ZW1zW3RoaXMuaW5kZXhdLmNvZGVMZXhlbSAhPSAzNSkge1xuXG5cdFx0XHRcdFx0dGhpcy5pbnNwZWN0U3RhdGVtZW50KCk7XG5cdFx0XHRcdFx0aWYodGhpcy5oYXNFcnJvcnMpIHJldHVybjtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIkxPR01OT0ogbm90IG9rLi4uXCIpO1xuXG5cdFx0XHRcdFx0aWYodGhpcy5hcnJMZXhlbXNbdGhpcy5pbmRleF0uY29kZUxleGVtID49IDI4IFxuXHRcdFx0XHRcdFx0JiYgdGhpcy5hcnJMZXhlbXNbdGhpcy5pbmRleF0uY29kZUxleGVtIDw9MzMpIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiTE9HTU5PSiB6bmFrIG90bm9zaCBvay4uLlwiKTtcblx0XHRcdFx0XHRcdHRoaXMuaW5kZXgrKztcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Z2l2ZUVycm9yKFwiRXJyb3IhIFVuZXhwZWN0ZWQgdG9rZW4hIExpbmU6IFwiKyh0aGlzLmFyckxleGVtc1t0aGlzLmluZGV4XS5saW5lbm1iKzEpKTtcblx0XHRcdFx0XHRcdHRoaXMuaGFzRXJyb3JzID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYodGhpcy5oYXNFcnJvcnMpIHJldHVybjtcblxuXHRcdFx0XHRcdHRoaXMuaW5zcGVjdFN0YXRlbWVudCgpO1xuXHRcdFx0XHRcdGlmKHRoaXMuaGFzRXJyb3JzKSByZXR1cm47XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJMT0dNTk9KIHN0bXQgb2suLi5cIik7XG5cblx0XHRcdFx0fSBlbHNlIGlmKHRoaXMuYXJyTGV4ZW1zW3RoaXMuaW5kZXhdLmNvZGVMZXhlbSA9PSAzNikge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiTE9HTU5PSiBbIG9rLi4uXCIpO1xuXHRcdFx0XHRcdHRoaXMuaW5kZXgrKztcblx0XHRcdFx0XHR0aGlzLmluc3BlY3RMb2dpY2FsRXhwcmVzc2lvbigpO1xuXHRcdFx0XHRcdGlmKHRoaXMuaGFzRXJyb3JzKSByZXR1cm47XG5cblx0XHRcdFx0XHR0aGlzLmNoZWNrU3RhY2soe1xuXHRcdFx0XHRcdFx0ZGVwdGg6MCxcblx0XHRcdFx0XHRcdGNvZGVMZXhlbTozNyxcblx0XHRcdFx0XHRcdGVycm9yTXNnOlwiWW91IGZvcmdvdCBdIGluIHlvdXIgY29kZSB5b3VyIGNvZGUgIVwiXG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRnaXZlRXJyb3IoXCJFcnJvciEgVW5leHBlY3RlZCB0b2tlbiEgTGluZTogXCIrKHRoaXMuYXJyTGV4ZW1zW3RoaXMuaW5kZXhdLmxpbmVubWIrMSkpO1xuXHRcdFx0XHRcdHRoaXMuaGFzRXJyb3JzID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZih0aGlzLmFyckxleGVtc1t0aGlzLmluZGV4XS5jb2RlTGV4ZW0gIT09IDM2KSB7XG5cdFx0XHRcdHRoaXMuaW5zcGVjdFN0YXRlbWVudCgpO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIkxPR01OT0ogc3RtdCBvay4uLlwiKTtcblx0XHRcdFx0Y29uc29sZS5sb2codGhpcy5hcnJMZXhlbXNbdGhpcy5pbmRleF0pO1xuXG5cdFx0XHRcdGlmKHRoaXMuYXJyTGV4ZW1zW3RoaXMuaW5kZXhdLmNvZGVMZXhlbSA+PSAyOCBcblx0XHRcdFx0XHQmJiB0aGlzLmFyckxleGVtc1t0aGlzLmluZGV4XS5jb2RlTGV4ZW0gPD0zMykge1xuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coXCJMT0dNTk9KIHpuYWsgb3Rub3NoIG9rLi4uXCIpO1xuXHRcdFx0XHRcdFx0dGhpcy5pbmRleCsrO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRnaXZlRXJyb3IoXCJFcnJvciEgVW5leHBlY3RlZCB0b2tlbiEgTGluZTogXCIrKHRoaXMuYXJyTGV4ZW1zW3RoaXMuaW5kZXhdLmxpbmVubWIrMSkpO1xuXHRcdFx0XHRcdFx0dGhpcy5oYXNFcnJvcnMgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5pbnNwZWN0U3RhdGVtZW50KCk7XG5cdFx0XHRcdGlmKHRoaXMuaGFzRXJyb3JzKSByZXR1cm47XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiTE9HTU5PSiBzdG10IG9rLi4uXCIpO1xuXG5cdFx0XHR9IGVsc2UgaWYodGhpcy5hcnJMZXhlbXNbdGhpcy5pbmRleF0uY29kZUxleGVtID09IDM2KSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJMT0dNTk9KIFsgb2suLi5cIik7XG5cdFx0XHRcdFx0dGhpcy5pbmRleCsrO1xuXHRcdFx0XHRcdHRoaXMuaW5zcGVjdExvZ2ljYWxFeHByZXNzaW9uKCk7XG5cdFx0XHRcdFx0aWYodGhpcy5oYXNFcnJvcnMpIHJldHVybjtcblxuXHRcdFx0XHRcdHRoaXMuY2hlY2tTdGFjayh7XG5cdFx0XHRcdFx0XHRkZXB0aDowLFxuXHRcdFx0XHRcdFx0Y29kZUxleGVtOjM3LFxuXHRcdFx0XHRcdFx0ZXJyb3JNc2c6XCJZb3UgZm9yZ290IF0gaW4geW91ciBjb2RlIHlvdXIgY29kZSAhXCJcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGdpdmVFcnJvcihcIkVycm9yISBVbmV4cGVjdGVkIHRva2VuISBMaW5lOiBcIisodGhpcy5hcnJMZXhlbXNbdGhpcy5pbmRleF0ubGluZW5tYisxKSk7XG5cdFx0XHRcdFx0dGhpcy5oYXNFcnJvcnMgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5zdGFjay5sZW5ndGggPSAwO1xuXHR9XG5cbi8vSW5zcGVjdCBEb1xuXHRpbnNwZWN0RG8oKSB7XG5cdFx0XHR0aGlzLnN0YWNrLmxlbmd0aCA9IDA7XG5cdFx0XHRjb25zb2xlLmxvZyhcIk9QRVJBVE9SIERPIGlzIG9rLi4uXCIpO1xuXG5cblx0XHRcdC8vSW5zcGVjdCBhc3NpZ25tZW50XG5cdFx0XHR0aGlzLmNoZWNrU3RhY2soe1xuXHRcdFx0XHRkZXB0aDowLFxuXHRcdFx0XHRjb2RlTGV4ZW06MzQsXG5cdFx0XHRcdGVycm9yTXNnOlwiWW91IGZvcmdvdCBJRCBpbiB5b3VyIGNvZGUgIVwiXG5cdFx0XHR9KTtcblx0XHRcdGlmKHRoaXMuaGFzRXJyb3JzKSByZXR1cm47XG5cblx0XHRcdHRoaXMuY2hlY2tTdGFjayh7XG5cdFx0XHRcdGRlcHRoOjEsXG5cdFx0XHRcdGNvZGVMZXhlbToxMCxcblx0XHRcdFx0ZXJyb3JNc2c6XCJZb3UgZm9yZ290ID0gaW4gIHlvdXIgY29kZSAhXCJcblx0XHRcdH0pO1xuXHRcdFx0aWYodGhpcy5oYXNFcnJvcnMpIHJldHVybjtcblxuXHRcdFx0dGhpcy5pbnNwZWN0U3RhdGVtZW50KCk7XG5cdFx0XHRpZih0aGlzLmhhc0Vycm9ycykgcmV0dXJuO1xuXHRcdFx0Y29uc29sZS5sb2coXCJPUEVSQVRPUiBBc3NpZ25tZW50IG9rLi4uXCIpO1xuXHRcdFx0Ly9JbnNwZWN0IGFzc2lnbm1lbnRcblxuXG5cdFx0XHR0aGlzLmNoZWNrU3RhY2soe1xuXHRcdFx0XHRkZXB0aDowLFxuXHRcdFx0XHRjb2RlTGV4ZW06MTQsXG5cdFx0XHRcdGVycm9yTXNnOlwiWW91IGZvcmdvdCBUbyBpbiB5b3VyIGNvZGUgIVwiXG5cdFx0XHR9KTtcblx0XHRcdGlmKHRoaXMuaGFzRXJyb3JzKSByZXR1cm47XG5cblx0XHRcdHRoaXMuaW5zcGVjdFN0YXRlbWVudCgpO1xuXHRcdFx0aWYodGhpcy5oYXNFcnJvcnMpIHJldHVybjtcblx0XHRcdGNvbnNvbGUubG9nKFwiT1BFUkFUT1Igc3RtdCBvay4uLlwiKTtcblxuXHRcdFx0dGhpcy5jaGVja1N0YWNrKHtcblx0XHRcdFx0ZGVwdGg6MCxcblx0XHRcdFx0Y29kZUxleGVtOjE1LFxuXHRcdFx0XHRlcnJvck1zZzpcIllvdSBmb3Jnb3QgQnkgaW4geW91ciBjb2RlICFcIlxuXHRcdFx0fSk7XG5cdFx0XHRpZih0aGlzLmhhc0Vycm9ycykgcmV0dXJuO1xuXG5cdFx0XHR0aGlzLmluc3BlY3RTdGF0ZW1lbnQoKTtcblx0XHRcdGlmKHRoaXMuaGFzRXJyb3JzKSByZXR1cm47XG5cdFx0XHRjb25zb2xlLmxvZyhcIk9QRVJBVE9SIHN0bXQgb2suLi5cIik7XG5cblxuXHRcdFx0dGhpcy5jaGVja1N0YWNrKHtcblx0XHRcdFx0ZGVwdGg6MCxcblx0XHRcdFx0Y29kZUxleGVtOjE2LFxuXHRcdFx0XHRlcnJvck1zZzpcIllvdSBmb3Jnb3QgV2hpbGUgaW4geW91ciBjb2RlICFcIlxuXHRcdFx0fSk7XG5cdFx0XHRpZih0aGlzLmhhc0Vycm9ycykgcmV0dXJuO1xuXG5cdFx0XHR0aGlzLmNoZWNrU3RhY2soe1xuXHRcdFx0XHRkZXB0aDoxLFxuXHRcdFx0XHRjb2RlTGV4ZW06MjYsXG5cdFx0XHRcdGVycm9yTXNnOlwiWW91IGZvcmdvdCAoIGluIHlvdXIgY29kZSAhXCJcblx0XHRcdH0pO1xuXHRcdFx0aWYodGhpcy5oYXNFcnJvcnMpIHJldHVybjtcblxuXG5cdFx0XHR0aGlzLmluc3BlY3RMb2dpY2FsRXhwcmVzc2lvbigpO1xuXHRcdFx0aWYodGhpcy5oYXNFcnJvcnMpIHJldHVybjtcblxuXHRcdFx0dGhpcy5jaGVja1N0YWNrKHtcblx0XHRcdFx0ZGVwdGg6MCxcblx0XHRcdFx0Y29kZUxleGVtOjI3LFxuXHRcdFx0XHRlcnJvck1zZzpcIllvdSBmb3Jnb3QgKSBpbiAgeW91ciBjb2RlICFcIlxuXHRcdFx0fSk7XG5cdFx0XHRpZih0aGlzLmhhc0Vycm9ycykgcmV0dXJuO1xuXG5cdFx0XHQvL0xpc3Qgb3BlcmF0b3JzIG11c3QgbWUgaGVyZVxuXHRcdFx0d2hpbGUodGhpcy5hcnJMZXhlbXNbdGhpcy5pbmRleF0uY29kZUxleGVtICE9PTUpIHtcblx0XHRcdFx0dGhpcy5pbnNwZWN0T3BlcmF0b3IoKTtcblx0XHRcdFx0aWYodGhpcy5oYXNFcnJvcnMpIHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gZ2l2ZUVycm9yKHRoaXMuYXJyTGV4ZW1zW3RoaXMuaW5kZXhdLmNvZGVMZXhlbSk7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyh0aGlzLnN0YWNrKTtcblxuXG5cdFx0XHR0aGlzLmNoZWNrU3RhY2soe1xuXHRcdFx0XHRkZXB0aDowLFxuXHRcdFx0XHRjb2RlTGV4ZW06NSxcblx0XHRcdFx0ZXJyb3JNc2c6XCJZb3UgZm9yZ290IEVuZCBpbiAgeW91ciBjb2RlICFcIlxuXHRcdFx0fSk7XG5cdFx0XHRpZih0aGlzLmhhc0Vycm9ycykgcmV0dXJuO1xuXG5cdFx0XHR0aGlzLmNoZWNrU3RhY2soe1xuXHRcdFx0XHRkZXB0aDoxLFxuXHRcdFx0XHRjb2RlTGV4ZW06Mixcblx0XHRcdFx0ZXJyb3JNc2c6XCJZb3UgZm9yZ290IDsgaW4gIHlvdXIgY29kZSAhXCJcblx0XHRcdH0pO1xuXHRcdFx0aWYodGhpcy5oYXNFcnJvcnMpIHJldHVybjtcblxuXHRcdFx0dGhpcy5zdGFjay5sZW5ndGggPSAwO1xuXHRcdH1cblxuXHRhbmFseXplKCkge1xuXHRcdHRoaXMuY2hlY2tEZWNsYXJhdGlvbigpO1xuXHRcdGlmKHRoaXMuaGFzRXJyb3JzKSByZXR1cm47XG5cblx0XHRjb25zb2xlLmxvZyhcIkRlY2xhcmF0aW9uIHdhcyBpbnNwZWN0ZWQsIG5vIGVycm9ycyFcIik7XG5cdFx0dGhpcy5jaGVja1N0YWNrKHtcblx0XHRcdGRlcHRoOjAsXG5cdFx0XHRjb2RlTGV4ZW06NCxcblx0XHRcdGVycm9yTXNnOlwiWW91IGZvcmdvdCBCZWdpbiBpbiB5b3VyIGNvZGUgIVwiXG5cdFx0fSk7XG5cdFx0aWYodGhpcy5oYXNFcnJvcnMpIHJldHVybjtcblxuXHRcdHRoaXMuY2hlY2tCb2R5KCk7XG5cdFx0aWYodGhpcy5oYXNFcnJvcnMpIHJldHVybjtcblxuXHRcdHRoaXMuY2hlY2tTdGFjayh7XG5cdFx0XHRkZXB0aDowLFxuXHRcdFx0Y29kZUxleGVtOjYsXG5cdFx0XHRlcnJvck1zZzpcIllvdSBmb3Jnb3QgRW5kUHIgaW4geW91ciBjb2RlICFcIlxuXHRcdH0pO1xuXHRcdGlmKHRoaXMuaGFzRXJyb3JzKSByZXR1cm47XG5cblx0XHRjb25zb2xlLmxvZyhcIlN5bnRheCBhbmFseXplciBpcyBkb25lIG1hemFmYWthISEhXCIpO1xuXHRcdHJldHVybiB0cnVlO1xuXG5cdH1cblxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
