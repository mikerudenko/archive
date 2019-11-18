let cvv = $('#cvv'),
    cardNumber = $('#cardNumber'),
    expMonth = $('#expMonth'),
    expYear = $('#expYear'),
    buyBtn = $('#confirm-purchase'),
    owner = $('#owner'),
    yearRegExpr = /[0-9]{2}$/,
    monthRegExpr = /1|2|3|4|5|6|7|8|9|10|11|12/,
    statusMonthCorrect = false,
    regExprCardNumber = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][‌​0-9])[0-9]{12}|3[47]‌​[0-9]{13}|3(?:0[0-5]‌​|[68][0-9])[0-9]{11}‌​|(?:2131|1800|35\\d{‌​3})\\d{11})$/;

cvv.addEventListener('keypress', preventIncorrectSymbols, false);
cvv.addEventListener('paste', pastePrevent, false);
cvv.addEventListener('keypress', digitRestriction, false);

cardNumber.addEventListener('keypress', preventIncorrectSymbols, false);
cardNumber.addEventListener('paste', pastePrevent, false);
cardNumber.addEventListener('keypress', spaceDividerHAndler, false);

expMonth.addEventListener('keypress',function(e){
    "use strict";
    if(this.value.length==1) {
        expYear.focus();
    }

    if(this.value.length==2) {
        e.preventDefault();
    }
});

expYear.addEventListener('keypress', function(e){
    "use strict";
    if(this.value.length==1) {
        cvv.focus();
    }

    if(this.value.length==2) {
        e.preventDefault();
    }
});


buyBtn.addEventListener('click', buyHandler, false);

function spaceDividerHAndler(e) {
    let cardNumber = this.value;

    if(cardNumber.length == 4 ||
        cardNumber.length == 9 ||
        cardNumber.length == 14) {
        this.value+=" ";
    }

    if(cardNumber.length==18) {
        expMonth.focus();
    }

    if(this.value.length==19) {
        e.preventDefault();
    }

}

function pastePrevent(event) {
    event.preventDefault();
}

function preventIncorrectSymbols(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        event.preventDefault();
    }
}

function digitRestriction(event) {

    if(event.target.value.length==3) {
        event.preventDefault();
    }

    if (event.target.value.length == 2) {
        setTimeout(function() {
            "use strict";
            buyBtn.focus();
        },0);
    }
}

function hideErrors() {
    Array.prototype.forEach.call($$('.modal-validation-err'), (item)=> {
        "use strict";
        item.style.visibility = 'hidden';
    });

    cardNumber.style.border = '1px solid rgba(0, 0, 0, 0.15)';
    cvv.style.border = '1px solid rgba(0, 0, 0, 0.15)';
    owner.style.border = '1px solid rgba(0, 0, 0, 0.15)';
    expYear.style.border = '1px solid rgba(0, 0, 0, 0.15)';
    expMonth.style.border = '1px solid rgba(0, 0, 0, 0.15)';
}

function failValidationHandler(field) {
    field.style.border = '1px solid red';
    field.nextSibling.nextSibling.style.visibility = 'visible';
    return false;
}

function fieldsValidation() {
    let statusValidation = true;

    // if (cardNumber.value.search(regExprCardNumber) == -1) {
    //     statusValidation = failValidationHandler(cardNumber);
    // }

    if(expMonth.value.search(monthRegExpr) == -1 ) {
        statusValidation = failValidationHandler(expMonth);
    }

    if (expYear.value.search(yearRegExpr) == -1) {
        statusValidation = failValidationHandler(expYear);
    }

    if (cvv.value.length != 3) {
        statusValidation = failValidationHandler(cvv);
    }

    if (owner.value.length == 0) {
        statusValidation = failValidationHandler(owner);
    }

    return statusValidation;
}


function buyHandler(event) {
    hideErrors();
    let statusValidation = fieldsValidation();

    if (statusValidation) {
        alert('You purchase is in processing now! Thanks!');
        $('#modal').modal('hide');
    }

    event.preventDefault();
}
