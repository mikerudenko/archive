(defun readfile()
(setq f (open "E:/lab6.txt"))
(setq line (read-line f nil))
(close f)
line
)




(defun task()
(setq maxwords ())
(let ((in (open "E:/lab6.txt" :if-does-not-exist nil)))
  (when in
    (loop for line = (read-line in nil)
          while line do 
                         (cond
                          ((or (null maxwords)
                              (= (length (car maxwords)) (length line)))
                              (setq maxwords (cons line maxwords))
                              )
                          ((< (length (car maxwords)) (length line))
                           (setq maxwords (cons line ()))
                           )
                          )
;format t "~a ~a~%" line (length line)
)
  (close in)))
maxwords
)

(defun writeinfile()
(with-open-file (stream "E:/lab6o.txt" :direction :output 
                                         :if-exists :supersede)
  (format stream "~a~%" (task)))
)
