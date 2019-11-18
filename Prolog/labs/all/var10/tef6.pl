%+InputList, OutputList
main(InList, OutList):-
	length(InList, L),
	K2 is L//3+1,
	K3 is L//3*2+1,
	parts(InList, 1, K2, K3, Part1, Part2, Part3),
	reverse(Part2, NewPart2),
	append(Part1, NewPart2, NewPart12),
	append(NewPart12, Part3, OutList).

%+InputList, counter, lim1, lim2, part1, part2, part3
parts([X|Xs], I, K2, K3, [X|Part1], Part2, Part3):-
	I<K2,
	I1 is I+1,
	parts(Xs, I1, K2, K3, Part1, Part2, Part3).
parts([X|Xs], I, K2, K3, Part1, [X|Part2], Part3):-
	I>=K2,
	I<K3,
	I1 is I+1,
	parts(Xs, I1, K2, K3, Part1, Part2, Part3).
parts(Part3, K3, _, K3, [], [], Part3).
