%?Matrix,-Sum
main(Matrix,S):-
	%data_matr(Matrix),
	length(Matrix,N),
	matr_pro(Matrix,1,N,0,S).

%+Matrix,+RowsCounter,+RowBoundary,+Accumulator,-Sum
matr_pro([R|Rs],I,Krow,Acc,S):-
	I1 is I+1,
	Krow1 is Krow-1,
	row_pro(R,1,Krow,Term),
	Acc1 is Acc+Term,
	matr_pro(Rs,I1,Krow1,Acc1,S).
matr_pro([],_,_,Sum,Sum).

%+Row,+ItemsCounter,+RowCounter,-Term
row_pro([_|Xs],I,K,T):-
	I<K,
	I1 is I+1,
	row_pro(Xs,I1,K,T).
row_pro([X|_],K,K,X).
