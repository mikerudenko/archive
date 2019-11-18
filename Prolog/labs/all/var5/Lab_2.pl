% ?NameWoman, NameMan
is_marriage(lucy, styui).
is_marriage(cindy, andrew).
is_marriage(laurie, murphy).
is_marriage(angelina, nicholas).

% ?NameMom, NameChild
is_parent(nataly, nicholas).
is_parent(monika, murphy).
is_parent(naomy, styui).
is_parent(lucy, andrew).
is_parent(monika, angelina).
is_parent(lily, lucy).
is_parent(lily, laurie).
is_parent(anastasia, cindy).

% ?NameWoman
is_female(nataly).
is_female(monika).
is_female(naomy).
is_female(lucy).
is_female(monika).
is_female(lily).
is_female(anastasia).


% ?NameMatchmaker1 , ?NameMatchmaker2
is_matchmaker(Wife, Husband, X, Y) :-
	is_marriage(Wife, Husband),
	is_parent(X, Wife),
	is_female(X),
	is_parent(Y, Husband),
	is_female(Y).


