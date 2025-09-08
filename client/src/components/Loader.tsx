export const Loader = () => {
	return (
		<div className='loader dark'>
			<svg viewBox='25 25 50 50'>
				<circle r='20' cy='50' cx='50'></circle>
			</svg>
			<div>
				<span>Loading...</span>
				<p>Please be patient, this loading process may take up to 1 minute or more when first visiting the site after a while due to server limitations.</p>
			</div>
		</div>
	);
};
