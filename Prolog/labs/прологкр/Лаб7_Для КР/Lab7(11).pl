% +Matrix, -NewMatrix
main([X|Xs],NewMatr):-
	change(X,[X|Xs],0,NewMatr).

% +Counter, +Matrix, +RowCounter, -NewMatrix
change([_,_|Xs],[X1|Xs1],I,[X2|Xs2]):-
	row(Xs,X1,I,X2),
	I1 is I+1,
	change(Xs,Xs1,I1,Xs2).
change(_,X1,_,X1).

% +Counter, +CurrentRow, +Counter, -Row
row(X,[H|Xs],0,[H1|Xs1]):-
	change_elem(X,H,Xs,H1,Xs1).
row(X,[H|Xs],I,[H|Xs1]):-
	J is I-1,
	row(X,Xs,J,Xs1).

% +Counter, +FirstElement, +CurrentRow, +SecondElement, -Row
change_elem([_|Xs],Xn,[H|Xs1],Xk,[H|Xs2]):-
	change_elem(Xs,Xn,Xs1,Xk,Xs2).
change_elem(_,Xn,[Xk|Xs],Xk,[Xn|Xs]).















