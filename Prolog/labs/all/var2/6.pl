rule(A,B):-
	length(A,N),
	K1 is N//3 + 1,
	K2 is 2 * N//3 + 1,
	trans(A,1,K1,K2,[],[],B).

trans([X|Xs],I,K1,K2,X1,X2,X3):-
	I < K1,
	I1 is I + 1,
	append(X1,[X],T),
	trans(Xs,I1,K1,K2,T,X2,X3).
trans([X|Xs],I,K1,K2,X1,X2,X3):-
	I >= K1,
	I < K2,
	I1 is I + 1,
	append(X2,[X],T),
	trans(Xs,I1,K1,K2,X1,T,X3).
trans([X|Xs],I,_,K2,X1,X2,X3):-
	I >= K2,
	append(X2,X1,T),
	append(T,[X|Xs], X3).