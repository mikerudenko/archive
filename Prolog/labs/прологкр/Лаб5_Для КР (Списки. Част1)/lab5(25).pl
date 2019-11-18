% +List, -NewList
even_list([X|Xs],[X|Xs1]):-
	X<0,
	even_list(Xs,Xs1).
even_list([X|Xs],Xs1):-
	X>0,
	even_list(Xs,Xs1).
even_list([],[]).


