%+List -NewList, -Last
change([X1,X2,_|Xs],[X1,X2,Last|Xs1],Last):-
	change(Xs,Xs1,Last).
change([X1,X2,Last],[X1,X2,Last],Last).
change([X1,Last],[X1,Last],Last).
change([Last],[Last],Last).


