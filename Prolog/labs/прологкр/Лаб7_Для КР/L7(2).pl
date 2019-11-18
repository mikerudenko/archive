% -OutputMatrix
main(OM):-
	generateMatrix1(M),
	length(M, N),
	rower(M, N, 1, OM),
	my_printer(M),
	print('\n'),
	my_printer(OM).

% +M, + Len, +Row, -OutputMatrix
rower([M|Ms], L, R, [OR|O]):-
	%R =< H,
	columner(M, L, R, 1, _, _, OR),
	R1 is R + 1,
	rower(Ms, L, R1, O).
rower([], _, _, []).

% +Row, +Len, +RowN, +I, ?Xn, ?Xk,  OutputRow
columner([R|Rs], Len , RN, I, _, _, [X|OR]):-
	H is round(Len / 2),
	RN =< H,
	I = RN,
	I1 is I + 1,
	columner(Rs, Len, RN, I1, R, X, OR).
columner([R|Rs], Len, RN, _, _, R, [R|Rs]):-
	H is round(Len / 2),
	RN =< H,
	T is Len - RN + 1,
	RN = T.
columner([R|Rs], Len, RN, I, Xn, R, [Xn|Rs]):-
	H is round(Len / 2),
	RN =< H,
	T is Len - RN + 1,
	I = T.
columner([R|Rs], Len , RN, I, R, Xk, [Xk|Rs]):-
	H is Len / 2,
	RN > H,
	I = RN.
columner([R|Rs], Len, RN, I, _, _, [X|OR]):-
	H is Len / 2,
	RN > H,
	T is Len - RN + 1,
	I = T,
	I1 is I + 1,
	columner(Rs, Len, RN, I1, X, R, OR).
columner([R|Rs], Len, RN, I, Xn, Xk, [R|OR]):-
	I1 is I + 1,
	columner(Rs, Len, RN, I1, Xn, Xk, OR).

%+Matrix
my_printer([M| Ms]):-
	M = [_|_],
	my_printer(M),
	print('\n'),
	my_printer(Ms).
my_printer([M| Ms]):-
	print(M),
	print('\t'),
	my_printer(Ms).
my_printer([]).

% -Matrix
generateMatrix([[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9]]).
% -Matrix
generateMatrix1([[1, 2, 3, 4],
				[5, 6, 7, 8],
				[9, 10, 11, 12],
				[13, 14, 15, 16]]).
