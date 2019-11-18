%+Member, +List, FirstTerm, -Results
elem(N,[H|T],Head,[H|T1]):-
	N1 is N-1,
	elem(N1,T,Head,T1).
elem(1,[_|T1],Head,[Head|T1]).

%+Member, +List, -Results
replace(Number,[H|T],Res):-
	elem(Number,[H|T],H,Res).








































































