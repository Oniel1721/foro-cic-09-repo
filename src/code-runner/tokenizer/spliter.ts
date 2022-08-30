import { Line } from "./types"

export const splitLines = (code: string):Line[]=>{
    return code.split('\r\n').map((content, index)=>({
        content,
        count: index+1,
        columns: content.length,
        id: `line-${index}`
    }))
}