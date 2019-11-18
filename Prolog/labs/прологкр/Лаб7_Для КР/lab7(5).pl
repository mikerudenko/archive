% +List
main([H|T]):-
	print_matrix([H|T]),
	nl,
	length([H|T], Height),
	length(H, Width),
	min(Height, Width, S),
	N is S // 2 + 1,
	change_diagonal([H|T], S, N, 1, 1, R),
	print_matrix(R).

% +List
print_matrix([H|T]):-
	write(H),
	nl,
	print_matrix(T).
print_matrix([]).

% +First element, +Second element, -Max element
min(X1, X2, X1):-
	X1 < X2.
min(X1, X2, X2):-
	X1 >= X2.

% +Matrix, +Size, +Boundary, +Counter, +Element index, -Result
change_diagonal(L, S, N, K, Ind1, R):-
	K < N,
	K1 is K + 1,
	change_two_elem(L, S, Ind1, 1, 1, Acc),
	Ind1_1 is Ind1 + 1,
	change_diagonal(Acc, S, N, K1, Ind1_1, R).
change_diagonal(R, _, K, K, _, R).

% +List, +Size, +Element index, +Rows counter, +Column counter, -Result
% list
change_two_elem([H|L], S, Ind1, I, J, [H|L2]):-
	I < Ind1,
	I1 is I + 1,
	change_two_elem(L, S, Ind1, I1, J, L2).
change_two_elem([[H|T]|L], S,Ind1, Ind1, J, [[H|T2]|L2]):-
	J < Ind1,
	J1 is J + 1,
	change_two_elem([T|L], S, Ind1, Ind1, J1, [T2|L2]).
change_two_elem([[A|T]|L], S, Ind1, Ind1, Ind1, [[Z|T2]|L2]):-
	Ind2 is S // 2 + Ind1 + S mod 2,
	change([T|L], A, Z, Ind2, Ind1, Ind1, [T2|L2]).

% +List, +First element, -Last element, +Rows coutnter, +Column counter,
% - Result list
change([T|L], A, Z, Ind2, I, _, [T|L2]):-
	I < Ind2,
	I1 is I + 1,
	change(L, A, Z, Ind2, I1, 1, L2).
change([[H|T]|L], A, Z, Ind2, Ind2, J, [[H|T2]|L2]):-
	J < Ind2,
	J1 is J + 1,
	change([T|L], A, Z, Ind2, Ind2, J1, [T2|L2]).
change([[Z|T]|L], A, Z, Ind2, Ind2, Ind2, [[A|T]|L]).














