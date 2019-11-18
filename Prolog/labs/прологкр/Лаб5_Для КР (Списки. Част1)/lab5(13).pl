%+Item, +List, -NewList
remove_item(X,[X|Xs],L):-
	remove_item(X,Xs,L).
remove_item(X,[H|Xs],[H|L]):-
	remove_item(X,Xs,L) .
remove_item(_,[],[]).
