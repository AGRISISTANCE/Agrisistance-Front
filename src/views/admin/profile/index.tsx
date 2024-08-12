import React, { Component } from 'react';
import { EditOutlined } from '@ant-design/icons';
import avatars from '../../../assets/img/avatars/avatars'
import { Flex } from '@chakra-ui/react';
type Props = {};

type State = {
	name: string;
	surname: string;
	email: string;
	phone: string;
	isEditing: {
		name: boolean;
		surname: boolean;
		email: boolean;
		phone: boolean;
	};
};

export default class Login extends Component<Props, State> {
	state: State = {
		name: 'John',
		surname: 'Doe',
		email: 'john.doe@example.com',
		phone: '123-456-7890',
		isEditing: {
			name: false,
			surname: false,
			email: false,
			phone: false,
		},
	};

	handleEdit = (field: keyof State['isEditing']) => {
		this.setState((prevState) => ({
			isEditing: {
				...prevState.isEditing,
				[field]: !prevState.isEditing[field],
			},
		}));
	};

	handleChange = (field: keyof State, value: string) => {
		this.setState({ [field]: value } as unknown as Pick<State, keyof State>);
	};

	render() {
		const { name, surname, email, phone, isEditing } = this.state;

		return (
			<Flex
				width='100%'
				display='flex'
				justify='center'
				align='center'
			>
				<Flex
					direction='column'
					align='center'
					mt='44'
					width={{ base: '100%', xl: '600px' }}
					background='#fff'
					padding='40px'
					gap={{ base: '20px', xl: '40px' }}
				>
					<img src={avatars.avatar1} style={{
						borderRadius: '50%',
						width: '100px',
					}} />
					<form style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center', alignItems: 'center' }}>
						<div style={{
							display: 'flex',
							width: '80%',
							gap: '20px',
							border: `1px solid ${!this.state.isEditing.name ? '#78747A' : '#2ACC32'} `,
							borderRadius: '8px',
							padding: '0 10px 0 4px'
						}}>
							<input
								style={{
									border: 'none',
									outline: 'none',
									boxShadow: 'none',
									WebkitBoxShadow: 'none',
									MozBoxShadow: 'none',
								}}
								type="text"
								value={name}
								placeholder={name}
								readOnly={!isEditing.name}
								onChange={(e) => this.handleChange('name', e.target.value)}
							/>
							<EditOutlined
								onClick={() => this.handleEdit('name')}
								style={{ color: isEditing.name ? 'green' : 'inherit' }}
							/>
						</div>
						<div style={{
							display: 'flex',
							width: '80%',
							gap: '20px',
							border: `1px solid ${!this.state.isEditing.surname ? '#78747A' : '#2ACC32'} `,
							borderRadius: '8px',
							padding: '0 10px 0 4px'
						}}>
							<input
								style={{
									border: 'none',
									outline: 'none',
									boxShadow: 'none',
									WebkitBoxShadow: 'none',
									MozBoxShadow: 'none',
								}}
								type="text"
								value={surname}
								placeholder={surname}
								readOnly={!isEditing.surname}
								onChange={(e) => this.handleChange('surname', e.target.value)}
							/>
							<EditOutlined
								onClick={() => this.handleEdit('surname')}
								style={{ color: isEditing.surname ? 'green' : 'inherit' }}
							/>
						</div>
						<div style={{
							display: 'flex',
							width: '80%',
							gap: '20px',
							border: `1px solid ${!this.state.isEditing.email ? '#78747A' : '#2ACC32'} `,
							borderRadius: '8px',
							padding: '0 10px 0 4px'
						}}>
							<input
								style={{
									border: 'none',
									outline: 'none',
									boxShadow: 'none',
									WebkitBoxShadow: 'none',
									MozBoxShadow: 'none',
								}}
								type="text"
								value={email}
								placeholder={email}
								readOnly={!isEditing.email}
								onChange={(e) => this.handleChange('email', e.target.value)}
							/>
							<EditOutlined
								onClick={() => this.handleEdit('email')}
								style={{ color: isEditing.email ? 'green' : 'inherit' }}
							/>
						</div>
						<div style={{
							display: 'flex',
							width: '80%',
							gap: '20px',
							border: `1px solid ${!this.state.isEditing.phone ? '#78747A' : '#2ACC32'} `,
							borderRadius: '8px',
							padding: '0 10px 0 4px'
						}}>
							<input
								style={{
									border: 'none',
									outline: 'none',
									boxShadow: 'none',
									WebkitBoxShadow: 'none',
									MozBoxShadow: 'none',
								}}
								type="text"
								value={phone}
								placeholder={phone}
								readOnly={!isEditing.phone}
								onChange={(e) => this.handleChange('phone', e.target.value)}
							/>
							<EditOutlined
								onClick={() => this.handleEdit('phone')}
								style={{ color: isEditing.phone ? 'green' : 'inherit' }}
							/>
						</div>
						<button className='btn-save'>
							save changes
						</button>
					</form>
				</Flex>
			</Flex>
		);
	}
}
