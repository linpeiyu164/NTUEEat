import { Component } from 'react';
import { TextField, MenuItem, FormLabel, Button, IconButton, makeStyles } from '@material-ui/core';
import { regions, avgPrice, cuisines } from '../Constants';

// Required: TextField, Select 
class AddStore extends Component {
    constructor(props){
        super(props);
        this.state = {
            urls: [],
            restaurant: null,
            phone: null,
            dist: null,
            address: null,
            min: null,
            max: null,
            avg: null,
            cuisine: null
        }
    }

    handleChange = event => {
        const files = [];
        
        if (event.target.files){
            for (let i=0; i< event.target.files.length; i++){
                files.push(event.target.files.item(i));
            }
            const urls = files.map(file => URL.createObjectURL(file));
            this.setState({urls: urls});
        }
        
    }

    handleValueChange = cap => {
        const handleChange = event => {
            const renew = new Object;
            renew[cap] = event.target.value;
            this.setState(renew);
            console.log(this.state)
        }
        return handleChange;
    }

    hintMessage = option => {
        return `「${option}」是必填項目\n`
    }

    handleValidation = () => {
        let message  = "";
        for (let option of Object.keys(this.state)) {
            console.log("option: ", option)
            if (this.state[option] === null){
                if (option === 'restaurant'){
                    message += this.hintMessage("餐廳名稱")
                } else if (option === 'dist') {
                    message += this.hintMessage("區域")
                } else if (option === 'address') {
                    message += this.hintMessage("地址")
                } else if (option === 'avg') {
                    message += this.hintMessage("平均價位")
                } else if (option === 'cuisine') {
                    message += this.hintMessage("類別")
                }
            }
        }
        
        if (this.state.urls.length === 0) {
            message += "至少上傳一張菜單圖片"
            alert(message)
            return
        }
        
    }

    render() {
        return (
            <form>
                <br></br>
                <TextField label="餐廳名稱" variant="outlined" autoFocus={true} onChange={this.handleValueChange('restaurant')} required/> {'\u00A0'}
                <TextField label="電話" variant="outlined" onChange={this.handleValueChange('phone')}/>
                <br></br>
                <br></br>
                <TextField label="區域" variant="outlined" onChange={this.handleValueChange('dist')} select>{regions.map(region => <MenuItem key={region} value={region}>{region}</MenuItem>)}</TextField>{'\u00A0'}
                <TextField label="地址" variant="outlined" onChange={this.handleValueChange('address')} required/>
                <br></br>
                <br></br>
                <TextField label="最低品項單價" variant="outlined" onChange={this.handleValueChange('min')}/>{'\u00A0'}
                <TextField label="最高品項單價" variant="outlined" onChange={this.handleValueChange('max')}/>{'\u00A0'}
                <TextField label="平均價位" variant="outlined" onChange={this.handleValueChange('avg')} select required>{avgPrice.map(price => <MenuItem key={price} value={price}>{price}</MenuItem>)}</TextField>{'\u00A0'}
                <TextField label="類別" variant="outlined" onChange={this.handleValueChange('cuisine')} select required>{cuisines.map(cuisine => <MenuItem key={cuisine} value={cuisine}>{cuisine}</MenuItem>)}</TextField>
                <br></br>
                <br></br>
                <div className="upload-block">
                    <div className="uploaders">
                        <FormLabel>上傳至少一張菜單圖片ㄅ～{'\u00A0'}</FormLabel>
                        <br></br>
                        <input name="file" type="file" onChange={this.handleChange} multiple={true} accept="image/" required/>
                    </div>
                    <br></br>
                    <div className="menus">
                        {this.state.urls.map(menu => <div className="menu-frame" key={Date.now()}><img className="menu" src={menu}/></div>)}
                    </div>
                </div>
                <br></br>
                <Button onClick={this.handleValidation} variant="outlined">送出</Button>
            </form>
        )
    }
}

export default AddStore;