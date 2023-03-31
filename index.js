// express memudahkan server

// import / panggil package yg kita mau pakai pada aplikasi kita
const express = require('express');
const fs = require("fs");
const app = express();
const PORT = 3000;

// middleware
app.use(express.json());

// built in function di node js(?)
// proses baca file json nya dengan FS module, nah dibantu dengan JSON.parse
const persons = JSON.parse(fs.readFileSync(`${__dirname}/person.json`))

// url utamna dari app
// req = request
// res = response

// get post http method
// "/" = URL
app.get('/', (req, res) => {
    res.send('Hello FSW 3 luar biasa dehh !! dari server niih')
})

app.post('/', (req, res) => {
    res.send('Kita bisa ngelakuin post niii widiii kerenn')
})

// get person by ud (data satuan)
app.get('/person/:id', (req, res) => {
    // console.log(req)
    // console.log(req.params);// import atau panggil package yang kita mau pake di aplikasi kita
const express = require('express');
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());

// proses baca file json nya dengan FS module, dan json nya dibantu dibaca dengan JSON.parse
const persons = JSON.parse(fs.readFileSync(`${__dirname}/person.json`))

// url utama dari aplikasi
// req = request 
// res = response
app.get('/', (req, res) => {
    res.send('Hello FSW 3 yang luar biasa dari server nih !');
})

app.post('/', (req, res) => {
    res.send('Kita bisa ngelakuin Post di url ini');
})

app.get('/person', (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            persons: persons
        }
    })
})

// get person by id (data satuan)
// :id url parameter
app.get('/person/:id', (req, res) => {
    // console.log(req)
    // console.log(req.params);

    const id = req.params.id * 1;
    const person = persons.find(el => el.id === id);

    res.status(200).json({
        status: 'success',
        data: {
            person
        }
    })
})

// HTTP Method PUT = edit existing data
app.put('/person/:id', (req, res) => {
    const id = req.params.id * 1;
    const person = persons.find(el => el.id === id);

    res.status(200).json({
        status: 'success',
        message: `data dari id ${id} nya berhasil berubah`
    })
})

// HTTP Method DELETE = delete existing data
app.delete('/person/:id', (req, res) => {
    const id = req.params.id * 1;

    const index = persons.findIndex(element => element.id === id);
    const person = persons.find(el => el.id === id);

    if (!person) {
        res.status(400).json({
            status: 'failed',
            message: `person dengan id ${id} tersebut invalid/gak ada`
        })
    } 

    if (index !== -1) {
        persons.splice(index, 1);
    }

    fs.writeFile(
        `${__dirname}/person.json`,
        JSON.stringify(persons),
        errr => {
            res.status(200).json({
                status: 'success',
                message: `data dari id ${id} nya berhasil dihapus`
            })
        }
    )
})

app.post('/person', (req, res) => {

    console.log(persons.length - 1)
    const newId = persons.length - 1 + 10;
    const newPerson = Object.assign({ id: newId }, req.body)

    // validasi kalau name nya udh ada, maka gk bisa create data baru
    const personName = persons.find(el => el.name === req.body.name);
    console.log(personName)

    const cukupUmur = req.body.age < 20

    if (personName) {
        res.status(400).json({
            status: 'failed',
            message: `name ${req.body.name} already exist`
        })
    } else if (cukupUmur) {
        res.status(400).json({
            status: 'failed',
            message: `umur ${req.body.age} belum cukup`
        })
    } else {
        persons.push(newPerson);
        fs.writeFile(
            `${__dirname}/person.json`,
            JSON.stringify(persons),
            errr => {
                res.status(201).json({
                    status: 'success',
                    data: {
                        person: newPerson
                    }
                })
            }
        )
    }
})

// memulai server nya
app.listen(PORT, () => {
    console.log(`App running on Localhost: ${PORT}`)
})

    const id = req.params.id * 1;
    const person = persons.find(el => el.id === id);

    res.status(200).json({
        status: "success",
        data: {
            person
        }
    })
})

app.get('/person', (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            persons: persons
        }
    })
})

// HTTP Method PUT = edit existing data
app.put('/person/:id', (req, res) => {
    const id = req.params.id * 1;
    const person = persons.find(el => el.id === id);

    res.status(200).json({
        status: "success",
        message: 'data dari id ${id} nya berhasil berubah'
    })
})

// HTTP Method DELETE = delete existing data
app.delete('/person/:id', (req, res) => {
    const id = req.params.id * 1;

    const index = persons.findIndex(el => el.id === id);
    console.log(index)
    if (index !== -1) {
        persons.splice(index, 1);
    }

    fs.writeFile(
        '${__dirname}/person_json',
        JSON.stringify(persons),
        err => {
            res.status(201).json({
                status : "succes",
                data : {
                    person : newPerson
                }
            })
        }
    )

    res.status(200).json({
        status: "success",
        message: 'data dari id ${id} nya berhasil dihapus'
    })
})
app.post('/person', (req, res) => {

    console.log(persons.length - 1)
    // const newId = persons[persons.length - 1].id + 1;
    const newId = persons.length - 1 + 10;
    const newPerson = Object.assign({ id: newId }, req.body)

    persons.push(newPerson);
    fs.writeFile(
        `${__dirname}/person.json`,
        JSON.stringify(persons),
        errr => {
            res.status(201).json({
                status: 'success',
                data: {
                    person: newPerson
                }
            })
        }
    )
})

// 1) bikin proses put/edit data sukses sampai data nya teredit di file json nya
app.put('/person/:id', (req, res) => {
    const id = req.params.id * 1;
    const personIndex = persons.findIndex(el => el.id === id);
  
    // cek id apakah ada di array persons, jika ada maka akan di update dengan req.body
    if (personIndex !== -1) {
    // menggabungkan nilai dari objek person dengan nilai baru yang sudah diterima dari req.body
      persons[personIndex] = { ...persons[personIndex], ...req.body };
      res.status(200).json({
        status: 'success',
        message: `Data dengan id ${id} berhasil diubah`,
        data: persons[personIndex]
      }); return
    } else { 
      res.status(404).json({ 
        status: 'fail',
        message: `Data dengan id ${id} tidak ditemukan`
      }); return
    }

    fs.writeFile(
        `${__dirname}/person.json`,
        JSON.stringify(persons),
        errr => {
            res.status(200).json({
                status: "success",
                message: `data dari id ${id} berhasil berubah`
            })
        }
    )
  });

// 2) bikin validasi jika id tidak ditemukan dari params id nya di api get data by id, delete dan put 
app.get('/person/:id', (req, res) => {
    const id = req.params.id * 1;
    const person = persons.find(el => el.id === id);

    if (!person) {
        return res.status(404).json({
            status: "fail",
            message: "Person not found"
        });
    }

    res.status(200).json({
        status: "success",
        data: {
            person
        }
    });
});

app.delete('/person/:id', (req, res) => {
    const id = req.params.id * 1;
    const index = persons.findIndex(el => el.id === id);

    if (index === -1) {
        return res.status(404).json({
            status: "fail",
            message: "Person not found"
        });
    }

    persons.splice(index, 1);

    res.status(204).json({
        status: "success",
        data: null
    });

    fs.writeFile(
        `${__dirname}/person.json`,
        JSON.stringify(persons),
    ) 
});

app.put('/person/:id', (req, res) => {
    const id = req.params.id * 1;
    const person = persons.find(el => el.id === id);

    if (!person) {
        return res.status(404).json({
            status: "fail",
            message: "Person not found"
        });
    }

    const { name, age, eyeColor } = req.body;

    if (name) person.name = name;
    if (age) person.age = age;
    if (eyeColor) person.eyeColor = eyeColor;

    res.status(200).json({
        status: "success",
        data: {
            person
        }
    });

    fs.writeFile(
        `${__dirname}/person.json`,
        JSON.stringify(persons),
    ) 
});

// 3) bikin validasi di create/edit API utk request body
app.post('/person', (req, res) => {

    console.log(persons.length - 1);
    const newId = persons.length + 1;
    const newPerson = Object.assign({ id: newId }, req.body)

    // validasi kalau name nya udah ada, maka gabisa create data baru
    const personName = persons.find(el => el.name === req.body.name);
    console.log(personName);
    const checkData = (req.body.age && req.body.eyeColor && req.body.name ? true : false)

    const cukupUmur = req.body.age < 20;

    if (personName) {
        res.status(400).json({
            status: 'failed',
            message: `name ${req.body.name} already exist`
        })
    } else if (cukupUmur) {
        res.status(400).json({
            status: 'failed',
            message: `umur ${req.body.age} belum cukup`
        })
    } else if (!checkData) {
        res.status(400).json({
            status: 'failed',
            message: 'Data belum lengkap, silakan lengkapi data Anda'
        })
    }
    else {
        persons.push(newPerson);
        fs.writeFile(
            `${__dirname}/person.json`,
            JSON.stringify(persons),
            err => {
                res.status(201).json({
                    status: 'success',
                    data: {
                        person: newPerson
                    }
                })
            }
        )
    }
})

// memulai http server 
app.listen(PORT, () => {
    console.log(`App running on localhost: ${PORT}`)
})