% +List, -List1
func(L,L1,LD):-
	length(L,N),
	length(L1,N1),
	K2 is N//2+1,
	K3 is N1//2+1,
	parts(L,1,K2,_,Part2),
	parts(L1,1,K3,Part3,_),
	append(Part2,Part3,LD).

% +List, +Counter, +K2, +K3, -Part1, -Part2, -Part3
parts([X|Xs],I,K2,[X|P1],P2):-
	I<K2,
	I1 is I+1,
	parts(Xs,I1,K2,P1,P2).
parts(P2,K2,K2,[],P2).
