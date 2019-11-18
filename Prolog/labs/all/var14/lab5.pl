%+List,-List without deleting elements
delete_3([A,B,_|Xs],[A,B,Xs1]):-
	delete_3(Xs,Xs1).
delete_3([],[]).
delete_3([A],[A]).
delete_3([A,B],[A,B]).
















