% +List, -NewList
main(L1, L2):-
	length(L1, N),
	K2 is N/4+1,
	K3 is N/4*2+1,
	K4 is N/4*3+1,
	parts(L1, 1, K2, K3, K4, _, Part2, Part3, Part4),
	reverse(Part3, Part3rev),
	append(Part2, Part3rev, TmpParts),
	append(TmpParts, Part4, L2).
% +List, +Counter, #first item of part2, #first item of part3, #first
% item of part4, -Part1, -Part2, -Part3, -Part4
parts([X|Xs], I, K2, K3, K4, [X|Part1], Part2, Part3, Part4):-
	I<K2,
	I1 is I+1,
	parts(Xs, I1, K2, K3, K4, Part1, Part2, Part3, Part4).
parts([X|Xs], I, K2, K3, K4, Part1, [X|Part2], Part3, Part4):-
	I>=K2,
	I<K3,
	I1 is I+1,
	parts(Xs, I1, K2, K3, K4, Part1, Part2, Part3, Part4).
parts([X|Xs], I, K2, K3, K4, Part1, Part2, [X|Part3], Part4):-
	I>=K3,
	I<K4,
	I1 is I+1,
	parts(Xs, I1, K2, K3, K4, Part1, Part2, Part3, Part4).
parts(Part4, K4, _, _, K4, [], [], [], Part4).

% +List, -NewList
main2(L1, L2):-
	length(L1, N),
	K2 is N/4+1,
	K3 is N/4*2+1,
	K4 is N/4*3+1,
	reverseNdelete(L1, 1, K2, K3, K4, N, [], L2).

% +List, +Counter, #first item of part2, #first item of part3, #first
% item of part4, +Accumulator, -ResultList
reverseNdelete([_|Xs], I, K2, K3, K4, N, Acc, L):-
	I<K2,
	I1 is I+1,
	reverseNdelete(Xs, I1, K2, K3, K4, N, Acc, L).
reverseNdelete([X|Xs1], I, K2, K3, K4, N, Acc, [X|Xs2]):-
	I>=K2,
	I<K3,
	I1 is I+1,
	reverseNdelete(Xs1, I1, K2, K3, K4, N, Acc, Xs2).
reverseNdelete([X|Xs], I, K2, K3, K4, N, Acc, L):-
	I>=K3,
	I<K4,
	I1 is I+1,
	reverseNdelete(Xs, I1, K2, K3, K4, N, [X|Acc], L).
/*
reverseNdelete(Part4, I, K2, K3, K4, N, [X1|Xs1], [X1|Xs2]):-
	%append(Acc, Part4, NewAcc),
	%L is NewAcc.
	I>=K4,
	I<N+1,
	I1 is I+1,
	reverseNdelete(Part4, I1, K2, K3, K4, N, Xs1, Xs2).
reverseNdelete(Part4, I, _, _, _, N, _, Part4):-
	I=:=N+1.
*/
reverseNdelete([_|Part4], I, K2, K3, K4, N, [X1|Xs1], [X1|Xs2]):-
	I>=K4,
	I<N+1,
	I1 is I+1,
	reverseNdelete(Part4, I1, K2, K3, K4, N, Xs1, Xs2).
reverseNdelete([], _, _, _, _,_, _, []).


