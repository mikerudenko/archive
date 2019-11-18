% List, -NewList
del([],[]).
del([H|B],A):-
  float(H),
  del(B,A).
del([H|B],[H|AA]):-
  integer(H),
  del(B,AA).
