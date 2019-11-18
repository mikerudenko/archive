%+List -NewList
main(L1,L2):-
	length(L1,N),
	K2 is N//3+1,
	K3 is N//3*2+1,
	copy_reverse_copy(L1,1,K2,K3,[],L2).

%+List +Counter +NumberOfFirstItemOfPart2 +NumberOfFirstItemOfPart3
% +Accumulator +TotalLength -NewList
copy_reverse_copy([X|Xs],I,K2,K3,Acc,[X|L]):-
	I<K2,
	I1 is I+1,
	copy_reverse_copy(Xs,I1,K2,K3,Acc,L).
copy_reverse_copy([X|Xs],I,K2,K3,Acc,L):-
	I>=K2,
	I < K3,
	I1 is I+1,
	copy_reverse_copy(Xs,I1,K2,K3,[X|Acc],L).
copy_reverse_copy(Xs,K3,_,K3,Acc,L):-
	append(Acc,Xs,L).
