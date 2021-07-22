export interface Entry{
    id:string;
    date:string,
    title:string;
    pictureURL:string
    description: string;
}
export function toEntry(doc):Entry{
    const entry = {id:doc.id,...doc.data() as Entry}
    return entry;
}