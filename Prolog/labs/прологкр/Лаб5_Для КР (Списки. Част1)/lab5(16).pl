%+List, -Sum
sum_mid_el(List, S):-
	length(List, L),
	N is L//2,
	summarize(List, N, S).

%+List, +Counter, -Sum
summarize([X,Y,Z|_], 1, S):-
	S is X+Y+Z.
summarize([_|T], N, S):-
	N>1,
	N1 is N-1,
	summarize(T, N1, S).

