main(List1, List2, Result) :-
	length(List1, Len1),
	length(List2, Len2),
	Mid1 is Len1 // 2 + 1,
	Mid2 is Len2 // 2 + 1,
	parts(List1, 1, Mid1, L11, L12),
	parts(List2, 1, Mid2, L21, L22),
	append(L12, L22, Res1),
	append(Res1, L11, Res2),
	append(Res2, L21, Result).

parts([X|Xs], I, N, [X|Res1], Res2) :-
	I < N,
	I1 is I + 1,
	parts(Xs, I1, N, Res1, Res2).
parts(Res, N, N, [], Res).
