export type MemberDTO = {
    name: string;
    email: string;
    photo: string;
}

export type Member = MemberDTO & {
    id: string | null;   
};