%param1 - input list, param2 - result list
delete_all_in_top10([X|Xs], Xs1) :-
	X >= 0,
	X < 11, !,
	delete_all_in_top10(Xs, Xs1).
delete_all_in_top10([X|Xs], [X|Result]) :-
	delete_all_in_top10(Xs, Result).
delete_all_in_top10([],[]).
