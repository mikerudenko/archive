main(L1, L2):-
	length(L1,N),
	K2 is N//4+1,
	K3 is N//4*3+1,
	p(L1, 1, K2, K3, [], L2).

p([X|Xs], I, K2, K3, Acc, L):-
	I < K2,
	I1 is I + 1,
	p(Xs, I1, K2, K3, [X|Acc], L).
p([X|Xs], I, K2, K3, Acc, [Acc, X|L]):-
	I = K2,
	I1 is I + 1,
	p(Xs, I1, K2, K3, [], L).
p([X|Xs], I, K2, K3, _, [X|L]):-
	I > K2,
	I < K3,
	I1 is I + 1,
	p(Xs, I1, K2, K3, [], L).
p(_, K3, _, K3, _, []).
