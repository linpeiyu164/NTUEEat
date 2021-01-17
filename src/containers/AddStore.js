import { Component } from 'react';
import { uploadStoreInfo } from '../routes/routes';
import { TextField, MenuItem, FormLabel, Button, IconButton, makeStyles } from '@material-ui/core';
import { regions, avgPrice, cuisines } from '../Constants';
import { FreeBreakfastOutlined, RedeemRounded } from '@material-ui/icons';

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
        if (event.target.files){
            const files = Array.from(event.target.files);
           files.forEach(file => {
               const reader = new FileReader();
               reader.readAsDataURL(file);
               reader.onloadend = () => {
                   this.setState((prev) => ({
                    urls: [...prev.urls, reader.result]
                   }))
               }
           });
          
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

    handleSubmit = (e) => {
        e.preventDefault();
        const sendData = async () => {
            const parsedData = { //images: this.state.urls 
            };
            for (let [key, value] of Object.entries(this.state)) {
                switch(key){
                    case 'restaurant':
                        parsedData.storename = value;
                        break;
                    case 'phone':
                        parsedData.phone = value;
                        break;
                    case 'dist':
                        parsedData.location = value;
                        break;
                    case 'address':
                        parsedData.address = value;
                        break;
                    case 'min':
                        if (value) parsedData.lowestPrice = value;
                        break;
                    case 'max':
                        if (value) parsedData.highestPrice = value;
                        break;
                    case 'avg':

                        parsedData.avgPrice = value;
                        break;
                    case 'cuisine':
                        parsedData.type = value;
                        break;
                }

            }
            console.log("data: ", parsedData)
            const res = await uploadStoreInfo(JSON.stringify(parsedData));
            console.log("res: ", res)

            // Redirection!!!!!!!!!!!!!!!!!!!!!!!!
            if (res === 'error') {
                alert('系統出了一點問題QAQ 拜託再試一次Orz')
            }
        }
        sendData();
    }
        
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
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
                <Button type="submit" variant="outlined">送出</Button>
            </form>
        )
    }
}

export default AddStore;