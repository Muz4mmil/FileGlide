import React from "react";
import Files from "../components/Files";
import Header from "../components/Header";
import Container from "../components/Container";


const Bucket = ({ bucketCode, setBucketCode }) => {

    return (
        <>
            <Header bucketCode={bucketCode} setBucketCode={setBucketCode} />
            <Container bucketCode={bucketCode} />
        </>
    )
}

export default Bucket;