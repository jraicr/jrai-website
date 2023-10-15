import { promises as fs } from 'fs';
import { join } from 'path';

export async function GET({ params, request }) {
    const filePath = join(process.cwd(), 'public', 'cv-en.pdf');
    const fileBuffer = await fs.readFile(filePath);
    return new Response(fileBuffer, {
        headers: {
            'Content-Type': 'application/pdf',
        },
    });
}