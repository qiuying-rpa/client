export const decodeJwt = (jwt: string) => {
  const [, infoEncoded] = jwt.split(".")
  return JSON.parse(window.atob(infoEncoded));
}