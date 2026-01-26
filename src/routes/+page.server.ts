import type {PageLoad} from "./$types"
import {TEST} from "$env/static/private"

export const load: PageLoad = async () => {

	
	console.log("load")

	return {
		test: TEST
	}
}
