% List
sum_of_three_middle_elements(List, Result) :-
	length(List, Len),
	Mid is Len // 2 - 1,
	work_function(List, Mid, Result).

work_function([_|Xs], Counter, Result) :-
	Counter > 0,
	Counter1 is Counter - 1,
	work_function(Xs, Counter1, Result).
work_function([X1, X2, X3|_], 0, Result) :-
	Result is X1 + X2 + X3.
