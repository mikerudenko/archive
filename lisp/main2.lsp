(defun evaluate(x)
  (if (= x 0)
     (print "division by zero")
     (log (/ (asin x) (log(- 1 x)))))
)

(defun listofanswers()
	(list
 	(evaluate '10)
 	(evaluate '55)
 	(evaluate '1.369)
 	(evaluate '-12.3)
        (evaluate '0)
        )
) 
