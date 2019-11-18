%  + #Searched element, + List, - List without searched element
remove(X, [X | Xs], Xs1) :-
	remove(X, Xs, Xs1).
remove(Element, [X | Xs], [X | Xs1]) :-
	X \= Element,
	remove(Element, Xs, Xs1).
remove(_, [], []).