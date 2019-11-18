main(L, List):-
	func(L, List).
func([X|Xs], [El|L]):-
	X > 100,
	El is X - 100,
	!,
	func(Xs, L).
func([X|Xs], [X|L]):-
	func(Xs,L).
func([],[]).

