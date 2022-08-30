export type Line = {
    count: number,
    columns: number,
    content: string,
    id: string
}

type TokenTypeWithStringValue = 'punctuation' | 'string' | 'keyword' | 'identifier' | 'operator' | 'range' | 'point'
type TokenTypeWithNumberValue = 'number'

export type Token = 
 | { type: TokenTypeWithStringValue, value: string, line: Line, column: number, id: string }
 | { type: TokenTypeWithNumberValue, value: number, line: Line, column: number, id: string }