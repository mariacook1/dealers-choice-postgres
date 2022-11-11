const {client, syncAndSeed} = require('./db')
const express = require('express');

const app = express(); 
app.use(express.static('public'));


app.get('/', async(req, res, next)=> {
    try {
        const response = await client.query('SELECT * FROM roasters;');
        const roastersArr = response.rows;
        res.send(`
        <html>
        <head>
          <link rel="stylesheet" href="/style.css">
        </head>
        <body>
            <h1>Maria's Favorite Coffee</h1>
            <h2>Brands</h2>
            <div class = 'coffee_brands'>
                <ul>
                ${roastersArr.map(brand => `
                <li div= 'roaster_name'>
                <a href= '/roasters/${brand.id}'>
                ${brand.name}
                </a>
                </li>
                `).join('')}
                </ul>
            </div>
        </body>
        </html>
        `) 
        
    } catch (error) {
        next(error);
    }

})
app.get('/roasters/:id', async(req, res, next)  => {
    try {
        let response = await client.query('SELECT * FROM roasters WHERE id=$1;', [req.params.id]);
        const roastersArr = response.rows[0];
        response = await client.query('SELECT * FROM coffee_beans WHERE roaster_id=$1;', [req.params.id]);
        const beansArr = response.rows; 
        
        res.send(`
        <html>
        <head>
         <link rel="stylesheet" href="/style.css">
        </head>
        <body>
            <h1>Maria's Favorite Coffee</h1>
            <nav>
                <a href = "/">
                <div class= 'home'>Home</div>
                </a>
            </nav>
            <h2>${roastersArr.name}</h2>
            <div>
                <ul>
                ${beansArr.map(bean => `
                <li>
                ${bean.name} - ${bean.origin} - $${bean.price}
                </li>
                `).join('')}
                </ul>
            </div>
        </body>
        </html>
        `) 
        
    } catch (error) {
        next(error);
    } 

})

const PORT = 3000; 
app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });

const setUp = async()=>{
    try {
        await client.connect(); 
        await syncAndSeed(); 
        console.log('connected to database');
        
    } catch (ex) {
       console.log(ex); 
    }
};

setUp();  





 
