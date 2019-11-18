%+Increment,+Length_of_first_List,+Full_Length,+List,-List1,-List2.
split(Inc,Length1,Alllength,[H|T],[H|T1],L3):-
	Inc < Length1,
	Inc1 is Inc+1,
	split(Inc1,Length1,Alllength,T,T1,L3).
split(Inc,Length1,Alllength,[H|T],L2,[H|T2]):-
      Inc >= Length1,
      Inc < Alllength,
      Inc1 is Inc+1,
      split(Inc1,Length1,Alllength,T,L2,T2).
split(_,_,_,[],[],[]).

%+List1,-Result
reverse_mid_el([X,Y,Z],[Z,Y,X]).
reverse_mid_el(List,Res):-
	length(List,L),
	N is (L//2-1),
	split(0,N,L,List,Lbegin,L3),
	Newlength is L-N,
	split(0,3,Newlength,L3,Lrmiddle,Lend),
	reverse(Lrmiddle,Lmiddle),
	append(Lbegin,Lmiddle,Lpart1),
	append(Lpart1,Lend,Res).


