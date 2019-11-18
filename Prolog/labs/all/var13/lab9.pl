list([1, 2, -1, -2, 3]).
list([-1, 1, -1, 1, 2]).
list([-1, -2, -3, 3, 2]).

% + #List of values, - #List of indexes where values are negative
get_negative_values_index(List, NegativeIndexs) :-
	get_indexes(List, 1, NegativeIndexs).

% + List, + Index, - #List of indexes
get_indexes([X | Xs], I, [I | Ys]) :-
	X < 0, !,
	I1 is I + 1,
	get_indexes(Xs, I1, Ys).
get_indexes([_ | Xs], I, Ys) :-
	I1 is I + 1,
	get_indexes(Xs, I1, Ys).
get_indexes([], _, []).
