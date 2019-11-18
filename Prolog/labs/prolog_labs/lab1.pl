%% meatEatAnimals
meatEatAnimal(tiger).
meatEatAnimal(gepard).
meatEatAnimal(bear).

%% greenEatAnimals
greenEatAnimal(rabbit).
greenEatAnimal(mouse).
greenEatAnimal(squirell).

canBeOnWateringPlace(X,Y) :-
	meatEatAnimal(X),
	meatEatAnimal(Y);
	greenEatAnimal(X),
	greenEatAnimal(Y).
