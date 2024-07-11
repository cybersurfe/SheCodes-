#include <iostream>

int main() {
    int rad, height;
    std::cin>>rad>>height;
    double res = static_cast <double> (rad)*static_cast <double>(height);
    std::cout<<res;
    return 0;
}