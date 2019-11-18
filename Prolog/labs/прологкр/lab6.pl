%+List ¹1,+List ¹2+List ¹3,-NewList
main(L1,L2,L3,RezList):-
	length(L1,N1),
	length(L2,N2),
	length(L3,N3),
	K21 is N1//3+1,
	K31 is N1//3*2+1,

	K22 is N2//3+1,
	K32 is N2//3*2+1,

	K23 is N3//3+1,
	K33 is N3//3*2+1,

	parts(L1,1,K21,K31,_,_,Part3),
	parts(L2,1,K22,K32,_,Part2,_),
	parts(L3,1,K23,K33,Part1,_,_),
	append(Part3,Part2,Rez),
	append(Rez,Part1,RezList).


% +List,+Counter,+First item of second part,+First item of third
% part,-Part1, -Part2, -Part3
parts([X|Xs],I,K2,K3,[X|Part1],Part2,Part3):-
	I<K2,
	I1 is I+1,
	parts(Xs,I1,K2,K3,Part1,Part2,Part3).

parts([X|Xs],I,K2,K3,Part1,[X|Part2],Part3):-
	I>=K2,
	I<K3,
	I1 is I+1,
	parts(Xs,I1,K2,K3,Part1,Part2,Part3).
parts(Part3,N,_,N,[],[],Part3).
















