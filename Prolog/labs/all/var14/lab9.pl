%+List, +Element,-NewList
del([E|Xs],E,Xs1):-
	!,
	del(Xs,E,Xs1).
del([X|Xs],E,[X|Xs1]):-
	del(Xs,E,Xs1).
del([],_,[]).
