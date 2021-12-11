#pragma once
#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <sstream>
#include <ctime>
#include <cstdlib>
#define COUNT 10

using namespace std;

struct node {
	int key;
	node * left;
	node * right;
	node * root;
};

class binaryTree {
public:
	binaryTree() { node * root = nullptr; }
	void insert(int key, float a);
	void Delete(int key);
	bool Search(int key);
	node* buildTree(node* root);
	node * buildTreeUtil(vector<node*> &nodes, int start, int end);
	void storeBSTNodes(node* root, vector<node*> &nodes);
	void runRebuild();
	int returnCounter();
	int height(node * root);
	int max(int a, int b);
	bool isBalancedPub();
	void print2DUtil(node *root, int space);
	void print2D();
	bool buildTree(string func, float a);
	bool done();
	int deleteCount = 0;

private:
	node * root;
	bool child = false;
	int reBuildCounter = 0;

	
	node * insert(node * root, int key, float a);
	node * Delete(node * root, int key);
	bool Search(node * root, int key);
	node * getNewNode(int data);
	node * findMin(node * root);
	bool empty(node * root);
	bool isBalancedPriv(node* root);
	
	
};
//==============================================
node * binaryTree::insert(node * root, int key, float a) {
	int randomNum = rand() % 100;
	if (empty(root)) {
		root = getNewNode(key);
		return root;
	}
	else if (a <= randomNum)
		root->left = insert(root->left, key, a);
	else
		root->right = insert(root->right, key, a);
	return root;
}
//==============================================
void binaryTree::insert(int key, float a) {
	root = insert(root, key, a);
	if (isBalancedPriv(root)) {
		//nothing
	}
	else {
		runRebuild();
	}
}
//==============================================
node * binaryTree::Delete(node * root, int key) {
	if (root == NULL) {
		return root;
	}
	else if (key < root->key) {
		root->left = Delete(root->left, key);
	}
	else if (key > root->key) {
		root->right = Delete(root->right, key);
	}
	else {
		// Case 1: No Child;
		if (root->left == NULL && root->right == NULL) {
			if (child == false)
				cout << endl << "Deleting " << root->key << endl << endl;
			delete root;
			root = NULL;
			return root;
		}
		// Case 2: One Child;
		else if (root->left == NULL) {
			node *temp = root;
			if (child == false)
				cout << endl << "Deleting " << temp->key << endl << endl;
			root = root->right;

			delete temp;
		}
		else if (root->right == NULL) {
			node *temp = root;
			cout << endl << "Deleting " << temp->key << endl << endl;
			root = root->left;

			delete temp;
		}
		// Case 3: 2 child
		else {
			child = true;
			cout << endl << "Deleting " << root->key << endl << endl;
			node *temp = findMin(root->right);
			root->key = temp->key;
			root->right = Delete(root->right, temp->key);
		}
	}
	return root;
}
//==============================================
void binaryTree::Delete(int key){
	deleteCount++;
	root = Delete(root, key);
}
//==============================================
bool binaryTree::Search(int key) {
	if (Search(root, key)) {
		cout << "Found " << key << " in the binary tree.";
		return true;
	}
	else {
		cout << key << " does not exist in the tree.";
			return false;
	}	
}
//==============================================
bool binaryTree::Search(node * root, int key) {
	if (root == NULL)
		return false;
	if (root->key == key)
		return true;
	bool left = Search(root->left, key);
	if (left)
		return true;
	bool right = Search(root->right, key);
	if (right)
		return true;
}
//==============================================
node * binaryTree::getNewNode(int key) {
	node* newNode = new node();
	newNode->key = key;
	newNode->left = NULL;
	newNode->right = NULL;
	return newNode;
}
//==============================================
node * binaryTree::findMin(node * root) {
	while (root->left != NULL)
		root = root->left;
	return root;
}
//==============================================
bool binaryTree::empty(node * root) {
	if (root == NULL) {
		return true;
	}
	else
		return false;
}
//==============================================
node* binaryTree::buildTree(node * root) {
	vector<node*> nodes;
	storeBSTNodes(root, nodes);
	int n = nodes.size();
	return buildTreeUtil(nodes, 0, n - 1);
}
//==============================================
node * binaryTree::buildTreeUtil(vector <node*> &nodes, int start, int end) {
	if (start > end)
		return NULL;
	int mid = (start + end) / 2;
	node *root = nodes[mid];
	root->left = buildTreeUtil(nodes, start, mid - 1);
	root->right = buildTreeUtil(nodes, mid + 1, end);

	return root;
}
//==============================================
void binaryTree::storeBSTNodes(node * root, vector<node*> &nodes) {
	if (root == NULL)
		return;
	
	storeBSTNodes(root->left, nodes);
	nodes.push_back(root);
	storeBSTNodes(root->right, nodes);
}
//==============================================
void binaryTree::runRebuild() {
	reBuildCounter++;
	root = buildTree(root);
}
//==============================================
int binaryTree::returnCounter() {
	return reBuildCounter;
}
//==============================================
bool binaryTree::isBalancedPriv(node* root) {
	int leftHeight, rightHeight;
	if (root == NULL)
		return 1;

	leftHeight = height(root->left);
	rightHeight = height(root->right);

	if (abs(leftHeight - rightHeight) <= 1 && isBalancedPriv(root->left) && isBalancedPriv(root->right))
		return 1;
	return 0;
}
//==============================================
bool binaryTree::isBalancedPub() {
	bool balanced = isBalancedPriv(root);
	return balanced;
}
//==============================================
int binaryTree::height(node* root){
	if (root == NULL)
		return 0;

	return 1 + max(height(root->left),
		height(root->right));
}
//==============================================
int binaryTree::max(int a, int b){
	return (a >= b) ? a : b;
}
//==============================================
// code is from https://www.geeksforgeeks.org/print-binary-tree-2-dimensions/
void binaryTree::print2DUtil(node *root, int space){
	// Base case  
	if (root == NULL)
		return;

	space += COUNT;
	print2DUtil(root->right, space); 
	cout << endl;
	for (int i = COUNT; i < space; i++)
		cout << " ";
	cout << root->key << "\n";
	print2DUtil(root->left, space);
}
//==============================================
// code is from https://www.geeksforgeeks.org/print-binary-tree-2-dimensions/
void binaryTree::print2D(){
		print2DUtil(root, 0);
}
//==============================================
bool binaryTree::done() {
	int hi = height(root);
	cout << "The max height of the tree is: " << hi << endl;
	return false;
}
//==============================================
bool binaryTree::buildTree(string filename, float a) {
	ifstream infile(filename.c_str());
	if (infile.is_open()) {
		int lineCount = 1;
		string line;
		while (getline(infile, line)) {
			stringstream ss(line);
			string token;
			getline(ss, token, '|');
			char letter = token.at(0);
			getline(ss, token);
			int num = atoi(token.c_str());
			if (letter == 'I') {
				a = a * 100;
				insert(num, a);
			}
			if (letter == 'D')
				Delete(num);
			if (letter == 'S')
				Search(num);
			if (letter == 'P')
				print2D();
			if (letter == 'E')
				return done();
		}

	}
}
//==============================================
