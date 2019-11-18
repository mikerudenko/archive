% +List, -NewList
main2(L1, Part1):-
	length(L1, N),
	K2 is 2 * N // 3+1,
	parts(L1, 1, K2, Part1).

	
%+List,+Counter,+Length,-NewList
parts([X|Xs], I, K2, [X|Part1]):-
	I < K2,
	I1 is I + 1,
	parts(Xs, I1, K2, Part1).
parts(_, K2, K2, []).
