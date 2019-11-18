%-Matrix
data_matrix([[1,1,1,1,1],
	     [1,1,1,1,0],
	     [1,1,1,0,0],
	     [1,1,0,1,0],
	     [1,0,0,0,1]]).

%?Matr, -Sum
main(Matr,Sum):-
	data_matrix(Matr),
	length(Matr,N),
	matrix(Matr,N,0,Sum).

%+Matr, +Counter, +Accumulator, -Sum
matrix([R|Rs],I,Acc,Sum):-
	element(R,I,1,0,S),
	I1 is I-1,
	Acc1 is Acc+S,
	matrix(Rs,I1,Acc1,Sum).
matrix([],_,S,S).

%+Row, +Counter1, +Counter, +Accumulator, -Sum
element([X|Xs],I,C,Acc,S):-
	C < I,
        C1 is C+1,
	Acc1 is Acc+X,
	element(Xs,I,C1,Acc1,S).

element([_|Xs],I,C,Acc,S):-
	I1 is I+1,
	C1 is C+1,
	element(Xs,I1,C1,Acc,S).

element([],_,_,X,X).




