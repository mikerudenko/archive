% +List, -NewList
main(L1, L2):-
	length(L1, N),
	K2 is N // 2 + 1,
	parts(L1, 1, K2, Part1, Part2),
	reverse(Part2, Part2rev),
	append(Part2rev, Part1, L2).
%+List, +Counter, +#First_item_part2, -Part1, -Part2
parts([X|Xs], I, K2, [X|Part1], Part2):-
	I < K2,
	I1 is I + 1,
	parts(Xs, I1, K2, Part1, Part2).
parts(Part2, K2, K2, [], Part2).