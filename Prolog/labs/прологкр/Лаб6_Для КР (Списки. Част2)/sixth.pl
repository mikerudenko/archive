%+List,-Result
doo(Initial,Result):-
	length(Initial,N),
	PartLen is N/4,
	split(Initial,PartLen,L1,L2),
	reverse(L1,[],Result1),
	write('Reverse of the first quarter: '),
	write(Result1),nl,
	CutPoint is N/4*3 - PartLen,
	split(L2,CutPoint,Result2,Waste),
	write('Last quarter: '),
	write(Waste),nl,
	append(Result1,Result2,Result),	%RESULT: Result1(rev) + Result2(without last 1/4) 
	write('Result'),write(Result),nl
		
	.

%?List,+NumberOfElems,?list1,?list2
split(L,0,[],L).
split([X|Xs],N,[X|Ys],Zs):-
	N > 0,
	N1 is N - 1,
	split(Xs,N1,Ys,Zs)
	.

%+List,+Accum,-Reverse
reverse([X|Xs],Accum,RevList):-
	reverse(Xs,[X|Accum],RevList).
reverse([],Accum,Accum)
	.
