%p +Xs, +A, -Z, -Xs1
change([Xs | Xst], A, Z, [Xs | Xs1t]):-
	change(Xst, A, Z, Xs1t).
change([A], Z, A, [Z]).

% swap( ?List, -NewList)
swap([A], A).
swap([A,B],[B,A]).
swap([A | Xs], [Z | Xs1]):-
	change(Xs, A, Z, Xs1).
