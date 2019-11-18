%+List
conversion(Xs1,Xs2,Xs3,Res):-
	length(Xs1,N1),
	length(Xs2,N2),
	length(Xs3,N3),
	K11 is N1//3+1,
	K12 is 2*N1//3+1,
	K21 is N2//3+1,
	K22 is 2*N2//3+1,
	K31 is N3//3+1,
	K32 is 2*N3//3+1,
	parts3(Xs1,1,K11,K12,Xs11,Xs12,Res1),
	parts3(Xs2,1,K21,K22,Xs21,Res2,Xs13),
	parts3(Xs3,1,K31,K32,Res3,Xs32,Xs33),
	conc(Res1,Res2,Res5),
	conc(Res5,Res3,Res).

%+List, +counter, +K11, +K12, -Xs11,-Xs12,-Xs13
parts3([X|Xs],I,K11,K12,[X|P1],P2,P3):-
	I<K11,
	I1 is I+1,
	parts3(Xs,I1,K11,K12,P1,P2,P3).
parts3([X|Xs],I,K11,K12,P1,[X|P2],P3):-
	I>=K11,
	I<K12,
	I1 is I+1,
	parts3(Xs,I1,K11,K12,P1,P2,P3).
parts3(P3,K12,_,K12,[],[],P3).

%+List1,+List2,-List3
conc([X|Xs1],Xs2,[X|Xs3]):-
	conc(Xs1,Xs2,Xs3).
conc([],List,List).
