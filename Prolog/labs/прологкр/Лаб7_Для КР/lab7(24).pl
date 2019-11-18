%-Matrix
data_matrix([[1,2,3,4,5],
	     [1,2,3,4,5],
	     [1,2,3,4,5],
	     [1,2,3,4,5],
	     [1,2,3,4,5]]).

%?Matr, -Sum
main(Matr,Sum):-
	data_matrix(Matr),
	count_diagonal(Matr,1,0,Sum).

%+Matr, +Counter, +Accumulator, -Sum
count_diagonal([R|Rs],I,Acc,Sum):-
	diagonal_element(R,I,1,0,S),
	I1 is I+1,
	Acc1 is Acc+S,
        count_diagonal(Rs,I1,Acc1,Sum).
count_diagonal([],_,S,S).

%+Row, +Diagonal counter, +Counter, +Accumulator, -Diagonal element
diagonal_element([X|Xs],I,C,Acc,S):-
	C =:= I,
        C1 is C+1,
	Acc1 is Acc+X,
	diagonal_element(Xs,I,C1,Acc1,S).
diagonal_element([_|Xs],I,C,Acc,S):-

	C1 is C+1,
	diagonal_element(Xs,I,C1,Acc,S).
diagonal_element([],_,_,X,X).












