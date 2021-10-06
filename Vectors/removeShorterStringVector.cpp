#include <iostream>
#include <vector>
#include <string>

using namespace std;

/*
Will print a given vector.

@param v - vector to be printed .
@return void
*/
void printV(vector<string> v){
    for(int i = 0; i <= v.size() -1 ; i++){
        //prints the string
        cout << v[i] << endl;
    }

}

/*
Erase all occurances of a given word

@param v - vector to remove word .
@param word - the word you want to remove from vector(all occurances!)
@return vector
*/
vector<string> removeShorterString(vector<string> v, string word){
    for(int i = 0; i <= v.size()- 1; i++){
        if(v[i] == word){
            v.erase(v.begin()+i);
        } 
    }
    return v;
}

/*
Checks a vector for the smallest string and removes the smallest

@param v - vector to check .
@return vector
*/
vector<string> checkShorterString(vector<string> v){
    int vectorSize;
    int position;
    string word;
    for(int i = 0; i <= v.size()- 1; i++){
        
        if(v[i].length() < vectorSize){
            vectorSize = v[i].length();
            word = v[i];
        }
    }
    v = removeShorterString(v, word);
    return v;
}

int main(){
    vector<string> list = {"hey","test","hi","ago","tribe","ai"};
    list = checkShorterString(list);
    printV(list);
    return 0;
}

