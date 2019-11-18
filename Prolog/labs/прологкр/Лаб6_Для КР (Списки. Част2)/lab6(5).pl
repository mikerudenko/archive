%+List
fold_four(L):-
	length(L, N),
	0 is N mod 4.

%+List, -Result List
process_list(L, L1):-
	fold_four(L),
	length(L, Len),
	K1 is Len//4 + 1,
	K2 is Len//4 * 3 + 1,
	parts(L, 1, K1, K2, Part1, Part2_3),
	reverse(Part1, Part1_rev),
	append(Part1_rev, Part2_3, L1).

%+List, +Counter, +Begin of part2, +Begin of part4, -Part1, -Part2_3
parts([X|Xs], I, K1, K2, [X|P1], P2_3):-
	I < K1,
	I1 is I + 1,
	parts(Xs, I1, K1, K2, P1, P2_3).
parts([X|Xs], I, K1, K2, P1, [X|P2_3]):-
	I >= K1,
	I < K2,
	I1 is I + 1,
	parts(Xs, I1, K1, K2, P1, P2_3).
parts(_, K2, _, K2, _, []).
