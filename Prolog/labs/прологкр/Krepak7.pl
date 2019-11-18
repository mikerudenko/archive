% +Matrix, -NewMatrix
matrix_swap([F|Fs], Ts2) :-
    transpose(F, [F|Fs], Ts),
    swap(Ts,Ts1),
    transpose(Ts1,Ts2).

% +First_list_Matrix, +Matrix, -NewMatrix
transpose([_|Rs], Ms, [Ts|Tss]) :-
        lists_firsts(Ms, Ts, Ms1),
        transpose(Rs, Ms1, Tss).
transpose([], _, []).

% +Matrix, +First_List_NewMatrix, -Matrix
lists_firsts([[F|Os]|Rest], [F|Fs], [Os|Oss]) :-
        lists_firsts(Rest, Fs, Oss).
lists_firsts([], [], []).

% +NewMatrix, -NewMatrix2
transpose([F|Fs], Ts1) :-
    transpose(F, [F|Fs], Ts1).

% +NewMatrix2, -NewMatrix3
swap([[A|R]|Rs],[[Z|R1]|Rs]):-
	change_row(R,A,Z,R1).

% +Tail_NewMatrix2, +Head_NewMatrix2, -Head_NewMatrix3, -Tail_newMatrix3
change_row([X|Xs],A,Z,[X|Xs1]):-
	change_row(Xs,A,Z,Xs1).
change_row([Z],A,Z,[A]).
