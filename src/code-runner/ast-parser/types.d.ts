import { Token } from "../tokenizer/types"
export type NumberAST = { type: 'number', value: number, token: Token, id: string  }
export type RangeAST = { type: 'range', value: string, token: Token, id: string  }
export type StringAST = { type: 'string', value: string, token: Token, id: string  }
export type BooleanAST = { type: 'boolean', value: boolean, token: Token, id: string  }
export type IdentifierAST = { type: 'identifier', value: string, token: Token, id: string  } // value: variable name


export type TypeAndValueAST = 
| NumberAST
| StringAST
| BooleanAST
| RangeAST
| IdentifierAST

export type CallAST = { type: 'call', function: IdentifierAST,  params: AST[] | BinaryAST[], token: Token, id: string }

export type RightAndConditionAST = TypeAndValueAST | BinaryAST | CallAST

export type BinaryOperators =  "+" | "-" | "*" | "/" | "%" | "==" | "&" | "|" | "<" | "<=" | ">" | ">=" | "!=" | '**'

export type BinaryAST = { type: 'binary', operator: BinaryOperators, left: TypeAndValueAST, right: RightAndConditionAST, token: Token, id: string  }

export type ScopeAST = { type: 'scope', body: AST[], id: string }

export type AssignAST = { type: 'assign', operator: '=', left: IdentifierAST, right: RightAndConditionAST, token: Token, id: string  }

export type FunctionAST = { type: 'function', args: IdentifierAST[], scope: ScopeAST, token: Token, id: string  }

export type IfAST = { type: 'if', condition: RightAndConditionAST,  then: ScopeAST, else?: ScopeAST, token: Token, id: string  }

export type WhileAST = { type: 'while', condition: RightAndConditionAST,  then: ScopeAST, else?: ScopeAST, token: Token, id: string  }

export type ProgramAST = { type: 'program', program: AST[], id: string }


export type AST = 
  | TypeAndValueAST
  | BinaryAST
  | AssignAST
  | CallAST
  | FunctionAST
  | IfAST
  | WhileAST
  | ProgramAST
  | ScopeAST






