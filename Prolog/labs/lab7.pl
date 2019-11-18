matrix_data([[1, 2, 3, 4],
	[6, 7, 8, 9],
	[13, 14, 15, 16],
	[19, 20, 21, 22]]).

% ? Matrix, ? Replaced Matrix
main([Row1, Row2 | Rows], [NewRow1 , NewRow2 | NewRows]) :-
	matrix_data([Row1, Row2 | Rows]),
	change_first_rows(Row1, Row2,  NewRow1, NewRow2),
	change_other_rows(Rows,  NewRows).

% ? Row1, ? Row2, ? NewRow1, ? NewRow2
change_first_rows([X11, X12 | Xs1], [X21, X22 | Xs2], [X22, X12 | Xs1], [X21, X11 | Xs2]).

% ? Rows,  ?New Rows
change_other_rows([_ | Xs], [_ | Ys]) :-
	change_other_rows(Xs,  Ys).
change_other_rows([X1, X2], [Y1, Y2]) :-
	change_cells(X1, X2, Y1, Y2).

% ? Row1, ? Row2, ? NewRow1, ? NewRow2
change_cells([X1|Xs1], [X2 | Xs2], [X1 | Ys1], [X2 | Ys2]) :-
	change_cells(Xs1, Xs2,  Ys1, Ys2).
change_cells([X11, X12], [X21, X22 ], [X22, X12 ], [X21, X11 ]).
