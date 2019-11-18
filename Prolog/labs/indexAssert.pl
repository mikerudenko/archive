:-dynamic point/3.
pointsDB:-
	point(_,_,_), !.
pointsDB:-
	assert(point(p1, 0, 0)),
	assert(point(p2, 0, 4)),
	assert(point(p3, 2, 4)),
	assert(point(p4, 2, 0)),
	assert(point(p5, -1, 7)).

% -List
main(List):-
	pointsDB,
	bagof(E, find(E), List).

% -Points
find([P1,P2,P3]):-
	pointsDB,
	point(P1, X1, Y1),
	point(P2, X2, Y2),
	P1 \= P2,
        point(P3, X3, Y3),
	P1 \= P3,
	P2 \= P3,
%	print('test'),
	isRightTriangle(X1, Y1, X2, Y2, X3, Y3),
	print('('), print(X1), print('; '), print(Y1), print(') '),
	print('('), print(X2), print('; '), print(Y2), print(') '),
	print('('), print(X3), print('; '), print(Y3), print(') is right.').

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

