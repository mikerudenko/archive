
%?Great_nephey,Grand_uncle
is_great_nephew(WHO, WHOM):-
	is_parent(PARENT,WHO),
	is_parent(GRAND_PARENT,PARENT),
	is_parent(SUB_GRAND_PARENT,GRAND_PARENT),
	is_parent(SUB_GRAND_PARENT,WHOM),
	GRAND_PARENT\=WHOM.



%?Parent, Child
is_parent(alex, sam).
is_parent(tory, sam).
is_parent(homer, alex).
is_parent(frank, tory).
is_parent(leonardo,homer).
is_parent(leonardo,gregor).

