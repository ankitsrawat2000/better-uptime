import { createClient } from "redis";

const client = await createClient()
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();

type WebsiteEvent = {url: string, id: string}

async function xAdd({url, id}: WebsiteEvent){
    await client.xAdd(
        'betteruptime:website', '*', {
            url,
            id
        }
      );
}  

//Note: doesn't yet send the bulk request just iterates over a for loop,
//we should fix this 
export async function xAddBulk(websites: WebsiteEvent[]) {
    for(const website of websites){
        await xAdd({
            url: website.url,
            id: website.id
        })
    }
}