%+List1, +List2, +List3, -NewList
create_list(L1,L2,L3,Nl):-
	length(L1,N1),
	K2 is N1/3+1,
	K3 is N1/3*2+1,
	second_third(L1,1,K2,K3,Part2),
	length(L2,N2),
	K2 is N2/3+1,
	K3 is N2/3*2+1,
        first_third(L2,1,K2,K3,Part1),
	length(L3,N3),
	K2 is N3/3+1,
	K3 is N3/3*2+1,
        third_third(L3,1,K2,K3,Part3),
        append(Part2,Part1,Nll),
	append(Nll,Part3,Nl).

%+List, +Counter, +K3, +K2, -Part1
first_third([X|Xs],I,K2,_,[X|P1]):-
	I < K2,
	I1 is I+1,
	first_third(Xs,I1,K2,_,P1).
first_third(_,_,_,_,[]).

%+List, +Counter, +K3, +K2, -Part2
second_third([X|Xs],I,K2,K3,[X|P2]):-
	I >= K2,
	I < K3,
	I1 is I+1,
	second_third(Xs,I1,K2,K3,P2).
second_third([_|Xs],I,K2,K3,P2):-
	I < K2,
	I1 is I+1,
	second_third(Xs,I1,K2,K3,P2).
second_third(_,_,_,_,[]).

%+List, +Counter, +K3, +K2, -Part3
third_third([X|Xs],I,_,K3,[X|P3]):-
	I >= K3,
	I1 is I+1,
	third_third(Xs,I1,_,K3,P3).
third_third([_|Xs],I,_,K3,P3):-
	I < K3,
	I1 is I+1,
	third_third(Xs,I1,_,K3,P3).
third_third(_,_,_,_,[]).



















