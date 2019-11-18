(setq l (list `(2 15 23 9 23 40 12 42 56 1200) `(3 5 2 2 2 34 23 12 23 34) `(45 3 23 20 10 2 50))) 

(defun sum (l) 
	;(progn 
		(setq total nil)
		(loop for x in l do 
			(if (is x) (setq total (cons x total))) 
		)

		(apply '+ (subseq (sort total #'<) 0 3)) 
	;)
)

(defun is (i) 
	(if (eq (mod i 2) 0) 
		T
		nil
	) 
) 

(defun main (l) 
(
	(lambda (l) 
		(
			min (sum (car l)) (sum (cadr l)) (sum (caddr l)))
		) 
	l)
)
