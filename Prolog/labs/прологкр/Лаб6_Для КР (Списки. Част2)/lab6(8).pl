% +List1, +List2, +List3, -Result
func(List1,List2,List3,Res):-
	length(List1,N1),
	length(List2,N2),
	length(List3,N3),
	0 is mod(N1,3),
	0 is mod(N2,3),
	0 is mod(N3,3),
	N4 is N1/3,
	N5 is N2/3,
	N6 is N3/3,
	sliñe(1,N4,List1,L11,_,_),
        sliñe(1,N5,List2,_,L22,_),
        sliñe(1,N6,List3,_,_,L33),
	append(L11,L22,LHead),
	append(LHead,L33,Res).

% +Increment, +Length, +List, -List1, -List2, -List3
sliñe(I,N,[H|T],[H|T1],L2,L3):-
	I=<N,
	I1 is I+1,
	sliñe(I1,N,T,T1,L2,L3).
sliñe(I,N,[H|T],L1,[H|T2],L3):-
	I>N,
	I=<N*2,
	I1 is I+1,
	sliñe(I1,N,T,L1,T2,L3).
sliñe(I,N,[H|T],L1,L2,[H|T3]):-
	I>N*2,
	I=<N*3,
	I1 is I+1,
	sliñe(I1,N,T,L1,L2,T3).
sliñe(_,_,[],[],[],[]).
