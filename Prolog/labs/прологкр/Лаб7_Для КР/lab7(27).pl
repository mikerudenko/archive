data_matr([[1,1,1,1,1],
	  [1,10,10,10,1],
	  [1,10,10,10,1],
	  [1,10,10,10,1],
	  [1,1,1,1,1]]).

%?Matrix,-Sum
main([R|Rs],Sum):-
	data_matr([R|Rs]),
	sum_row(R,0,S1),
	matr_pro(Rs,S1,Sum).

%?Matrixelem,+Acc,+Suma
matr_pro([[X|Xs]|Rs],Acc,S):-
%	?List, ?Last
	last(Xs,Z),
	Acc1 is Acc+X+Z,
	matr_pro(Rs,Acc1,S).
matr_pro([R],Acc,S):-
	sum_row(R,Acc,S).

%?Matrixelem,+Acc,+Suma
sum_row([X|Xs],Acc,S):-
	Acc1 is Acc+X,
	sum_row(Xs,Acc1,S).
sum_row([],S,S).
