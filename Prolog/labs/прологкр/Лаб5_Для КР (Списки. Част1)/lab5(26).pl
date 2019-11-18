%+List,?Number,-New List
get_first_elements(_,0,[]).
get_first_elements([X|Xt],N,[X|Yt]):-
	N>0,
	N1 is N-1,
	get_first_elements(Xt,N1,Yt).

%+List,?Number,-NewList
remove_last([],_,[]).
remove_last(S,N,L) :-
	length(S,D),
	N1 is D-N,
	get_first_elements(S,N1,L).
