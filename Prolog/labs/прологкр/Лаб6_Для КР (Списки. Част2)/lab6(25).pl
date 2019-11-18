% +List, -List1
func(L,L1):-
	length(L,N),
	K2 is N//3+1,
	K3 is 2*N//3+1,
	parts(L,1,K2,K3,Part1,Part2,Part3),
	reverse(Part2,Part2rev),
	append(Part2rev,Part1,L2),
	append(L2,Part3,L1).

% +List, +Counter, +K2, +K3, -Part1, -Part2, -Part3
parts([X|Xs],I,K2,K3,[X|P1],P2,P3):-
	I<K2,
	I1 is I+1,
	parts(Xs,I1,K2,K3,P1,P2,P3).
parts([X|Xs],I,K2,K3,P1,[X|P2],P3):-
	I>=K2,
	I<K3,
	I1 is I+1,
	parts(Xs,I1,K2,K3,P1,P2,P3).
parts(P3,K3,_,K3,[],[],P3).
