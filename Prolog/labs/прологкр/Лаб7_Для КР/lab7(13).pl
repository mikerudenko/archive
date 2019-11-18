data_matr([[1  ,111,111,111,1  ],
	   [111,1  ,111,1  ,111],
	   [111,111,5  ,111,111],
	   [111,1  ,111,1  ,111],
	   [1  ,111,111,111,1  ]]).
data_matr0([[1,0,0,0,0,0,2],
	   [0,1,0,0,0,2,2],
	   [0,0,1,0,2,0,0],
	   [0,0,0,1,0,0,0],
	   [0,0,2,0,1,0,0],
	   [0,2,0,0,0,1,0],
	   [2,0,0,0,0,0,1]]).

%?Matrix, -Sum
sum_diagonal_items(Matr,S):-
	data_matr(Matr),
	length(Matr,N),
	M is N//2,
	matr_pro(0,Matr,N,M,0,S).

%+Rows_counter, +Matrix, +Number_row, +Middle, +Accumulator, -Sum
matr_pro(I,[R|Rs],N,M,Acc,S):-
	I=:=M,
	sum_main_diagonal(I,0,R,N,0,Smain),
	I1 is I+1,
	Acc1 is Acc+Smain,
	matr_pro(I1,Rs,N,M,Acc1,S).
matr_pro(I,[R|Rs],N,M,Acc,S):-
	I=\=M,
	sum_main_diagonal(I,0,R,N,0,Smain),
	sum_secondary_diagonal(I,0,R,N,0,Ssecond),
	I1 is I+1,
	Acc1 is Acc+Smain+Ssecond,
	matr_pro(I1,Rs,N,M,Acc1,S).
matr_pro(_,[],_,_,Acc,Acc).

% +Rows_counter, +Items_counter, +Matrix, +Number_row, +Accumulator,-Sum
sum_main_diagonal(I,J,[_|Xs],N,Acc,Srow):-
	I=\=J,
	J1 is J+1,
	sum_main_diagonal(I,J1,Xs,N,Acc,Srow).
sum_main_diagonal(I,J,[X|Xs],N,Acc,Srow):-
	I=:=J,
	Acc1 is Acc+X,
	J1 is J+1,
	sum_main_diagonal(I,J1,Xs,N,Acc1,Srow).
sum_main_diagonal(_,_,[],_,Acc,Acc).

% +Rows_counter, +Items_counter, +Matrix, +Number_row, +Accumulator,-Sum
sum_secondary_diagonal(I,J,[_|Xs],N,Acc,Srow):-
	N=\= I+J+1,
	J1 is J+1,
	sum_secondary_diagonal(I,J1,Xs,N,Acc,Srow).
sum_secondary_diagonal(I,J,[X|Xs],N,Acc,Srow):-
	N=:= I+J+1,
	Acc1 is Acc+X,
	J1 is J+1,
	sum_secondary_diagonal(I,J1,Xs,N,Acc1,Srow).
sum_secondary_diagonal(_,_,[],_,Acc,Acc).















