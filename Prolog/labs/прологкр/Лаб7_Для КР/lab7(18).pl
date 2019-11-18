%-Matrix
matrix([[1,1,1,1,1,1],
		[1,1,1,1,1,1],
		[1,1,1,1,1,1],
		[1,1,1,1,1,1],
		[1,1,1,1,1,1],
		[0,0,0,0,0,0]
	]).

%+Initial,+N,-Result
do(N,Result):-
	matrix(Normal),
	out(Normal),
	transposition(Normal,Transposed),
	change(Transposed,N,Changed),
	transposition(Changed,Result),
	out(Result).

getColumn(I,[Row|T],[E|TR]):-
	nth0(I,Row,E),
	getColumn(I,T,TR).
getColumn(_I, [], []).

transposition(Matrix,R):-
	transposition(0,Matrix,R).
transposition(I,Matrix,[Column|TR]):-
	I1 is I+1,
	getColumn(I,Matrix,Column),
	transposition(I1,Matrix,TR).
transposition(_,_,[]).

%+Matrix,+NumberOfColumn,-Result
change([X|Xs],I,[X|Xs1]):-
	I>1,
	I1 is I-1,
	change(Xs,I1,Xs1).
change([Xn|Xs],1,Result):-
	change1([Xn|Xs],Result).
%+Matrix,-NewMatrix
change1([[A|R]|Rs],[[Z|R1]|Rs]):-
	changeRow(R,A,Z,R1).
changeRow([X|Xs],A,Z,[X|Xs1]):-
	changeRow(Xs,A,Z,Xs1).
changeRow([Z],A,Z,[A]).

%+Matrix	--Print matrix
out(X):-
	outMatrix(X),
	nl.

outMatrix([]):-!.
outMatrix([H|T]):- 
	write(H), 
	nl,
	outMatrix(T).
