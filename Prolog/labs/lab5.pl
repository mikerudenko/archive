% + List, - NewList
del_2([X | Xs],[X | Xs1]):-
	0 is X mod 2,
	del_2(Xs, Xs1).
del_2([X | Xs],  Xs1) :-
	1 is X mod 2,
	del_2(Xs, Xs1).
del_2([], []).
