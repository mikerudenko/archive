% +Matrix, -NewMatrix
matrix_main([X|Xs], NewMatrix):-
	length(X, N1),
	length([X|Xs], N2),
	change_matrix([X|Xs], 1, N1, N2, _, _, Acc1, Acc2),
	append([Acc1], [Acc2], NewMatrix).
% +Matrix, +Counter, +RowLength, +ColumnLength, +FirstAcc, +LastAcc,
% +Accumulato1, +Accumulator2
change_matrix([[X|Xs]|List], I, N1, N2, _, Last, Acc1, Acc2):-
	I =:= 1,
	I1 is I+1,
	change_matrix(List, I1, N1, N2, X, Last, _, Acc2),
	Acc1 = [Last|Xs].
change_matrix([X|List], I, N1, N2, First, Last, _, [X1|Xs1]):-
	I > 1,
	I < N2,
	I1 is I+1,
	change_matrix(List, I1, N1, N2, First, Last, _, Xs1),
	X1 = X.
change_matrix([X|_], I, N1, N2, First, Last, _, Acc2):-
	I =:= N2,
	set_get_last(X, 1, N1, First, Last, NewRow),
	Acc2 = NewRow.
% +Matrix, +Counter, +RowLength, +FirstAcc, +LastAcc, -NewRow
set_get_last([X|Xs], I, N1, First, Last, [X|Xs1]):-
	I < N1,
	I1 is I+1,
	set_get_last(Xs, I1, N1, First, Last, Xs1).
set_get_last([X|_], I, N1, First, Last, [X1]):-
	I =:= N1,
	Last is X,
	X1 is First.
