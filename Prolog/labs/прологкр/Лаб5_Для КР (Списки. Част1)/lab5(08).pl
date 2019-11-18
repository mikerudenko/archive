%+List, -Result
func(L,R):-
	length(L,N),
	1 =:= mod(N,2),
	I is N//2+1,
	next_func(L,I,N,R).

%+List, +Counter, +Length, -Result
next_func([_|T],I,N,R):-
	I>1,I1 is I-1,
	next_func(T,I1,N,R).
next_func([H|_],1,_,H).
