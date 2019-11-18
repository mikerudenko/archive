profesii(L):-
	permutation([pekar,vrach,inzener,milicioner],L).

check(A,B,A,B).

solve(Profesii):-
    profesii(Profesii),
    Profesii=[Korneev,Dokshin,Mareev,Skobelev],
    Korneev\=pekar,
    Dokshin\=pekar,
    not(check(Korneev,Dokshin,milicioner,vrach)),
    not(check(Korneev,Dokshin,vrach,milicioner)),
    not(check(Korneev,Dokshin,milicioner,inzener)),
    not(check(Korneev,Dokshin,inzener,milicioner)),
    not(check(Korneev,Skobelev,milicioner,inzener)),
    not(check(Korneev,Skobelev,inzener,milicioner)),
    not(check(Dokshin,Mareev,vrach,milicioner)),
    not(check(Dokshin,Mareev,inzener,milicioner)).
