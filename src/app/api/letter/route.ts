import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export const GET = async () => {
    const letter = await prisma.letter.findMany();
    return NextResponse.json(letter);
}

interface PostRequestBody {
    title: string;
    content: string;
    author: string;
}

export const POST = async (req: Request): Promise<Response> => {
    const json: PostRequestBody = await req.json();
    const { title, content, author } = json;

    // data validation
    if (!title || !content || !author) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = await prisma.letter.create({
        data: {
            title,
            content,
            author,
        },
    });

    return NextResponse.json(result);
};

interface DeleteRequestBody {
    id: string;
}

export const DELETE = async (req: Request): Promise<Response> => {
    const json: DeleteRequestBody = await req.json();
    const { id } = json;

    const result = await prisma.letter.delete({
        where: {
            id: id,
        },
    });

    return NextResponse.json(result);
}