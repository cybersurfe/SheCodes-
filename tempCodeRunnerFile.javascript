function isWindy(speed, unit) {
    if (speed>5 && unit == 'metric'){
        return true;
    }else {
        return false;
      }
  };
if(isWindy == true){
   alert("It is windy");
} else {
   alert("It is not windy");
}
isWindy(2, 'imperial');
isWindy(20, 'metric');