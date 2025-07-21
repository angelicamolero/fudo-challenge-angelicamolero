import { useState } from 'react'
import fallbackAvatar from '../../assets/default-avatar.svg' 

type AvatarProps = {
  src: string
  alt: string
  className?: string
}

export const Avatar = ({ src, alt, className }: AvatarProps) => {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => {
        setImgSrc(fallbackAvatar) 
      }}
    />
  )
}
