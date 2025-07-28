const Footer = () => {
	return (
		<footer className='footer'>
			<div className='container-sm footer__content'>
				<div>
					<p>CineFlix is a personal project and is not affiliated with any existing product of the same name.</p>
				</div>
				<div>
					<strong>© {new Date().getFullYear()} João Rodrigues</strong>
					<a href='https://github.com/Joao0330' target='_blank'>
						Visit my GitHub
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
