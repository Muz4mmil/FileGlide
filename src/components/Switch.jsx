import React from 'react'

function Switch({onSwitchClick, active}) {
  return (
    <div className='switch'>
      <div className={`file-switch ${active === 'files' ? 'active' : ''}`} 
        onClick={()=> onSwitchClick('files')}>
          File Transfer
        </div>
      <div className={`cb-switch ${active === 'clipboard' ? 'active' : ''}`}
        onClick={()=> onSwitchClick('clipboard')}>
          ClipBoard
      </div>
      <div className="slider"></div>
    </div>
  )
}

export default Switch
