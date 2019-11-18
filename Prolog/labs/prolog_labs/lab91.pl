dbPoints:-
	recorded(point, _), !.

dbPoints:-
	recordz(point, (p1, 0, 0)),
	recordz(point, (p2, 0, 4)),
	recordz(point, (p3, 2, 4)),
	recordz(point, (p4, 2, 0)),
	recordz(point, (p5, -1, 7)).

%
getRightTriangles:-
		dbPoints,
	findall(N, recorded(point, (N, _, _)), L),
	length(L, Len),
	checkRightInList(L, 0, 1, 2),
	findEach(L, 0, 1, 2, Len).

findEach(List, P1, P2, P3, Len):- % move P3
	P1 < P2, P2 < P3, P3 < Len,
	P3N is P3 + 1,
	P3N < Len,
	checkAndLoop(List, P1, P2, P3N, Len).
findEach(List, P1, P2, P3, Len):-
	P1 < P2, P2 < P3, P3 < Len,
	P2N is P2 + 1,
	P2N < P3,
	checkAndLoop(List, P1, P2N, P3, Len).
findEach(List, P1, P2, P3, Len):-
	P1 < P2, P2 < P3, P3 < Len,
	P1N is P1 + 1,
	P1N < P2,
	checkAndLoop(List, P1N, P2, P3, Len).

checkAndLoop(List, P1, P2, P3, _):-
	print(P1), print('-'), print(P2), print('-'), print(P3), print(' '),
	checkRightInList(List, P1, P2, P3).
checkAndLoop(List, P1, P2, P3, Len):-
	findEach(List, P1, P2, P3, Len).

checkRightInList(List, Pos1, Pos2, Pos3):-
	nth0(Pos1, List, P1),
	nth0(Pos2, List, P2),
	nth0(Pos3, List, P3),
	recorded(point, (P1, X1, Y1)),
	recorded(point, (P2, X2, Y2)),
		recorded(point, (P3, X3, Y3)),
	isRightTriangle(X1, Y1, X2, Y2, X3, Y3),
	print('('), print(X1), print('; '), print(Y1), print(') '),
	print('('), print(X2), print('; '), print(Y2), print(') '),
	print('('), print(X3), print('; '), print(Y3), print(') is a right triangle.').

% +Number, +Number
isEqual(A, B):-
		A > B - 0.0000000001,
	A < B + 0.0000000001.

% +X1, +Y1, +X2, +Y2, +X3, +Y3
isRightTriangle(X1, Y1, X2, Y2, X3, Y3):-
	L1 is sqrt((X2 - X1)**2 + (Y2 - Y1)**2),
	L2 is sqrt((X3 - X2)**2 + (Y3 - Y2)**2),
	L3 is sqrt((X1 - X3)**2 + (Y1 - Y3)**2),
%	print(L1), print(' '), print(L2), print(' '), print(L3),
	rightTriangleSniffer(L1, L2, L3).

% +Len1, +Len2, +Len3
rightTriangleSniffer(L1, L2, L3):-
	isEqual(L1, sqrt(L2**2 + L3**2)).
rightTriangleSniffer(L1, L2, L3):-
	isEqual(L2, sqrt(L1**2 + L3**2)).
rightTriangleSniffer(L1, L2, L3):-
	isEqual(L3, sqrt(L2**2 + L1**2)).

