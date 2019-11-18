% ResultMatrix
matr(X):-
	matrix(M),
	change(M,X).

% Matrix, ?ResultMatrix
change([[F|Fs]|A],[[L|Fs]|R]):-
	nth_row(A,F,R,L).


% Matrix, FirstElem, ResultMatrix, LastElem
nth_row([X|Xs],F,[X|Xs1],L):-
	nth_row(Xs,F,Xs1,L).
nth_row([[L|Ls]],F,[[F|Ls]],L).

% TestMatrix
matrix([[1,2,3,4],
        [5,6,7,8],
	[9,a,b,c],
	[d,e,f,g]]).
