%�������� ��������� ����� ������
% +������, -����� ������
main(L,L1):-
	length(L,K),%������� � - ����� ������
	N is 2*K//3,%N - ���������� ��������� � ��������� ������
	del_after_nth(N,L,L1).%������� ��������� �����

% ?���������� ���������, +������, -����� ������
del_after_nth(N,[X|Xs],[X|Xs1]):-
	     N1 is N-1,
	     del_after_nth(N1,Xs,Xs1).
del_after_nth(0,_,[]).

/*
del_last_nth(N,[X|Xs],[X|Xs1]):-
	del_last_nth(N,Xs,Xs1).
del_last_nth(N,[_|Xs],Xs1):-
	N1 is N-1,
	del_last_nth(N1,Xs,Xs1).
del_last_nth(0,_,[]).
*/

