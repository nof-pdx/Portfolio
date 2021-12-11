#include "BinaryTree.h"


int main() {
	cout << "Author: Noah Funderburgh " << endl;
	cout << "Class: CS-350-002 Algorithms & Complexity" << endl << endl;;
	srand(time(0));
	binaryTree Tree;
	ifstream inFile;
	string fileName = "New.txt";
	node * root = NULL;
	inFile.open(fileName);
	if (!inFile) {
		cerr << "unable to open the file!" << endl;
	}
	else {
		float a;
		cout << "Please select a value for a .5 - 1: ";
		cin >> a;
		Tree.buildTree(fileName, a);
		int num = Tree.returnCounter();
		cout << "The rebuild count of insert is: " << num << endl;
		cout << "The delete count is: " << Tree.deleteCount;
	}
}