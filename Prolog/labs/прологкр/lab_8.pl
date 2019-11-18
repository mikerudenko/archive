%+FirstItem, + LastItem, +Step, +Numb, -List
main(X0, Xn, St, N, [S|List]):-
	X0 =< Xn + 0.000000001,
	!,
	func(X0, N, S),
	X is X0 + St,
	main(X, Xn, St, N, List).
main(_, _, _, _, []).

%+X, +N, -F(X)
func(X, N, S):-
	X>0,
	sum(X, N, 2, 0, S1),
	S is S1 / X.

%+X, +N,+Counter,+Accumulator, -F(X)
sum(X, N, I, Acc, S):-
	I =< N,
	I1 is I + 1,
	Acc1 is Acc +(X^4 - X^2)/(I^2 - 1),
	sum(X, N, I1, Acc1, S).
sum(_, N, I, Acc, Acc):-
	I >N.


