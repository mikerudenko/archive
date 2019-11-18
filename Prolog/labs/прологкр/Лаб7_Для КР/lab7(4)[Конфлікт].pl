%-Matrix
data_matr([
    [2,2,2,1,1,1],
    [2,2,2,1,1,1],
    [2,2,2,1,1,1],
    [0,3,3,4,4,4],
    [0,3,3,4,4,4],
    [0,3,3,4,4,4]]).

%-Sum
summarize(S):-
	data_matr(Matr),
	length(Matr,N),
	M is N//2+1,
	matr_pro(Matr,1,M,0,S).

%+Matrix, +Counter, +Start position, +Accumulator, -Sum
matr_pro([_|Rs],I,M,Acc,S):-
	I<M,
	I1 is I+1,
	matr_pro(Rs,I1,M,Acc,S).
matr_pro([R|Rs],M,M,Acc,S):-
	row_pro(R,1,M,0,Srow),
	Acc1 is Acc+Srow,
	matr_pro(Rs,M,M,Acc1,S).
matr_pro([],_,_,S,S).

%+Row, +Counter, +Start position, +Accumulator, -Sum
row_pro([X|Xs],I,M,Acc,S):-
	I<M,
	I1 is I+1,
	X =:= 0,
	Acc1 is Acc+1,
	row_pro(Xs,I1,M,Acc1,S).
row_pro([X|Xs],I,M,Acc,S):-
	I<M,
	I1 is I+1,
	X =\= 0,
	row_pro(Xs,I1,M,Acc,S).
row_pro(_,M,M,S,S).
