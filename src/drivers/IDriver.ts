export default interface IDriver {
  process (action: string, data?: object): string[]
}
