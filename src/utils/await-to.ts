export const to = async <T>(promise: Promise<T>) => {
  return promise
    .then((res) => [res, null] as const)
    .catch((err) => [null, err] as const)
}
