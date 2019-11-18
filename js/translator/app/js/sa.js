class SyntaxAnalyzer {
	constructor(arrLexems) {
		this.index=0;
		this.arrLexems=arrLexems;
		this.stack=[];
		this.hasErrors = false;
	}

	//Method of checking stack
	checkStack(params) {
		if(!this.hasErrors) {
			if(this.stack.length==params.depth
				&& this.arrLexems[this.index].codeLexem==params.codeLexem) {
				this.stack.push(this.arrLexems[this.index]);

				console.log(this.arrLexems[this.index].str+ " is Ok");

				this.index++;
			} else {
				giveError(params.errorMsg+" Line: "+(this.arrLexems[this.index].linenmb));
				this.hasErrors = true;
			}
		}
	}

	checkNameProgram() {
		this.checkStack({
			depth:0,
			codeLexem:1,
			errorMsg:"There is no word \"Program\" in your code!"
		});
		if(this.hasErrors) return;

		this.checkStack({
			depth:1,
			codeLexem:34,
			errorMsg:"There is no name of your program in your code!"
		});
		if(this.hasErrors) return;

		this.checkStack({
			depth:2,
			codeLexem:2,
			errorMsg:"You forgot \";\" statement!"
		});
		if(this.hasErrors) return;

		this.stack.length=0;
	}

	checkVarStatement() {
		this.stack.length = 0;

		this.checkStack({
			depth:0,
			codeLexem:3,
			errorMsg:"You forgot Var  word in your code !"
		});
		if(this.hasErrors) return;

		this.checkIdList();
		if(this.hasErrors) return;


		this.checkStack({
			depth:0,
			codeLexem:7,
			errorMsg:"There  must be : symbol in your code Declaration!"
		});
		if(this.hasErrors) return;

		this.checkStack({
			depth:1,
			codeLexem:8,
			errorMsg:"There  must be integer type in your code Declaration!"
		});
		if(this.hasErrors) return;

		this.checkStack({
			depth:2,
			codeLexem:2,
			errorMsg:"You forgot \";\" statement!"
		});
		if(this.hasErrors) return;

		this.stack.length = 0;
	}

	checkIdList() {
		var depth = 1;

		this.checkStack({
			depth:depth,
			codeLexem:34,
			errorMsg:"You forgot ID your code !"
		});
		if(this.hasErrors) return;

		while(this.arrLexems[this.index].codeLexem==9) {
			depth++;
			this.index++;

			this.checkStack({
				depth:depth,
				codeLexem:34,
				errorMsg:"You forgot ID your code !"
			});
			if(this.hasErrors) return;
		}
		this.stack.length = 0;
	}

	checkDeclaration() {
		this.checkNameProgram();
		if(this.hasErrors) return;

		this.checkVarStatement();
		if(this.hasErrors) return;
		this.stack.length = 0;
	}

	checkBody() {
		this.stack.length = 0;
		while(this.arrLexems[this.index].codeLexem!==6) {
			this.inspectOperator();
			if(this.hasErrors) return;
		}
		this.stack.length = 0;
	}

	inspectReadWrite() {
		this.stack.length = 0;

		this.checkStack({
			depth:0,
			codeLexem:26,
			errorMsg:"You forgot ( in your Read/Write statement!"
		});
		if(this.hasErrors) return;

		this.checkIdList();
		if(this.hasErrors) return;

		this.checkStack({
			depth:0,
			codeLexem:27,
			errorMsg:"You forgot ) in your Read/Write statement!"
		});
		if(this.hasErrors) return;

		this.checkStack({
			depth:1,
			codeLexem:2,
			errorMsg:"You forgot \";\" statement!"
		});
		if(this.hasErrors) return;

		this.stack.length = 0;
	}

	inspectMnoj() {
		this.stack.length = 0;

		if(this.arrLexems[this.index].codeLexem==34) {
			console.log("Mnoj id is ok");
			this.index++;
			return;
		} else if(this.arrLexems[this.index].codeLexem==35) {
			console.log("Mnoj constant is ok");
			this.index++;
			return;
		} else if(this.arrLexems[this.index].codeLexem==36) {
			console.log("Mnoj ( is ok");
			this.index++;
			this.inspectStatement();
			if(this.hasErrors) return;


			this.checkStack({
				depth:0,
				codeLexem:37,
				errorMsg:"Yo forgot ) in your code!"
			});
			if(this.hasErrors) return;

		} else {
			this.hasErrors = true;
			giveError("Unexpexted Token! Line: "+(this.arrLexems[this.index].linenmb+1));
		}

		this.stack.length = 0;
	}

	inspectTerminator(){
		var p = true;
			this.stack.length = 0;

		this.inspectMnoj();
		if(this.hasErrors) return;

		while(this.arrLexems[this.index].codeLexem==21 ||
			  this.arrLexems[this.index].codeLexem == 22 ||
			  this.arrLexems[this.index].codeLexem == 23 ) {
			this.index++;

			console.log("Stament *|/ is ok");
			this.inspectMnoj();
			if(this.hasErrors) return;
			console.log("Terminator Mnojitel is Ok");

		}

		this.stack.length = 0;
	}

	inspectStatement() {
		this.stack.length = 0;

		if(this.arrLexems[this.index].codeLexem==20) {
			console.log("Statement - is Ok");
			this.index++;
		}

		this.inspectTerminator();
		if(this.hasErrors) return;


		while(this.arrLexems[this.index].codeLexem == 19
			 || this.arrLexems[this.index].codeLexem == 20) {
			this.index++;
			console.log("Stament +|- is ok");

			this.inspectTerminator();
			if(this.hasErrors) return;
		}

		this.stack.length = 0;
	}


//Assigment inspection
	inspectAssignment() {
		this.stack.length = 0;

		this.checkStack({
			depth:0,
			codeLexem:10,
			errorMsg:"You forgot = in  your code !"
		});
		if(this.hasErrors) return;

		this.inspectStatement();
		if(this.hasErrors) return;

		this.checkStack({
			depth:0,
			codeLexem:2,
			errorMsg:"You forgot ; in your code!"
		});
		if(this.hasErrors) return;

		this.stack.length = 0;
	}

	inspectOperator() {
		switch(this.arrLexems[this.index].codeLexem) {
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
				giveError("Error! Unexpected token! Line: "+(this.arrLexems[this.index].linenmb + 1));
				this.hasErrors = true;
				if(this.hasErrors) return;
				break;
		}
	}


//Inspection of if
	inspectIf() {
		this.stack.length = 0;

		this.checkStack({
			depth:0,
			codeLexem:26,
			errorMsg:"You forgot ( in your code your code !"
		});
		if(this.hasErrors) return;


		this.inspectLogicalExpression();
		if(this.hasErrors) return;

		console.log("End of logical if expression")

		this.checkStack({
			depth:0,
			codeLexem:27,
			errorMsg:"You forgot ) in your code your code !"
		});
		if(this.hasErrors) return;

		this.checkStack({
			depth:1,
			codeLexem:18,
			errorMsg:"You forgot Then in your code your code !"
		});
		if(this.hasErrors) return;

		this.checkStack({
			depth:2,
			codeLexem:39,
			errorMsg:"You forgot { in your code your code !"
		});
		if(this.hasErrors) return;

		this.inspectOperator();
		if(this.hasErrors) return;

		this.checkStack({
			depth:0,
			codeLexem:40,
			errorMsg:"You forgot } in your code your code !"
		});
		if(this.hasErrors) return;

		this.checkStack({
			depth:1,
			codeLexem:2,
			errorMsg:"You forgot ; in your code your code !"
		});
		if(this.hasErrors) return;

		this.stack.length = 0;
	}

	inspectLogicalExpression() {
		this.stack.length = 0;

		this.inspectLogicalTerminator();
		if(this.hasErrors) return;
		console.log("LOGEXP logterm ok...");

		while(this.arrLexems[this.index].codeLexem == 24) {
			console.log("LOGEXP or ok...");
			this.index++; //////////////////////////////////////////////////////////////////index++
			this.inspectLogicalTerminator();
			if(this.hasErrors) return;
			console.log("LOGEXP logterm ok...");
		}

		this.stack.length = 0;
	}

	inspectLogicalTerminator() {
		this.stack.length = 0;

		this.inspectLogicalMnoj();
		if(this.hasErrors) return;
		console.log("LOGTERM logmnoj ok...");

		while(this.arrLexems[this.index].codeLexem == 38) {
			this.index++;
			this.inspectLogicalMnoj();
			console.log("LOGTERM logmnoj ok...");
			if(this.hasErrors) return;
		}

		this.stack.length = 0;
	}

	inspectLogicalMnoj() {
		this.stack.length = 0;

		if(this.arrLexems[this.index].codeLexem == 25) {
			while(this.arrLexems[this.index].codeLexem == 25) {
				this.index++;
				console.log("LOGMNOJ not ok...");
				if(this.arrLexems[this.index].codeLexem != 35) {

					this.inspectStatement();
					if(this.hasErrors) return;
					console.log("LOGMNOJ not ok...");

					if(this.arrLexems[this.index].codeLexem >= 28 
						&& this.arrLexems[this.index].codeLexem <=33) {
						console.log("LOGMNOJ znak otnosh ok...");
						this.index++;
					} else {
						giveError("Error! Unexpected token! Line: "+(this.arrLexems[this.index].linenmb+1));
						this.hasErrors = true;
					}
					if(this.hasErrors) return;

					this.inspectStatement();
					if(this.hasErrors) return;
					console.log("LOGMNOJ stmt ok...");

				} else if(this.arrLexems[this.index].codeLexem == 36) {
					console.log("LOGMNOJ [ ok...");
					this.index++;
					this.inspectLogicalExpression();
					if(this.hasErrors) return;

					this.checkStack({
						depth:0,
						codeLexem:37,
						errorMsg:"You forgot ] in your code your code !"
					});

				} else {
					giveError("Error! Unexpected token! Line: "+(this.arrLexems[this.index].linenmb+1));
					this.hasErrors = true;
				}
			}
		} else {
			if(this.arrLexems[this.index].codeLexem !== 36) {
				this.inspectStatement();
				console.log("LOGMNOJ stmt ok...");
				console.log(this.arrLexems[this.index]);

				if(this.arrLexems[this.index].codeLexem >= 28 
					&& this.arrLexems[this.index].codeLexem <=33) {
						console.log("LOGMNOJ znak otnosh ok...");
						this.index++;
					} else {
						giveError("Error! Unexpected token! Line: "+(this.arrLexems[this.index].linenmb+1));
						this.hasErrors = true;
					}
				this.inspectStatement();
				if(this.hasErrors) return;
				console.log("LOGMNOJ stmt ok...");

			} else if(this.arrLexems[this.index].codeLexem == 36) {
					console.log("LOGMNOJ [ ok...");
					this.index++;
					this.inspectLogicalExpression();
					if(this.hasErrors) return;

					this.checkStack({
						depth:0,
						codeLexem:37,
						errorMsg:"You forgot ] in your code your code !"
					});

				} else {
					giveError("Error! Unexpected token! Line: "+(this.arrLexems[this.index].linenmb+1));
					this.hasErrors = true;
				}
		}

		this.stack.length = 0;
	}

//Inspect Do
	inspectDo() {
			this.stack.length = 0;
			console.log("OPERATOR DO is ok...");


			//Inspect assignment
			this.checkStack({
				depth:0,
				codeLexem:34,
				errorMsg:"You forgot ID in your code !"
			});
			if(this.hasErrors) return;

			this.checkStack({
				depth:1,
				codeLexem:10,
				errorMsg:"You forgot = in  your code !"
			});
			if(this.hasErrors) return;

			this.inspectStatement();
			if(this.hasErrors) return;
			console.log("OPERATOR Assignment ok...");
			//Inspect assignment


			this.checkStack({
				depth:0,
				codeLexem:14,
				errorMsg:"You forgot To in your code !"
			});
			if(this.hasErrors) return;

			this.inspectStatement();
			if(this.hasErrors) return;
			console.log("OPERATOR stmt ok...");

			this.checkStack({
				depth:0,
				codeLexem:15,
				errorMsg:"You forgot By in your code !"
			});
			if(this.hasErrors) return;

			this.inspectStatement();
			if(this.hasErrors) return;
			console.log("OPERATOR stmt ok...");


			this.checkStack({
				depth:0,
				codeLexem:16,
				errorMsg:"You forgot While in your code !"
			});
			if(this.hasErrors) return;

			this.checkStack({
				depth:1,
				codeLexem:26,
				errorMsg:"You forgot ( in your code !"
			});
			if(this.hasErrors) return;


			this.inspectLogicalExpression();
			if(this.hasErrors) return;

			this.checkStack({
				depth:0,
				codeLexem:27,
				errorMsg:"You forgot ) in  your code !"
			});
			if(this.hasErrors) return;

			//List operators must me here
			while(this.arrLexems[this.index].codeLexem !==5) {
				this.inspectOperator();
				if(this.hasErrors) return;
			}

			// giveError(this.arrLexems[this.index].codeLexem);
			// console.log(this.stack);


			this.checkStack({
				depth:0,
				codeLexem:5,
				errorMsg:"You forgot End in  your code !"
			});
			if(this.hasErrors) return;

			this.checkStack({
				depth:1,
				codeLexem:2,
				errorMsg:"You forgot ; in  your code !"
			});
			if(this.hasErrors) return;

			this.stack.length = 0;
		}

	analyze() {
		this.checkDeclaration();
		if(this.hasErrors) return;

		console.log("Declaration was inspected, no errors!");
		this.checkStack({
			depth:0,
			codeLexem:4,
			errorMsg:"You forgot Begin in your code !"
		});
		if(this.hasErrors) return;

		this.checkBody();
		if(this.hasErrors) return;

		this.checkStack({
			depth:0,
			codeLexem:6,
			errorMsg:"You forgot EndPr in your code !"
		});
		if(this.hasErrors) return;

		console.log("Syntax analyzer is done mazafaka!!!");
		return true;

	}

}