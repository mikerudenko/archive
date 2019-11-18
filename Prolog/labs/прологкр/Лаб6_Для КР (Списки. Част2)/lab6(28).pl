%+List,-Result
main(List,Result):-
	length(List,N),
	PartLen is N/4,
	split(List,PartLen,L1,L2),
	reverse(L1,[],Result1),
	PointOfCut is PartLen*3 - PartLen,
	split(L2,PointOfCut,Result2,_),
	append(Result1,Result2,Result),nl.

%?List,NumberOfElems,list1,list2
split(L,0,[],L).
split([X|Xs],N,[X|Ys],Zs):-
	N > 0,
	N1 is N - 1,
	split(Xs,N1,Ys,Zs).

%+List,Accum, List
reverse([X|Xs],Acc,RevList):-
	reverse(Xs,[X|Acc],RevList).
reverse([],Acc,Acc).

















