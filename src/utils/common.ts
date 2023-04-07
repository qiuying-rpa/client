export const uuid = () => {
  const url = URL.createObjectURL(new Blob())
  return url.slice(url.lastIndexOf('/') + 1)
}

export const deepCopy = (src: any) => JSON.parse(JSON.stringify(src))