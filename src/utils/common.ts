export const uuid = () => {
  const url = URL.createObjectURL(new Blob())
  return url.slice(url.lastIndexOf('/') + 1)
}