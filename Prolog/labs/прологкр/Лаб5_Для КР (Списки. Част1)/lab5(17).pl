% +InitialList, -Result
do(List):-
	length(List, N),            %get length of list
	MidPos is N/2,
	find(Mid,List,MidPos),

	%add(List,Mid,Fin),
	write(Mid).

% ?Result, +List, -Position
find(X,[X|_],1).
find(X,[_|L],K):-
	K > 1,
	K1 is K - 1,
	find(X,L,K1).

% +List, +Accumulator, -Result
add([H|T],X,[H|Res]):-
     add(T,X,Res).
add([],X,[X]).
