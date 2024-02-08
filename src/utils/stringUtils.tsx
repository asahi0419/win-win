export const ToEmailSimplify = (email: any) => {
  const splits = email.split('@')

  if (splits.length !== 2) {
    return email
  }
  return `${splits[0].substr(0, 2)}${splits[0].length > 2 ? '***@' : '@'}${splits[1]}`
}
