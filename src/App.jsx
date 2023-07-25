import { useState } from 'react'
import './App.css'
import Bucket from './pages/Bucket'
import Start from './pages/Start'
import './styles.scss'

function App() {

  const [bucketCode, setBucketCode] = useState(null);

  return (
    <>
      {bucketCode ? (<Bucket bucketCode={bucketCode} setBucketCode={setBucketCode}/>)
       : (<Start bucketCode={bucketCode} setBucketCode={setBucketCode}/>)}
    </>
  )
}

export default App
