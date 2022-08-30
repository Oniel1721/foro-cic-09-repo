export enum Keyword {
    If='if',
    Else='else',
    True='true',
    False='false',
    Loop='while',
}

export enum Operator {
    Sum='+',
    Sub='-',
    Mul='*',
    Div='/',
    Mod='%',
    Equal='=',
    Minor='<',
    Mayor='>',
    Or='|',
    And='&',
    Not='!'
}

type Whitespace = " " | "\t" | "\n"

export type Syntax = {
    keywords: Keyword[]
    operators: Operator[]
    whitespaces: Whitespace[]
    digitRegex: RegExp
    startIdentifierRegex: RegExp
    punctuations: string[]
    point: string,
    comment: string,
    string: string
}
