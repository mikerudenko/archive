%?List,-Result
modify(L,R):-
	length(L,N),
	slice1(L,[],0,N,Acc),
	rev(Acc,[],0,N,R).

%?List,-Temp,-Accum,+Length,-Result
slice1([H|T],S,I,N,R):-
	I1 is I+1,
	append(S,[H],S1),
	slice1(T,S1,I1,N,R).
slice1(L,S,I,N,R):-
	N1 is N/4,
	I=N1,
	slice2(L,I,N,R1),
	append(S,R1,R).

%?List,-Accum,+Length,-Result
slice2([_|T],I,N,R):-
	I1 is I+1,
	slice2(T,I1,N,R).
slice2(L,I,N,L):-
	N1 is N/2,
	I = N1.

%?List,-Temp,-Accum,+Length,-Result
rev([H|T],S,I,N,R):-
	I1 is I+1,
	append(S,[H],S1),
	rev(T,S1,I1,N,R).
rev(L,S,I,N,R):-
	N1 is N/2,
	I=N1,
	reverse(L,R1),
	append(S,R1,R).

