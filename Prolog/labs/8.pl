% X1 -> X2, Step, N
% (tg(x)^2) / (sum(i=1->N){i*x})

% +X1, +X2, +Step, +N, -List
f(X1, X2, Step, N, [Value|Tail]):-
	X1 =< X2 + 1E-10,!,
	rowSum(1, N, X1, 0, SubSum),
	Value is tan(X1)**2/SubSum,
	XNext is X1 + Step,
	f(XNext, X2, Step, N, Tail).
f(_, _, _, _, []).


% +I, +N, +X, +Acc, -Value
rowSum(I, N, X, Acc, Value):-
	I =< N,
	Acc1 is Acc + I * X,
	INext is I + 1,
	rowSum(INext, N, X, Acc1, Value).
rowSum(_, _, _, Value, Value).
