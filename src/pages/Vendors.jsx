import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Vendors=()=>{
    const [vendors,setVendors]=useState([]);
    const [showform,setShowForm]=useState(false);
    const [newvendors,setNewvendors]=useState({
        name:"",
        address:"",
        
    })
}