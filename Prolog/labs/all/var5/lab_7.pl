main(List):-
	matrix_data(L),
	length(L, N),
	K is N//2 + 1,
	matr_pro1(L, 1, K, [], [], ListPart1, ListPart2),
	reverse(ListPart1, L1),
	reverse(ListPart2, L2),
	matr_pro2(L, 1, K, L2, L1, [], List1),
	reverse(List1, List).

%------------------------------------------
matr_pro1([R|Rs], I, K, Acc1, Acc2, Lp1, Lp2):-
	I < K,
	row_pro1(R, 1, I, Le),
	I1 is I + 1,
	matr_pro1(Rs, I1, K, [Le|Acc1], Acc2, Lp1, Lp2).
matr_pro1([_|Rs], I, K, Acc1, Acc2, Lp1, Lp2):-
	I = K,
	I1 is I + 1,
	matr_pro1(Rs, I1, K, Acc1, Acc2, Lp1, Lp2).
matr_pro1([R|Rs], I, K, Acc1, Acc2, Lp1, Lp2):-
	I > K,
	row_pro1(R, 1, I, Le),
	I1 is I + 1,
	matr_pro1(Rs, I1, K, Acc1, [Le|Acc2], Lp1, Lp2).
matr_pro1([], _, _, Acc1, Acc2, Acc1, Acc2).

%------------------------------------------
row_pro1([_|Xs], I, M, ListElement):-
	I \= M,
	I1 is I + 1,
	row_pro1(Xs, I1, M, ListElement).
row_pro1([X|_], I, I, X).

%------------------------------------------
matr_pro2([R|Rs], I, K, [X|Xs], Lp2, Acc, L):-
	I < K,
	row_pro2(R, 1, I, X, Row),
	I1 is I + 1,
%	append(Acc, Row, Acc1),
	matr_pro2(Rs, I1, K, Xs, Lp2, [Row|Acc], L).
matr_pro2([R|Rs], I, K, Lp1, Lp2, Acc, L):-
	I = K,
	I1 is I + 1,
%	append(Acc, R, Acc1),
	matr_pro2(Rs, I1, K, Lp1, Lp2, [R|Acc], L).
matr_pro2([R|Rs], I, K, Lp1, [X|Xs], Acc, L):-
	I > K,
	row_pro2(R, 1, I, X, Row),
	I1 is I + 1,
%	append(Acc, Row, Acc1),
	matr_pro2(Rs, I1, K, Lp1, Xs, [Row|Acc], L).
matr_pro2([], _, _, _, _, Acc, Acc).

%------------------------------------------
row_pro2([X|Xs], I, M, ListElement, [X|L]):-
	I \= M,
	I1 is I + 1,
	row_pro2(Xs, I1, M, ListElement, L).
row_pro2([_|Xs], I, I, ListElement, [ListElement|Xs]).
%------------------------------------------
matrix_data([[1,0,0,0,0],
	    [0,2,0,0,0],
	    [0,0,3,0,0],
	    [0,0,0,4,0],
	    [0,0,0,0,5]]).

