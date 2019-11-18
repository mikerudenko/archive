(defmacro CREATE (l &rest vals) 
	;(setq arr nil) 
	;(setq i 0) 
	(if (eq (length vals) (length (eval l)) )
		(dotimes (i  (length  vals)) 
			(setq arr (cons (list (eval (nth i vals)) (eval (nth i vals))) arr)) 
			(print arr) 
			;(setq i (+ 1 i)) 
		) 
		nil
	) 
) 

;(CREATE `(1 2 3 4 5 6) (+ 1 4) (* 34 3) (* 0 1) (+ 2 3) (- 9 0) (eq 2 2))