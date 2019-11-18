(defun lab12(list1)
  (list 
	  (nth 2 (nth 2 (nth 2 list1)))
	  (nth 4 (nth 2 list1))
	  (car (nth 4 list1))
  )
)


;(K A (P I (T A N) S K) A (Y) D O C H)

(defun main()
  (lab1 '.21 '13 '86)
  (lab12 '(K A (P I (T A N) S K) A (Y) D O C H))
)