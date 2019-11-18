% +Matr, -NewMatr
main([R|Rs],[R1|Rs1]):-
	last(R,Last),
	move_matrix(Rs,Last,Z,Rs1),
	last_line(R,Last,Z,R1).

% +List, -Last
last([_|Xs],Last):-
	last(Xs,Last).
last([R],R).

% +Matr, +Z, +Last, -NewMatr
move_matrix([R|Rs],Z,Last,[R|Rs1]):-
        move_matrix(Rs,Z,Last,Rs1).
move_matrix([R],Last,Z,[R1]):-
        last_line(R,Z,Last,R1).


% +Row, +Z, +Last, -Row1
last_line([X|Xs],Z,Last,[X|Xs1]):-
	last_line(Xs,Z,Last,Xs1).
last_line([Z],Z,Last,[Last]).


