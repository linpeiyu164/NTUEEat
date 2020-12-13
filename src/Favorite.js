import React from "react"
import axios from 'axios'

const API_ROOT = 'http://localhost:4000/api'
const instance = axios.create({
  baseURL: API_ROOT
})

function Favorite(){
    const[Favorite,setFavorite]=("")
    const getFavorite=async()=>{
        const get=await instance.get("/getFavorite")
        try{setFavorite(get.data.contents)}
        catch{}
    } 
    return(
        <div>
        <h1>我的最愛</h1>
        
        </div>
    )
}