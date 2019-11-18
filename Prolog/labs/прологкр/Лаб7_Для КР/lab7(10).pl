% +Matr, -NewMatr
main([R|Rs],[R2|Rs1]):-
 %   last(R,A),
    first_row(R,Z,A,R2),
    last_row(Rs,A,Z,Rs1).


% +List, -Last_element
last([_|Xs],Z):-
    last(Xs,Z).
last([R],R).

% +Row, +Z, +A, -Changed_row
first_row([X|Xs],Z,A,[X|Xs1]):-
    first_row(Xs,Z,A,Xs1).
first_row([A],Z,A,[Z]).


% +Matr, +Z, +A, -NewMatr
last_row([R|Rs],Z,A,[R|Rs1]):-
    last_row(Rs,Z,A,Rs1).
last_row([[Z|R]],A,Z,[[A|R]]).
