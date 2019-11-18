%+¹, +List, ?Result
program(Number,[X|Xs],Rivlist):-
	it_list([X|Xs],List),
	change(Number,[X|Xs],List,Rivlist).

%+List,  LastTerm
it_list([X|_],X).

%+¹, +List, LastTerm, ?Result
change(Number,[X|Xs],List,[X|Xs1]):-
	Number>1,
	N is Number - 1,
	change(N,Xs,List,Xs1).
change(1,[_|Xs1],List,[List|Xs1]).

