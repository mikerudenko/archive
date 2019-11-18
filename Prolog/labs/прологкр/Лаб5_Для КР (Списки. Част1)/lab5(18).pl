%+InitialList,-Result

do(Initial,Last):-
	length(Initial, N),
%get length of list

PreLastPosition is N-1,	
%get penultimate member position

del(_,Initial,PreLastPosition,Second),
%delete specified position element

write('After delete Result = '),

write(Second),
nl,

addToEnd(Second,2,Third),
%add 2nd element to the end

write('After adding 2nd element to the end Result = '),
write(Third),
nl,
addToEnd(Third,5,Last),	
%add 5th element to the end

write('After adding 5th element to the end Result = '),
write(Last),
nl
.



%?Element,?List,+Position,-Result

del(X,[X|Xs],1,Xs).


del(X,[Y|Xs],K,[Y|Ys]):-
	
K > 1,
K1 is K - 1,
del(X,Xs,K1,Ys)
	.



%+List,+NthElement,ConcatenatedList

addToEnd(List,N,Result):-

find(X,List,N),

append(List,[X],Result)
	.



%?Result,+List,-Position

find(X,[X|_],1).

%return head

find(X,[_|L],K):-
%move to Kth elem & make it head
	
K > 1,
K1 is K - 1,
find(X,L,K1)
.

  