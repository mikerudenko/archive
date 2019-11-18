-module(lab5_v1).
-export([matrix/1]).
%Matrix
matrix([[H|TT]|T]) -> 	
	{L,M}=lastrow(T,H,[]),
	[[L|TT]|M].
	
%Matrix, FirstElement, Acc
lastrow([H|T],A,Acc)->
	lastrow(T,A,[H|Acc]);
lastrow([],A,[H|T])->
	{L,R}=last(H,A,[]),
	{L,lists:reverse([R|T])}.
	
%Row, FirstElement, Acc
last([H|T],A,Acc)->
	last(T,A,[H|Acc]);
last([],A,[H|T])->
	{H,lists:reverse([A|T])}.