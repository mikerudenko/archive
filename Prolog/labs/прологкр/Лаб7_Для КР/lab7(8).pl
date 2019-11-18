matrix_data([ [1,1,1,1],
	      [1,1,1,0],
	      [1,1,0,0],
	      [1,0,0,0]]).

matrix_data2([[0,0,0,0,5],
	      [0,0,0,5,1],
	      [0,0,5,1,1],
	      [0,5,1,1,1],
	      [5,1,1,1,1]]).


%-Sum
main(Sum):-
	matrix_data([R|Rs]),
	length(R,N),
	K is N-1,
	matr_pro(Rs,K,0,Sum).

%+Matr +Counter +Accumulator -Sum
matr_pro([R|Rs],K,Acc,S):-
	row_pro(R,K,1,0,S1),
	K1 is K-1,
	Acc1 is Acc+S1,
	matr_pro(Rs,K1,Acc1,S).
matr_pro([],_,S,S).

%+Row +Index +Counter +Acc -Sum
row_pro([X|Xs],K,I,Acc,S):-
	I>K,
	I1 is I+1,
	Acc1 is Acc + X,
	row_pro(Xs,K,I1,Acc1,S).
row_pro([_|Xs],K,I,Acc,S):-
	I=<K,
	I1 is I+1,
	row_pro(Xs,K,I1,Acc,S).
row_pro([],_,_,S,S).






















