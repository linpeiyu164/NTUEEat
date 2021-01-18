/////////////it is going to delete 

import React,{useState,useEffect} from "react"
import axios from 'axios'
import instance from "../routes"
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// const API_ROOT = 'http://localhost:4000/api'
// const instance = axios.create({
//   baseURL: API_ROOT
// })

export default function Favorite(){
    const[Favorite,setFavorite]=useState("");
    const[favo_Id,setfavo_Id]=useState('');

    const getId=async()=>{
        const get=await instance.get("/User")
        try{setfavo_Id(get.data.favorites)}
        catch{}
    } 
    const loadData=async()=> {
        instance.get("/Store", {
           params: {
               id: favo_Id
           }
        })
        .then(response => {setFavorite([...Favorite,response.data.storename])});
    }
    useEffect(() => {
        if (!Favorite.length){
            getId();
            loadData();
        }    
    })
    return(
        <Paper>
        <Typography>我的最愛</Typography>
        {Favorite.map(content=>{
            <div>
                {content}
            </div>
        })}
        </Paper>
    )
}