// import React, { Component, ChangeEvent } from 'react';
// import { EditOutlined } from '@ant-design/icons';
// import avatars from '../../../assets/img/avatars/avatars';
// import { Flex } from '@chakra-ui/react';
// import AdminNavbarLinks from '../Navbar/NavbarLinksAdmin'
// type Props = {};

// import { useSelector, useDispatch } from 'react-redux';
// import { updateUser, activatePremium } from '../../../redux/userSlice';

// // type State = {
// // 	name: string;
// // 	surname: string;
// // 	email: string;
// // 	phone: string;
// // 	isEditing: {
// // 		name: boolean;
// // 		surname: boolean;
// // 		email: boolean;
// // 		phone: boolean;
// // 	};
// // 	isHovered: boolean;
// // };

// export default class profile extends Component<Props, State> {
// 	// state: State = {
// 	// 	name: 'John',
// 	// 	surname: 'Doe',
// 	// 	email: 'john.doe@example.com',
// 	// 	phone: '123-456-7890',
// 	// 	isEditing: {
// 	// 		name: false,
// 	// 		surname: false,
// 	// 		email: false,
// 	// 		phone: false,
// 	// 	},
// 	// 	isHovered: false,
// 	// };

// 	user = useSelector((state: any) => state.user);
//   	dispatch = useDispatch();
	
// 	handleMouseEnter = () => {
// 		this.setState({ isHovered: true });
// 	};

// 	handleMouseLeave = () => {
// 		this.setState({ isHovered: false });
// 	};

// 	handleClick = () => {
// 		const fileInput = document.getElementById('fileInput') as HTMLInputElement;
// 		if (fileInput) {
// 			fileInput.click();
// 		}
// 	};

// 	handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
// 		const file = e.target.files?.[0];
// 		if (file) {
// 			console.log(file); // Handle file upload logic here
// 		}
// 	};

// 	handleEdit = (field: keyof State['isEditing']) => {
// 		this.setState((prevState) => ({
// 			isEditing: {
// 				...prevState.isEditing,
// 				[field]: !prevState.isEditing[field],
// 			},
// 		}));
// 	};

// 	handleChange = (field: keyof State, value: string) => {
// 		this.setState({ [field]: value } as unknown as Pick<State, keyof State>);
// 	};

// 	render() {
// 		const { name, surname, email, phone, isEditing, isHovered } = this.state;

// 		return (
// 			<Flex width="100%" display="flex" direction={'column'} justify="center" align="center" gap={'40px'}>
// 				<AdminNavbarLinks
// 				onOpen={AdminNavbarLinks}
// 				secondary={false}
// 				fixed={true}
// 			/>
// 				<Flex
// 					direction="column"
// 					align="center"
// 					width={{ base: '100%', xl: '600px' }}
// 					background="#fff"
// 					padding="40px"
// 					gap={{ base: '20px', xl: '40px' }}
// 				>
// 					<div
// 						style={{
// 							position: 'relative',
// 							width: '100px',
// 							height: '100px',
// 							borderRadius: '50%',
// 							overflow: 'hidden',
// 							cursor: 'pointer',
// 						}}
// 						onMouseEnter={this.handleMouseEnter}
// 						onMouseLeave={this.handleMouseLeave}
// 						onClick={this.handleClick}
// 					>
// 						<img
// 							src={avatars.avatar1}
// 							alt="avatar"
// 							style={{
// 								borderRadius: '50%',
// 								width: '100%',
// 								height: '100%',
// 								objectFit: 'cover',
// 							}}
// 						/>
// 						{isHovered && (
// 							<div
// 								style={{
// 									position: 'absolute',
// 									top: 0,
// 									left: 0,
// 									width: '100%',
// 									height: '100%',
// 									backgroundColor: 'rgba(0, 0, 0, 0.5)',
// 									display: 'flex',
// 									alignItems: 'center',
// 									justifyContent: 'center',
// 									color: '#fff',
// 									fontSize: '24px',
// 									borderRadius: '50%',
// 								}}
// 							>
// 								<EditOutlined />
// 							</div>
// 						)}
// 						<input
// 							type="file"
// 							id="fileInput"
// 							style={{ display: 'none' }}
// 							onChange={this.handleFileChange}
// 						/>
// 					</div>

// 					<form
// 						style={{
// 							width: '100%',
// 							display: 'flex',
// 							flexDirection: 'column',
// 							gap: '20px',
// 							justifyContent: 'center',
// 							alignItems: 'center',
// 						}}
// 					>
// 						{['name', 'surname', 'email', 'phone'].map((field) => (
// 							<div
// 								key={field}
// 								style={{
// 									display: 'flex',
// 									width: '80%',
// 									gap: '20px',
// 									border: `1px solid ${!isEditing[field as keyof State['isEditing']] ? '#78747A' : '#2ACC32'}`,
// 									borderRadius: '8px',
// 									padding: '0 10px 0 4px',
// 								}}
// 							>
// 								<input
// 									style={{
// 										border: 'none',
// 										outline: 'none',
// 										boxShadow: 'none',
// 										WebkitBoxShadow: 'none',
// 										MozBoxShadow: 'none',
// 									}}
// 									type="text"
// 									value={this.state[field as keyof State] as string}
// 									placeholder={this.state[field as keyof State] as string}
// 									readOnly={!isEditing[field as keyof State['isEditing']]}
// 									onChange={(e) =>
// 										this.handleChange(field as keyof State, e.target.value)
// 									}
// 								/>
// 								<EditOutlined
// 									onClick={() => this.handleEdit(field as keyof State['isEditing'])}
// 									style={{
// 										color: isEditing[field as keyof State['isEditing']]
// 											? 'green'
// 											: 'inherit',
// 									}}
// 								/>
// 							</div>
// 						))}
// 						<button className="btn-save">Save changes</button>
// 					</form>
// 				</Flex>
// 			</Flex>
// 		);
// 	}
// }
import React from 'react'

function index() {
  return (
	<div>index</div>
  )
}

export default index