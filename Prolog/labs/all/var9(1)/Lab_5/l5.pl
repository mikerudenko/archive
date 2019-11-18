% +List, -Newlist
ch_plast([X|Xs],Xp,Xpp,[X|Xs1]):-
	ch_plast(Xs,Xp,Xpp,Xs1).
ch_plast([Xp,Xpp],Xp,Xpp,[]).


%list,?Xp, ?Xpp, -Newlist
change(Xs,[Xp,Xpp|Xs1]):-
	ch_plast(Xs,Xp,Xpp,Xs1).
