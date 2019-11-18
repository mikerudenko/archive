% +X, +K, -Y(X)
main(X, K, Y):-
	X > 10,
	func(X, K, 8, 1, 0, Y).

main(X, K, Y):-
	X < 10,
	Y is K * X ^ K.

% +X, +K, +N, +Counter, +Accumulator, -Sum
func(X, K, N, I, Acc, S):-
	I =< N,
	I1 is I + 1,
	Acc1 is Acc + K * X,
	func(X, K, N, I1, Acc1, S).

func(_, _, N, I, S, S):-
	I > N.

