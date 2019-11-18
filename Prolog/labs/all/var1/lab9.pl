% +List, -NewList
delete([], []).
delete([X|Xs], [X|Ys]):-
	not(X = z),
	not(X = w),!,
	delete(Xs, Ys).
delete([_|Xs], List):-
	delete(Xs, List).
