main(L1, L2):-
	length(L1,N),
	K2 is N//4+1,
	K3 is N//4*3+1,
	p(L1, 1, K2, K3, Lp1Copy, Lp2),
	reverse(Lp1Copy,Lp1),
	append(Lp1, Lp2, L2).

p([X|Xs], I, K2, K3, [X|Lp1], Lp2):-
	I < K2,
	I1 is I + 1,
	p(Xs, I1, K2, K3, Lp1, Lp2).
p([X|Xs], I, K2, K3, Lp1, [X|Lp2]):-
	I >= K2,
	I < K3,
	I1 is I + 1,
	p(Xs, I1, K2, K3, Lp1, Lp2).
p(_, K3, _, K3, [], []).
