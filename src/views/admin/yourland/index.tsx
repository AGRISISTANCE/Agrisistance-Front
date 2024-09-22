import {
	Flex, Text, Box, Progress, CircularProgress, CircularProgressLabel, Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark,
	Tooltip,Button
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import cropsData from './utilImages/utilImages';
//import land from '../../../assets/img/land/land';
// import { Button } from '../../../common/Button/index'
//import TotalSpent from '../default/components/TotalSpent';
import BusinessPlanModal from './components/BusinessPlanModal';
import ConfirmationPopup from '../../../components/Popup/ConfirmationPopup';
import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Crop, setInitialLands, setSelectedLand, LandInfo } from '../../../redux/landsSlice';
import axios from 'axios';
import CropBarChart from './components/CropBarChart';
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import Lottie from 'react-lottie-player';
import animationData from "../../../assets/img/dashboards/cropanimated.json";
import { apiCall } from '../../../services/api';
import Navbar from '../navbar/navbar';
import crops from './crops/crops_pictures'; 
import { useLocation, useNavigate } from 'react-router-dom';
import Tour from 'reactour';
import images from '../../../layouts/admin/onboarding/images'; //import images for onboarding
import { mapLandDataToSelectedLand } from '../home/components/utils/landMapper'; // Import the utility function
import erroranimated from "../../../assets/img/dashboards/erroranimated.json";




delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
	iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
	iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
	shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface RevenueItem {
	CropName: string;
	area: number;
	description: string;
	weight: number;
	price: number;
	img: string;
	progress: number;
}

interface CropType {
	water_sufficient: number;
	sunlight: number;
	pestisides_level: number;
	landUse: number;
	humanCoverage: number;
	waterAvaliability: number;
	distributionOptimality: number;
}


interface LandBusinessPlan {
	title: string;
	description: string;
}


interface SuggestionItem {
	text: string;
	link: string;
}
const Suggestions: SuggestionItem[] = [
	{ text: 'Reduce the pest invasion by raising pestesides levels, we recommend', link: '/dewadaw' }
]

interface LandDetails {
	longitude: number | null;
	latitude: number | null;
	size: number | null;
}


interface cityCountry {
	country: string | null;
	city: string | null
}

interface suggestion {
	suggestedImprovementSoil: string[];
	suggestedImprovementCrop: string[];
}

interface SoilType {
	oxygen: number;
	nitrogen: number;
	potassium: number;
	phosphorus: number;
	humidity: number;
	ph: number;
}

const SetMapView: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
	const map = useMap();
	map.setView(center, zoom);
	return null;
};

//! Component starting
const Yourland: React.FC = () => {

	//! Loading redux state:
	const user = useSelector((state: any) => state.user);
	const dispatch = useDispatch();
	const selectedLand = useSelector((state: RootState) => state.lands.selectedLand);
	const token = useSelector((state: RootState) => state.token.token);


	//! State declaration
	const [selectedSoil, setSelectedSoil] = useState<keyof SoilType>('oxygen');
	const [showTooltip, setShowTooltip] = useState<boolean>(false);
	const [showProgress, setShowProgress] = useState<boolean>(false);
	const [progressMessage, setProgressMessage] = useState<string>('Starting...');
	const [cityCountry, setcityCountry] = useState<cityCountry | null>(null);
	const [budget, setBudget] = useState<number | null>(selectedLand ? selectedLand.budgetForLand : null);
	const [businessPlan, setBusinessPlan] = useState<LandBusinessPlan[] | null>(selectedLand ? selectedLand.LandBusinessPlan : null);
	const [soil, setSoil] = useState<SoilType | null>(null);
	const [crop, setCrop] = useState<CropType | null>(null);
	const [landDetails, setLandDetails] = useState<LandDetails>({
		longitude: null,
		latitude: null,
		size: null,
	});
	
	//! Related to the popup
	const [showPopup, setShowPopup] = useState(false);
	const [isConfirmPhase, setIsConfirmPhase] = useState(false);


	const [showOnboarding, setShowOnboarding] = useState(false);

		const location = useLocation();
		const navigate = useNavigate();
		const steps = [
			{
				selector: '',
				content: (
					<div>
						<p>Explore various details about your land, including current status and health.</p>
					</div>
				),
			},
			{
				selector: '.navbar',
				content: (
					<div>
						<p>Use the navigation bar to explore different sections and tools.</p>
					</div>
				),
			},
			{
				selector: '.revenue',
				content: (
					<div>
						<p>Forecast potential revenue based on current and historical data.</p>
						<img src={images.predictRevenue} alt="Predict Revenue" style={{ width: '600px', height: 'auto' }} />
					</div>
				),
			},
			{
				selector: '',
				content: (
					<div>
						<p>Find detailed information on soil maintenance to keep your land fertile.</p>
						<img src={images.soilMaintenance} alt="Soil Maintenance" style={{ width: '100%' }} />
					</div>
				),
			},
			{
				selector: '',
				content: (
					<div>
						<p>Get insights and tips on effective crop maintenance.</p>
						<img src={images.cropMaintenance} alt="Crop Maintenance" style={{ width: '100%' }} />
					</div>
				),
			},
			{
				selector: '',
				content: (
					<div>
						<p>Access detailed statistics to monitor your land's performance.</p>
						<img src={images.landsStats} alt="Land Statistics" style={{ width: '100%' }} />
					</div>
				),
			},
			{
				selector: '',
				content: (
					<div>
						<p>Manage your finances with tools and insights on expenses and revenues.</p>
						<img src={images.financeManagement} alt="Finance Management" style={{ width: '100%' }} />
					</div>
				),
			},
			{
				selector: '',
				content: (
					<Button p={4} m={4} bg={'#2BCC33'} color={'white'} onClick={() => navigate('/dashboard/network/onboarding')}>
					Go to Your Network Onboarding
					</Button>
				),
			},
		];
		
	
		useEffect(() => {
		if (location.pathname === '/dashboard/yourland/onboarding') {
			setTimeout(() => {
			setShowOnboarding(true);
			}, 500); // Adjust the delay as needed
		} else {
			setShowOnboarding(false);
		}
		}, [location.pathname]);
	
  

	//! fetching lands data:
	  const fetchLands = async () => {
		try {
		  // Directly call apiCall and get the parsed data
		  const lands = await apiCall('/land/get-all-lands', {
			method: 'GET',
			requireAuth: true,
		  }, token);
	
		  console.log("API Response:", lands); // Log the response to confirm it's an array
	
		  const mappedLands = lands.map((land: any) => ({
			landId: land.land_id,
			owner: user.userId,
			landName: land.land_name,
			latitude: land.latitude,
			longitude: land.longitude,
			landSize: land.land_size,
			budgetForLand: 0,
			oxygen_level: 0,
			nitrogen: 0,
			potassium: 0,
			phosphorus: 0,
			humidity: 0,
			ph_level: 0,
			LandBusinessPlan: [] as LandBusinessPlan[], 
			crops: [] as Crop[], 
			waterSufficecy: 0, 
			sunlight: 0, 
			pestisedesLevel: 0, 
			landUse: 0, 
			humanCoverage: 0, 
			waterAvaliability: 0, 
			distributionOptimality: 0, 
			suggestedImprovementSoil: [] as string[], 
			suggestedImprovementCrop: [] as string[], 
		  }));
		  //! comment when using dummy data
		  dispatch(setInitialLands(mappedLands));
		  console.log("Initial lands set successfully", mappedLands);
		  
		} catch (error) {
		  console.error('Failed to fetch lands:', error);
		}
	};

	//! new handle submit:
	const handleSubmit = async () => {
		if (!isConfirmPhase) {
			setIsConfirmPhase(true); // Switch to confirmation phase
		} else {
			setShowPopup(false);

			// Prepare the request body with updated land details
			const requestBody = {
				latitude: landDetails.latitude,
				longitude: landDetails.longitude,
				land_size: landDetails.size,
				land_name: selectedLand.landName,
				ph_level: soil.ph,
				phosphorus: soil.phosphorus,
				potassium: soil.potassium,
				oxygen_level: soil.oxygen,
				nitrogen: soil.nitrogen, // azote
				humidity: soil.humidity,
				budget: budget,
			};

			console.log("You will be requesting changes to this new land: ", selectedLand, ". Into this land:", requestBody);

			try {
				// Show progress messages to the user
				setShowProgress(true);
				setProgressMessage('Starting...');

				setTimeout(async () => {
					// Set message while fetching the API
					setProgressMessage('Updating land...');

					try {
						// STEP1: Call the update land API (uncomment once confirmed)
						const updateResponse = await apiCall(
							`/land/update-land/${selectedLand.landId}`,
							{
								method: 'PUT',
								data: requestBody,
								requireAuth: true,
							},
							token
						);
						console.log("Land updated successfully:", updateResponse);
						
						// Step 2: Generate NEW Business Plan
						setProgressMessage('Generating business plan and predictions...');
						const response2 = await apiCall(
						  '/model/generate-business-plan',
						  {
							method: 'POST',
							data: { land_id: selectedLand.landId },
							requireAuth: true,
						  },
						  token
						);
						console.log('Business plan and predictions generated successfully for land:', selectedLand.landId);
						console.log('response getted from generate business plan api: ', response2)

						// Show a new progress message for fetching the updated land data
						setProgressMessage('Fetching updated land data...');

						//STEP3: Fetch the updated land data from the server
						const landResponse = await apiCall(
							`/land/get-land/${selectedLand.landId}`,
							{
								method: 'GET',
								requireAuth: true,
							},
							token
						);
						console.log("Fetched updated land data for: ", selectedLand.landId, " : ", landResponse);

						// Map the fetched data to the format expected by your application using the utility function
						const updatedLandData = mapLandDataToSelectedLand(landResponse);
						console.log("Mapped updated land data: ", updatedLandData);

						// Dispatch the action to update the selected land in the Redux store
						dispatch(setSelectedLand(updatedLandData));
						console.log('Selected land updated in Redux store with: ', updatedLandData);
						fetchLands()
						// Show "Completed!" message for 1 second after the process
						setTimeout(() => {
							setProgressMessage('Completed!');
							setTimeout(() => {
								setShowProgress(false);
								window.location.reload();
							}, 1000);
						}, 2000); // Keep "Fetching updated land data..." message for 2 seconds

					} catch (apiError) {
						setHasError(true)
						// Handle errors from the API call
						console.error("Failed to update land:", apiError);
						setProgressMessage('Error occurred!');
						setTimeout(() => {
							setShowProgress(false);
							setHasError(false)
						}, 2500);
					}
				}, 1000); // Show "Starting..." message for 1 second

			} catch (error) {
				// Handle any unexpected errors
				console.error("Unexpected error occurred:", error);
				setProgressMessage('Unexpected error!');
				setTimeout(() => {
					setShowProgress(false);
				}, 1000);
			}
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

	const handleOpenPopup = () => {
		setShowPopup(true);
		setIsConfirmPhase(false); // Initial phase
	};

	//! slider handlers
	const handleSliderChange = (value: number) => {
		setSliderValue(value);
		setSoil((prevSoil) => {
			if (!prevSoil) return null; // Handle case where prevSoil might be null
			return {
				...prevSoil,
				[selectedSoil]: value,
			};
		});
	};

	const handleCircularProgressClick = (soilType: keyof SoilType) => {
		setSelectedSoil(soilType);
		setSliderValue(soil[soilType]);
	};

	//! Setting Soil maintainance
	useEffect(() => {
		if (selectedLand) {
			const newSoil = {
				oxygen: selectedLand.oxygen_level,
				nitrogen: selectedLand.nitrogen,
				potassium: selectedLand.potassium,
				phosphorus: selectedLand.phosphorus,
				humidity: selectedLand.humidity,
				ph: selectedLand.ph_level,
			};
			setSoil(newSoil);

			// Set the slider value to the value of selectedSoil in the newSoil object
			setSliderValue(newSoil[selectedSoil] ?? 0); // Fallback to 0 if selectedSoil is not valid
		}
		else {
			setSoil(null)
			setSliderValue(0); // Reset sliderValue to 0 if no land is selected
		}
	}, [selectedLand]);

	//const [sliderValue, setSliderValue] = useState<number>(soil[selectedSoil]);
	const [sliderValue, setSliderValue] = useState<number>(0); // Set initial sliderValue


	//! maaping predict revenue from state
	const revenue: RevenueItem[] = selectedLand
		? selectedLand.crops.map((crop: Crop) => {
			// Construct the image path
			const cropImageName = crop.CropName.toLowerCase().replace(/ /g, '_') as keyof typeof crops;
			const cropImagePath = crops[cropImageName] || crops['default-crop-image'];


			return {
				CropName: crop.CropName,
				area: crop.cropSize,
				description: `${crop.CropName} is a valuable crop. It has a recommendation percentage of ${crop.recommendationPercentage}% and can generate a revenue of ${crop.expectedMoneyRevenue} with an expected weight of ${crop.expectedWeightRevenue}.`,
				weight: crop.expectedWeightRevenue,
				price: crop.expectedMoneyRevenue,
				img: cropImagePath,
				progress: crop.recommendationPercentage,
			};
		})
		: [];

	
	//! setting Crop maintainance & budget & business plan
	useEffect(() => {
		if (selectedLand) {
			setCrop({
				landUse: selectedLand.landUse,
				water_sufficient: selectedLand.waterSufficecy,
				sunlight: selectedLand.sunlight,
				pestisides_level: selectedLand.pestisedesLevel,
				waterAvaliability: selectedLand.waterAvaliability,
				humanCoverage: selectedLand.humanCoverage,
				distributionOptimality: selectedLand.distributionOptimality
			});
			setBudget(selectedLand.budgetForLand);
			setBusinessPlan(selectedLand.LandBusinessPlan);
		} else {
			setCrop(null); // Set crop to null if no selected land exists
			setBudget(null);
			setBusinessPlan(null);
		}
	}, [selectedLand]);

	
	//! Setting land statistics
	useEffect(() => {
		if (selectedLand) {
			setLandDetails({
				longitude: selectedLand.longitude,
				latitude: selectedLand.latitude,
				size: selectedLand.landSize,
			});
		} else {
			setLandDetails({
				longitude: null,
				latitude: null,
				size: null,
			});
		}
	}, [selectedLand]);

	//! Setting city and country from api
	useEffect(() => {
		if (landDetails.latitude && landDetails.longitude) {
			const fetchCityFromCoordinates = async () => {
				try {
					const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
						params: {
							lat: landDetails.latitude,
							lon: landDetails.longitude,
							format: 'json',
							addressdetails: 1,
							'accept-language': 'en',
						},
					});
					const address = response.data.address;
					const city = address.city || address.town || address.village || 'Unknown City';
					const country = address.country || 'Unknown Country';
					setcityCountry({ city, country });
				} catch (error) {
					console.error('Error fetching city from coordinates:', error);
					setcityCountry({ city: 'Error', country: 'Error' });
				}
			};

			fetchCityFromCoordinates();
		} else {
			setcityCountry(null);
		}
	}, [landDetails]);

	//! Setting soil, crop suggestions
	const soilSuggestions = selectedLand?.suggestedImprovementSoil || [];
	const cropSuggestions = selectedLand?.suggestedImprovementCrop || [];

	//! Utility functions
	const soilRanges = {
		oxygen: { unit: '%', min: 0, max: 100 },
		nitrogen: { unit: 'kg/ha', min: 0, max: 300 }, // example range for nitrogen
		potassium: { unit: 'kg/ha', min: 0, max: 200 }, // example range for potassium
		phosphorus: { unit: 'kg/ha', min: 0, max: 100 }, // example range for phosphorus
		humidity: { unit: '%', min: 0, max: 100 },
		ph: { unit: '', min: 1, max: 14 }, // pH has no unit
	}


	const getProgressValue = (key: keyof SoilType) => {
		const soilValue = soil[key];
		const maxRange = soilRanges[key].max;
		return (soilValue / maxRange) * 100; // Scale to 0-100 for CircularProgress
	};

	const [activeSection, setActiveSection] = useState<string>('Predict Revenue');

	const PopPupTrackLandStatis = (field: keyof LandDetails) => (newValue: number) => {
		setLandDetails(prevState => ({
		  ...prevState,
		  [field]: newValue
		}));
	  };

	const [hasError, setHasError] = useState(false);


	//! Component rendering
	const renderContent = () => {
		switch (activeSection) {
			case 'Predict Revenue':
				return (
					<Box className='revenue'>
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
												{/* <img src={crops[item.img] || '/default-crop-image.png'} alt={item.CropName} style={{ width: '50px', height: 'auto', marginRight: '10px' }} /> */}
												{/* ! Later the images will be handeled either accoring to cropName or by their state */}
												{/* <img src={'/default-crop-image.png'} alt={item.CropName} style={{ width: '50px', height: 'auto', marginRight: '10px' }} /> */}
												<img src={item.img} alt={item.CropName} style={{ width: '50px', height: 'auto', marginRight: '10px' }} />
												<Flex direction='column'>
													<Text fontWeight='bold'>{item.CropName}</Text>
													<Text color='grey' fontSize={'lg'}>{item.area} m<sup>2</sup></Text>
												</Flex>
												<Flex gap="20px" ml="auto">
													<Tooltip label="This is the weight in kilograms" aria-label="Weight Tooltip">
														<Text
															border="2px solid #218225"
															borderRadius="20px"
															padding="5px 10px"
															cursor="pointer"
														>
															{item.weight} kg+
														</Text>
													</Tooltip>
													<Tooltip label="This is the price per dollars" aria-label="Price Tooltip">
														<Text
															border="2px solid #218225"
															borderRadius="20px"
															padding="5px 10px"
															cursor="pointer"
														>
															{item.price} $+
														</Text>
													</Tooltip>
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
					<Box className='soil'>
						{showPopup && (
							<ConfirmationPopup
								title="Modify Data"
								message="Please provide the necessary information."
								inputs={[
								]}
								onConfirm={handleSubmit}
								onCancel={handleCancel}
								isConfirmPhase={isConfirmPhase}
								showPopup={showPopup}
							/>
						)}
						{revenue.length === 0 ? (
							<Flex direction={'column'} gap={'50px'} align={'center'}>
								<Text background={'#fff'} width={'100%'} padding={'20px'} maxWidth={'100%'} borderRadius={'2xl'}>This section offers manually modifiable data on your land soil, and provides  up to date suggestions to ensure the best results!</Text>
								<Flex width={'400px'} align={'center'} background={'#2c4026'}><img src={cropsData.tractor} alt='tractor' width={'100%'} /></Flex>
							</Flex>) : (
							<Box>
								<Flex justify='space-around'>
									{soil &&
										Object.keys(soil).map((key) => (
											<Flex
												key={key}
												direction='column'
												align='center'
												gap='15px'
												cursor={'pointer'}
												onClick={() => handleCircularProgressClick(key as keyof SoilType)}
												shadow={selectedSoil === key ? '0 0 10px rgba(0, 0, 0, 0.2)' : undefined}
												backgroundColor={selectedSoil === key ? '#eaefef' : '#f4f6fa'}
												padding={'15px'}
												borderRadius={'20px'}
											>
												<CircularProgress
													color='#218225'
													value={getProgressValue(key as keyof SoilType)}
													size='90px'
													trackColor='#BCCCBF'
												>
													<CircularProgressLabel fontWeight='semibold'>
														<Text size={'sm'}>
															{soil[key as keyof SoilType]}<br />
															{soilRanges[key as keyof typeof soilRanges].unit}
														</Text>
													</CircularProgressLabel>
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
										defaultValue={soil ? soil[selectedSoil] : soilRanges[selectedSoil].min}  // Start from selected soil value
										min={soilRanges[selectedSoil].min}
										max={soilRanges[selectedSoil].max}
										colorScheme='green'
										onChange={handleSliderChange}
										onMouseEnter={() => setShowTooltip(true)}
										onMouseLeave={() => setShowTooltip(false)}
										width='400px'
									>
										<SliderMark value={soilRanges[selectedSoil].min} mt='3' ml='-2.5' fontSize='sm'>
											{soilRanges[selectedSoil].min}
										</SliderMark>
										<SliderMark value={(soilRanges[selectedSoil].max + soilRanges[selectedSoil].min) / 2} mt='3' ml='-2.5' fontSize='sm'>
											{(soilRanges[selectedSoil].max + soilRanges[selectedSoil].min) / 2}
										</SliderMark>
										<SliderMark value={soilRanges[selectedSoil].max} mt='3' ml='-2.5' fontSize='sm'>
											{soilRanges[selectedSoil].max}
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
											label={`${sliderValue}${soilRanges[selectedSoil].unit}`}
										>
											<SliderThumb />
										</Tooltip>
									</Slider>
									<Button onClick={openConfirmationOnly}> Apply changes</Button>
								</Flex>
								<Flex>
									<Flex background='#fff' width='100%' padding='20px' mt='40px' borderRadius='20px' direction='column'>
										<Flex gap='40px'>
											<Text fontWeight='semibold'>Soil Improvement Suggestions</Text>
											{soilSuggestions.length === 0 ? (
												<Text color='#2ACC32' textAlign='end'>No new soil suggestions</Text>
											) : (
												<Text color='#FC0D0D'>{soilSuggestions.length} new soil suggestions</Text>
											)}
										</Flex>
										{soilSuggestions.length === 0 ? null : (
											<ul style={{ padding: '20px' }}>
												{soilSuggestions.map((item, index) => (
													<li key={index}>
														<Flex gap='10px'>
															<Text>{item}</Text>
															<a href={`/suggestion/soil/${index}`}><Text color={'#00A6CB'}>More Info</Text></a>
														</Flex>
													</li>
												))}
											</ul>
										)}
									</Flex>
								</Flex>
							</Box>)}
					</Box >
				)
			case 'Crop maintenance':
				return (
					<Box className='crop'>
						{revenue.length === 0 ? (
							<Flex direction={'column'} gap={'50px'} align={'center'}>
								<Text background={'#fff'} padding={'20px'} maxWidth={'100%'} borderRadius={'2xl'}>This section keeps track of your crop maintenance, offering suggestions  to improve the quality and the quality of the crops as well as the growth conditions</Text>
							</Flex>) : (
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
										<Flex gap='40px' mt='20px'>
											<Text fontWeight='semibold'>Crop Improvement Suggestions</Text>
											{cropSuggestions.length === 0 ? (
												<Text color='#2ACC32' textAlign='end'>No new crop suggestions</Text>
											) : (
												<Text color='#FC0D0D'>{cropSuggestions.length} new crop suggestions</Text>
											)}
										</Flex>
										{cropSuggestions.length === 0 ? null : (
											<ul style={{ padding: '20px' }}>
												{cropSuggestions.map((item, index) => (
													<li key={index}>
														<Flex gap='10px'>
															<Text>{item}</Text>
															<a href={`/suggestion/crop/${index}`}><Text color={'#00A6CB'}>More Info</Text></a>
														</Flex>
													</li>
												))}
											</ul>
										)}
									</Flex>
								</Flex>
							</Box>)}
					</Box>
				);
			case 'Land statistics':
				return (
					<Box className='landstat'>
						{showPopup && (
							<ConfirmationPopup
								title="Modify Data"
								message="Please provide the necessary information."
								inputs={[
									{ label: 'New Land Longitude', value: landDetails.longitude, onChange: PopPupTrackLandStatis('longitude') },
									{ label: 'New Land Latitude', value: landDetails.latitude, onChange: PopPupTrackLandStatis('latitude') },
									{ label: 'New Land Size in hectare', value: landDetails.size, onChange: PopPupTrackLandStatis('size') },
								]}
								onConfirm={handleSubmit}
								onCancel={handleCancel}
								isConfirmPhase={isConfirmPhase}
								showPopup={showPopup}
							/>
						)}
						{revenue.length === 0 ? (
							<Flex direction={'column'} gap={'50px'} align={'center'}>
								<Text background={'#fff'} padding={'20px'} width={'100%'} borderRadius={'2xl'}>This section organizes and centralizes the statics and resources of your land for easy navigation</Text>
							</Flex>) : (
							<Box>
								<Flex justify='space-around'>
									<Flex direction='column' align='center' gap='15px'>
										<CircularProgress color='#218225' value={crop.landUse} size='90px' trackColor='#BCCCBF'>
											<CircularProgressLabel fontWeight='semibold'>{crop.landUse}%</CircularProgressLabel>
										</CircularProgress>
										<Text fontWeight='bold'>Land use</Text>
									</Flex>
									<Flex direction='column' align='center' gap='15px'>
										<CircularProgress color='#218225' value={crop.humanCoverage} size='90px' trackColor='#BCCCBF'>
											<CircularProgressLabel fontWeight='semibold'>{crop.humanCoverage}%</CircularProgressLabel>
										</CircularProgress>
										<Text fontWeight='bold'>Human coverage</Text>
									</Flex>
									<Flex direction='column' align='center' gap='15px'>
										<CircularProgress color='#218225' value={crop.waterAvaliability} size='90px' trackColor='#BCCCBF'>
											<CircularProgressLabel fontWeight='semibold'>{crop.waterAvaliability}%</CircularProgressLabel>
										</CircularProgress>
										<Text fontWeight='bold'>Water avaliability</Text>
									</Flex>
									{/*!  handle this dynamically*/}
									<Flex direction='column' align='center' gap='15px'>
										<CircularProgress color='#218225' value={crop.distributionOptimality} size='90px' trackColor='#BCCCBF'>
											<CircularProgressLabel fontWeight='semibold'>{crop.distributionOptimality}%</CircularProgressLabel>
										</CircularProgress>
										<Text fontWeight='bold'>Distribution optimality</Text>
									</Flex>
								</Flex>
								<Flex height='3px' width='100%' bgColor='grey' margin='40px 0px'></Flex>
								<Flex direction='row' align='center' gap='40px'>
									<Flex direction={'column'} width={'60%'} align={'center'} gap={'30px'}>

										<Text fontWeight='semibold' fontSize='4xl'>Your current land</Text>

										<MapContainer
											style={{ height: '400px', width: '100%' }}
										>
											<SetMapView center={[landDetails.latitude, landDetails.longitude]} zoom={13} />
											<TileLayer
												url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
											/>
											<Marker position={[landDetails.latitude, landDetails.longitude]}>
												<Popup>
													New Land
												</Popup>
											</Marker>
										</MapContainer>
									</Flex>
									<Flex direction={'column'} width={'40%'} gap={'20px'}>
										<Text fontWeight='normal' fontSize='xl'>Your current coordinates:</Text>
										<input type="number" style={{
											background: '#d8e1dc',
											borderRadius: '15px',
											border: 'none'
										}}
											value={landDetails.latitude}
											readOnly />
										<input type="number" style={{
											background: '#d8e1dc',
											borderRadius: '15px',
											border: 'none'
										}}
											value={landDetails.longitude}
											readOnly />
										<Text fontWeight='normal' fontSize='xl'>Your current size:</Text>
										<input type="text" style={{
											background: '#d8e1dc',
											borderRadius: '15px',
											border: 'none',
										}}
											value={`${landDetails.size} Ha`}
											readOnly />
										<button style={{
											background: '#2acc32',
											color: '#fff',
											padding: '10px',
											borderRadius: '25px',
											fontSize: '20px',
											fontWeight: 'bold'
										}}
											onClick={() => setShowPopup(true)}> Modify Land Information </button>
									</Flex>
								</Flex>
							</Box>)}
					</Box>
				);
			case 'Finance management':
				return (
					<Box className='finance'>
						{showPopup && (
							<ConfirmationPopup
								title="Modify Data"
								message="Please provide the necessary information."
								inputs={[
									{ label: 'Budget in dollars', value: budget ?? '', onChange: setBudget }
								  ]}
								onConfirm={handleSubmit}
								onCancel={handleCancel}
								isConfirmPhase={isConfirmPhase}
								showPopup={showPopup}
							/>
						)}
						<Flex padding='40px'>
							<Flex width='50%' direction='column' justify='center' height='100%' align='center' gap='40px'>
								{/* <BusinessPlanModal isDisabled={!businessPlan || businessPlan.length === 0} /> */}
								<BusinessPlanModal isDisabled={!businessPlan || businessPlan.length === 0} businessPlan={businessPlan} />
								<Text textAlign='start' fontSize='3xl' fontWeight='semibold' width='100%' margin='20px 20px 0px 20px'>
									Your budget
								</Text>
								<Flex width='100%' background='#F1F1F1' borderRadius='16px' padding='20px' margin='0px 20px 20px 20px'>
									<Text>{budget ? `${budget} $` : 'No budget set'}</Text>
								</Flex>
								<Button
									onClick={openPopupWithInputs}
								>
									Modify
								</Button>
							</Flex>
							<CropBarChart />

						</Flex>
					</Box>

				);
			default:
				return <Text>Select a section</Text>;
		}
	};

	return (<>
		<Navbar />
		<Flex mt={16} direction="column" p={4}>
		<Text mb={4} fontSize='3xl' fontWeight='semibold'>
			{cityCountry ? (
				cityCountry.city === "Error" && cityCountry.country === "Error" ? (
				'Location informations unavailable'
				) : (
				`${cityCountry.city !== "Error" ? cityCountry.city : ''}${
					cityCountry.city !== "Error" && cityCountry.country !== "Error" ? ', ' : ''
				}${cityCountry.country !== "Error" ? cityCountry.country : ''}`
				)
			) : (
				'No location available'
			)}
			</Text>

			<Flex  className='navbar' gap='40px' mb={4}>
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
			<Box>
				{showProgress && (
					<>
						{/* Background Blur Overlay */}
						<div
							style={{
								position: 'fixed',
								top: 0,
								left: 0,
								width: '100%',
								height: '100%',
								backdropFilter: 'blur(5px)',
								backgroundColor: 'rgba(0, 0, 0, 0.3)', // Optional: adds a slight tint
								zIndex: 999, // Make sure it's below the progress component
							}}
						></div>

						{/* Progress Component */}
						<Flex
							direction={'column'}
							align={'center'}
							justify={'center'}
							position={'fixed'}
							top={'50%'}
							left={'50%'}
							transform={'translate(-50%, -50%)'}
							p={'20px'}
							bg={'#fff'}
							borderRadius={'10px'}
							shadow={'md'}
							zIndex={1000} // Ensure it's above the blur overlay
						>
							<Lottie
								animationData={hasError ? erroranimated : animationData}
								play
								loop
								style={{ width: "100%", maxWidth: "300px", height: "auto" }}
							/>
							<Text fontSize={'lg'} fontWeight={'bold'}>{progressMessage}</Text>
							<Progress size='xs' isIndeterminate />
						</Flex>
					</>
				)}

			</Box>
		</Flex>
		{showOnboarding && (
			<Tour
			steps={steps}
			isOpen={showOnboarding}
			onRequestClose={() => setShowOnboarding(false)}
			rounded={5} // Customize tooltip style
			accentColor="#5cb85c" // Customize accent color
			/>
		)}
		</>
	);
}
export default Yourland;
