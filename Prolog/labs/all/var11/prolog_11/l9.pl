%+List,-List1,-List2
main(L,A,B):-
  del_integer(L,A),
  del_float(L,B).
  

%+List,-List1
del_integer([X|Xs],Xs1):-
        integer(X),!,
	del_integer(Xs,Xs1).
del_integer([X|Xs],[X|Xs1]):-
	del_integer(Xs,Xs1).
del_integer([],[]).
%+List,-List1
del_float([X|Xs],Xs1):-
        float(X),!,
	del_float(Xs,Xs1).
del_float([X|Xs],[X|Xs1]):-
	del_float(Xs,Xs1).
del_float([],[]).

a(A,B):-
  main([1,2,3,4.5,3.7,3],A,B).
