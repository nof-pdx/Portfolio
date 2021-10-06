#include <iostream>
#include <vector>

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
Reverse a given vector

@param v - vector to be printed .
@param start - the starting point for the size of our vector (usally is 0) .
@param end - the max size of our vector.
@return vector
*/
vector<string> reverse(vector<string> v, int start, int end){
    while(start < end){
        string temp = v[start];
        v[start] = v[end];
        v[end] = temp;
        start++;
        end--;
    }
    return v;
}

int main(){
    vector<string> list = {"1","2","3","4","5"};
    list = reverse(list, 0 , 4);
    printV(list);
    return 0;
}

