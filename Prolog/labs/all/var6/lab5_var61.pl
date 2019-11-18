% + List, + N-th element, - New list with N-th replaced
replace_nth([X | Xs], N, [X | Ys]) :-
	TmpN is N - 1,
	replace_nth_with_first(Xs, X, TmpN, Ys).

% + List, + First, + N-th element, - New list
replace_nth_with_first([X | Xs], First, N, [X | Ys]) :-
	N1 is N - 1,
	replace_nth_with_first(Xs, First, N1, Ys).
replace_nth_with_first([_ | Xs], First, 1, [First | Xs]).
