%+List1, +List2, -List3
concate4p(L1, L2, L3):-
	length(L1, Len1),
	length(L2, Len2),
	N1 is Len1//2,
	N2 is Len2//2,
	cutS(L1, N1, S1),
	cutS(L2, N2, S2),
	cutE(L1, N1, E1),
	cutE(L2, N2, E2),
	append(E1, E2, R1),
	append(S1, S2, R2),
	append(R1, R2, L3).

%+List, +Counter, -Start
cutS(_, 0, []).
cutS([H|T1], N, [H|T2]):-
	N>0,
	N1 is N-1,
	cutS(T1, N1, T2).

%+List, +Counter, -End
cutE(E, 0, E).
cutE([_|T], N, E):-
	N>0,
	N1 is N-1,
	cutE(T, N1, E).
