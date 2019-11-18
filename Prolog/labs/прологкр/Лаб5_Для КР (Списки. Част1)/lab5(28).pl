%+Initial_List,  LastTerm
my_last([Last],Last).
my_last([_|T],Last) :-
    my_last(T,Last).

%+Member, +Initial_List, LastTerm, ?Results
change(Number,[H|T],Last,[H|T1]):-
	N is Number - 1,
	change(N,T,Last,T1).
change(1,[_|T1],Last,[Last|T1]).

%+Member, +Initial_List, ?Results
main(Number,[H|T],Res):-
	my_last([H|T],Last),
	change(Number,[H|T],Last,Res).
