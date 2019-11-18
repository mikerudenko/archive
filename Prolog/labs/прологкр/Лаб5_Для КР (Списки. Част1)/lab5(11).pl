% +List, -NewList
is_integer([X|Xs],[X|Xs1]):-
	integer(X),
	is_integer(Xs,Xs1).
is_integer([X|Xs],Xs1):-
	float(X),
	is_integer(Xs,Xs1).
is_integer([],[]).

