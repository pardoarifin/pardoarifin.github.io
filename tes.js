class Random {
  constructor(a) {
    this.angka = a;
  }
  
  sum() {
    return 5;
  }
}

class Baru extends Random {
  constructor(a, b) {
    super(a); // Memanggil constructor dari Random
    this.angkaDua = super.sum() + b + this.angka;
  }
}
//const jadi = new Random(5)
const hasil = new Baru(5,5);
console.log(hasil.angkaDua); // Output: 10
