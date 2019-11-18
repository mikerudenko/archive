change(M,Ans):-
	length(M,N),
	N mod 2=:=0,!,
	I is N//2,
	r(I,M,[],RUp,Down),
	z(I,N,RUp,Down,RUp1,Down1),
	r(I,Ans,[],RUp1,Down1).

change(M,Ans):-
	length(M,N),
	I is N//2,
	J is N-I,
	r(I,M,[],RUp,[Middle|Down]),
	z(J,N,RUp,Down,RUp1,Down1),
	r(I,Ans,[],RUp1,[Middle|Down1]).


r(0,Down,RUp,RUp,Down):-!.
r(I,[H|Tail],RUpTail,RUp,Down):-
	I1 is I-1,
	r(I1,Tail,[H|RUpTail],RUp,Down).

z(_,_,[],[],[],[]).
z(J,N,[A|RUp],[B|Down],[A1|RUp1],[B1|Down1]):-
	J1 is J+1,
	z(J1,N,RUp,Down,RUp1,Down1),
	exchange(J,A,B,A1,B1).

exchange(0,[HA|TailA],[HB|TailB],[HB|TailA],[HA|TailB]):-!.
exchange(J,[HA|TailA],[HB|TailB],[HA|TailA1],[HB|TailB1]):-
	J1 is J-1,
	exchange(J1,TailA,TailB,TailA1,TailB1).
