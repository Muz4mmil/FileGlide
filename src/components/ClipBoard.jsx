import React from 'react'

function ClipBoard() {
  return (
    <div className='clipboard'>
      <p>Clip-Board</p>
      <textarea name="text-field" className='text-field' rows="10"></textarea>
      <div className="buttons">
        <div className="refresh"><i class="fa-solid fa-arrows-rotate"></i>Refresh</div>
        <div className="clear"><i class="fa-solid fa-eraser"></i>Clear</div>
      </div>
    </div>
  )
}

export default ClipBoard