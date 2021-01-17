import { Component } from 'react';
import { uploadStoreInfo } from '../routes/routes';
import { TextField, MenuItem, FormLabel, Button, IconButton, Snackbar, Box, Grid, Paper, Typography} from '@material-ui/core';
import { regions, avgPrice, cuisines } from '../Constants';
import { FreeBreakfastOutlined, RedeemRounded} from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Redirect } from 'react-router-dom'
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    root: {
      backgroundColor: "red"
    },
    paper : {
        padding : theme.spacing(4),
        marginTop : theme.spacing(15)
    },
    paper2 : {
        padding : theme.spacing(2),
        margin : theme.spacing(1),
        maxWidth : '100%',
        maxHeight : '100%',
    },
    box : {
        backgroundColor: "#D4E6F1",
        borderRadius:20,
        padding : theme.spacing(2),
        marginTop : theme.spacing(2),
        marginBottom : theme.spacing(2),
    },
    box2 : {
        maxWidth : '40%',
        maxHeight : '40%',
    },
    box3 : {
        backgroundColor: "#F2EDEB",
        borderRadius:20,
        padding : theme.spacing(2),
        marginTop : theme.spacing(2),
        marginBottom : theme.spacing(2),
    },
    box4 : {
        backgroundColor: "#F7F0F5",
        borderRadius:20,
        padding : theme.spacing(2),
        marginTop : theme.spacing(2),
        marginBottom : theme.spacing(2),
    },
});

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
            cuisine: null,
            errormessage: null,
            error : false,
            success : false
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

    handleSubmit = async(e) => {
        e.preventDefault();
        const sendData = async () => {
            const parsedData = { 
                images: this.state.urls 
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
            console.log(res)
            // res should either be success or the error message
            if(res === "success"){
                this.setState({
                    success : true
                })
            }else if(res !== "success"){
                this.setState({
                    error: true,
                    errormessage : res
                })
            }
            if (res == 'error') {
                this.setState({
                    errormessage: '系統出了一點問題QAQ 拜託再試一次Orz'
                })
            }
        }
        sendData();
    }

    handleSnackbarClose = () => {
        this.setState({
            error : false
        })
    }
    render() {
        const { classes } = this.props;
        return (
            <>
            {(!this.state.success) ? (
            <Paper className={classes.paper}>
            <Box className={classes.box}><Typography variant="h3">表單</Typography></Box>
            <form onSubmit={this.handleSubmit}>
            <Grid container spacing={3} justify="center">
                <Grid item xs={6}><Box className={classes.box3}><TextField label="餐廳名稱" variant="outlined" autoFocus={true} onChange={this.handleValueChange('restaurant')} required/></Box></Grid>
                <Grid item xs={6}><Box className={classes.box3}><TextField label="電話" variant="outlined" onChange={this.handleValueChange('phone')}/></Box></Grid>
                
                <Grid item xs={6}><Box className={classes.box4}><TextField label="區域" variant="outlined" onChange={this.handleValueChange('dist')} select>{regions.map(region => <MenuItem key={region} value={region}>{region}</MenuItem>)}</TextField></Box></Grid>
                <Grid item xs={6}><Box className={classes.box4}><TextField label="地址" variant="outlined" onChange={this.handleValueChange('address')} required/></Box></Grid>
                
                <Grid item xs={6}><Box className={classes.box3}><TextField label="最低品項單價" variant="outlined" onChange={this.handleValueChange('min')}/></Box></Grid>
                <Grid item xs={6}><Box className={classes.box3}><TextField label="最高品項單價" variant="outlined" onChange={this.handleValueChange('max')}/></Box></Grid>
                <Grid item xs={6}><Box className={classes.box4}><TextField label="平均價位" variant="outlined" onChange={this.handleValueChange('avg')} select required>{avgPrice.map(price => <MenuItem key={price} value={price}>{price}</MenuItem>)}</TextField></Box></Grid>
                <Grid item xs={6}><Box className={classes.box4}><TextField label="類別" variant="outlined" onChange={this.handleValueChange('cuisine')} select required>{cuisines.map(cuisine => <MenuItem key={cuisine} value={cuisine}>{cuisine}</MenuItem>)}</TextField></Box></Grid>
                <Grid item xs={12}>
                    <Box className={classes.box} justifyContent="center">
                        <div><Typography>上傳至少一張菜單圖片ㄅ～</Typography></div>
                        <input name="file" type="file" onChange={this.handleChange} multiple={true} accept="image/" required/>
                    </Box>
                <Grid item container>
                    {this.state.urls.map(menu => 
                    <Grid item>
                        <Paper className={classes.paper2} key={Date.now()}>
                            <img className="menu" src={menu}/>
                        </Paper>
                    </Grid>)
                    }
                </Grid>
                <Grid item><Button type="submit" variant="outlined">送出</Button></Grid>
                </Grid>
                </Grid>
            </form>
            <Snackbar 
                anchorOrigin={{ vertical : 'top', horizontal : 'right' }}
                open={this.state.error} 
                onClose={this.handleSnackbarClose}
                autoHideDuration={2000} 
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleSnackbarClose} >
                        <HighlightOffIcon fontSize="small"/>
                    </IconButton>
                }
            >
                <Alert severity="error" onClose={this.handleSnackbarClose}>
                {(this.state.error) ? `${this.state.errormessage}` : null}
                </Alert>
            </Snackbar>
            </Paper>) : <Redirect to="/" />
            }
            </>
        )
    }
}

export default withStyles(styles)(AddStore);