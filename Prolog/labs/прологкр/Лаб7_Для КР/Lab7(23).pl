data_matr([[1,1,1,1,1],
	  [1,1,1,1,1],
	  [1,1,1,1,1],
	  [1,0,1,10,1],
	  [0,1,1,1,100]]).
%+Matr,-ReturnMatr
main(Matr,S):-
	data_matr(Matr),
	length(Matr,N),
	M is N//2+1,
	matr_pro(Matr,1,N,M,S).

%+Matr,+CounterI,+CounterJ,+Midlle,-ReturnMatrix
matr_pro([R|Rs],I,J,M,[R|Rs1]):-
	I=<M,
	I1 is I+1,
	J1 is J-1,
	matr_pro(Rs,I1,J1,M,Rs1).
matr_pro([R|Rs],I,J,M,[R1|Rs1]):-
	I>M,
	I1 is I+1,
	J1 is J-1,
	row_pro(R,1,J,I,_,_,R1),
	matr_pro(Rs,I1,J1,M,Rs1).
matr_pro([],_,_,_,[]).

%+Matr,+CounterK,+CounterI,CounterJ,+Xi,+Xj,-ReturnMatrix
row_pro([X|Xs],K,I,J,Xi,Xj,[X|Xs1]):-
	K<J,
	K\=I,
	K1 is K+1,
	row_pro(Xs,K1,I,J,Xi,Xj,Xs1).
row_pro([Xi|Xs],I,I,J,Xi,Xj,[Xj|Xs1]):-
	K is I+1,
	row_pro(Xs,K,I,J,Xi,Xj,Xs1).
row_pro([Xj|Xs],J,_,J,Xi,Xj,[Xi|Xs]).





