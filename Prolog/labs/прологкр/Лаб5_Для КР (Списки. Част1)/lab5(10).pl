%+List, -Result_List
delete_three_on_sides([_,_,_|A],B):-
	delete(A,B).

%+List, -Result_List
delete([X|T],[X|B]):-
	delete(T,B).
delete([_,_,_],[]).
