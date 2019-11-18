% +Increment, +LengthofPart, +List, -List1, -List2, -List3
sliñe(Inc,Length,[H|T],[H|T1],L2,L3):-
	Inc=<Length,
	Inc1 is Inc+1,
	sliñe(Inc1,Length,T,T1,L2,L3).
sliñe(Inc,Length,[H|T],L1,[H|T2],L3):-
	Inc>Length,
	Inc=<Length*2,
	Inc1 is Inc+1,
	sliñe(Inc1,Length,T,L1,T2,L3).
sliñe(Inc,Length,[H|T],L1,L2,[H|T3]):-
	Inc>Length*2,
	Inc=<Length*3,
	Inc1 is Inc+1,
	sliñe(Inc1,Length,T,L1,L2,T3).
sliñe(_,_,[],[],[],[]).

% +List1, +List2, +List3, -Result
conc(List1,List2,List3,Res):-
	length(List1,Len),
	Len3 is Len/3,
	sliñe(1,Len3,List1,_,_,L13),
        sliñe(1,Len3,List2,_,L22,_),
        sliñe(1,Len3,List3,L31,_,_),
	append(L13,L22,LHead),
	append(LHead,L31,Res).

