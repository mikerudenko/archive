% +List, -NewList
even_list([X|Xs],[X|NewList]):-
	X mod 2=:=0,
	even_list(Xs,NewList).
even_list([X|Xs],NewList):-
	X mod 2=\=0,
	even_list(Xs,NewList).
even_list([],[]).
