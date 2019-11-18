%+ List, NewList
remover([_,_,_|Xs],Xs1):-
	remover1(Xs, Xs1).

remover1([Z,_,_,_],[Z]).
remover1([X|Xs], [X|Xs1]):-
	remover1(Xs, Xs1).
