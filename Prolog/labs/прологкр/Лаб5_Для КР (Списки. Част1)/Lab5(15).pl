%-NewList -NewList
chetn([],[]).

%+List, -NewList
chetn([H|T], Z):-
	H mod 2 =:= 1,
	chetn(T,Z).

%+List, +NewList
chetn([H|T], [H|Z1]):-
	chetn(T,Z1).
