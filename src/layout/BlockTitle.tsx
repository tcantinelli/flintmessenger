import React from 'react';

interface IBlockTitleProps {
	title: string;
}

const BlockTitle: React.FC<IBlockTitleProps> = ({ title }) => {
	return (
		<h3 style={styles.title} className="abs">
			{title}
		</h3>
	);
};

export default BlockTitle;

const styles = {
	title: {
		position: 'relative' as const,
		padding: '0px 10px',
		width: 'max-content',
		backgroundColor: 'white',
		bottom: '25px',
		margin: '10px 0px 0px 20px',
		color: '#2BAACA',
		fontSize: '1.4rem'
	}
}