%+List, +Counter, +Length of list, -First part of list, -Second part of list
lst([X|Xs],I,Len,[X|L1],L2):-
	I<Len//2,
	I1 is I+1,
	lst(Xs,I1,Len,L1,L2).
lst([X|Xs],I,Len,L1,[X|L2]):-
	I>=Len//2,
	I1 is I+1,
	lst(Xs,I1,Len,L1,L2).
lst([],_,_,[],[]).

%+List, -Result list
exchange(L,Lres):-
	length(L,N),
	lst(L,0,N,L1,L2),
	append(L2,L1,Lres).
