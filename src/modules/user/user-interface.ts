export type Tuser = {
    id: string,    
    password: string,
    needsPasswordChange : boolean, 
    role : 'admin' | 'student' | 'faculty' ,
    status : 'in-progress' | 'blocked',
    isdeleted : boolean
} 
//  export type NewUser = {
//     password: string
//     role:string
//     id: string
// }