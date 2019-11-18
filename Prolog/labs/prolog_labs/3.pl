%?Much expensite currency ? cheaper currency
higher_currency(gpd, eur).
higher_currency(eur, usd).
higher_currency(usd, uah).
higher_currency(uah, rub).


%?Much expensite currency ? cheaper currency
is_higher_currency(CUREX, CURCHEP):-
	higher_currency(CUREX, CURCHEP).
is_higher_currency(CUREX, CURCHEP):-
	higher_currency(CUREX, CURMORECHEAP),
	is_higher_currency(CURMORECHEAP, CURCHEP).
