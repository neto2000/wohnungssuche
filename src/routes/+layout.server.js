export const load = ({cookies}) => {
    
    let id = cookies.get("id")

    return {
	user_id: id
    };
};
