
import custom_pool from "../lib/server/db"

export const load = async () => {

	


	try {

		const [rows,fields] = await custom_pool.query('SELECT * from user')

		console.log(rows)
	} catch (err) {
		console.log(err)
	}	
	


	return {
		test: "lol"
	}
}
