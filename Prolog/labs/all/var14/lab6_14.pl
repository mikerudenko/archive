%+List,-NewList
main(L1,L2):-
     length(L1,N),
     K2 is N//3+1,
     K3 is N//3*2+1,
     parts(L1,1,K2,K3,Part1,_,Part3),
     append(Part1,Part3,L2).

%+List,+Counter,+#first item of part2,+#first item of part3
%-Part1,-Part2,-Part3
parts([X|Xs],I,K2,K3,[X|Part1],Part2,Part3):-
	I<K2,
        I1 is I+1,
        parts(Xs,I1,K2,K3,Part1,Part2,Part3).
parts([X|Xs],I,K2,K3,Part1,[X|Part2],Part3):-
	I>=K2,
	I<K3,
        I1 is I+1,
        parts(Xs,I1,K2,K3,Part1,Part2,Part3).
parts(Part3,K3,_,K3,[],[],Part3).
