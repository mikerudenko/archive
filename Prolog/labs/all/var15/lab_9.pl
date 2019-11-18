% ?What
tones(e).
tones(i).
tones(o).
tones(u).
tones(y).
% + List, -NewList1, -NewList2
main([X|Xs], [X|Xs1], NewList2):-
	tones(X),!,
	main(Xs, Xs1, NewList2).
main([X|Xs], NewList1, [X|Xs1]):-
%	not(tones(X)),
	main(Xs, NewList1, Xs1).
main([],[],[]).