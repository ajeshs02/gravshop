export const handleApiError = (error) => {
  console.error(error)
  throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
}
