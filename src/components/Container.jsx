import React, { useEffect, useState } from 'react'
import Switch from './Switch'
import Files from './Files'
import ClipBoard from './ClipBoard'

function Container({bucketCode}) {
  const [isMobile, setIsMobile] = useState(false)
  const [active, setActive] = useState('files')

  useEffect(()=>{
    const handleResize = ()=>{
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return ()=>{
      window.addEventListener('resize', handleResize);
    }

  }, [])

  const handleSwitch = (component) =>{
    setActive(component)
  }

  return (
    <div className="container">
      {isMobile ? (
        <>
        <Switch onSwitchClick={handleSwitch} active={active}/>
        <div className="main">
          {active === 'files' && <Files bucketCode={bucketCode}/>}
          {active === 'clipboard' && <ClipBoard bucketCode={bucketCode}/>}
        </div>
        </>
      ) : (<div className='main'><Files bucketCode={bucketCode}/> <ClipBoard bucketCode={bucketCode}/></div>)}
    </div>
  )
}

export default Container