% +Input, -Output
foo(Input, Output):-
	two_last_in_list(Input, Output1, [], Output2),
	append(Output2, Output1, Output).

% +List, -Ansver1, ?Buffer, -Ansver2
two_last_in_list([X, Y], Buffer, Buffer, [X, Y]).
two_last_in_list([X| Xs], [X| Buffer], Ansver1, Ansver2):-
	two_last_in_list(Xs, Buffer, Ansver1, Ansver2).