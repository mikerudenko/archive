% +List, -NewList
main(L,L1):-
	length(L,N),
	K2 is N//3+1,
	K3 is N//3*2+1,
	parts(L,1,K2,K3,Part2,Part3),
	reverse(Part3,[],Part1rew),
	append(Part2,Part1rew,L1).

% +List, +Counter, +K2, +K3, -Part2, -Part3
parts([X|Xs],I,K2,K3,[X|P1],P3):-
	I>=K2,
	I<K3,
	I1 is I+1,
	parts(Xs,I1,K2,K3,P1,P3).
parts([X|Xs],I,K2,K3,[X|P1],P3):-
	I>=K3,
	I1 is I+1,
	parts(Xs,I1,K2,K3,P1,P3).
parts([_|Xs],I,K2,K3,P1,P3):-
	I<K2,
	I1 is I+1,
	parts(Xs,I1,K2,K3,P1,P3).
parts(P3,K3,_,K3,[],P3).


reverse([X|Xs],Acc,RevList):-
	reverse(Xs,[X|Acc],RevList).
reverse([],Acc,Acc).
