(defun evaluate(x)
	(atan (/ (expt x 3) (exp x)))
)

; (defun listcreator(args l)
; 	(when args
; 		(listcreator (cdr args) (push (evaluate (car args)) l))
; 	)·
; 	(if (null args)
; 		(print l)
; 	)
; 	)
; 	(print (evaluate 1)
; )

(defun listofanswers()
	(list
 		(evaluate '10)
 		(evaluate '55)
 		(evaluate '1.369)
 		(evaluate '-12.3)
	)
)
 
;(listcreator '(0 12.589 -23 9 25) '())
