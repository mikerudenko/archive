% +X0, +Xn, +H, +N, -List
main(X0, Xn, H, N, L):-
	creat_list(X0, Xn, H, N, [], L).

%+X, +0, +Xn, +H,+N, -Acc, -List
creat_list(X0, Xn, H, N, Acc, List):-
	X0 =< Xn,
	func(X0, N, S),
%	append([Acc], S, Acc1),
	X is X0 + H,
	creat_list(X, Xn, H, N, [S|Acc] , List).
creat_list(X0, Xn, _, _, Acc, Acc):-
	X0 > Xn.
%+X, +N,-S
func(X, N, S):-
	product(X, N, 1, 1, S1),
	S is S1*X^2.

% +X,+N+I,-Acc,S
product(X, N, I, Acc, S):-
	I =< N,
	I1 is I + 1,
	Acc1 is Acc*(I^2 + X),
	product(X, N, I1, Acc1, S).
product(_, N, I, Acc, Acc):-
	I >N.