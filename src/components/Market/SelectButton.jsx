const SelectButton = ({ children, selected, onClick }) => {
	return (
		<>
			<span
				onClick={onClick}
				style={{
					border: '1px solid gold',
					borderRadius: 5,
					padding: 8,
					paddingLeft: 20,
					paddingRight: 20,
					fontFamily: 'Montserrat',
					textAlign: 'center',
					cursor: 'pointer',
					backgroundColor: selected ? 'gold' : '',
					color: selected ? 'black' : 'white',
					fontWeight: selected ? 700 : 500,
					width: '22%',
					marginBottom: '70px',
					'&:hover': {
						backgroundColor: 'gold',
						color: 'black',
					},
				}}
			>
				{children}
			</span>
		</>
	);
};

export default SelectButton;
