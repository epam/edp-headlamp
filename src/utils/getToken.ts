export function getToken(cluster: string) {
  return JSON.parse(localStorage.tokens || '{}')?.[cluster];
}