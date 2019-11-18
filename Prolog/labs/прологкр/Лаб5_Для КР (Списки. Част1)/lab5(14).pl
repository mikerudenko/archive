remove([_|T],X,A):-
        A mod 3 =:=0,
	A1 is A+1,
	remove(T,X,A1).

remove([H|T],[H|X],A):-
	A1 is A+1,
	remove(T,X,A1).

remove([],[],_).


