;-----outputFile-----
(defun outputFile()
  (let ((in (open "input.txt" :if-does-not-exist nil)))
    (when in 
      (loop for line = (read-line in nil)
        while line do (format t "~a~%" line)
      )
      (close in)
    )
  )
)

;-----deleteElem-----
(defun deleteElem(elem)
  (let ((in (open "input.txt" :if-does-not-exist :create))) 
    (setq str nil) 
	(setq cnt 0)
	(when in 
	  (loop for line = (read in nil) 
	    while line do 
		  (if (eq elem line) ()(dopFun line))
	  )
	  (print str)
	  (close in) 
	) 
  )
  (writeElem)
)

;-----modifyElem
(defun modifyElem(elem)
  (let ((in (open "input.txt" :if-does-not-exist :create))) 
    (setq str nil) 
	(setq cnt 0)
	(when in 
      (loop for line = (read in nil) 
	    while line do 
		  (if (eq elem line) (modElem) (dopFun line))
	  )
	  (print str)
	  (close in) 
	) 
  )
  (writeElem)
)

;-----additionalFunctions-----
(defun dopFun(line)
  (setq str (append str (list line)))
  (setq cnt (+ 1 cnt))
)

(defun writeElem()
  (with-open-file (stream "input.txt" :direction :output :if-exists :supersede) 	 
	(loop for i from 0 to (- cnt 1)do	
	  (setq out (write-to-string (nth i str))) 
	  (format stream out)
	  (terpri stream) 
	)				
  )  
)

(defun modElem()
	(setq a (read))
	(setq str (append str (list a)))
	(setq cnt (+ 1 cnt))
)

;-----func-----
(defun func(in rezult)
  (setq line (read-line in nil))
  (loop 
    (setq rezult (+ rezult (parse-integer line)))
    (setq line (read-line in nil))
    (if (null line) (return rezult))
  )
  (setq rezult (/ rezult 31.0))
)  

;-----averageTemp-----
(defun averageTemp()
  (let ((in (open "input.txt" :if-does-not-exist nil)))
    (when in       
      (setq averT 0)
      (setq averT (func in averT)) 
      (print averT)
      (let ((out (open "output.txt" :direction :output :if-exists :append :if-does-not-exist :create)))
        (when out
          (write-line (write-to-string averT) out)
          (close out)
        )
      )          
      (close in)
    )
  )
)

;-----desp-----
(defun desp()
  (let ((in (open "input.txt" :if-does-not-exist nil)))
    (when in       
      (setq averT 0)
      (setq averT (func in averT)) 
      (close in)
    )
  )
  (let ((in (open "input.txt" :if-does-not-exist nil)))
    (when in 
      (setq rezult 0)
      (setq line (read-line in nil))
      (loop 
        (setq rezult (+ rezult (/ (expt (- averT (parse-integer line)) 2) 31)))
        (setq line (read-line in nil))
        (if (null line) (return rezult))
      )           
      (let ((out (open "output.txt" :direction :output :if-exists :append :if-does-not-exist :create)))
        (when out
          (write-line (write-to-string rezult) out)
          (close out)
        )
      )              
      (close in)
    )
  )
  (print rezult)
  (print "end")
)

;-----main-----
(defun main()
  (outputfile)
  (averageTemp)
  (desp)
  (deleteElem 9)
  (modifyElem 2)
)