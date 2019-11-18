class Compiler {
    constructor(poliz, labels) {
        this.poliz = poliz;
        this.labels = labels;
        this.stack = [];
        this.programContext = {};
        this.hasErrors = false;
        this.fromLetters = /[a-z]+/;
        this.isLabel = /m[0-9]+/;
        this.isNumber = /[0-9]+/;
    }

    assignOperation() {
        var assignPart = this.stack.pop(),
            variable = this.stack.pop();
        this.programContext[variable] = assignPart;
        console.log(this.programContext);
    }

    inspectRead() {
        var variable = this.stack.pop();
        this.programContext[variable] = parseInt(prompt("Please, enter variable " + variable + ": "));
    }

    inspectWrite() {
        var variable = this.stack.pop();
        //alert("Value of the variable " + variable + ": " + this.programContext[variable]);
        giveError("Value of the variable " + variable + ": " + this.programContext[variable]);
    }

    logicalArifmeticalOperation(operation) {
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


    compile() {
        for (var i = 0; i < this.poliz.length; i++) {

            //Inspetion of the element from letters
            if (this.poliz[i] !== "Write" &&
                this.poliz[i] !== "Read" &&
                this.poliz[i].search(this.fromLetters) !== -1) {
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
}