%+Xmin, +Xmax, +Step, +N, -List
main(X1, X2, H, N, [R|Rs]):-
	X1 =< X2 + 0.0000001,!,
	func(X1, N, R),
	X11 is X1 + H,
	main(X11, X2, H, N, Rs).
main(X1, X2, _, _, []):-
	X1 > X2 + 0.0000001.

% +X, +N, -Res
func(X, N, Res):-
	count(X, N, 0, Res1),
	Res is Res1 + sin(X * X).

% +X, +N, -Counter, -Acc
count(X, N, I, Acc):-
	I =< N,
	I1 is I + 1,
	count(X, N, I1, Acc1),
	Acc is Acc1 + (1 / (X * X + I1)).
count(_, N, I, 0):-
	I > N.
