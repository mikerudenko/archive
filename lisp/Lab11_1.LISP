(defstruct node contents price advice bigger)

(defvar *DATABASE* (make-hash-table))

(defun include-statement (name conts advice price &optional bigg)
  (setf (gethash name *DATABASE*)
        (make-node :contents conts
           :price price
           :advice advice
           :bigger bigg)))

;BD
(include-statement 'state1 "How much money do you spend on repairing something?" '(Reduce spending on repairing) 10000 'state2)
(include-statement 'state2 "How much money do you spend on food?" '(Reduce spending on food) 200 'state3)
(include-statement 'state3 "How much money do you spend on water?" '(Reduce spending on water) 100 'state4)
(include-statement 'state4 "How much money do you spend on internet?" '(Reduce spending on internet) 40 'state5)
(include-statement 'state5 "How much money do you spend on games?" '(Reduce spending on games) 100 'state6)
(include-statement 'state6 "How much money do you spend on household?" '(Reduce spending on household) 150 'state7)

(defun saveLog (filename Log)
  (with-open-file (ostream filename :direction :output :if-exists :append)
    (format ostream "~A~%" Log)
))


;LOG variable
(setq log nil)


;start program
(defun run (name)
  (let ((n (gethash name *DATABASE*)))
(cond ( (not (NULL n))
        (setf log (append log (list (node-contents n))))
           (format t "~A~%>> " (node-contents n))
           (cond ((> (setq answer (read)) (node-price n))
              (setf log (append log (list answer)))
              (setf log (append log (list (node-advice n))))
              (format t "~A~%Because: average price is ~A~% " (node-advice n) (node-price n))
               (run (node-bigger n))
              )
                 (t (setf log (append log (list answer)))
                  (run (node-bigger n)))
          )))
))


;To save log enter (saveLog "F:/Log.txt" log)
