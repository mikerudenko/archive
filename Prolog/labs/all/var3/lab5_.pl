%+List, -New List with the sum of the first and last elements at the end
addLast([X | Xs], [X | Xs1]):-
	addLast_sum(Xs, X, Xs1).

% +Last, -First element, -New element
addLast_sum([X | Xs], First, [X | Xs1]) :-
	addLast_sum(Xs, First, Xs1).
addLast_sum([Last], First, [Last, Sum]) :-
	Sum is Last + First.


