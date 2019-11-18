%+List,-Rezult_List
del_inp([], []).
del_inp([H|T], L):-
	member(H, T),
	del_inp(T,L).
del_inp([H|T],[H|L]):-
	del_inp(T,L).

