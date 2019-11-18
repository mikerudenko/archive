main(L,LR):-
 length(L,K),
 N1 is K//3,
 N2 is 2*K//3,
 cut_list(N1,N2,L,L1,0),
 reverse(L1,LR).

% +N1, +N2, +List, -Result_list, +Index
cut_list(N1,N2,[_|L],L1,I):-
      I<N1,
      I1 is I+1,
      cut_list(N1,N2,L,L1,I1).
cut_list(N1,N2,[H|L],[H|L1],I):-
      I>=N1,
      I<N2,
      I1 is I+1,
      cut_list(N1,N2,L,L1,I1).
cut_list(_,N2,_,[],I):-
      I>=N2.
