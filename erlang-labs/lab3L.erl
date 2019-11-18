-module(lab3L).
-export([y/4, sum/3]).

% +X1,+X2,+Step,+N,
y(X1, X2, Step, N) when X1 =< X2+0.1E-10 ->
	F = sum(X1, N, 0),
	X12 = X1 + Step,
	[F|y(X12, X2, Step, N)];
y(_,_,_,_) ->
	[].

% +X, +N, +Acc
sum(X, N, Acc) when N > 0 ->
	Acc1 = Acc+(((math:cos(X+2*N))/(N*N+1))-2*X*X),
	N1 = N-1,
	sum(X,N1,Acc1);
sum(_, 0, Acc) ->
	Acc.