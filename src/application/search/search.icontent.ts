export default interface ISearchContent {
  type: string
  attributes?: object
  content: Array<string | ISearchContent>
}
