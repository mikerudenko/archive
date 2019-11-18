main(L,LR):-
 length(L,K),
 N1 is K//3,
 N2 is 2*K//3,
 cut_list(N1,N2,L,_,L2,L3,0),
 reverse(L3,LR3),
 append(L2,LR3,LR).
%
cut_list(N1,N2,[HL1|TL],[HL1|TL1],L2,L3,I):-
      I<N1,
      I1 is I+1,
      cut_list(N1,N2,TL,TL1,L2,L3,I1).
cut_list(N1,N2,[HL2|TL],L1,[HL2|TL2],L3,I):-
      I>=N1,
      I<N2,
      I1 is I+1,
      cut_list(N1,N2,TL,L1,TL2,L3,I1).
cut_list(N1,N2,[HL3|TL],L1,L2,[HL3|TL3],I):-
      I>=N2,
      I1 is I+1,
      cut_list(N1,N2,TL,L1,L2,TL3,I1).
cut_list(_,_,[],[],[],[],_).
