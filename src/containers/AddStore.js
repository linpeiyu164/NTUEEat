import { Component } from 'react';
import { TextField, MenuItem, FormLabel, Button, IconButton, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { regions, avgPrice, cuisines } from '../Constants';

// Required: TextField, Select 
class AddStore extends Component {
    constructor(props){
        super(props);
        this.state = {urls: []}
    }

    handleChange = event => {
        const files = [];
        for (let file of event.target.files){
            files.push(file);
        }
        const urls = files.map(file => URL.createObjectURL(file));
        this.setState({urls: urls});
    }

    render() {
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
                    <br></br>
                    <input name="file" type="file" onChange={this.handleChange} multiple="true" accept="image/" required/>
                </div>
                <br></br>
                <div className="menus">
                    {this.state.urls.map(menu => <div className="menu-frame" id={Date.now()}><img className="menu" src={menu}/></div>)}
                </div>
            </div>
        </form>
        )
    }
}

export default AddStore;