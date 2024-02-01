const yargs = require("yargs");
const { simpanContact, listContact, detailContact, deleteContact } = require("./contact");

/* Command Tambah Data */
yargs.command({
  command: 'add',
  describe: 'Menambahkan contact baru.',
  builder: {
    nama: {
      describe: 'Nama Lengkap',
      demandOption: true,
      type: 'string'
    },
    email: {
      describe: 'Email',
      demandOption: false,
      type: 'string'
    },
    noHP: {
      describe: 'No. Handphone',
      demandOption: true,
      type: 'string'
    },
  },
  handler(argv){
    simpanContact(argv.nama, argv.email, argv.noHP);
  }
}).demandCommand();

/* Menampilkan list nama & No. HP */
yargs.command({
  command: 'list',
  describe: 'Menampilkan data nama & no. HP pada kontak.',
  handler(){
    listContact();
  }
});

/* Menampilkan List Detail Kontak */
yargs.command({
  command: 'detail',
  describe: 'Menampilkan list detail kontak berdasarkan nama.',
  builder: {
    nama: {
      describe: 'Nama Lengkap',
      demandOption: true,
      type: 'string'
    },
  },
  handler(argv){
    detailContact(argv.nama);
  }
});

/* Mengapus Data Kontak */
yargs.command({
  command: 'delete',
  describe: 'Mengapus kontak berdasarkan nama.',
  builder: {
    nama: {
      describe: 'Nama Lengkap',
      demandOption: true,
      type: 'string'
    },
  },
  handler(argv){
    deleteContact(argv.nama);
  }
});

yargs.parse();

//Cara Menggunakan Diterminal Tanpa menggunakan Tanda Backtick (``)
`node cmd add --nama="Rahulken96" --noHP="0891231245" --email="rahul@gmail.com"`