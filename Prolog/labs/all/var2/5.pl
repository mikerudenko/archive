%+InputList, -CreatedList
pred(X, [A, B | Xs1]):-
	pred1(X, Xs1, Y),
	[A, B] = Y.

%+InputList, - CreatedList, -LastTwoElemsOfInputList
pred1([A, B], [], [A, B]).
pred1([X | Xs], [X | Xs1], Y):-
	pred1(Xs, Xs1, Y).

%copy([X | Xs], [X | Xs1]):-
%	copy(Xs, Xs1).
%copy([], []).

