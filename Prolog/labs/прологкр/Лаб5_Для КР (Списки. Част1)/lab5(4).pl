%+List, -Rez_List
delete_pair([K,_ | L], [K | L2]) :-
	delete_pair(L, L2).
delete_pair([], []).
delete_pair([X], [X]).
