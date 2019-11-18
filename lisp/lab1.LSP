(defun lab1 (X Y Z)
  (- (/ (- X (/ Y Z) ) (- Y (/ X Z) ) ) (/ (* Z X ) (+ 1 (/ Y X) ) ) )
)

(lab1 '.21 '13 '86)