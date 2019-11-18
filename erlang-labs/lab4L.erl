-module(lab4L).
-export([main/1, part/5]).

main(L) ->
	N = length(L),
	K1 = N div 4,
	K2 = K1*2,
	K3 = K1*3,
	part(L, [], K1, K2, 2) ++ part(L, [], K2, K3, 3) ++ part(L, [], K3, N, 4).

part([_|Xs], P, K1, K2, Numb) when K1 > 0 ->
	part(Xs, P, K1-1, K2-1, Numb);
part([X|Xs], P, 0, K2, Numb) when K2 > 0 ->
	part(Xs, [X|P], 0, K2-1, Numb);
part(_, P, 0, 0, Numb) when (Numb == 2) or (Numb == 4)->
	lists:reverse(P);
part(_, P, 0, 0, _) ->
	P.