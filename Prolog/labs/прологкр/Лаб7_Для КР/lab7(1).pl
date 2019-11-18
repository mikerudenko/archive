%+Matrix, -NewMatrix
main([[A|R1]|Rs], [[Z|R1]|Rs1]):-
	change_matr(Rs,A,Z,Rs1).

%+Matrix, +First,-Last,+New Matrix
change_matr([R|Rs],A,Z,[R|Rs1]):-
	change_matr(Rs,A,Z,[R|Rs1]).
change_matr([R],A,Z,[R1]):-
	change_row(R,A,Z,R1).

%+List, +First,-Last,+New List
change_row([R|Rs],A,Z,[R|Rs1]):-
	change_row(Rs,A,Z,Rs1).
change_row([Z],A,Z,[A]).
