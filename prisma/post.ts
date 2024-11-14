import prisma from "@/db";

export async function createPost({
    body,
    authorId,
    authorName,
    avatarUrl,
    symbol,
}: {
    body: string,
    authorId: string,
    avatarUrl: string,
    symbol: string,
    authorName: string
}
) {

    try {
        return await prisma.post.create({
            data: {
                authorId,
                authorName,
                avatarUrl,
                body,
                symbol,
            }
        })



    } catch (error) {
        console.log(`Error in createPost: ${error}`)
    }

}

export async function likePost(
    id: string,
) {

    try {
        await prisma.post.update({
            where: {
                id
            },
            data: {
                likes: {
                    increment: 1
                }
            }
        })

    } catch (error) {
        console.log(`Error in updatePostVotes: ${error}`)
    }

}

export async function getPosts() {
    try {
        const posts = await prisma.post.findMany({
            include: {
                Replies: true
            }
        })

        return posts

    } catch (error) {
        console.log(`Error in getPosts: ${error}`)
    }
}

export async function replyToPost(
    { postId, body, authorId, avatarUrl, authorName }:
        {
            postId: string,
            body: string,
            authorId: string,
            avatarUrl: string,
            authorName: string
        }
) {
    const post = await prisma.post.findUnique({
        where: {
            id: postId
        }
    })

    if (!post) {
        throw new Error('Post not found')
    }

    const reply = await prisma.reply.create({
        data: {
            postId: post.id,
            avatarUrl: avatarUrl,
            body: body,
            authorId: authorId,
            authorName: authorName
        }
    })

    return reply
}