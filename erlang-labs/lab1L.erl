-module(lab1L).
-export([revolution/1]).

revolution({shape, Body}) when Body == semicircle ->
	ball;
revolution({shape, Body}) when Body == rectangle ->
	cylinder;
revolution({shape, Body}) when Body == triangle ->
	cone;
revolution({shape, Body}) when Body == circle ->
	thor;		
revolution({shape, Body}) ->
	no_body.