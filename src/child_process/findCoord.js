const { exec } = require('child_process');

const findCoord = (addr) => {
    exec(`python3 geocode.py ${addr}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`error: ${error.message}`);
        return;
    }

    if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
    }

    console.log(`stdout:\n${stdout}`);
    return stdout;
    });
}

//findCoord('台北市大安區基隆路三段75號')

export default findCoord;