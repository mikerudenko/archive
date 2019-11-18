% + List, +Counter, ?NewList
change([X|Xs],I,[X|Xs1]):-
	I>1,
	I1 is I-1,
	change(Xs,I1,Xs1).
change([A,B,C|Xs],1,[C,B,A|Xs]).

% + List ?NewList
main(X, Y):-
	length(X, N),
	K is N mod 2,
	K =:= 1,
	I is (N//2),
	change(X,I,Y).
