const { exec } = require('child_process');

const findCoord = (addr) => {
    let coord;
    console.log('env: ', process.cwd());
    const execute = new Promise((resolve, reject) => {
        exec(`python3 geocode.py ${addr}`, {cwd: './child_process'}, async (error, stdout, stderr) => {
            if (error) {
                console.error(`error: ${error.message}`);
                reject('error')
                return;
            }

            if (stderr) {
                console.error(`stderr: ${stderr}`);
                reject('stderr')
                return;
            }
            console.log(`stdout:\n${stdout}`);
            //coord = stdout;
            resolve(stdout)
            console.log('json', JSON.parse(stdout))
            return
        });
    })
    return execute
            .then(res => {
                console.log('res: ', res)
                return res})
            .catch(err => {
                throw err
            })
    /*=> {
        exec(`python3 geocode.py ${addr}`, {cwd: './child_process'}, async (error, stdout, stderr) => {
            if (error) {
                console.error(`error: ${error.message}`);
                return;
            }

            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }
            console.log('1')
            console.log(`stdout:\n${stdout}`);
            coord = stdout;
        });
    }
    */
    
}

//findCoord('dsgds')

module.exports = findCoord;