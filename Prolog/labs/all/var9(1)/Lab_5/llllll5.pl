%+list, -length
length(L,N):-
	length_right(L,0,N).

%+list, -counter, - lenght
length_right([_|Xs],I,N):-
	I1 is I+1,
	length_right(Xs,I1,N).
length_right([],N,N).

length_right(Xs,N-2,N):-
	ch_plast([X|Xs],[Xs|X]).

