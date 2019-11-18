%+X,+Power,-FunctionValue
pow(X,K,F):-
	K > 1,
	K1 is K - 1,
	pow(X,K1,F1),
	F is X*F1.

pow(X,K,X):-
	K == 1.

pow(_,K,1):-
	K == 0.

%+X,+Power,-FunctionValue
func(X,K,F):-
	X > 9,
	pow(X,K,F1),
	F is K*F1.

func(X,K,F):-
	X < 9,
	X > 7,
	pow(X,K,F).

%+X,+Power,-FunctionValue
main_func(X,K,F):-
	func(X,K,F).
