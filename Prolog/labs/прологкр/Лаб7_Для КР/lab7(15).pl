%Matrix
data_matr([[1,2,3,4],
	  [5,6,7,8],
	  [9,10,11,12],
	  [13,14,15,16]]).

%NewMatrix
change(NewMatr):-
	data_matr([[A,B|R1],[C,D|R2]|Rs]),
	changeDown([[D,B|R1],[C,A|R2]|Rs],NewMatr).

%-Matr,+Counter,+Boundary,-NewMatr
changeDown([R|Rs1],[R|Rs2]):-
	changeDown(Rs1,Rs2).
changeDown([R1,R2],[R11,R12]):-
	last_rows([R1,R2],[R11,R12]).

%+Matr,-NewMatr
last_rows([[A,B],[C,D]],[[D,B],[C,A]]).
last_rows([[H1|T1],[H2|T2]],[[H1|T3],[H2|T4]]):-
	last_rows([T1,T2],[T3,T4]).

