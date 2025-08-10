export function useMyState<T extends any>(init?: T) {
  const [state, setState] = useState(init)

  return useCallback((...args: [T?]) => {
    if (!args.length) return state
    setState(args[0])
    return args[0]
  }, [])
}
