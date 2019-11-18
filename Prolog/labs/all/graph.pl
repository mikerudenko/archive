#!/usr/bin/perl/

use strict;
#use warnings;
use GraphViz;
use List::MoreUtils qw(uniq);
use Search;
# var points - client's input
###############################################
my %main = ();
my $TO = pop @ARGV;
my $FROM = pop @ARGV;
my @points = ();
my $str = ''; #FOR HISTORY IN FIND FUNCTION
my $cur_pos = ''; #THE SAME!
foreach my $i (@ARGV) {
	push @points, $i;
}
###############################################
%main = makeGraph(@points);
draw(%main);
Search::find(\%main, $FROM, $cur_pos, $TO, $str);
###############################################
sub getNodes {
	my (@points) = @_;
	my $nodes = "";
	foreach my $s (@points) {
		$nodes .= $s;
	}
	my @nodes = ""; #result
	@nodes = split('', $nodes);
	@nodes = uniq @nodes;
}
sub getConnections {
	my($node, @points) = @_;
	my @res = (); 
	foreach my $el (@points) {
		if (index($el, $node)!=-1){
			$el =~ s/$node//;
			push @res, $el;
		}
	}
	return \@res;
}
sub makeGraph {
	my (@points) = @_;
	my %graph = ();
	my @nodes = getNodes(@points);
	foreach my $node (@nodes) { 
		$graph{$node} = getConnections($node, @points);
	}
	return %graph;
}	
##################################################
sub draw {
	my (%graph) = @_;
	my $g = GraphViz->new(directed => 0);
	my @printed = ();
	foreach my $elem (keys %graph) {
		$g->add_node($elem);
		foreach my $sub_elem (@{$graph{$elem}}){
			if (not $elem.$sub_elem ~~ @printed){
				$g->add_edge($elem, $sub_elem);
				push @printed, $elem.$sub_elem;
				push @printed, $sub_elem.$elem;
			}
		}
	}	
	my $fl = 'result.svg';
	open my $z, '>', $fl;

	print {$z} $g->as_svg;
	close $z;
}
#####################################################
#sub search {
#	my (%graph) = @_;
#	my $cur_pos = $FROM;
#	my @nodes = getNodes(@points);
#	my %visited = map { $_ => 0} @nodes;
#	algo($FROM, \%visited);	
#}	
#sub algo {
#	my ($node, $visited) = @_;
#	$visited->{$node} = 1;
#	print "i am at ".$node."\n";
#	if ($TO ~~ @{$graph{$node}}) {
#		print "done\n";	
#	} else  {
#		foreach my $n (@{$graph{$node}}) {
#			if ($visited->{$n} == 0) {
#				algo($n,$visisted);
#			} 	
#		}			
#	}
#
#}
