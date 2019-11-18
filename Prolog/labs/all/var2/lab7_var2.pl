matrix([[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9]]).
matrix([[ 1,  2,  3,  4],
	[ 5,  6,  7,  8],
	[ 9, 10, 11, 12],
	[13, 14, 15, 16]]).
matrix([[ 1,  2,  3,  4,  5],
	[ 6,  7,  8,  9, 10],
	[11, 12, 13, 14, 15],
	[16, 17, 18, 19, 20],
	[21, 22, 23, 24, 25]]).

% + Matrix, - NewMatrix
main(Matrix, NewMatrix) :-
	length(Matrix, N),
	process_rows(Matrix, 1, N, NewMatrix).

% + Matrix, + Index, + N, - NewMatrix
process_rows([Row | Xs], I, N, [NewRow | Ys]) :-
	I < N // 2 + 1,
	K2 is N - I + 1,
	replace(Row, 1, I, K2, NewRow),
	I1 is I + 1,
	process_rows(Xs, I1, N, Ys).
process_rows([Row | Xs], I, N, [NewRow | Ys]) :-
	I >= N // 2 + 1,
	K1 is N - I + 1,
	replace(Row, 1, K1, I, NewRow),
	I1 is I + 1,
	process_rows(Xs, I1, N, Ys).
process_rows([], _, _, []).

% + Row, + Index, + FirstIndex, + SecondIndex, - NewRow
replace([X | Xs], I, K1, K2, [X | Ys]) :-
	I < K1,
	I1 is I + 1,
	replace(Xs, I1, K1, K2, Ys).
replace([First | Xs], I, I, K2, [Second | Ys]) :-
	I1 is I + 1,
	replace_last(Xs, I1, K2, First, Second, Ys).

% + RowFromK1, + Index, + SecondIndex, + FirstValue, +SecondValue, - NewRow
replace_last([X | Xs], I, K2, First, Second, [X | Ys]) :-
	I < K2,
	I1 is I + 1,
	replace_last(Xs, I1, K2, First, Second, Ys).
replace_last([Second | Xs], I, I, First, Second, [First | Xs]).
replace_last(Xs, I, K2, First, First, Xs) :-
	I > K2.