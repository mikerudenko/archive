
(defun lab4(someList)
	;(format t "proxod ")
	(if (null someList)
		someList
		(if (< (car someList) 0)
			(cons (car someList) (lab4 (cdr someList)))
			(cons () (lab4 (cdr someList)))
		)
	)
	;(format t "qwdqwd ~S" val)
)

(lab4 '(5 5 -7 -9 15))