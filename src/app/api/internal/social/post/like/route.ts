import { likePost } from "../../../../../../../prisma/post";

export async function POST(req: Request) {

    const { postId } = await req.json()

    if (!postId) {
        return new Response('Missing required data', {
            status
                : 400
        });
    }

    const post = await likePost(postId);

    return new Response(JSON.stringify(post));

}