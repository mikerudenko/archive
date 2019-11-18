%Matrix
data_matr([[1,1,1,1,1],
	  [1,1,1,1,1],
	  [1,1,1,1,1],
	  [1,1,1,1,1],
	  [1,1,1,1,1]]).

%?Matrix, -Sum
sum_of_central_items(Matr,S):-
	data_matr(Matr),
	length(Matr, N),
	M is N//2,
	matr_pro(Matr,1,M,S).

%+Matrix, +Rows Counter, +Middle, -Sum
matr_pro([_|Rs], I, M,S):-
	I<M,
	I1 is I+1,
	matr_pro(Rs,I1,M, S).
matr_pro([R1,R2,R3|_], M, M, S):-
	row_pro(R1,1,M,Sum_row1),
	row_pro(R2,1,M,Sum_row2),
	row_pro(R3,1,M,Sum_row3),
	S is Sum_row1+Sum_row2+Sum_row3.

%+Row,+Items Counter,+Middle,-Sum row
row_pro([_|Xs],I,M,S):-
	I<M,
	I1 is I+1,
	row_pro(Xs,I1,M,S).
row_pro([A,B,C|_],M,M,S):-
	S is A+B+C.



