% +Input, -Output
foo(Input, Output):-
	length(Input, Len),
	S is Len/3,
	split(Input, List_t1, S, List1, []),
	split(List_t1, List3, S, List2, []),
	append(List3, List2, Temp),
	append(Temp, List1, Output).

% ?List, ?List1, ?N, ?List2, ?Buffer
split(List, List, 0, Buffer, Buffer).
split([X|List], List1, N, [X|Buffer], List2):-
	N > 0,
	N1 is N - 1,
	split(List, List1, N1, Buffer, List2).