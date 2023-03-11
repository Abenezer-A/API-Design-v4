const fs = require('fs/promises')
const path = require('path')
const read = async () => {
    const result = fs.readFileSync(path.join(__dirname, 'package.json'));
    console.log(result) 
}
read().then(f => console.log(f))
