-module(lab12).
-export([loop/4, main/2]).
-import(math, [pow/2]).

%+N ?K ?X ?Accumulator
loop(N,K,X,ACC) when N < 4 ->
	N1 = N+1,
	ACC1 = K*pow(X, K),
	ACC = ACC + ACC1,
	loop(N1,K,X,ACC);
loop(1,_,_,ACC) ->
	ACC.

%+X, +K,
main(X,K) when (X > 2) ->
	loop(0,K,X,_);
main(X,K) when (X > 1) and (X < 2)->
	pow(X, K) + 15.