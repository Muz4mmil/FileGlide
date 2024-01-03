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
    if(isMobile){
      document.querySelector('.app').style.background = active === 'files' ? '#d1f4ff70' : '#FFF2DE54'
    }
  }

  if(isMobile){
    document.querySelector('.app').style.background = active === 'files' ? '#d1f4ff70' : '#FFF2DE54'
  }

  return (
    <div className="container animate__animated animate__fadeIn animate__delay-0.5s">
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