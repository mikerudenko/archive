
%% ?Name
name(korneev).
name(dokshin).
name(mareev).
name(skobelev).

%% ?profession
profession(baker).
profession(doctor).
profession(engineer).
profession(policeman).

%% ?List
unique([]):-!.
unique([H|T]):-
	member(H,T),
	!,
	fail;unique(T).

%% ?Rule
not(R):-
	R,
	!,
	fail;!.

%% ?Name ?_ ?Name ?_
older(dokshin,_,mareev,_).
older(_,policeman,_,doctor).
older(_,policeman,_,engineer).

%% ?Name ?_ ?Name ?_
neighbours(korneev,_,dokshin,_).
neighbours(dokshin,_,korneev,_).

%% ?_ ?Profession ?_ ?Profession 
strangers(_,policeman,_,doctor).
strangers(_,doctor,_,policeman).

%% ?Name ?_
ride(korneev,_).
ride(dokshin,_).

%% ?_ ?profession
onFoot(_,baker).

%% ?name ?_ ?name ?_
seenTimes(korneev,_,skobelev,_).
seenTimes(skobelev,_,korneev,_).
seenTimes(korneev,_,dokshin,_).
seenTimes(dokshin,_,korneev,_).

%% ?_ ?Profession ?_ ?Profession 
seenOnes(_,engineer,_,policeman).
seenOnes(_,policeman,_,engineer).

%% ?name ?name ?name ?name
solve(Korneev,Dokshin,Mareev,Skobelev) :-
	profession(Korneev),
	profession(Dokshin),
	profession(Mareev),
	profession(Skobelev),
	name(Baker),
	name(Doctor),
	name(Policeman),
	name(Engineer),
	unique([Korneev,Dokshin,Mareev,Skobelev,Baker,Doctor,Engineer,Policeman]),
	not(onFoot(korneev,Korneev)),
	not(onFoot(dokshin,Dokshin)),
	not(ride(Baker,baker)),
	not(seenOnes(korneev,Korneev,skobelev,Skobelev)),
	not(seenOnes(korneev,Korneev,dokshin,Dokshin)),
	not(seenTimes(Engineer,engineer,Policeman,policeman)),
	not(neighbours(Policeman,policeman,Doctor,doctor)),
	not(strangers(korneev,Korneev,dokshin,Dokshin)),
	not(older(mareev,Mareev,dokshin,Dokshin)),
	not(older(Doctor,doctor,Policeman,policeman)),
	not(older(Engineer,engineer,Policeman,policeman)),
	!.