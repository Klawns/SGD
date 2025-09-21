export function formatDate(dateString) {
	const [day, month, year] = dateString.split("/");
	return `${year}-${month}-${day}`;
}