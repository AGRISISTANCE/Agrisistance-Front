import {
	Flex, Text, Box, Progress, CircularProgress, CircularProgressLabel, FormHelperText, Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark,
	Tooltip,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import cropsData from './img/crops';
import land from '../../../assets/img/land/land';
import { Button } from '../../../common/Button/index'
import TotalSpent from '../default/components/TotalSpent';
import { Console } from 'console';
import BusinessPlanModal from './components/BusinessPlanModal';
import ConfirmationPopup from 'common/Popup/ConfirmationPopup';
import { useNavigate } from 'react-router-dom';


interface RevenueItem {
	CropName: string;
	area: number;
	description: string;
	weight: string;
	price: number;
	img: string;
	progress: number;
}

const revenue: RevenueItem[] = [
	// Example data
	{ CropName: 'beans', area: 90, description: 'text that describes the crop', weight: '2000', price: 3000, img: 'beans', progress: 80 },
	{ CropName: 'rice', area: 30, description: 'text that describes the crop', weight: '200', price: 3100, img: 'rice', progress: 50 },
	{ CropName: 'groundnut', area: 40, description: 'text that describes the crop', weight: '2100', price: 3100, img: 'groundnut', progress: 50 },
	{ CropName: 'cashew', area: 10, description: 'text that describes the crop', weight: '10', price: 3100, img: 'cashew', progress: 50 },
];

interface SuggestionItem {
	text: string;
	link: string;
}
const Suggestions: SuggestionItem[] = [
	{ text: 'Reduce the pest invasion by raising pestesides levels, we recommend', link: '/dewadaw' }
]

interface Crops {
	[key: string]: string;
}

const crops: Crops = cropsData;

const city = 'Tissemsilt';
const country = 'Algeria';

// Define the revenue array with its type
const crop = {
	water_sufficient: 80,
	sunlight: 60,
	pestisides_level: 44,
	pest_invation: 77
}
type SoilType = {
	oxygen: number;
	azote: number;
	potassium: number;
	phosphorus: number;
	humidity: number;
	ph: number;
};
const Yourland: React.FC = () => {


	const [soil, setSoil] = useState<SoilType>({
		oxygen: 20,
		azote: 15,
		potassium: 10,
		phosphorus: 8,
		humidity: 65,
		ph: 30,
	});

	const [selectedSoil, setSelectedSoil] = useState<keyof SoilType>('oxygen');
	const [sliderValue, setSliderValue] = useState<number>(soil[selectedSoil]);
	const [showTooltip, setShowTooltip] = useState<boolean>(false);

 	//! Related to the popup
	 const [showPopup, setShowPopup] = useState(false);
	 const [isConfirmPhase, setIsConfirmPhase] = useState(false);
	 const handleSubmit = () => {
		if (!isConfirmPhase) {
		  setIsConfirmPhase(true); // Switch to confirmation phase
		} else {
		  setShowPopup(false);
		  // Handle confirmation, e.g., redirect
		  console.log("Confirmed! Navigating to new page.");
		}
	  };
	  const handleCancel = () => {
		setShowPopup(false);
		setIsConfirmPhase(false);
	  };
	
	  const openPopupWithInputs = () => {
		setIsConfirmPhase(false);
		setShowPopup(true);
	  };
	
	  const openConfirmationOnly = () => {
		setIsConfirmPhase(true); // Start directly at confirmation
		setShowPopup(true);
	  };

	  //! pop up state
	  const [LandCoordinates, setLandCoordinates] = useState('');
	  const [LandSize, setLandSize] = useState('');
	  const [budget, setBudget] = useState('');
	
	//
	const handleSliderChange = (value: number) => {
		setSliderValue(value);
		setSoil((prevSoil) => ({
			...prevSoil,
			[selectedSoil]: value,
		}));
	};

	const handleCircularProgressClick = (soilType: keyof SoilType) => {
		setSelectedSoil(soilType);
		setSliderValue(soil[soilType]);
	};

	const Applychanges = (soil: SoilType) => {
		console.log(soil);
		// TODO: make a post request
	}
	const [activeSection, setActiveSection] = useState<string>('Predict Revenue');
	const renderContent = () => {
		switch (activeSection) {
			case 'Predict Revenue':
				return (
					<Box>
						{revenue.length === 0 ? (
							<Flex direction='column' gap='40px'>
								<Text background='#fff' padding='20px' borderRadius='20px'>
									This Section provides you with the best crop recommendations according to your land parameters!
								</Text>
								<img src={cropsData.empty || '/default-empty-image.png'} alt="No data available" />
							</Flex>
						) : (
							<ul>
								{revenue.map((item, index) => (
									<li key={index}>
										<Flex direction='column' mb={4} background={'#fff'} padding={'20px'} borderRadius='20px'>
											<Flex align='center'>
												<img src={crops[item.img] || '/default-crop-image.png'} alt={item.CropName} style={{ width: '50px', height: 'auto', marginRight: '10px' }} />
												<Flex direction='column'>
													<Text fontWeight='bold'>{item.CropName}</Text>
													<Text color='grey' fontSize={'lg'}>{item.area} m<sup>2</sup></Text>
												</Flex>
												<Flex gap='20px' ml='auto'>
													<Text border='2px solid #218225' borderRadius='20px' padding='5px 10px'>{item.weight} $+</Text>
													<Text border='2px solid #218225' borderRadius='20px' padding='5px 10px'>{item.price} kg+</Text>
												</Flex>
											</Flex>
											<Text mt={1} color='grey' fontSize={'lg'}>{item.description}</Text>
											<Flex align='center' justify='space-between'>
												<Progress value={item.progress} size='xs' colorScheme='green' width='100%' mt={2} />
												<Text color='grey'>{item.progress}%</Text>
											</Flex>
										</Flex>
									</li>
								))}
							</ul>
						)}
					</Box>
				);
			case 'Soil maintenance':
				return (
					<Box>
						{showPopup && (
							<ConfirmationPopup
							title="Modify Data"
							message="Direct confirmation with no inputs."
							inputs={[]} // No inputs
							onConfirm={handleSubmit}
							onCancel={handleCancel}
							isConfirmPhase={isConfirmPhase}
							showPopup={showPopup}
						/>
						)}
						<Flex justify='space-around'>
							{Object.keys(soil).map((key) => (
								<Flex
									key={key}
									direction='column'
									align='center'
									gap='15px'
									onClick={() => handleCircularProgressClick(key as keyof SoilType)}
									shadow={selectedSoil === key ? '0 0 10px rgba(0, 0, 0, 0.2)' : undefined}
									backgroundColor={selectedSoil === key ? '#eaefef' : '#f4f6fa'}
									padding={'15px'}
									borderRadius={'20px'}
								>
									<CircularProgress
										color='#218225'
										value={soil[key as keyof SoilType]}
										size='90px'
										trackColor='#BCCCBF'
									>
										<CircularProgressLabel fontWeight='semibold'>{soil[key as keyof SoilType]}%</CircularProgressLabel>
									</CircularProgress>
									<Text fontWeight='bold'>{key}</Text>
								</Flex>
							))}
						</Flex>
						<Flex direction='column' align='center' gap='20px' padding='40px'>
							<Text textAlign='center' fontWeight='bold' fontSize='3xl'>
								Set Manually: {selectedSoil.charAt(0).toUpperCase() + selectedSoil.slice(1)} Level
							</Text>
							<Slider
								id='slider'
								defaultValue={soil[selectedSoil]}
								min={0}
								max={100}
								colorScheme='green'
								onChange={handleSliderChange}
								onMouseEnter={() => setShowTooltip(true)}
								onMouseLeave={() => setShowTooltip(false)}
								width='400px'
							>
								<SliderMark value={25} mt='3' ml='-2.5' fontSize='sm'>
									25
								</SliderMark>
								<SliderMark value={50} mt='3' ml='-2.5' fontSize='sm'>
									50
								</SliderMark>
								<SliderMark value={75} mt='3' ml='-2.5' fontSize='sm'>
									75
								</SliderMark>
								<SliderTrack bg='green.200'>
									<SliderFilledTrack />
								</SliderTrack>
								<Tooltip
									hasArrow
									bg='green.400'
									color='white'
									placement='top'
									isOpen={showTooltip}
									label={`${sliderValue}%`}
								>
									<SliderThumb />
								</Tooltip>
							</Slider>

              {/*<Button onClick={() => { Applychanges(soil) }}>Apply changes</Button>*/}						
							<Button onClick={openConfirmationOnly}> Apply changes</Button>
						</Flex>
						<Flex>
							<Flex background='#fff' width='100%' padding='20px' mt='40px' borderRadius='20px' direction='column'>
								<Flex gap='40px'>
									<Text fontWeight='semibold'>Suggested improvements</Text>
									{Suggestions.length === 0 ? (
										<Text color='#2ACC32' textAlign='end'>No new suggestions</Text>
									) : (
										<Text color='#FC0D0D'>{Suggestions.length} new suggestions</Text>
									)}
								</Flex>
								{Suggestions.length === 0 ? null : (
									<ul style={{ padding: '20px' }}>
										{Suggestions.map((item, index) => (
											<li key={index}>
												<Flex gap='10px'>
													<Text>{item.text}</Text>
													<a href={item.link}><Text color={'#00A6CB'}>Brand</Text></a>
												</Flex>
											</li>
										))}
									</ul>
								)}
							</Flex>
						</Flex>
					</Box>
				);
			case 'Crop maintenance':
				return (
					<Box>
						<Flex justify='space-around'>
							<Flex direction='column' align='center' gap='15px'>
								<img src={cropsData.vector} alt="" />
								<Text fontWeight='semibold'>{crop.water_sufficient}%</Text>
								<Text fontWeight='bold'>Water sufficient</Text>
							</Flex>
							<Flex direction='column' align='center' gap='15px'>
								<img src={cropsData.sun} alt="" />
								<Text fontWeight={'semibold'}>{crop.sunlight}%</Text>
								<Text fontWeight='bold'>Sunlight</Text>
							</Flex>
							<Flex direction='column' align='center' gap='15px'>
								<img src={cropsData.union} alt="" />
								<Text fontWeight='semibold'>{crop.pestisides_level}%</Text>
								<Text fontWeight='bold'>pestesides levels</Text>
							</Flex>
						</Flex>
						<Flex>
							<Flex background='#fff' width='100%' padding='20px' mt='40px' borderRadius='20px' direction='column'>
								<Flex gap='40px'>
									<Text fontWeight='semibold'>Suggested improvements</Text>
									{Suggestions.length === 0 ? (
										<Text color='#2ACC32' textAlign='end'>No new suggestions</Text>) :
										(
											<Text color='#FC0D0D'>{Suggestions.length} new suggestions</Text>
										)}

								</Flex>
								{Suggestions.length === 0 ? null : (
									<ul style={{
										padding: '20px'
									}}>
										{Suggestions.map((item, index) => (
											<li key={index}>
												<Flex gap='10px'>
													<Text>{item.text}</Text>
													<a href={item.link}><Text color={'#00A6CB'}>Brand</Text></a>
												</Flex>
											</li>))}
									</ul>
								)
								}
							</Flex>
						</Flex>
					</Box>
				);
			case 'Land statistics':
				return (
					<Box>
						{showPopup && (
							<ConfirmationPopup
								title="Modify Data"
								message="Please provide the necessary information."
								inputs={[
									{ label: 'New Land coordinate', value: LandCoordinates, onChange: setLandCoordinates },
									{ label: 'New Land Size in hectar', value: LandSize, onChange: setLandSize },
									]}
								onConfirm={handleSubmit}
								onCancel={handleCancel}
								isConfirmPhase={isConfirmPhase}
								showPopup={showPopup}
							/>
						)}
						<Flex justify='space-around'>
							<Flex direction='column' align='center' gap='15px'>
								<CircularProgress color='#218225' value={crop.water_sufficient} size='90px' trackColor='#BCCCBF'>
									<CircularProgressLabel fontWeight='semibold'>{crop.water_sufficient}%</CircularProgressLabel>
								</CircularProgress>
								<Text fontWeight='bold'>Water sufficient</Text>
							</Flex>
							<Flex direction='column' align='center' gap='15px'>
								<CircularProgress color='#218225' value={crop.sunlight} size='90px' trackColor='#BCCCBF'>
									<CircularProgressLabel fontWeight='semibold'>{crop.sunlight}%</CircularProgressLabel>
								</CircularProgress>
								<Text fontWeight='bold'>Sunlight</Text>
							</Flex>
							<Flex direction='column' align='center' gap='15px'>
								<CircularProgress color='#218225' value={crop.pestisides_level} size='90px' trackColor='#BCCCBF'>
									<CircularProgressLabel fontWeight='semibold'>{crop.pestisides_level}%</CircularProgressLabel>
								</CircularProgress>
								<Text fontWeight='bold'>pestesides levels</Text>
							</Flex>
							<Flex direction='column' align='center' gap='15px'>
								<CircularProgress color='#218225' value={crop.pest_invation} size='90px' trackColor='#BCCCBF'>
									<CircularProgressLabel fontWeight='semibold'>{crop.pest_invation}%</CircularProgressLabel>
								</CircularProgress>
								<Text fontWeight='bold'>pest invasion</Text>
							</Flex>
						</Flex>
						<Flex height='3px' width='100%' bgColor='grey' margin='40px 0px'></Flex>
						<Flex direction='row' align='center' gap='40px'>
							<Flex direction={'column'} width={'60%'} align={'center'} gap={'30px'}>

								<Text fontWeight='semibold' fontSize='4xl'>Your current land</Text>
								<img src={land.land1} alt="" width='70%' />
							</Flex>
							<Flex direction={'column'} width={'40%'} gap={'20px'}>
								<input type="text" style={{
									background:'#d8e1dc',
									borderRadius:'15px',
									border:'none'
								}}/>
								<input type="text" style={{
									background:'#d8e1dc',
									borderRadius:'15px',
									border:'none'
								}}/>
								<button style={{
									background: '#2acc32',
									color: '#fff',
									padding: '10px',
									borderRadius: '25px',
									fontSize: '20px',
									fontWeight: 'bold'}} 
								  onClick={openPopupWithInputs} }}>Modify Land Coordinates</button>
							</Flex>
						</Flex>
					</Box>
				);
			case 'Finance management':
				return (
					<Box>{showPopup && (
						<ConfirmationPopup
							title="Modify Data"
							message="Please provide the necessary information."
							inputs={[
							{ label: 'Budget in dollars', value: budget, onChange: setBudget }
							]}
							onConfirm={handleSubmit}
							onCancel={handleCancel}
							isConfirmPhase={isConfirmPhase}
							showPopup={showPopup}
						/>
					)}
						<Flex padding='40px'>
							<Flex width='50%' direction='column' justify='center' height='100%' align='center' gap='40px'>
								<BusinessPlanModal /> {/* Integrate the modal here */}
								<Text textAlign='start' fontSize='3xl' fontWeight='semibold' width='100%' margin='20px 20px 0px 20px'>
									Your budget
								</Text>
								<Flex width='100%' background='#F1F1F1' borderRadius='16px' padding='20px' margin='0px 20px 20px 20px'>
									<Text>10 000 ETB</Text>
								</Flex>
								<Button onClick={openPopupWithInputs}>Modify</Button>
							</Flex>
							<Flex padding='20px'>
								<TotalSpent />
							</Flex>
						</Flex>
					</Box>
				);
			default:
				return <Text>Select a section</Text>;
		}
	};

	return (
		<Flex direction="column" p={4}>
			<Text mb={4} fontSize='3xl' fontWeight='semibold'>{city}, {country}</Text>
			<Flex gap='40px' mb={4}>
				{['Predict Revenue', 'Soil maintenance', 'Crop maintenance', 'Land statistics', 'Finance management'].map(section => (
					<Text
						key={section}
						onClick={() => setActiveSection(section)}
						cursor="pointer"
						color={activeSection === section ? 'black' : 'gray.500'}
						textDecoration={activeSection === section ? 'underline' : 'none'}
						mb={2}
					>
						{section}
					</Text>
				))}
			</Flex>
			<Box>
				{renderContent()}
			</Box>
		</Flex>
	);
}

export default Yourland;
