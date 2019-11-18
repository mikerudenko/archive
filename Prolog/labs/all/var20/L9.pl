% +List, ?NewList
del([X|Xs],[X|Xn]):-
	0 is X mod 2,
	!,
	del(Xs,Xn).
del([_|Xs],Xn):-
	del(Xs,Xn).
del([],[]).
