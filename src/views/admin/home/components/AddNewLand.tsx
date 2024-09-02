import React, { useState, useEffect } from "react";
import asset from "../../../../assets/img/dashboards/asset";
import {
  Tooltip,
  Flex,
  Text,
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Progress,
} from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Removed the `Form` import
import { useDispatch, useSelector } from "react-redux";
import animationData from "../../../../assets/img/dashboards/cropanimated.json";
import Lottie from "react-lottie-player";
import { apiCall } from "../../../../services/api";
import { RootState } from "../../../../redux/store";

import { selectLand, removeLand, setInitialLands, LandInfo, setSelectedLand } from '../../../../redux/landsSlice'; // Ensure this import is correct


interface AddNewLandProps {
  initialStep?: number;
}

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function AddNewLand({ initialStep = 0 }: AddNewLandProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [landName, setLandName] = useState("");
  const [latitude, setLatitude] = useState<string | "">("");
  const [longitude, setLongitude] = useState<string | "">("");
  const [landSize, setLandSize] = useState<number | "">("");
  const [budget, setBudget] = useState<number | "">("");
  const [phLevel, setPhLevel] = useState<string | "">("");
  const [phosphorus, setPhosphorus] = useState<number | "">("");
  const [potassium, setPotassium] = useState<number | "">("");
  const [oxygenLevel, setOxygenLevel] = useState<number | "">("");
  const [nitrogen, setNitrogen] = useState<number | "">("");


  const [step, setStep] = useState<number>(initialStep);
  const [modalContent, setModalContent] = useState<string>("");
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const [progressMessage, setProgressMessage] = useState<string>("Starting...");

  const token = useSelector((state: RootState) => state.token.token); // Get the token from the state

  const mapLandDataToSelectedLand = (landData: any): LandInfo => {
    return {
      landId: landData.land[0].land_id,
      owner: landData.land[0].user_id,
      landName: landData.land[0].land_name,
      latitude: landData.land[0].latitude,
      longitude: landData.land[0].longitude,
      landSize: landData.land[0].land_size,
      budgetForLand: landData.finance[0]?.investment_amount || 0,
      oxygen_level: landData.land[0].oxygen_level,
      nitrogen: landData.land[0].nitrogen,
      potassium: landData.land[0].potassium,
      phosphorus: landData.land[0].phosphorus,
      humidity: landData.weather[0]?.humidity || 0,
      ph_level: landData.land[0].ph_level,
      LandBusinessPlan: landData.business_plan.map((plan: any) => ({
        title: 'Executive Summary', // or any appropriate title
        description: plan.executive_summary,
      })),
      crops: landData.crops.map((crop: any) => ({
        CropName: crop.crop_name,
        CropImage: '', // Implement this function as needed getCropImage(crop.crop_name)
        recommendationPercentage: '', // Implement logic as needed calculateRecommendationPercentage(crop)
        cropSize: crop.crop_area,
        expectedMoneyRevenue: crop.expected_money_return,
        expectedWeightRevenue: crop.expected_wight_return,
        cropCost: crop.crop_investment,
        cropProfit: crop.expected_money_return - crop.crop_investment,
      })),
      waterSufficecy: landData.crop_maintenance[0]?.water_sufficienty || 0,
      sunlight: landData.weather[0]?.sunlight || 0,
      pestisedesLevel: landData.crop_maintenance[0]?.pesticide_level || 0,
      landUse: landData.land_statistics[0]?.land_use || 0,
      humanCoverage: landData.land_statistics[0]?.human_coverage || 0,
      waterAvaliability: landData.land_statistics[0]?.water_availability || 0,
      distributionOptimality: landData.land_statistics[0]?.distribution_optimality || 0,
      suggestedImprovementSoil: landData.suggested_improvements?.soil || [],
      suggestedImprovementCrop: landData.suggested_improvements?.crop || [],
    };
  };
  


  const handleAddLand = async () => {
    try {
      // Initialize loading state
      setShowProgress(true);
      setProgressMessage('Starting...');
  
      // Validate required fields
      if (
        !landName ||
        !latitude ||
        !longitude ||
        !landSize ||
        !budget ||
        !phLevel ||
        !phosphorus ||
        !potassium ||
        !oxygenLevel ||
        !nitrogen
      ) {
        setProgressMessage('Please fill in all required fields.');
        setShowProgress(false);
        return;
      }
  
        const newLand = {
          land_name: landName,
          latitude: isNaN(Number(latitude)) ? null : Number(latitude),
          longitude: isNaN(Number(longitude)) ? null : Number(longitude),
          land_size: isNaN(Number(landSize)) ? null : Number(landSize),
          budget: isNaN(Number(budget)) ? null : Number(budget),
          oxygen_level: isNaN(Number(oxygenLevel)) ? null : Number(oxygenLevel),
          nitrogen: isNaN(Number(nitrogen)) ? null : Number(nitrogen),
          potassium: isNaN(Number(potassium)) ? null : Number(potassium),
          phosphorus: isNaN(Number(phosphorus)) ? null : Number(phosphorus),
          ph_level: isNaN(Number(phLevel)) ? null : Number(phLevel),
        };
  

      console.log("creating new land with data: ", newLand)
      // Step 1: Add Land 
      setProgressMessage('Creating your new land...');
      const addLandResponse = await apiCall(
        '/land/add-land',
        {
          method: 'POST',
          data: newLand,
          requireAuth: true,
        },
        token
      );

  
      // if (addLandResponse && addLandResponse.land_id) {
        const landId = addLandResponse.land_id;
        console.log('Land added successfully:', addLandResponse.message);
        console.log('New land created ID:', landId);



        console.log('Request payload for generating business plan: ', {
          land_id: landId
        });

      // Step 2: Generate Business Plan
      setProgressMessage('Generating business plan and predictions...');
      await apiCall(
        '/model/generate-business-plan',
        {
          method: 'POST',
          data: { land_id: landId },
          requireAuth: true,
        },
        token
      );
      console.log('Business plan and predictions generated successfully for land:', landId);
  

      // Step 3: Get Land by ID
      setProgressMessage('Fetching updated land data...');
      const landResponse = await apiCall(
        `/land/get-land/${landId}`,
        {
          method: 'GET',
          requireAuth: true,
        },
        token
      );
  
      console.log("data getted from get landById: ", landId," : ", landResponse)
      const selectedLand = mapLandDataToSelectedLand(landResponse);
      console.log("data after being mapped: ", selectedLand)
      
      // Dispatch the action to update the selected land in the Redux store
      dispatch(setSelectedLand(selectedLand));
      console.log('Selected land updated in Redux store with: ', selectedLand);
  
      // Step 5: Finish loading
      setProgressMessage('Completed!');
      setTimeout(() => {
        setShowProgress(false);
        onClose(); // Close any modals if necessary
        // Optionally navigate to another page or reset form fields here
        navigate("/dashboard/yourland");
      }, 2000);
    } catch (error) {
      console.error('Error during the land creation and mapping process:', error);
      setProgressMessage('An error occurred. Please try again.');
      // Optionally, keep the loading indicator and allow the user to retry
      setTimeout(() => {
        setShowProgress(false);
      }, 2000);
    }
    }
    
    
    const handleFinish = () => {
      handleAddLand();
    };



  const handleNext = () => setStep(step + 1);
  const handlePrevious = () => setStep(step - 1);

  useEffect(() => {
    if (initialStep === 5) {
      setStep(5);
      setShowProgress(true);
    }
  }, [initialStep]);



  const openModal = (content: string) => {
    setModalContent(content);
    onOpen();
  };


  return (
    <Flex
      zIndex={3}
      direction={"column"}
      backgroundImage={asset.image}
      backgroundSize={"cover"}
      backgroundPosition={"center"}
      width={"1013px"}
      height={"677px"}
      align={"center"}
      justify={"center"}
    >
      <form // Use a standard HTML form tag
        onSubmit={(e) => {
          e.preventDefault();
          handleAddLand();
        }}
      >
        {step === 0 && (
          <Flex
            direction={"column"}
            align={"center"}
            width={"100%"}
            gap={"20px"}
          >
            <Flex
              backgroundColor={"#218225"}
              padding={"20px"}
              borderRadius={"50px"}
            >
              <Text color={"white"} fontWeight={"semibold"} fontSize={"30px"}>
                What is your land name?
              </Text>
            </Flex>
            <Text color={"white"} fontWeight={"semibold"} fontSize={"3xl"}>
              Land name
            </Text>
            <Input
              type="text"
              placeholder="Enter land name"
              value={landName}
              onChange={(e) => setLandName(e.target.value)}
              style={{
                borderRadius: "0px",
                width: "562px",
                height: "40px",
                background: "#fff",
                color: "#000",
              }}
            />
            <Flex gap={"30px"}>
              <Button
                bg={"#2acc32"}
                color={"#fff"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                p={"10px 20px"}
                fontSize={"20px"}
                fontWeight={"bold"}
                gap={"20px"}
                borderRadius={"10px"}
                onClick={handleNext}
                width={"150px"}
              >
                Next <FaArrowRight />
              </Button>
            </Flex>
          </Flex>
        )}
        {step === 1 && (
          <Flex
            direction={"column"}
            align={"center"}
            width={"100%"}
            gap={"20px"}
          >
            <Flex
              backgroundColor={"#218225"}
              padding={"20px"}
              borderRadius={"50px"}
            >
              <Text color={"white"} fontWeight={"semibold"} fontSize={"30px"}>
                What are your land coordinates?
              </Text>
            </Flex>
            <Text color={"white"} fontWeight={"semibold"} fontSize={"3xl"}>
              Land coordinates
            </Text>
            <Flex direction={"column"} align={"center"} gap={"10px"}>
              <label
                style={{ color: "#fff", fontWeight: "bold", fontSize: "25px" }}
              >
                Latitude
              </label>
              <Input
                type="text"
                placeholder="Enter latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value || "")}
                style={{
                  borderRadius: "0px",
                  width: "562px",
                  height: "40px",
                  background: "#fff",
                  color: "#000",
                }}
              />
            </Flex>
            <Flex direction={"column"} align={"center"} gap={"10px"}>
              <label
                style={{ color: "#fff", fontWeight: "bold", fontSize: "25px" }}
              >
                Longitude
              </label>
              <Input
                type="text"
                placeholder="Enter longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value || "")}
                style={{
                  borderRadius: "0px",
                  width: "562px",
                  height: "40px",
                  background: "#fff",
                  color: "#000",
                }}
              />
            </Flex>
            <Tooltip
              label="To get your land coordinates, use a GPS device or a mapping service, Or you can navigate to your land on google maps and get the coordinates from the link."
              fontSize="md"
              bg="gray.700"
              color="white"
              borderRadius="md"
              p={2}
            >
              <Text
                color={"white"}
                fontWeight={"semibold"}
                fontSize={"2xl"}
                onClick={() =>
                  openModal(
                    "To get your land coordinates, use a GPS device or a mapping service, Or you can navigate to your land in google maps and get the coordinates from the link"
                  )
                }
                style={{ cursor: "pointer" }}
              >
                How to get land coordinates
              </Text>
            </Tooltip>
            <Flex gap="20px">
              <Button
                bg={"#2acc32"}
                color={"#fff"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                p={"10px 20px"}
                fontSize={"20px"}
                fontWeight={"bold"}
                gap={"20px"}
                borderRadius={"10px"}
                onClick={handlePrevious}
                width={"150px"}
              >
                <FaArrowLeft /> Previous
              </Button>
              <Button
                bg={"#2acc32"}
                color={"#fff"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                p={"10px 20px"}
                fontSize={"20px"}
                fontWeight={"bold"}
                gap={"20px"}
                borderRadius={"10px"}
                onClick={handleNext}
                width={"150px"}
              >
                Next <FaArrowRight />
              </Button>
            </Flex>
          </Flex>
        )}
        {step === 2 && (
          <Flex
            direction={"column"}
            align={"center"}
            width={"100%"}
            gap={"20px"}
          >
            <Flex
              backgroundColor={"#218225"}
              padding={"20px"}
              borderRadius={"50px"}
            >
              <Text color={"white"} fontWeight={"semibold"} fontSize={"30px"}>
                What is your land size?
              </Text>
            </Flex>
            <Text color={"white"} fontWeight={"semibold"} fontSize={"3xl"}>
              Land size (in hectars)
            </Text>
            <Input
              type="text"
              placeholder="Enter land size"
              value={landSize}
              onChange={(e) => setLandSize(Number(e.target.value) || "")}
              style={{
                borderRadius: "0px",
                width: "562px",
                height: "40px",
                background: "#fff",
                color: "#000",
              }}
            />
            <Flex gap="20px">
              <Button
                bg={"#2acc32"}
                color={"#fff"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                p={"10px 20px"}
                fontSize={"20px"}
                fontWeight={"bold"}
                gap={"20px"}
                borderRadius={"10px"}
                onClick={handlePrevious}
                width={"150px"}
              >
                <FaArrowLeft /> Previous
              </Button>
              <Button
                bg={"#2acc32"}
                color={"#fff"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                p={"10px 20px"}
                fontSize={"20px"}
                fontWeight={"bold"}
                gap={"20px"}
                borderRadius={"10px"}
                onClick={handleNext}
                width={"150px"}
              >
                Next <FaArrowRight />
              </Button>
            </Flex>
          </Flex>
        )}
        {step === 3 && (
          <Flex
            direction={"column"}
            align={"center"}
            width={"100%"}
            gap={"20px"}
          >
            <Flex
              backgroundColor={"#218225"}
              padding={"20px"}
              borderRadius={"50px"}
            >
              <Text color={"white"} fontWeight={"semibold"} fontSize={"30px"}>
                What is your budget?
              </Text>
            </Flex>
            <Flex direction={"column"} align={"center"} gap={"10px"}>
              <label
                style={{ color: "#fff", fontWeight: "bold", fontSize: "25px" }}
              >
                Budget (in dollars)
              </label>
              <Input
                type="text"
                placeholder="Enter budget"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value) || "")}
                style={{
                  borderRadius: "0px",
                  width: "562px",
                  height: "40px",
                  background: "#fff",
                  color: "#000",
                }}
              />
            </Flex>
            <Flex gap="20px">
              <Button
                bg={"#2acc32"}
                color={"#fff"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                p={"10px 20px"}
                fontSize={"20px"}
                fontWeight={"bold"}
                gap={"20px"}
                borderRadius={"10px"}
                onClick={handlePrevious}
                width={"150px"}
              >
                <FaArrowLeft /> Previous
              </Button>
              <Button
                bg={"#2acc32"}
                color={"#fff"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                p={"10px 20px"}
                fontSize={"20px"}
                fontWeight={"bold"}
                gap={"20px"}
                borderRadius={"10px"}
                onClick={handleNext}
                width={"150px"}
              >
                Next <FaArrowRight />
              </Button>
            </Flex>
          </Flex>
        )}
        {step === 4 && (
          <Flex
            direction={"column"}
            align={"center"}
            width={"100%"}
            gap={"0px"}
          >
            <Flex
              backgroundColor={"#218225"}
              padding={"20px"}
              borderRadius={"50px"}
            >
              <Text color={"white"} fontWeight={"semibold"} fontSize={"30px"}>
                Entre those details about your soil:
              </Text>
            </Flex>
            <Flex
              direction={"row"}
              align={"center"}
              gap={"5px"} // Increased gap to separate form elements clearly
              wrap={"wrap"}
              justify={"center"} // Optional: Centers the rows horizontally
            >
              <Flex direction={"column"} align={"center"} gap={"10px"}>
                <label
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "25px",
                  }}
                >
                  Oxygen Level
                </label>
                <Input
                  type="text"
                  placeholder="Enter oxygen level"
                  value={oxygenLevel}
                  onChange={(e) => setOxygenLevel(Number(e.target.value) || "")}
                  style={{
                    borderRadius: "0px",
                    width: "562px",
                    height: "40px",
                    background: "#fff",
                    color: "#000",
                  }}
                />

                <Text
                  color={"white"}
                  fontWeight={"semibold"}
                  fontSize={"md"}
                  style={{ cursor: "pointer" }}
                >
                  Percentage of gas volume in the soil (%)
                </Text>
              </Flex>
              <Flex direction={"column"} align={"center"} gap={"10px"}>
                <label
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "25px",
                  }}
                >
                  Nitrogen
                </label>
                <Input
                  type="text"
                  placeholder="Enter Nitrogen level"
                  value={nitrogen}
                  onChange={(e) => setNitrogen(Number(e.target.value) || "")}
                  style={{
                    borderRadius: "0px",
                    width: "562px",
                    height: "40px",
                    background: "#fff",
                    color: "#000",
                  }}
                />
                <Text
                  color={"white"}
                  fontWeight={"semibold"}
                  fontSize={"md"}
                  style={{ cursor: "pointer" }}
                >
                  Kg/ha (kilogramme per hectar)
                </Text>
              </Flex>
              <Flex direction={"column"} align={"center"} gap={"10px"}>
                <label
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "25px",
                  }}
                >
                  Potassium
                </label>
                <Input
                  type="text"
                  placeholder="Enter potassium level"
                  value={potassium}
                  onChange={(e) => setPotassium(Number(e.target.value) || "")}
                  style={{
                    borderRadius: "0px",
                    width: "562px",
                    height: "40px",
                    background: "#fff",
                    color: "#000",
                  }}
                />
                <Text
                  color={"white"}
                  fontWeight={"semibold"}
                  fontSize={"md"}
                  style={{ cursor: "pointer" }}
                >
                  Kg/ha (kilogramme per hectar)
                </Text>
              </Flex>
              <Flex direction={"column"} align={"center"} gap={"10px"}>
                <label
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "25px",
                  }}
                >
                  Phosphorus
                </label>
                <Input
                  type="text"
                  placeholder="Enter phosphorus level"
                  value={phosphorus}
                  onChange={(e) => setPhosphorus(Number(e.target.value) || "")}
                  style={{
                    borderRadius: "0px",
                    width: "562px",
                    height: "40px",
                    background: "#fff",
                    color: "#000",
                  }}
                />
                <Text
                  color={"white"}
                  fontWeight={"semibold"}
                  fontSize={"md"}
                  style={{ cursor: "pointer" }}
                >
                  Kg/ha (kilogramme per hectar)
                </Text>
              </Flex>
              <Flex direction={"column"} align={"center"} gap={"10px"}>
                <label
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "25px",
                  }}
                >
                  Ph level (0-14)
                </label>
                <Input
                  type="text"
                  placeholder="Enter ph Level"
                  value={phLevel}
                  onChange={(e) => setPhLevel(e.target.value || "")}
                  style={{
                    borderRadius: "0px",
                    width: "562px",
                    height: "40px",
                    background: "#fff",
                    color: "#000",
                  }}
                />
              </Flex>
            </Flex>
            {/* 
                        Leave this commented idk if we will need it
                        <Flex direction={'column'} align={'center'} gap={'10px'}>
                            <label style={{ color: '#fff', fontWeight: 'bold', fontSize: '25px' }}>pH Level</label>
                            <Input
                                type="text"
                                placeholder='Enter pH level'
                                value={phLevel}
                                onChange={(e) => setPhLevel(Number(e.target.value) || '')}
                                style={{
                                    borderRadius: '0px',
                                    width: '562px',
                                    height: '40px',
                                    background: '#fff',
                                    color: '#000'
                                }}
                            />
                        </Flex> */}
            <Flex gap={"20px"}>
              <Button
                bg={"#2acc32"}
                color={"#fff"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                p={"10px 20px"}
                fontSize={"20px"}
                fontWeight={"bold"}
                gap={"20px"}
                borderRadius={"10px"}
                onClick={handlePrevious}
                width={"150px"}
              >
                <FaArrowLeft /> Previous
              </Button>
              <Button
                bg="#2acc32"
                color="#fff"
                display="flex"
                alignItems="center"
                justifyContent="center"
                p="10px 20px"
                fontSize="20px"
                fontWeight="bold"
                gap="20px"
                borderRadius="10px"
                onClick={handleFinish}
                width="150px"
                isDisabled={showProgress} // Disable button during processing
              >
                Finish
              </Button>
            </Flex>
          </Flex>
            )}
          </form>
            {showProgress && (
            <Flex
              direction="column"
              align="center"
              justify="center"
              position="fixed"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              p="20px"
              bg="#fff"
              borderRadius="10px"
              shadow="md"
              zIndex={1000}
              maxWidth="60%"
              maxHeight="60%"
              width="auto"
              height="auto"
            >
              <Lottie
                animationData={animationData}
                play
                loop
                style={{ width: '100%', maxWidth: '300px', height: 'auto' }}
              />
              <Text my={4} fontSize={20} fontWeight="bold">
                {progressMessage}
              </Text>
              <Progress size="md" isIndeterminate />
            </Flex>
      )}
    </Flex>
  );
}
