import React from "react";
import Files from "../components/Files";
import Header from "../components/Header";
import Container from "../components/Container";


const Bucket = ()=>{

    let bucketCode = 'test'


    return (
        <>
            <Header bucketCode={bucketCode}/>
            <Container bucketCode={bucketCode}/>
        </>
    )
}

export default Bucket;