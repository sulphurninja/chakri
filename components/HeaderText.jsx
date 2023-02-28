import React from 'react'


function HeaderText() {
 

  return (
    <div className='flex ml-[5%]  '>
      <div className='border-8 h-[30%] w-[30%] lg:h-[30%] lg:w-[30%]  border-dotted  rounded-lg ml-auto mr-auto text-center border-amber-400'>
        <img src='/fun.png' className='h-[100%] w-[100%] ' />
      </div>
      <div className=' '>
      <img src='/close.png' className='h-[100%] lg:h-[60%] lg:w-[100%] w-[100%]' />
      </div>
    </div>

  )
}

export default HeaderText
