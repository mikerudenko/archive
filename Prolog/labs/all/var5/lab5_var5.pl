% + Numerical List, - List without odd numbers
remove_odd([X | Xs], [X | Ys]) :-
	0 is X mod 2,
	remove_odd(Xs, Ys).
remove_odd([X |	Xs], Ys) :-
	1 is X mod 2,
	remove_odd(Xs, Ys).
remove_odd([], []).
