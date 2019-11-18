%+List from console -Result List with plus values <10
main([X|Xs],[X1|Ys]):-
	X>0,
	X<10,!,
	X1 is -X,
	main(Xs,Ys).
main([],[]).
main([X|Xs],[X|Ys]):-
	main(Xs,Ys).

