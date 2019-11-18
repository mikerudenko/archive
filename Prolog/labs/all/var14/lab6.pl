%+List,?NewList=2/3
cut_list(L1,L2):-
	length(L1,N),
	N1 is N // 3 + 1,
	N2 is (N * 2) // 3 + 1,
	parsing(L1,1,N1,N2,L2).

%+List,+Counter,+N1=1/3 of length list,+N2=2/3 of length list,-NewList
parsing([X|Xs],I,N1,N2,[X|Xs1]):-
	I<N1,
	I1 is I + 1,
	parsing(Xs,I1,N1,N2,Xs1).
parsing([_|Xs],I,N1,N2,Xs1):-
	I<N2,
	I1 is I + 1,
	parsing(Xs,I1,N1,N2,Xs1).
parsing(X,N2,_,N2,X).

