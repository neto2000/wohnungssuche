import { json } from '@sveltejs/kit';
import fs from 'node:fs/promises';
import path from 'node:path';

export async function POST({request}) {
	

    const data = await request.formData();


    const files = data.getAll('image');

    if (!files.length) {

	return json({ error: 'no file provided' }, { status: 400 });
    }

    let image_count = files.length

    const image_paths = [];

    for (let i = 0; i < image_count; i++) {

	const buffer = Buffer.from(await files[i].arrayBuffer());

	const fileName = `${Date.now()}-${files[i].name}`;

	const filePath = path.join('static', 'uploads', fileName);


	await fs.writeFile(filePath, buffer);

	image_paths.push(fileName);
    }

    return json({paths: image_paths}, {status: 200});

}
