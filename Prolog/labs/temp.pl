% ?Color, ?NextColor
rainbow(red, orange).
rainbow(orange, yellow).
rainbow(yellow, green).
rainbow(green, lightblue).
rainbow(lightblue, blue).
rainbow(blue, purple).
rainbow(purple, red).

% Database
cylinders_db:-
	recorded(cylinder, _), !.
cylinders_db:-
	recordz(cylinder, (r1, red, 9)),
	recordz(cylinder, (g1, green, 8)),
	recordz(cylinder, (p1, purple, 7)),
	recordz(cylinder, (y1, yellow, 10)),
	recordz(cylinder, (o1, orange, 12)),
	recordz(cylinder, (o2, orange, 2)),
	recordz(cylinder, (r2, red, 3)),
	recordz(cylinder, (l1, lightblue, 5)),
	recordz(cylinder, (y2, yellow, 5)),
	recordz(cylinder, (l2, lightblue, 5)),
	recordz(cylinder, (l3, lightblue, 1)),
        recordz(cylinder, (b1, blue, 1)),
	recordz(cylinder, (g2, green, 9)).

% ?FirstCylinder, Tower
build_tower(First, [First|Tower]):-
	cylinders_db,
	check_first(First, Tower).

% ?FirstCylinder, Tower
check_first(First, Tower):- % if First is NOT a variable
	nonvar(First),
	recorded(cylinder, (First, C, D)),
	add_floor(C, D, Tower, 1).
check_first(First, Tower):- % if First is a variable
	var(First),
%	first_cylinder(First, C, D, 7),
	recorded(cylinder, (First, C, D)),
	add_floor(C, D, Tower, 1).

% -FirstCylinder, -Color, -Radius, -Density, +Counter
first_cylinder(First, C, D, Counter):-
	recorded(cylinder, (First, C, D)),
	check_lower(C, D, Counter).

% +Color, +Radius, +Density, +Counter
%check_lower(red, _, _, _):-!.
check_lower(C, D, Counter):-
	next_color(C1, C, Counter),
	recorded(cylinder, (_, C1, D1)),
	D1 >= D, !, fail.
check_lower(_, _, _).

% ?Color, ?NextColor
next_color(C, C1, _):-
	rainbow(C, C1).
next_color(C, C, _).
%next_color(C, C1, Counter):-
%	Counter =< 7,
%	Counter1 is Counter + 1,
%	rainbow(C, C2),
%	next_color(C2, C1, Counter1).

% +Color, +Radius, +Density, Tower
add_floor(C, D, [Cylinder | Tower], Counter):-
	next_color(C, C1, Counter),
	recorded(cylinder, (Cylinder, C1, D1)),
	D1 < D,
	Counter1 is Counter + 1,
	add_floor(C1, D1, Tower, Counter1).
add_floor(_, _, [], Counter):-
	Counter = 5.
%	check_top(C, R, D, Counter).

% +Color, +Radius, +Density, +Counter
check_top(C, R, D, Counter):-
	next_color(C, C1, Counter),
	recorded(cylinder, (_, C1, R1, D1)),
	R1 < R,
	D1 =< D, !, fail.
check_top(_, _, _, _).



