#!/usr/bin/python

class Node:
   def __init__(self, val, lst):
      self.val = val
      self.rst = lst

   def first(self):
      return self.val
   def rest(self):
   	  return self.rst

def printnode(n):
	if n:
	    return str(n.first()) + " " +printnode(n.rest())
	return " ";
def buildlist(lst):
	if lst:
	    return Node(lst[0], buildlist(lst[1:]))
	return None

a = [1,2,3,4,5]
print(printnode(buildlist(a)))
