const SelectButton = ({ children, selected, onClick }) => {
	return (
		<>
			<span
				onClick={onClick}
				style={{
					border: '1px solid #00ff1a',
					borderRadius: 5,
					padding: 8,
					paddingLeft: 20,
					paddingRight: 20,
					fontFamily: 'Montserrat',
					textAlign: 'center',
					cursor: 'pointer',
					backgroundColor: selected ? '#00ff1a' : '',
					color: selected ? 'black' : 'white',
					fontWeight: selected ? 700 : 500,
					width: '22%',
					marginBottom: '50px',
					'&:hover': {
						backgroundColor: '#00ff1a',
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
