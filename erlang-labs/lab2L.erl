-module(labL).
-export([func/3, f/2]).

f(X,N) when X > 2 ->
	func(X,N,1);
f(X,_) when (1<X) and (X>=2) ->
	X;
f(X,_) when (X =< 1) ->
	error.	

% +X, +Counter, +Accumulator
func(X,N,Acc) when N > 0 ->
	Acc1 = Acc*N*X,
	N1 = N-1,
	func(X,N1,Acc1);
func(_,0,Acc) ->
	Acc. 