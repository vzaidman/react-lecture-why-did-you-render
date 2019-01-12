import React from 'react'
import ImageUploader from 'react-images-upload'

export default React.memo(({avatar, onChange}) => {
  console.log('AvatarField render')

  return (
    <ImageUploader
      withIcon
      singleImage
      withPreview
      defaultImage={avatar}
      buttonText='Choose Avatar'
      onChange={images => {
        if (!images.length) {
          onChange(null)
          return
        }
        const reader = new FileReader()
        reader.readAsDataURL(images[0])
        reader.onload = () => onChange(reader.result)
      }}
      imgExtension={['.jpg', '.gif', '.png', '.gif']}
    />
  )
})
