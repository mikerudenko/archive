%+List1,+List2, Rez
procedure([X|Xs],L2,R):-
	member(X,L2),
	procedure(Xs,L2,R).
procedure([X|Xs],L2,[X|R]):-
	not(member(X,L2)),
	procedure(Xs,L2,R).
procedure([],_,[]).

