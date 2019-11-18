#!/usr/bin/perl

package Search;

use strict;
my @visited = ();
sub find {
	my($graph_link, $from, $cur, $to, $history) = @_;  
	$cur = $from if $cur eq '';
	$history .= $cur;
	if ($to ~~ $graph_link->{$cur}){
		print "done = ".$history.$to."\n";
		return 0;
	}
	else {
		foreach my $way (@{$graph_link->{$cur}}) {
			next if $way eq $from or index($history, $way) != -1 or $way ~~ @visited;
			push @visited, $way;
			find($graph_link, $from, $way, $to, $history);
		}

	}
}

return 1;
