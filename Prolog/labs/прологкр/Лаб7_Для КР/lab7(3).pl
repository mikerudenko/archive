%-Matrix
data_matr([[1,0,0,0,0],
	   [4,0,0,0,0],
	   [0,8,0,0,0],
	   [1,0,8,9,0],
	   [0,4,8,5,0]]).


% +Matrix, -Sum
main(Matr,Sum):-
	data_matr(Matr),
	matr_pro(Matr,1,0,Sum).

% +Matrix, +Counter, +Accumulator, -Sum
matr_pro([R|Rs],I,Acc,S):-
	row_pro(R,1,I,0,S1),
	I1 is I+1,
	Acc1 is Acc+S1,
	matr_pro(Rs,I1,Acc1,S).
matr_pro([],_,Sum,Sum).

% +Row, +Counter, +#First item, +Accumulator, -Sum
row_pro([_|Xs],I,N1,Acc,S):-
	I < N1,
	I1 is I+1,
	row_pro(Xs,I1,N1,Acc,S).
row_pro([X|Xs],I,N1,Acc,S):-
	I >= N1,
	I1 is I+1,
	Acc1 is Acc+X,
	row_pro(Xs,I1,N1,Acc1,S).
row_pro([],_,_,S,S).
