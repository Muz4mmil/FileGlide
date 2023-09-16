import { useState } from 'react'
import './App.css'
import Bucket from './pages/Bucket'
import Start from './pages/Start'
import './styles.scss'

function App() {

  const [bucketCode, setBucketCode] = useState(null);

  return (
    <div className={ bucketCode ? "app" : "app start-bg"}>
      {bucketCode ? (<Bucket bucketCode={bucketCode} setBucketCode={setBucketCode}/>)
       : (<Start bucketCode={bucketCode} setBucketCode={setBucketCode}/>)}
    </div>
  )
}

export default App
