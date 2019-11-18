db_point:-
	assert(point(a,0,0)),
	assert(point(b,1,0)),
	assert(point(c,0,1)),
	assert(point(d,1,1)),
	assert(point(e,3,0)),
	assert(tringle(a,a,a)).

square(Ax, Ay, Bx, By, Cx, Cy, S):-
	A is ((Ax - Bx)^2+(Ay - By)^2)^(1/2),
	B is ((Ax - Cx)^2+(Ay - Cy)^2)^(1/2),
	C is ((Cx - Bx)^2+(Cy - By)^2)^(1/2),
	P is (A+B+C)/2,
	S is (P*(P-A)*(P-B)*(P-C))^(1/2).

main(Rezult):-
	db_point,
	findall((L,S),find(L,S),Rezult),
	retractall(point(_,_,_)),
	retractall(tringle(_,_,_)).


find(Rezult, S):-
	point(A,Ax,Ay),
	point(B,Bx,By),
	A \= B,
	point(C,Cx,Cy),
	C \= A,
	C \= B,
	check1(A, B, C),
	square(Ax, Ay, Bx, By, Cx, Cy, S),
	S > 0,
	setof((P1,P2,P3), find_tringle(S,P1,P2,P3), Rezult).


find_tringle(S, P1, P2, P3):-
	point(A,Ax,Ay),
	point(B,Bx,By),
	A \= B,
	point(C,Cx,Cy),
	C \= A,
	C \= B,
	check1(A, B, C),
	square(Ax, Ay, Bx, By, Cx, Cy, S1),
	DS is abs(S - S1),
	DS < 0.001,
	assert(tringle(A, B, C)),
	P1 = A,
	P2 = B,
	P3 = C.

check1(A, B, C):-
	not(tringle(A,B,C)),
	not(tringle(A,C,B)),
	not(tringle(B,A,C)),
	not(tringle(B,C,A)),
	not(tringle(C,A,B)),
	not(tringle(C,B,A)).