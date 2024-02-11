#include <iostream>
#include <fstream>
#include <string>
#include <vector>
using namespace std;

int main()
{
    string line;
    ifstream myfile("input_01_1.txt");
    vector<int> data;
    int count = 0;

    if (myfile.is_open())
    {
        while (getline(myfile, line))
        {
            data.push_back(stoi(line));
        }
        myfile.close();

        for (int i = 3; i < data.size(); i++) {
            if (data[i] > data[i - 3]) {
                count++;
            }
        }
        cout << count << '\n';
    }
    else {
        cout << "Unable to open file";
    }

    return 0;
}

