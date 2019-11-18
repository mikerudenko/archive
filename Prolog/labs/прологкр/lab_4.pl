%?Number?Reusult_factorial
factorial( 0, 1 ).

factorial(N,S):-
	N>0,
	N1 is N-1,
	factorial(N1,S1),
	S is S1*N.
%?Number?Result_function
func(X,F):-
	X>55,
	F is X;
	X<55,
	factorial(X,Y),
	F is X + Y.
