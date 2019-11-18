data_matr(
[[1,1,1,1,1],
 [1,1,1,1,1],
 [1,1,1,1,1],
 [1,1,1,1,1],
 [1,1,1,1,1]]).
data_matr(
[[0,0,0,0,1],
 [0,0,0,1,0],
 [0,0,1,0,0],
 [0,0,0,1,0],
 [0,0,0,0,1]]).

% +Matrix, -Result
main(Matr, S):-
    data_matr(Matr),
    length(Matr, N),
    M is N // 2 + 1,
    matr_pro(Matr, 1, N, M, 0, S).

% +Matrix, +Iterator, +RowIndex, +Middle, +Accumulator, -Result
matr_pro([R | Rs], I, Krow, M, Acc, S) :-
    I1 is I + 1,
    def_bounds(I1, M, Krow, Krow1),
    %N is Krow - 1,
    %nth0(N, R, Elem),
    my_nth(R, 1, Krow, Elem),
    Acc1 is Acc + Elem,
    matr_pro(Rs, I1, Krow1, M, Acc1, S).
matr_pro([], _, _, _, S, S).

%+RowCount, +Middle, +CurrentRowBoundary, -NextBoundary
def_bounds(I, M, Kr, Kr1):-
    I =< M,
    Kr1 is Kr - 1.
def_bounds(I, M, Kr, Kr1):-
    I > M,
    Kr1 is Kr + 1.

%+Row, +ItemsCounter, +RowBounds, -Sum
my_nth([_ | Xs], I, K, S):-
    I =\= K,
    I1 is I + 1,
    my_nth(Xs, I1, K, S).
my_nth([X | _], K, K, X).









