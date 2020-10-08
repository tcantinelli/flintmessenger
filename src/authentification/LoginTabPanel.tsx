import React, { useRef } from 'react';

interface ILoginTabPanelProps {
	index: number;
	valueTab: number;
	children: React.ReactNode;
}

const LoginTabPanel: React.FC<ILoginTabPanelProps> = ({ index, valueTab, children }) => {
	const hidden = valueTab !== index;
	const divRef = useRef(null)

	return (
		<div ref={divRef} hidden={hidden} className="full-height">
			{children}
		</div>
	);
};

export default LoginTabPanel;
