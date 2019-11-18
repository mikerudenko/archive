% ? X ? Result
f(X, Y):-
	X>1,
	X<2,
	degree(1,3,X,1,Deg),
	Y is Deg+15.
f(X,Y):-
	X>2,
	calc(X,1,3,0,Y).

% ? I counter ?K boundary value ?X ?Dobutok ?Degree
degree(I,K,X,Dob,Deg):-
	I=<K,
	Dob1 is Dob*X,
	I1 is I+1,
	degree(I1,K,X,Dob1,Deg).
degree(I,K,_,Deg,Deg):-
	I>K.

% ?X ?Couner ?K boundary value ?Sum of row ? Result
calc(X, I, K, Sum,F):-
       I=<K,
       degree(1,K,X,1,Deg),
       Sum1 is Sum+Deg*K,
       I1 is I+1,
       calc(X, I1, K, Sum1,F).
calc( _, I ,K, Sum,Sum):-
	I>K.
