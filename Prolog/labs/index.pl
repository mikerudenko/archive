% Colors DB
% ?Color, ?NextColor
rainbow(red, orange).
rainbow(orange, yellow).
rainbow(yellow, green).
rainbow(green, skyblue).
rainbow(skyblue, blue).
rainbow(blue, magenta).
rainbow(magenta, red).

% ID, color, density
dbCocktails:-
	recorded(cocktail, _), !.
dbCocktails:-
	recordz(cocktail, (r1, red, 1)),
	recordz(cocktail, (o1, orange, 2)),
	recordz(cocktail, (y1, yellow, 3)),
	recordz(cocktail, (y2, yellow, 3)),
	recordz(cocktail, (g1, green, 4)),
	recordz(cocktail, (b1, blue, 6)),
	recordz(cocktail, (s1, skyblue, 5)),
	recordz(cocktail, (s2, skyblue, 3)),
	recordz(cocktail, (m1, magenta, 7)),
	recordz(cocktail, (r2, red, 8)).

% +Color, -NextColor
nextColor(C, C1):-
	rainbow(C, C1).
nextColor(C, C).

% +First, -Others
makeCocktail(First, Others):-
	dbCocktails,
%	recorded(cocktail, (First, Col, Den)),
	checkFirst(First, Others).
%	layerAdd(Col, Den, Others, 1).

% ?FirstRing, -MultyRing
checkFirst(First, [First|MultyR]):- % +, -
	nonvar(First),
	recorded(cocktail, (First, C, D)),
	layerAdd(C, D, MultyR, 1).
checkFirst(First, [First|MultyR]):- % -, -
	var(First),
	firstLayer(First, C, D),
	layerAdd(C, D, MultyR, 1).

% -FirstRing, -Color, -Radius
firstLayer(First, C, D):-
	recorded(cocktail, (First, C, D)),
	checkInner(C, D).

% -Color, -Radius
checkInner(C, D):-
	nextColor(C1, C),
	recorded(cocktail, (_, C1, D1)),
	D1 >= D,
	!, fail.
checkInner(_, _).

layerAdd(Col, Den, [Layer|Layers], Counter):-
	Counter < 5,
	Counter1 is Counter + 1,
	nextColor(Col, Col1),
	recorded(cocktail, (Layer, Col1, Den1)),
	Den1 =< Den,
	layerAdd(Col1, Den1, Layers, Counter1).
layerAdd(_, _, [], Counter):-
	Counter = 5.
	%not(checkNextDen(Col, Den)).

% +Color, +Radius
checkNextDen(Col, Den):-
	nextDencity(Den, Den1),
	nextColor(Col, Col1),
	recorded(cocktail, (_, Col1, Den1)), !, fail.
checkNextDen(_, _).





