import { redirect } from "@sveltejs/kit";


export async function GET({cookies}) {
	
    cookies.delete('id', { path: '/' }); 

    throw redirect(303, "/")

}
