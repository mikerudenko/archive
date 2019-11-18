$(document).ready(function() {
    containerNumbers.click(addNumber)
    containerButton_del.click(backSpace);
    containerButtons.click(addNumToBuffer, ifZeroOnly);
    containerCalculator.disableSelection();

    containerButton_reset.click(reset);

    containerButton_q1.click(cQ1);
    containerButton_q2.click(cQ2);
    containerButton_dot.click(addDot)

    updateGradsStatus();

    containerGrad.click(setGrad)
    containerRad.click(setRad);

    containerButton_equ_add.click(addBlock)
    containerButton_equ_radd.click(resetAllBlocks)

    if (SIMPLE == false) {
        containerButton_plus.click(addPlus);
        containerButton_minus.click(addMinus);
        containerButton_mult.click(addMult);
        containerButton_div.click(addDiv);
        containerButton_sqrt.click(addSqrt);
    }


    if (SIMPLE) {
        containerButton_plus.click(cPlus);
        containerButton_minus.click(cMinus);
        containerButton_mult.click(cMult);
        containerButton_div.click(cDiv);
        containerButton_sqrt.click(cSqrt);
        containerButton_pow.click(cPow);

        containerButton_sin.click(cSin);
        containerButton_cos.click(cCos);
        containerButton_tg.click(cTg);
        containerButton_ctg.click(cCtg);
        containerButton_pi.click(cPi);
    }

    containerButton_equ_main.click(calculate_main);


    $(".calculator_more").on('click', ".clear_block", clearBlock);
    $(".calculator_more").on('click', ".insert_in", insertIn)

})