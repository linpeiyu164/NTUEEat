import { useEffect, useState } from 'react';
import { TextField, MenuItem, FormLabel, Button, IconButton, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { regions, avgPrice, cuisines } from './Constants';

function useUrl (event) {
    const [ url, setUrl ] = useState();
    const file = event.target.files[0]
    useEffect(() => {
        setUrl(URL.createObjectURL(file))
    }, [file]);

    return url;
}

function useUrls () {
    const [ urls, setUrls ] = useState([]);
    useEffect(() => {
        setUrls(...urls)
    })

    return urls;
}

function uploaderGenerator () {
    const inputPointer = <input name="file" type="file" accept="image/" required/>
    return [
        <div id={Date.now()}>
            {inputPointer}
            <IconButton aria-label="delete" color="primary"><DeleteIcon/></IconButton>
            <br></br>
        </div>, inputPointer
    ]
}



// Required: TextField, Select 
function AddStore (props) {
    
    const [ uploaders, setUploaders ] = useState([
        
            
        
        
    ])
    const handleAddClick = () => {
        const urls = useUrls();
    }




    return (
        <form >
            <br></br>
            <TextField label="餐廳名稱" variant="outlined" required/> {'\u00A0'}
            <TextField label="電話" variant="outlined"/>
            <br></br>
            <br></br>
            <TextField label="區域" variant="outlined" select>{regions.map(region => <MenuItem value={region}>{region}</MenuItem>)}</TextField>{'\u00A0'}
            <TextField label="地址" variant="outlined" required/>
            <br></br>
            <br></br>
            <TextField label="最低品項單價" variant="outlined"/>{'\u00A0'}
            <TextField label="最高品項單價" variant="outlined"/>{'\u00A0'}
            <TextField label="平均價位" variant="outlined" select required>{avgPrice.map(price => <MenuItem value={price}>{price}</MenuItem>)}</TextField>{'\u00A0'}
            <TextField label="類別" variant="outlined" select required>{cuisines.map(cuisine => <MenuItem value={cuisine}>{cuisine}</MenuItem>)}</TextField>
            <br></br>
            <br></br>
            <div className="upload-block">
                <div className="uploaders">
                    <FormLabel>上傳至少一張菜單圖片ㄅ～{'\u00A0'}</FormLabel>
                    <Button onClick={addImgUploader} variant="outlined" color="primary">新增圖片</Button>
                    <br></br>
                    <input name="file" type="file" onChange={previewMenus} multiple="true" accept="image/" required/>
                </div>
                <br></br>
                <Menus />
            </div>
        </form>
    )
}

export default AddStore;