% +List, +counter, -Newlist
del_n([X|Xs],I,[X|Xs1]):-
	I>1,
	I1 is I-1,
	del_n(Xs,I1,Xs1).
del_n([X|_],1,Xs).
