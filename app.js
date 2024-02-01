const {tulisPertanyaan, simpanContact} = require('./contact');

const main = async() => {
  const nama = await tulisPertanyaan('Masukkan nama anda : ');
  const email = await tulisPertanyaan('Masukkan email anda : ');
  const noHP = await tulisPertanyaan('Masukkan No. HP anda : ');

  simpanContact(nama, email, noHP);
}

main();