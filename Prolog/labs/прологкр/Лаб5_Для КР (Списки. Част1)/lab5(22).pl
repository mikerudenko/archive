%?List1,+Accumulator,-ResultList
lab_list([H1,H2,H3|T],Acc,R):-
%	append([H2,H3],T,HT),
        bigger(H1,H2,H3,Acc,Acc1),
	lab_list([H2,H3|T],Acc1,R).
lab_list(L1,Acc,Acc):-
	length(L1,N),
	N<3.

%?Num1,?Num2,?Num3,+List1,-List2
bigger(A,B,C,R,R1):-
	B>A,
	B>C,
	append(R,[B],R1).
bigger(_,B,C,R,R):-
	B<C.
bigger(A,B,_,R,R):-
	B<A.
