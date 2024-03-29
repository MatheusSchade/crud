export default interface FunctionButtonTp {
  text: string,
  click?: (event: { preventDefault: () => void } | (() => void)) => void
  alt?: string
  isLoading?: boolean
}
