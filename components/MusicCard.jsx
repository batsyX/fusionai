import React from 'react'

const MusicCard = ({album,artist,link}) => {
  return (
    <div className='w-[300px] h-[350px] bg-gray-800 rounded-xl flex flex-col gap-2 p-4 relative'>
        <div>
            <img src={album?.cover_big} alt="album" className="w-full h-48 object-cover rounded-xl"/>
        </div>
        <h3  className='text-gray-400'>Song : <span>{album?.title}</span></h3>
        <h3  className='text-gray-400'>Artist : <span>{artist?.name}</span></h3>
        <audio controls className='w-full absolute left-0 bottom-0 bg-gray-100 rounded-b-xl '>
            <source src={link} />
        </audio>
    </div>
  )
}

export default MusicCard