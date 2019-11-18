%удаление последней трети списка
% +Список, -Новый список
main(L,L1):-
	length(L,K),%находим К - длину списка
	N is 2*K//3,%N - количество элементов в финальном списке
	del_after_nth(N,L,L1).%удаляем последнюю треть

% ?Количество элементов, +Список, -Новый список
del_after_nth(N,[X|Xs],[X|Xs1]):-
	     N1 is N-1,
	     del_after_nth(N1,Xs,Xs1).
del_after_nth(0,_,[]).

/*
del_last_nth(N,[X|Xs],[X|Xs1]):-
	del_last_nth(N,Xs,Xs1).
del_last_nth(N,[_|Xs],Xs1):-
	N1 is N-1,
	del_last_nth(N1,Xs,Xs1).
del_last_nth(0,_,[]).
*/

