% +spisok
list([1.9, 6.7, -0.8, 0.5, -5, -0.9, 0.1]).

% +list, -new list
pro([X|Xs],[X1|R]):-
	X >= -1,
	X < 0, !,
	X1 is -X,
	pro(Xs,R).
pro([X|Xs],[X|R]):-
	pro(Xs,R).
pro([],[]).

