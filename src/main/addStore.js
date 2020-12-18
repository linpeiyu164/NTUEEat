import { useEffect, useState } from 'react';
import { TextField, MenuItem, FormLabel, Button, IconButton, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const regions = ['公館', '118巷', '溫州街'];
const avgPrice = ['< $100', '$100 ~ $150', '$150 ~ $200', '$200 ~ $250', '$250 ~ $300', '> $300'];
const cuisines = ['台式', '中式', '韓式', '日式', '南洋', '義式', '其他']; 

function useMenus() {
    const [menus, setMenus] = useState([]);
}

// Required: TextField, Select 
function AddStore (props) {
    const [menus, setMenus] = useState([]);

    const previewMenus = (event, menus=menus) => {
        console.log('menus', menus)
        setMenus([...menus, URL.createObjectURL(event.target.files[0])]);
    }

    const [imgUploaders, setImgUploaders] = useState([<div><input name="file" type="file" onChange={previewMenus} accept="image/" required/><br></br></div>]);

    const removeImgUploader = index => {
        setImgUploaders(imgUploaders.filter(loader => loader.index !== index));
    }

    const addImgUploader = () => {
        const index = imgUploaders.length;
        setImgUploaders(
            [...imgUploaders, 
            <div index={index}>
                <input name="file" type="file" onChange={previewMenus} accept="image" required/>
                <IconButton aria-label="delete" color="primary" onClick={() => removeImgUploader(index)}><DeleteIcon/></IconButton>
                <br></br>
            </div>
        ]);
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
                    {imgUploaders.map(uploader => uploader)}
                </div>
                <br></br>
                <div className="menus">
                    {menus.map(menu => <div className="menu-frame" id={Date.now()}><img className="menu" src={menu}/></div>)}
                </div>
            </div>
        </form>
    )
}

export default AddStore;