%?Id, ?Sort, ?Color
db_filling:-
	assert(flower(hollyhock_pink, hollyhock, pink)),
	assert(flower(rose_red, rose, red)),
	assert(flower(carnation_red, carnation, red)),
	assert(flower(rose_orange, rose, orange)),
	assert(flower(blowball_orange, blowball, orange)),
	assert(flower(tulip_yellow, tulip, yellow)),
	assert(flower(desi_blue, desi, blue)),
	assert(flower(cornflower_violet, cornflower, violet)),
	assert(flower(tinkler_violete, tinkler, violet)).

%?Color, ?NextColor
palette(pink, red).
palette(red, orange).
palette(orange, yellow).
palette(cyan, blue).
palette(blue, violet).

%FirstFlower, -Bouquet
flower_main(F1, Bouquet):-
	flower(_, _, _),
	!,
	flower_main1(F1, Bouquet).
flower_main(F1, Bouquet):-
	db_filling,
	flower_main1(F1, Bouquet).

%FirstFlower, -Bouquet
flower_main1(F, [F|Fs]):-
	nonvar(F),
	flower(F, Sr, C),
	add([(Sr, C)], C, Fs).
flower_main1(F, [F|Fs]):-
	var(F),
	first_flower(F, Sr, C),
	add([(Sr, C)], C, Fs).

%+History, +Color, -Bouquet
add(History, C, [F1, F2|Bouquet]):-
	flower_add(History, C, F1, Sr1, C1),
	flower_add([(Sr1, C1)|History], C1, F2, Sr2, C2),
	add([(Sr1, C1), (Sr2, C2)|History], C2, Bouquet).
add(History, C, []):-
	\+ (flower_add(History, C, _, Sr1, C1),
	    flower_add([(Sr1, C1)|History], C1, _, _, _)).

%+History, +Color, -Id, -Sort, -Color
flower_add(History, C, Next, Sr, C):-
	flower(Next, Sr, C),
	not(member((Sr, C), History)).
flower_add(_, C, Next, Sr, C1):-
	next_color(C, C1),
	flower(Next, Sr, C1).

%?Color, ?NextColor
next_color(C, C1):-
	palette(C, C1).
next_color(C, C1):-
	palette(C, Cp),
	next_color(Cp, C1).

%-Id, -Sort, -Color
first_flower(First, Name, C):-
	flower(First, Name, C),
	\+ (next_color(C1, C),
	    flower(_, _, C1)).
