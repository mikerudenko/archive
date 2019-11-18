%?Matrix, -Result
upper_diags([H|T],R):-
	length([H|T],N),
	length(H,M),
	N1 is N // 2,
        main_diag_sum(0,N1,M,[H|T],MD),
        second_diag_sum(0,N1,M,[H|T],SD),
	R is MD + SD.

%?First elem, ?Number of rows, ?Elems in row, ?Matr, -Result
main_diag_sum(M, _, M, _, 0).
main_diag_sum(N, N, _, _, 0).
main_diag_sum(I, N, M, [Row|T], R):-
	I1 is I + 1,
	main_diag_sum(I1, N, M, T, TR),
	nth0(I, Row, E),
	R is TR + E.

%?First elem, ?Number of rows, ?Elems in row, ?Matr, -Result
second_diag_sum(M, _, M, _, 0).
second_diag_sum(N, N, _, _, 0).
second_diag_sum(I, N, M, [Row|T], R):-
	I1 is I + 1,
	second_diag_sum(I1, N, M, T, TR),
	J is M - I1,
	nth0(J, Row, E),
	R is TR + E.
