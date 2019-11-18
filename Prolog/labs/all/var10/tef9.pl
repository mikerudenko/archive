% +InputList, -OutputList
remover([Head|Input], Output):-
	sin(Head)<0.0000000001,!,
	remover(Input ,Output).
remover([Head|Input], [Head|Output]):-
	remover(Input, Output).
remover([], []).








