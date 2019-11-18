matrix([[10, 2, 3, 4, 5],
	[ 1, 2, 3, 4, 5],
	[ 1, 2, 3, 4, 20]]).

% + Matrix, - #New Matrix
replace_limiting_elements([[X | FirstRow] | List], [[Y | FirstRow] | NewList]) :-
	replace_limiting(List, X, Y, NewList).

% + Matrix, + #First limit, - #Last limit, - #New Matrix
replace_limiting([Row | Rows], X, Y, [Row | NewRows]) :-
	replace_limiting(Rows, X, Y, NewRows).
replace_limiting([LastRow], X, Y, [NewLastRow]) :-
	process_last_row(LastRow, X, Y, NewLastRow).

% + Row, + #First limit, - #Last limit, - #New Row
process_last_row([Start | Other], X, Y, [Start | NewOther]) :-
	process_last_row(Other, X, Y, NewOther).
process_last_row([Y], X, Y, [X]).
