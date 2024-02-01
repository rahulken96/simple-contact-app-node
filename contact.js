const readline = require('readline');
const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

//Membuat Folder "Data"
const dirPath = './data';
if(!fs.existsSync(dirPath)){
  fs.mkdirSync(dirPath);
}

//Membuat file "contact.json" jika belum ada
const dataPath = './data/contact.json';
if(!fs.existsSync(dataPath)){
  fs.writeFileSync(dataPath, '[]', 'utf-8');
}

//Fungsi pertanyaan
const tulisPertanyaan = (pertanyaan) => {
  return new Promise((resolve, reject) => {
    rl.question(pertanyaan, (jawaban) => {
      resolve(jawaban);
    });
  });
};

/* Ambil Data Kontak */
const loadContact = () => {
  const fileBuff = fs.readFileSync('data/contact.json', 'utf-8');
  const identitas = JSON.parse(fileBuff);
  return identitas;
}

/* Simpan Data Kontak */
const simpanContact = (nama, email, noHP) => {
  const dataDiri = {nama, email, noHP};
  const identitas = loadContact();

  //Cek Duplikat
  const duplikatNama = identitas.find((data) => {return data.nama === nama});
  const duplikatEmail = identitas.find((data) => {return data.email == email});
  if (duplikatNama || duplikatEmail) {
    console.log(
      chalk.bgRed.bold('Data telah terdaftar, silahkan isi dengan nama/email lain!')
    );
    
    rl.close();
    return false;
  }

  //cek email
  if (email && !validator.isEmail(email)) {
    console.log(
      chalk.bgRed.bold('Email tidak valid!')
    );
    
    rl.close();
    return false;
  }

  //cek NoHP
  if (!validator.isMobilePhone(noHP, 'id-ID')) {
    console.log(
      chalk.bgRed.bold('No. Handphone tidak valid!')
    );
    
    rl.close();
    return false;
  }

  identitas.push(dataDiri);
  fs.writeFileSync('data/contact.json', JSON.stringify(identitas));
  console.log(
    chalk.bgGreen.bold(`\nTerimakasih telah memasukkan data.`)
  );
  
  rl.close(); //Tutup Proses
}

/* Tampilkan Data Kontak */
const listContact = () => {
  const identitas = loadContact();
  console.log(
    chalk.bgBlueBright.bold(`Daftar Kontak :`)
  );
  identitas.forEach((list, index) => {
    console.log(`${index + 1}. ${list.nama} - ${list.noHP}`);
  });

  rl.close(); //Tutup Proses
};

/* Tampilkan Data Kontak Berdasarkan Nama */
const detailContact = (nama) => {
  const identitas = loadContact();
  const contact = identitas.find((item) => item.nama.toLowerCase() === nama.toLowerCase());

  if (!contact) {
    console.log(
      chalk.bgRed.bold(`${nama} Tidak Ditemukan!`)
    );
    
    rl.close();
    return false;
  }

  console.log(
    chalk.bgBlueBright.bold(`Data Kontak :`)
  );
  
  console.log(chalk.green.bold(`${contact.nama}`));
  console.log(chalk.green.bold(`${contact.noHP}`));
  if (contact.email) {
    console.log(chalk.green.bold(`${contact.email}`));
  }
  
  rl.close(); //Tutup Proses
}

/* Hapus Data Kontak Berdasarkan Nama */
const deleteContact = (nama) => {
  const identitas = loadContact();
  const newIdentitas = identitas.filter((item) => item.nama.toLowerCase() !== nama.toLowerCase());

  if (identitas.length === newIdentitas.length) {
    console.log(
      chalk.bgRed.bold(`${nama} Tidak Ditemukan!`)
    );
    
    rl.close();
    return false;
  }

  fs.writeFileSync('data/contact.json', JSON.stringify(newIdentitas));
  console.log(
    chalk.bgGreen.bold(`Data ${nama}, berhasil dihapus.`)
  );
  
  rl.close(); //Tutup Proses
};

module.exports = {tulisPertanyaan, simpanContact, listContact, detailContact, deleteContact};