% +Numbers -Even -Odd
check([X|Xs],[X|XE],XO):-
	F is X mod 2,
	F = 0, !,
	check(Xs,XE,XO).
check([X|Xs],XE,[X|XO]):-
	check(Xs,XE,XO).
check([],[],[]).