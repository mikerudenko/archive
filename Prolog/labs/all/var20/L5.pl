% +List, -NewList
list([X|Xs],[X|Xs1]):-
	del(Xs,Xsn,X),
	list(Xsn,Xs1).
list([],[]).

% +list,-Newlist,+Element
del([X|Xt],Xt1,X):-
	del(Xt,Xt1,X).
del([Y|Xt],[Y|Xt1],X):-
	Y\=X,
	del(Xt,Xt1,X).
del([],[],_).
