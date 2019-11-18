dupl(L1,L2,Result):-
	p(L1,L2,Result).

p([X|L1],L2,[X|Result]):-
	member(X,L1),
	member(X,L2),
	duplication(X,L2,I),
        I>1,!,
	p5(X,L1,L11),
	p5(X,L2,L12),
	p(L11,L12,Result).
p([_|L1],L2,Result):-
       p(L1,L2,Result).

p([],_,[]).

duplication(X,L2,I):-
	count_member(L2,X,0,I).
%+List, -NewList
p5(X,[H|T],[H|T1]):-
	X\=H,
	p5(X,T,T1).
p5(X,[X|Xs],Xs1):-
	p5(X,Xs,Xs1).
p5(_,[],[]).

%+List,+Element,+Accumulator,- Counts
count_member([],_,M,M):-!.
count_member([H|T],H,K,M):-
%	H==N,
	K1 is K+1,
	count_member(T,H,K1,M).
count_member([_|T],N,K,M):-
	count_member(T,N,K,M).

%member(Elem, [_|Tail]):-
%  member(Elem, Tail).












