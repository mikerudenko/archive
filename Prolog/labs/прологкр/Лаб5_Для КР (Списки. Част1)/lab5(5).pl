%+Number
is_odd(X):-
	1 is X mod 2.

%+List, -Result
delete_odd([H|T], L):-
	is_odd(H),
	delete_odd(T, L).
delete_odd([H|T],[H|Lt]):-
	0 is H mod 2,
	delete_odd(T,Lt).
delete_odd([],[]).





















