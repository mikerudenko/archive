%+List, +Item, -New List
insert(L,I,N):-
	length(L, Len),
	Pos is Len//2+1,
	ins_into(L, I, Pos, 1, N).

%+List, +Item, +Position, +Acc, -New list
ins_into([X|Xs], I, Pos, Acc, N):-
	Acc=<Pos,
	Acc1 is Acc+1,
	ins_into(Xs, I, Pos, Acc1, N1),
	append([X],N1,N).
ins_into(Xs, I, Pos, Acc, [I|Xs]):-
	Acc>Pos.

