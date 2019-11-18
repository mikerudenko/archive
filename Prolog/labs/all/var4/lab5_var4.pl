% + List, + Only elements on elen places
remove_second_elements([X, _ | Xs], [X | Zs]) :-
	remove_second_elements(Xs, Zs).
remove_second_elements([], []).
remove_second_elements([X], [X]).
