
; random array 
(defun make-matr (m)
	(dotimes (i (car (array-dimensions m)) m)
			(dotimes (j (car (cdr (array-dimensions m))) t)
	        	(setf (aref m i j) (random 1000))
	        )
	)
	m
)

(defun make-matr-hand (m)
	(dotimes (i (car (array-dimensions m)) m)
			(dotimes (j (car (cdr (array-dimensions m))) t)
	        (setf (aref m i j) (read)))
	)
	m
)

(defun l1 (m)
	(car (array-dimensions m))
)
(defun l2 (m)
	(car (cdr (array-dimensions m)))
)

(defun sorting(matr lst)
	(dotimes (i (l1 matr) matr)
		(dotimes (j (l2 matr) matr)
			(setf lst (append lst (list (aref matr i j))))
		)
	)
	(sort lst #'<)
)
;right
(defun fun1(matr lst row start end n)
	(loop for col from start to end do
		;(write row)
		;(write col)
		;(write-line "---")
		;(write (nth n lst))
		;(write-line "")
		(setf (aref matr row col) (nth n lst))
		(incf n)
	)
	matr
)
;down
(defun fun2(matr lst col start end n)
	;(write start)(write-line "start")
	;(write start)(write end)(write n)
	(loop for row from start to end do
		;(write (aref matr i j))
		;(write row)
		;(write col)
		;(write-line "---")
		;(write (nth n lst))
		;(write-line "")
		(setf (aref matr row col) (nth n lst))
		;(write matr)
		;(write-line "")
		(incf n)
	)
	matr
)
;left
(defun fun3(matr lst row start end n)
	(loop for col from start downto end do
		;(write row)
		;(write col)
		;(write-line "---")
		;(write (nth n lst))
		;(write-line "")
		(setf (aref matr row col) (nth n lst))
		(incf n)
	)
	matr
)
;up
(defun fun4(matr lst col start end n)
	(loop for row from start downto end do
		;(write row)
		;(write col)
		;(write-line "---")
		;(write (nth n lst))
		;(write-line "")
		(setf (aref matr row col) (nth n lst))
		(incf n)
	)
	matr
)

(defun solution(matr lst x y left right up down)
	(loop for i from 0 to (list-length lst) do
		;(write-line "") (write i)(write (list-length lst))(write-line "right")
		;(write 
			(fun1 matr lst x y (decf right) i)
		;)
		;left (matr lst row start end n)
		;(write-line "")
		(setf i (+ i (- right y)) )
		;(incf x)
		(setf y right)		
		(cond ((>= (+ i 2) (list-length lst)) (return matr)))
		;(write-line "") (write i)(write (list-length lst)) (write-line "down")	
		;(write down)(write-line "down")
		;down (matr lst col start end n)
		;(cond ((>= (+ i 2) (list-length lst)) (return matr)))
		;(write 
			(fun2 matr lst y x (decf down) i)
		;)
		(setf i (+ i (- down x)))
		;(write-line "")
		(setf x down)
		;(decf y)
		;(write-line "")
		;(write i)(write (list-length lst))
		;(write-line "left")
		;left (matr lst row start end n)
		(cond ((>= (+ i 2) (list-length lst)) (return matr)))
		;(write 
			(fun3 matr lst x y left i)
		;)
		(setf i (- (+ i y) left))
		(setf y left)
		(incf left)
		;(decf x)
		;(write-line "")
		;(write i)(write (list-length lst))
		;(write-line "up")
		;up (matr lst col start end n)
		(cond ((>= (+ i 2) (list-length lst)) (return matr)))
		;(write 
			(fun4 matr lst y x (incf up) i)
		;)
		;(incf y)
		(setf x up)
		(setf i (- (+ i x 1) up))
		;(write-line "")
		;(write-line "")
		;(write i)(write (list-length lst))
		;(write-line "")
	)
matr
)

(defun r(m) 
	(dotimes (i (car (array-dimensions m)) m)
			(dotimes (j (car (cdr (array-dimensions m))) t)
	        	(setf (aref m i j) (cons i j))
	        )
	)
	m)
;(write  (sorting (make-matr (make-array (list (read) (read)))) '()))
;(write (next (cons 0 0) 3 4 0 0))



(write (r (make-array (list 3 4))))
;(write-line "")
(setf m (make-matr (make-array (list (read) (read)))))
(write m)
(write-line "")
(write (sorting m '()))
(write-line "")(write-line "")
(write (cons (l1 m) (l2 m)))
(write-line "")(write-line "")
;(write (fun1 m (sorting m '()) 0 0 3 0))
;(defun solution(matr lst x y left right up down)
(write (solution m (sorting m '()) 0 0 0 (l2 m) 0 (l1 m)))