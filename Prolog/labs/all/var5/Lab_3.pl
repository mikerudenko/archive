% ?PreviousEra, ?NextEra
next_era(cryptic, basin_groups).
next_era(basin_groups, nectarian).
next_era(nectarian, early_imbrian).
next_era(early_imbrian, eoarchean).
next_era(eoarchean, paleoarchean).
next_era(paleoarchean, mesoarchean).
next_era(mesoarchean, neoarchean).
next_era(neoarchean, paleoproterozoic).
next_era(paleoproterozoic, mesoproterozoic ).
next_era(mesoproterozoic, neoproterozoic).
next_era(neoproterozoic, paleozoic).
next_era(paleozoic, mesozoic).
next_era(mesozoic, cenozoic).

% ?Era, ?LaterEra
era_comes_late(X, Y):-
	next_era(X, Y).

era_comes_late(X, Y):-
	next_era(X, X1),
	era_comes_late(X1, Y).

