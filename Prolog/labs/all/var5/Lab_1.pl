% ?Name, ?Predator
fish(tanichthys_albonubes, no).
fish(cyprinidae, yes).
fish(cobitidae, yes).
fish(barbus, no).
fish(rasbora_heteromorpha, no).
fish(epalzeorhynchus_frenatus, yes).
fish(cosby, no).
fish(barbus_semifasciolatus, no).

% ?Fish1, ?Fish2, ?Fish3
can_live(X,Y,Z):-
	fish(X,Predator),
	fish(Y,Predator),
	fish(Z,Predator),
	X\=Y,
	Y\=Z,
	X\=Z.
