% +List, -NewList
delete([], []).
delete([X|Xs], N):-
	member(X, Xs),
	delete(Xs, N).
delete([X|Xs], [X|Xs1]):-
	not(member(X, Xs)),
	delete(Xs, Xs1).
