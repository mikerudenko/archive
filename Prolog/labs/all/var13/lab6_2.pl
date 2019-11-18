% + List, - # New list (Second half + First half)
move_halfs(In, Out) :-
	length(In, N),
	0 is N mod 2,
	K is N // 2 + 1,
	move(In, 1, K, Part1, Part2),
	append(Part2, Part1, Out).

% + List, + Index, + #End index, - #First half, - #Second half
move([X | Xs], I, N, [X | Part1], Part2) :-
	I < N,
	I1 is I + 1,
	move(Xs, I1, N, Part1, Part2).
move(Part2, _, _, [], Part2).
