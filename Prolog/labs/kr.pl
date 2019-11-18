%% ?List1, List2,List3
main(L1,L2,L3):-
	commonPart(L1,L3,ResCommonOneThree),
	commonPart(L2,L3,ResCommonTwoThree),
	diffTwoLists(ResCommonTwoThree,ResCommonOneThree,Part1),
	diffThreeLists(L1,L2,L3,Part2),
	diffThreeLists(L1,L3,L2,Part3),
	addLists(Part1,Part2,Res1),
	addLists(Res1,Part3,Res2),
	write('Main result is = '),write(Res2),nl.

%% ?member, List
member(X,[X|_]).
	member(X,[_|L]) :- member(X,L).

%% Head, List, Tail
del(X,[X|L],L).
	del(X,[Y|L],[Y|L1]) :- del(X,L,L1). 

%% List1, List2, Result
addLists([],L,L).
addLists([X|L1],L2,[X|L3]) :- addLists(L1,L2,L3).

%% List1, List2, Result
diffrence([H|T1], L, R) :-
	member(H, L),
	diffrence(T1, L, R).
diffrence([H|T1], L, [H|T2]) :-
	not(member(H, L)),
	diffrence(T1, L, T2).
diffrence([],_,[]).

%% List1, List2, Result
commonPart(L1,L2,Result) :- 
    diffrence(L1,L2,L3),  
    diffrence(L3,L2,Result), 
    write('commonPart ='),write(Result). 

%% List1, List2,List3, Result
diffThreeLists(L1,L2,L3,Result2) :- 
	diffrence(L1,L2,Result),
	diffrence(L3,Result,Result2),
	write('diffThreeLists= '),write(Result2),nl.

%% List1, List2, Result
diffTwoLists(L1,L2,Res) :- 
	diffrence(L2,L1,Res),
	write('diffThreeListsTwo= '),write(Res),nl.

