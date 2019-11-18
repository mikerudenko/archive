%+List, -NewList
p5([X|Xs],[X|Xs1]):-
	del_item(Xs,X,Xsclear),
	p5(Xsclear,Xs1).
p5([],[]).

%+List,+Example,-ListWithoutExample
del_item([X|Xs],X,Xs1):-
	del_item(Xs,X,Xs1).
del_item([X|Xs],Example,[X|Xs1]):-
	X\=Example,
	del_item(Xs,Example,Xs1).
del_item([],_,[]).
