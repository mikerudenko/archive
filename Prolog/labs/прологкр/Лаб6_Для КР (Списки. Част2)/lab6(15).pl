%+List, -NewList
p(L,L1):-
 append(A,B,L),
 length(A,Len),
 length(B,Len),
 reverse(B,B1),
 append(B1,A,L1).
