% +List, -ListWithoutOddNumbers
delete_odd([X | Xs],[X | Xs1]):-
	0 is X mod 2,
	delete_odd(Xs, Xs1).
delete_odd([X | Xs],Y):-
	1 is X mod 2,
	delete_odd(Xs, Y).
delete_odd([],[]).
