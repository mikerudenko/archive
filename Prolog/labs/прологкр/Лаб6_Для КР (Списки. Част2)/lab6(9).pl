%+Increment,+Length_of_first_List,+Full_Length,+List,-List1,-List2.
reverse_mid([X,Y,Z],[Z,Y,X]).
reverse_mid(List,Res):-
	length(List,L),
	N is L/3,
	split(1,N,List,L1,L2,L3),
	reverse(L2,Lmiddle),
	append(L1,Lmiddle,Lpart1),
	append(Lpart1,L3,Res).

%+Increment,+Length_of_part,+List,-List1,-List2,-List3
split(Inc,Length,[H|T],[H|T1],L2,L3):-
	Inc=<Length,
	Inc1 is Inc+1,
	split(Inc1,Length,T,T1,L2,L3).
split(Inc,Length,[H|T],L1,[H|T2],L3):-
	Inc>Length,
	Inc=<Length*2,
	Inc1 is Inc+1,
	split(Inc1,Length,T,L1,T2,L3).
split(Inc,Length,[H|T],L1,L2,[H|T3]):-
	Inc>Length*2,
	Inc=<Length*3,
	Inc1 is Inc+1,
	split(Inc1,Length,T,L1,L2,T3).
split(_,_,[],[],[],[]).

