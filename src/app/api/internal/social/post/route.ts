import { createPost, getPosts } from "../../../../../../prisma/post";

export async function POST(req: Request) {

    const { body, authorId, symbol, avatarUrl, authorName } = await req.json()

    if (!body) {
        return new Response('Missing required data', {
            status
                : 400
        });
    }

    const post = await createPost({
        body,
        authorId,
        avatarUrl,
        symbol,
        authorName
    });


    return new Response(JSON.stringify(post));

}

export async function GET(req: Request) {

    const posts = await getPosts();

    return new Response(JSON.stringify(posts));
}