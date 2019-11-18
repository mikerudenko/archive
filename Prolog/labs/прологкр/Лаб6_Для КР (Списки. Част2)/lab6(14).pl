%+List,-Result_List
remove_second_part(L,L1):-
 append(A,End,L),
 append(B,C,End),
 length(A,Len),
 length(B,Len),
 length(C,Len),
 append(A,C,L1).

