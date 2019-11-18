data_matr([[1,0,0,0,1],
	   [0,2,0,2,0],
	   [0,0,3,0,0],
	   [0,4,0,4,0],
	   [5,0,0,0,5]]).

%?Matrix,-Sum
sum_diag_item(Matr,S):-
	data_matr(Matr),
	length(Matr,N),
	M is N//2+1,
	matr_pro(0,Matr,N,M,0,S).

%+RowCounter,+Matrix,+Length,+Middle,+Acc,+Sum
matr_pro(I,[R|Rs],N,M,Acc,S):-
	I=:=M-1,
	main_diag_sum(I,0,R,N,0,Smain),
	I1 is I+1,
	Acc1 is Acc+Smain,
	matr_pro(I1,Rs,N,M,Acc1,S).

matr_pro(I,[R|Rs],N,M,Acc,S):-
	I=\=M-1,
	main_diag_sum(I,0,R,N,0,Smain),
	second_diag_sum(I,0,R,N,0,Ssecond),
	I1 is I+1,
	Acc1 is Acc+Smain+Ssecond,
	matr_pro(I1,Rs,N,M,Acc1,S).
matr_pro(_,[],_,_,Acc,Acc).

%+Row,+Ñolum,+Matrix,+Length,+Acc,-Sum
main_diag_sum(I,J,[_|Xs],N,Acc,Srow):-
	I=\=J,
	J1 is J+1,
	main_diag_sum(I,J1,Xs,N,Acc,Srow).
main_diag_sum(I,J,[X|Xs],N,Acc,Srow):-
	I=:=J,
	Acc1 is Acc+X,
	J1 is J+1,
	main_diag_sum(I,J1,Xs,N,Acc1,Srow).
main_diag_sum(_,_,[],_,Acc,Acc).

second_diag_sum(I,J,[_|Xs],N,Acc,Srow):-
	N=\= I+J+1,
	J1 is J+1,
	second_diag_sum(I,J1,Xs,N,Acc,Srow).
second_diag_sum(I,J,[X|Xs],N,Acc,Srow):-
	N=:= I+J+1,
	write(I+J+1),
	Acc1 is Acc+X,
	J1 is J+1,
	second_diag_sum(I,J1,Xs,N,Acc1,Srow).
second_diag_sum(_,_,[],_,Acc,Acc).



