%+List1 +List2 +List3 -ResultList
main(List1,List2,List3,Res):-
	%print('4'),
	length(List1,Len1),
	length(List2,Len2),
	length(List3,Len3),
	%print('1'),
	%copy_mas(List1,0,Len1,Res).
	%print('2'),
	Bottom1 is Len1 // 3+1,
	Bottom3 is Len2 // 3+1,
	Bottom4 is (Len2 // 3)*2+1,
	Bottom5 is (Len3 // 3)*2+1,
	Bottom6 is Len3+1,
	%print('5'),
	part(List1,1,1,Bottom1,Part1),
	%print('6'),
	part(List2,1,Bottom3,Bottom4,Part2),
	%print('7'),
	part(List3,1,Bottom5,Bottom6,Part3),
	%print('23'),
	append(Part1,Part2,Res1),
	append(Res1,Part3,Res).

% +list, +counter, #first item of part2
% #first item of part2, -part1, -par2, -part3
part([_|List], I, K2, K3, Res) :-
	I < K2,
	I1 is I + 1,
	part(List, I1, K2, K3, Res).
part([X|List], I, K2, K3, [X|Res]) :-
	I >= K2,
	I < K3,
	I1 is I + 1,
	part(List, I1, K2, K3, Res).
part(_,K3,_,K3,[]).


















