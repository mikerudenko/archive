%+List, -New List
edit_list(L, L1):-
	length(L, Len),
	K2 is Len/4+1,
	K3 is Len/2+1,
	K4 is Len/4*3+1,
	parts(L,1,K2,K3,K4,Part1,Part2,Part4),
	reverse(Part2,Part2rev),
	append(Part1,Part2rev,HalfList),
	append(HalfList,Part4,L1).


%+List,+Count,+K2,+K3,+K4,-Part1,-Part2,-Part4
parts([X|Xs],I,K2,K3,K4,[X|P1],P2,P4):-
	I<K2,
	I1 is I+1,
	parts(Xs,I1,K2,K3,K4,P1,P2,P4).
parts([X|Xs],I,K2,K3,K4,P1,[X|P2],P4):-
	I>=K2,
	I<K3,
	I1 is I+1,
	parts(Xs,I1,K2,K3,K4,P1,P2,P4).
parts([_|Xs],I,K2,K3,K4,P1,P2,P4):-
	I>=K3,
	I<K4,
	I1 is I+1,
	parts(Xs,I1,K2,K3,K4,P1,P2,P4).
parts(P4,K4,_,_,K4,[],[],P4).


