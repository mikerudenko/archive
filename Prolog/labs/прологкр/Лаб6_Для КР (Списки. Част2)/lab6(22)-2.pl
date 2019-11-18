%?List,-Result
modify(L,R):-
	length(L,N),
	PL is N/4,
	slice(0,PL,L,P1,T),
	slice(0,PL,T,_,T1),
	slice(0,PL,T1,P3,T2),
	slice(0,PL,T2,P4,_),
	append(P1,P3,Acc),
	reverse(P4,RP4),
	append(Acc,RP4,R).


%+Acc,+PartLength,+List,-Head,-Tail
slice(I,PL,[H|T],[H|T1],R):-
	I<PL,
	I1 is I+1,
	slice(I1,PL,T,T1,R).
slice(I,PL,[H|T],L,[H|T2]):-
	I>=PL,
	I1 is I+1,
	slice(I1,PL,T,L,T2).
slice(_,_,[],[],[]).
