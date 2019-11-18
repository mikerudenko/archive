%-Matrix
data_matr([[2,2,2,1,1,1],
	   [2,2,2,1,1,1],
	   [2,2,2,1,1,1],
	   [2,2,2,2,2,2],
	   [2,2,2,2,2,2],
	   [2,2,2,2,2,2]]).

%?Matrix, -Sum
summarize(S):-
	data_matr(Matr),
	length(Matr,N),
	M is N//2+1,
	matr_pro(Matr,1,M,0,S).

%+Matrix, +Counter, +Start position, +Accumulator, -Sum
matr_pro([R|Rs],I,M,Acc,S):-
	I<M,
	I1 is I+1,
	row_pro(R,1,M,0,Srow),
	Acc1 is Acc+Srow,
	matr_pro(Rs,I1,M,Acc1,S).
matr_pro(_,M,M,S,S).

%+Row, +Counter, +Start position, +Accumulator, -Sum
row_pro([_|Xs],I,M,Acc,S):-
	I<M,
	I1 is I+1,
	row_pro(Xs,I1,M,Acc,S).
row_pro([X|Xs],M,M,Acc,S):-
	Acc1 is Acc+X,
	row_pro(Xs,M,M,Acc1,S).
row_pro([],_,_,S,S).

