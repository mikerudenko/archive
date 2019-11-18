(defun typeOf (x)
	(cond
		((numberp x)
		 "NUMBER")
		((symbolp x)
		 "SYMBOL")
		((listp x)
		  "LIST")
		(t (error "type eror")))
)

(defun task1 ()
(setq mlist '(s o m (t h) i (n g)))

(format t "~%First: ~S type: ~S~%" (first mlist) (typeOf (first mlist)))
(format t "Last: ~S type: ~S~%" (last mlist) (typeOf (last mlist)))
)



(defun solution1()
(format t "~%Input x: ")
(setq x (read))
(if (numberp x)
	(if (and (> x 3) (< x 4))
		(format t "Result: ~S" (exp (acos (- x 4))))
		(format t "Invalid x!Program can't calculate arcosinus"))
	(format t "x is not a number!")
)
)

(defun solution2()
(format t "~%Input x: ")
(setq x (read))
(if (numberp x)
	(cond 
	  ((< x 1) (setq res (expt (+ x 1))))
	  ((and (<= x 1) (< x 3))(setq res (+ x (/ 1 x))))
	  ((<= x 3) (setq res (sin (x))))
	)
	(setq res "x is not a number!"))
(format t "Result: ~S" res)
)

(defun main()
(format t "Menu:~%0: work with list
1: first function
2: second function
3: exit MuLisp 
default: exit:")
(setq oper (read))

(case oper 
(0 (task1))
(1 (solution1))
(2 (solution2))
(3 (quit))
(otherwise (format t "See your soon!"))
)
)

(main)
