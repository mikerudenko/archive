% +InputList -OutputList
lst_pro([R|Rs], Rez):-
	1 is R mod 2, !,
	lst_pro(Rs, Rez).
lst_pro([R|Rs], [R|Rez]):-
	lst_pro(Rs, Rez).
lst_pro([], []).
