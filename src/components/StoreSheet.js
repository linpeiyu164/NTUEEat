import { useEffect, useState } from 'react';
import { TextField, MenuItem, FormLabel, Button, IconButton, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
const regions = ['公館', '118巷', '溫州街'];
const avgPrice = ['< $100', '$100 ~ $150', '$150 ~ $200', '$200 ~ $250', '$250 ~ $300', '> $300'];
const cuisines = ['台式', '中式', '韓式', '日式', '南洋', '義式', '其他']; 

const useStyles = makeStyles((theme)=>({
    root: {
        flexGrow: 1,
        // position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    FormControl:{
        margin:theme.spacing(5),
        minWidth:280,
        minHeight:3,
        alignSelf: 'flex-end',
        flexGrow: 1,
        
    },
    toolbar: {
        minHeight: 128,
        alignItems: 'fixed-end',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
    },
    button:{
        marginLeft : theme.spacing(2),
        alignSelf: 'flex',
    },
    Avatar:{
        margin:theme.spacing(0),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    paper : {
        marginTop : theme.spacing(16),
        marginRight : theme.spacing(2),
        marginLeft : theme.spacing(2),
        padding : theme.spacing(2)
    },
    box2 : {
        margin : theme.spacing(2),
        backgroundColor: "#D4E6F1",
        borderRadius:20,
        padding : theme.spacing(2)
    },
}))
// Required: TextField, Select 
function StoreSheet (props) {
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

export default StoreSheet;