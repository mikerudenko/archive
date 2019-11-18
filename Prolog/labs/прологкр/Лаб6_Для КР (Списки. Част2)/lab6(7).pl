%divide( ?sourceList, -K, -I, -P1, -P2, P3, P4)
divide([Lh | Lt], K1, K2, K3, I, [Lh | P1], P2, P3, P4):-
	I < K1,
	I1 is I + 1,
	divide(Lt, K1, K2, K3, I1, P1, P2, P3, P4).
divide([Lh | Lt], K1, K2, K3, I, P1, [Lh | P2], P3, P4):-
	I >= K1,
	I < K2,
	I1 is I + 1,
	divide(Lt, K1, K2, K3, I1, P1, P2, P3, P4).
divide([Lh | Lt], K1, K2, K3, I, P1, P2, [Lh | P3], P4):-
	I >= K2,
	I < K3,
	I1 is I + 1,
	divide(Lt, K1, K2, K3, I1, P1, P2, P3, P4).
divide([Lh | Lt], K1, K2, K3, I, P1, P2, P3, [Lh | P4]):-
	I >= K3,
	I1 is I + 1,
	divide(Lt, K1, K2, K3, I1, P1, P2, P3, P4).
divide([], _, _, _, _, [], [], [], []).


%main(?List, -ResultList)
main(List, ResList):-
        length(List, ListLength),
        K1 is ListLength // 4 + 1,
        K2 is ListLength // 2 + 1,
	K3 is ListLength // 4 * 3 + 1,
        divide(List, K1, K2, K3, 1, P1, P2, P3, P4),
	append(P1, P3, R1),
        append(P2, P4, R2),
        append(R1, R2, ResList).

