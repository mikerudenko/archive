% ?List -Item, that middle
main(Mas,S):-
	length(Mas,L),
	L1 is L div 2+1,
	nth_item(Mas,L1,S).

%+List +Counter ?Nth Item
nth_item([_|Xs],I,X):-
	I>1,
	I1 is I-1,
	nth_item(Xs,I1,X).
nth_item([X|_],1,X).
