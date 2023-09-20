import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
import { useCallback, useEffect, useRef, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import Select from 'react-select';
import SearchIcon from '../public/icons8-search.svg';
import Image from 'next/image';
import {deviceList} from '../data/deviceList';
import {defaultParameters} from '../data/deviceList';
// import Navbar from '@/components/Navbar';
import Logo from '../public/logo.png';
import Link from 'next/link';
import makeAnimated from 'react-select/animated';
import { Modal } from 'antd';
import {FcNext, FcPrevious} from 'react-icons/fc';
import { ToastContainer, toast } from 'react-toastify';

const animatedComponents = makeAnimated();

const parameterOptions = [
  { value: 'rHeap', label: 'rHeap' },
  { value: 'lHeap', label: 'lHeap' },
  { value: 'dTS', label: 'dTS' },
  { value: 'dUT', label: 'dUT' },
  { value: 'lat', label: 'lat' },
  { value: 'nso', label: 'nso' },
  { value: 'long', label: 'long' },
  { value: 'ewo', label: 'ewo' },
  { value: 'alt', label: 'alt' },
  { value: 'sog', label: 'sog' },
  { value: 'cog', label: 'cog' },
  { value: 'hdop', label: 'hdop' },
  { value: 'vdop', label: 'vdop' },
  { value: 'pdop', label: 'pdop' },
  { value: 'age', label: 'age' },
  { value: 'temp', label: 'temp' },
  { value: 'rh', label: 'rh' },
  { value: 'sPM1', label: 'sPM1' },
  { value: 'sPM2', label: 'sPM2' },
  { value: 'sPM4', label: 'sPM4' },
  { value: 'sPM10', label: 'sPM10' },
  { value: 'sNPMp5', label: 'sNPMp5' },
  { value: 'sNPM1', label: 'sNPM1' },
  { value: 'sNPM2', label: 'sNPM2' },
  { value: 'sNPM4', label: 'sNPM4' },
  { value: 'sNPM10', label: 'sNPM10' },
  { value: 'sTPS', label: 'sTPS' },
  { value: 'sTemp', label: 'sTemp' },
  { value: 'sRh', label: 'sRh' },
  { value: 'sVocI', label: 'sVocI' },
  { value: 'sNoxI', label: 'sNoxI' },
  { value: 'aFanTacho', label: 'aFanTacho' },
  { value: 'gIR', label: 'gIR' },
  { value: 'gLUM', label: 'gLUM' },
  { value: 'gUV', label: 'gUV' },
  { value: 'pIDar', label: 'pIDar' },
  { value: 'aUT', label: 'aUT' },
  { value: 'ax', label: 'ax' },
  { value: 'ay', label: 'ay' },
  { value: 'az', label: 'az' },
  { value: 'gx', label: 'gx' },
  { value: 'gy', label: 'gy' },
  { value: 'gz', label: 'gz' },
  { value: 'accTemp', label: 'accTemp' }
]

export default function Home() {
  const [activeButton,setActiveButton] = useState(0);
  const [filteredData,setFilteredData] = useState<{
    status: boolean;dID:string;value:null;lts:number;
}[]>([]);
  type ParameterOption = {
    value: string;
    label: string;
  };
  const [parameters,SetParameters]=useState<ParameterOption[]>(defaultParameters);
  // console.log("the parameters that has been selected are ",parameters)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const [paramsArr, setParamsArr] = useState<Array<string>>([       'rHeap', 'lHeap',
    'dTS',   'dUT',       'lat',   'nso',
    'long',  'ewo',       'alt',   'sog',
    'cog',   'hdop',      'vdop',  'pdop',
    'age',   'temp',      'rh',    'sPM1',
    'sPM2',  'sPM4',      'sPM10', 'sNPMp5',
    'sNPM1', 'sNPM2',     'sNPM4', 'sNPM10',
    'sTPS',  'sTemp',     'sRh',   'sVocI',
    'sNoxI', 'aFanTacho', 'gIR',   'gLUM',
    'gUV',   'pIDar',     'aUT',   'ax',
    'ay',    'az',        'gx',    'gy',
    'gz',    'accTemp'
  ]);
  const handleOk = () => {
    // const value = parametersRef?.current?.commonProps?.selectProps?.value ?? [];
    SetParameters(selectedParams);
    let arr:string[] = []
    selectedParams.map((item:any)=>{
      arr.push(item.value);
    })
    setParamsArr(arr);
    console.log(parametersRef?.current);
    setIsModalOpen(false);
  };
  // console.log("the value of params arr is ",paramsArr);
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const options = [
    { value: 'SG1-SG15', label: 'SG1-SG15' },
    { value: 'SG16-SG30', label: 'SG16-SG30' },
    { value: 'SG31-SG45', label: 'SG31-SG45' },
    { value: 'SG46-SG60', label: 'SG46-SG60' },
    { value: 'SG61-SG75', label: 'SG61-SG75' },
    { value: 'SG76-SG90', label: 'SG76-SG90' },
    { value: 'SG91-SG105', label: 'SG91-SG105' },
    { value: 'MG1-MG15', label: 'MG1-MG15' },
    { value: 'MG16-MG30', label: 'MG16-MG30' },
    { value: 'MG31-MG45', label: 'MG31-MG45' },
    { value: 'MG46-MG60', label: 'MG46-MG60' },
    { value: 'MG61-MG70', label: 'MG61-MG70' },
    { value: 'LMG1-LMG15', label: 'LMG1-LMG15' },
    { value: 'LMG16-LMG30', label: 'LMG16-LMG30' },
    { value: 'LMG31-LMG45', label: 'LMG31-LMG45' },
  ];
  const [selectedOption, setSelectedOption] = useState(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [sCount,setSCount]=useState(0);
  const [mCount,setMCount]=useState(0);
  const [lmCount,setLMCount]=useState(0);
  console.log("the count of lmcount is ",lmCount);
  const [currentPage,setCurrentPage]=useState<{
    status: boolean;dID:string;value:null;lts:number;
}[]>([]);
// const parametersRef = useRef<HTMLInputElement | null>(null);
// type SelectValue = ValueType<{ label: string; value: string }, true>;
interface CustomInputElement extends HTMLInputElement {
  commonProps: {
    selectProps: {
      value: ParameterOption[]; // Adjust the type to match your data structure
    };
  };
}

const [selectedParams,setSelectedParams]=useState<any[]>([]);
const handleSelectChange = (newValue: any) => {
  setSelectedParams(newValue);
};
const parametersRef = useRef<Select | null>(null);
  const [data,setData]=useState(deviceList);
  const getSocketUrl = useCallback(() => {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve('ws://localhost:3200/');
      }, 2000);
    });
  }, []);
  const changeIndex =(e:any)=>{
    // console.log(typeof(e))
    switch(e.value){
      case 'SG1-SG15':
        setCurrentPage(data.slice(0,15));
        break;
      case 'SG16-SG30':
        setCurrentPage(data.slice(15,30));
        break;
      case 'SG31-SG45':
        setCurrentPage(data.slice(30,45));
        break;
      case 'SG46-SG60':
        setCurrentPage(data.slice(45,60));
        break;
      case 'SG61-SG75':
        setCurrentPage(data.slice(60,75));
        break;
      case 'SG76-SG90':
        setCurrentPage(data.slice(75,90));
        break;
      case 'SG91-SG105':
        setCurrentPage(data.slice(90,105));
        break;
      case 'MG1-MG15':
        setCurrentPage(data.slice(105,120));
        break;
      case 'MG16-MG30':
        setCurrentPage(data.slice(120,135));
        break;
      case 'MG31-MG45':
        setCurrentPage(data.slice(135,150));
        break;
      case 'MG46-MG60':
        setCurrentPage(data.slice(150,165));
        break;
      case 'MG61-MG70':
        setCurrentPage(data.slice(165,175));
        break;
      case 'LMG1-LMG15':
        setCurrentPage(data.slice(175,190));
        break;
      case 'LMG16-LMG30':
        setCurrentPage(data.slice(190,205));
        break;
      case 'LMG31-LMG45':
        setCurrentPage(data.slice(205,220));
        break;
      // case 'SG1-SG15':
      //   setCurrentPage(data.slice(0,15));
      //   break;
    }
    // console.log(e);
  }
  const {} = useWebSocket(getSocketUrl, {
    onOpen: (_data) => {
      console.log('WebSocket connection established.');
    },
    onMessage: (response) => {
      const mes = JSON.parse(response.data);
      // console.log(mes);
      data.map((item)=>{
        if(item.dID==mes.dID){
          item.value=mes;
          item.lts = Date.now();
        }
      });
      // console.log(data);
    },
    shouldReconnect: (_closeEvent) => true,
  });
  // console.log(data);
  useEffect(()=>{
    setCurrentPage(data?.slice(0,15));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Call your function here
      const currentTs = Date.now() - 5000;
      let activeStationary = 0;
      let activeMobile = 0;
      let activeLeftMirror = 0;
      interface DataItem {
        lts: number;
        dID: string;
        status: boolean
        // Add other properties if necessary
      }
      
      
      data?.map((item:DataItem)=>{
        if(item.lts > currentTs){
          if(/\b(SG)\d+\b/.test(item?.dID)){
            activeStationary+=1;
            item.status = true;
          }
          else if (/\b(MG)\d+\b/.test(item?.dID)){
            activeMobile+=1;
            item.status = true;
          }
          else if (/\b(LMG)\d+\b/.test(item?.dID)){
            activeLeftMirror+=1;
            item.status = true;
          }
        }
        else{
          item.status = false;
        }
      })
      setSCount(activeStationary);
      setMCount(activeMobile);
      setLMCount(activeLeftMirror);
    }, 5000); // 5000 milliseconds (5 seconds)

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const setDataOnFilter = (val:number) =>{
    switch(val){
      case 1:
        // console.log(data);
        let filteredData1 = data.filter((item)=>item.status===true && item.dID.includes('SG'))
        console.log(filteredData1.length)
        setFilteredData(filteredData1)
        filteredData1.length > 15 ? setIsNextThere(true) : setIsNextThere(false);
        setCurrentPage(filteredData1.slice(0,15));
        break;
      case 2:
        // console.log(data);
        let filteredData2 = data.filter((item)=>item.status===false && item.dID.includes('SG'))
        console.log(filteredData2)
        filteredData2.length > 15 ? setIsNextThere(true) : setIsNextThere(false);
        setFilteredData(filteredData2)
        setCurrentPage(filteredData2.slice(0,15));
        break;
      case 3:
        // console.log(data);
        let filteredData3 = data.filter((item)=>item.status===true && item.dID.includes('MG'))
        console.log(filteredData3)
        filteredData3.length > 15 ? setIsNextThere(true) : setIsNextThere(false);
        setFilteredData(filteredData3)
        setCurrentPage(filteredData3.slice(0,15));
        break;
      case 4:
        // console.log(data);
        let filteredData4 = data.filter((item)=>item.status===false && item.dID.includes('MG'))
        console.log(filteredData4)
        filteredData4.length > 15 ? setIsNextThere(true) : setIsNextThere(false);
        setFilteredData(filteredData4)
        setCurrentPage(filteredData4.slice(0,15));
        break;
      case 5:
        // console.log(data);
        let filteredData5 = data.filter((item)=>item.status===true && item.dID.includes('LMG'))
        console.log(filteredData5)
        filteredData5.length > 15 ? setIsNextThere(true) : setIsNextThere(false);
        setFilteredData(filteredData5)
        setCurrentPage(filteredData5.slice(0,15));
        break;
      case 6:
        // console.log(data);
        let filteredData6 = data.filter((item)=>item.status===false && item.dID.includes('LMG'))
        console.log(filteredData6)
        filteredData6.length > 15 ? setIsNextThere(true) : setIsNextThere(false);
        setFilteredData(filteredData6)
        setCurrentPage(filteredData6.slice(0,15));
        break;
    }
  }
  const [isNextThere,setIsNextThere]=useState(true);
  const [isPrevThere,setIsPrevThere]=useState(false);
  const goNextFilteredData = () =>{
     const currentIndex = filteredData.findIndex((item)=>item.dID === currentPage[0].dID)
     console.log(currentIndex);
     const val1=currentIndex+15;
     const val2=currentIndex+30;
     const val3=currentIndex+30;
     const val4=currentIndex+45;
     
     const checkRangeForNext = filteredData.slice(val3,val4);
     if(!(checkRangeForNext.length > 0)){
      setIsNextThere(false);
     }
     else{
      setIsNextThere(true);
     }
     const val5=0;
     const val6=currentIndex+15;
     const checkRangeForPrev = filteredData.slice(val5,val6);
     if(!(checkRangeForPrev.length > 0)){
      setIsPrevThere(false);
     }
     else{
      setIsPrevThere(true);
     }
     console.log(val1,val2)
     const checkRange = filteredData.slice(val1,val2);
     console.log(checkRange);
     if(!(checkRange.length > 0)){
      console.log("works")
      const notify = () => toast.error("Oops no Data is there to show");
      notify();
     }
     console.log(filteredData.slice(val1,val2));
     setCurrentPage(filteredData.slice(val1,val2));
  }
  const goPrevFilteredData = () =>{
    const currentIndex = filteredData.findIndex((item)=>item.dID === currentPage[0].dID)
    console.log(currentIndex);
    const val1=currentIndex-15;
    const val2=currentIndex;
    const val3=currentIndex-30;
     const val4=currentIndex-15;
     const checkRangeForPrev = filteredData.slice(val3,val4);
     if(!(checkRangeForPrev.length > 0)){
      setIsPrevThere(false);
     }
     else{
      setIsPrevThere(true);
     }
     const val5=currentIndex;
     const val6=currentIndex+1;
     
     const checkRangeForNext = filteredData.slice(val5,val6);
     if(!(checkRangeForNext.length > 0)){
      setIsNextThere(false);
     }
     else{
      setIsNextThere(true);
     }
    console.log(val1,val2)
    console.log(filteredData.slice(val1,val2));
    setCurrentPage(filteredData.slice(val1,val2));
 }
 const searchDevices = () =>{
  console.log(inputRef?.current?.value);
  const devicesArr = inputRef?.current?.value.split(',');
  console.log(devicesArr);
  const searchedDevices:any[] = [];
  devicesArr?.forEach((item1:string) => {
    data.forEach((item2) => {
      console.log(item1 == item2.dID)
      if (item1 == item2.dID) {
        searchedDevices.push(item2);
      }
    });
  });
  console.log(searchedDevices);
  setCurrentPage(searchedDevices);
 }
  console.log("the currentpage data is ",currentPage);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-start ${inter.className}`}
    >
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} okText={"Apply"} onCancel={handleCancel} okButtonProps={{style:{backgroundColor:'blue'}}}>
        <h2>Select the Fields You Need:-</h2>
        <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={parameterOptions}
      value={selectedParams}
      onChange={handleSelectChange}
      // ref={parametersRef}
    />
      </Modal>
      <div className="h-[50px] w-full fixed flex justify-between items-center border-b-2">
        <div className="flex flex-row gap-[15%]">
            <Image src={Logo} alt="" width={110}/>
            <div className="flex flex-row gap-4">
            <Link href="/">Home</Link>
            <Link href="/charts">Charts</Link>
            </div>
        </div>
        <div className=""><h1 className='text-2xl'>COLOCATION</h1></div>
        <div className="">
        <div className="basis-[30%] w-full flex items-center gap-4">
          <div className="">
            <button className='bg-blue-400 px-2 py-2 text-white border-black rounded-md' onClick={()=>showModal()}>Parameters Filter</button>
          
          </div>
          <Select
          defaultValue={selectedOption}
          onChange={(value)=>changeIndex(value)}
          options={options}
        
          />
        <div className="relative">
          <input type="text" className='w-[90%] ml-4 text-lg input_field px-1 py-1' placeholder='Enter Device IDs' ref={inputRef}/>
          <Image src={SearchIcon} alt="" className='absolute top-1 right-2 cursor-pointer' width={30} onClick={searchDevices}/>
        </div>
        </div> 
      </div>
    </div>
      <div className="w-full flex flex-row justify-between gap-4 fixed mt-[60px] z-[1]"> 
        <div className="basis-[100%] w-full flex flex-row gap-4 mx-2 text-white">
          <div className="basis-[33.3%] bg-slate-400 h-[12vh] rounded-md flex flex-col justify-evenly">
            <div className="flex justify-center items-center">
              <p>Stationary {sCount}/105</p>
            </div>
            <div className="w-full flex flex-row justify-evenly items-center gap-4 px-2">
                <button className={`border-2 py-[1vh] px-2 rounded-md cursor-pointer flex-auto ${activeButton==1?'bg-orange-300 flex flex-row justify-between items-center':''}`} onClick={()=>{if(activeButton!==1){setActiveButton(1);setDataOnFilter(1)}}}>{(activeButton==1) && <span><FcPrevious className={`${isPrevThere?'block':'hidden'}`} onClick={goPrevFilteredData}/></span>}Active ({sCount}){(activeButton==1) && <span><FcNext className={`${isNextThere?'block':'hidden'}`} onClick={goNextFilteredData}/></span>}</button>
                <button className={`border-2 py-[1vh] px-2 rounded-md cursor-pointer flex-auto ${activeButton==2?'bg-orange-300 flex flex-row justify-between items-center':''}`} onClick={()=>{if(activeButton!==2){setActiveButton(2);setDataOnFilter(2)}}}>{(activeButton==2) && <span><FcPrevious className={`${isPrevThere?'block':'hidden'}`} onClick={goPrevFilteredData}/></span>}InActive ({105-sCount}){(activeButton==2) && <span><FcNext className={`${isNextThere?'block':'hidden'}`} onClick={goNextFilteredData}/></span>}</button>
            </div>
          </div>
          <div className="basis-[33.3%] bg-slate-400 h-[12vh] rounded-md flex flex-col justify-evenly">
            <div className="flex justify-center items-center">
              <p>Mobile {mCount}/70</p>
            </div>
            <div className="w-full flex flex-row justify-evenly items-center gap-4 px-2">
                <button className={`border-2 py-[1vh] px-2 rounded-md cursor-pointer flex-auto ${activeButton==3?'bg-orange-300 flex flex-row justify-between items-center':''}`} onClick={()=>{if(activeButton!==3){setActiveButton(3);setDataOnFilter(3)}}}>{(activeButton==3) && <span><FcPrevious className={`${isPrevThere?'block':'hidden'}`} onClick={goPrevFilteredData}/></span>}Active ({mCount}){(activeButton==3) && <span><FcNext className={`${isNextThere?'block':'hidden'}`} onClick={goNextFilteredData}/></span>}</button>
                <button className={`border-2 py-[1vh] px-2 rounded-md cursor-pointer flex-auto ${activeButton==4?'bg-orange-300 flex flex-row justify-between items-center':''}`} onClick={()=>{if(activeButton!==4){setActiveButton(4);setDataOnFilter(4)}}}>{(activeButton==4) && <span><FcPrevious className={`${isPrevThere?'block':'hidden'}`} onClick={goPrevFilteredData}/></span>}InActive ({70-mCount}){(activeButton==4) && <span><FcNext className={`${isNextThere?'block':'hidden'}`} onClick={goNextFilteredData}/></span>}</button>
            </div>
          </div>
          <div className="basis-[33.3%] bg-slate-400 h-[12vh] rounded-md flex flex-col justify-evenly">
            <div className="flex justify-center items-center">
              <p>Left Mirror {lmCount}/45</p>
            </div>
            <div className="w-full flex flex-row justify-evenly items-center gap-4 px-2">
                <button className={`border-2 py-[1vh] px-2 rounded-md cursor-pointer flex-auto ${activeButton==5?'bg-orange-300 flex flex-row justify-between items-center':''}`} onClick={()=>{if(activeButton!==5){setActiveButton(5);setDataOnFilter(5)}}}>{(activeButton==5) && <span><FcPrevious className={`${isPrevThere?'block':'hidden'}`} onClick={goPrevFilteredData}/></span>}Active ({lmCount}){(activeButton==5) && <span><FcNext className={`${isNextThere?'block':'hidden'}`} onClick={goNextFilteredData}/></span>}</button>
                <button className={`border-2 py-[1vh] px-2 rounded-md cursor-pointer flex-auto ${activeButton==6?'bg-orange-300 flex flex-row justify-between items-center':''}`} onClick={()=>{if(activeButton!==6){setActiveButton(6);setDataOnFilter(6)}}}>{(activeButton==6) && <span><FcPrevious className={`${isPrevThere?'block':'hidden'}`} onClick={goPrevFilteredData}/></span>}InActive ({45-lmCount}){(activeButton==6) && <span><FcNext className={`${isNextThere?'block':'hidden'}`} onClick={goNextFilteredData}/></span>}</button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full mt-[21vh]">
        <table>
          <tbody>
          <tr className='table_row'>
          <th className='fixed bg-white'>dID</th>  
          <th className='ml-[104px]'>pID</th>  
            {parameters.map((item)=>{
              return(
                <th key={item.value}>{item?.value}</th> 
              )
            })}
          </tr> 
          
            {currentPage.map((item)=>{
              return (
                <tr key={item.dID} className={`values`}>
                <td className={`fixed ${item.status ? 'bg-white':'bg-red-500'}`}>{item.dID}</td>
                <td className='ml-[104px]'>{(item?.value as unknown as { pID: string | undefined })?.pID}</td>
                {paramsArr?.includes('rHeap') && <td>{(item?.value as unknown as { rHeap: string | undefined })?.rHeap}</td>}
                {paramsArr?.includes('lHeap') && <td>{(item?.value as unknown as { lHeap: string | undefined })?.lHeap}</td>}
                {paramsArr?.includes('dTS') && <td>{(item?.value as unknown as { dTS: string | undefined })?.dTS}</td>}
                {paramsArr?.includes('dUT') && <td>{(item?.value as unknown as { dUT: string | undefined })?.dUT}</td>}
                {/* <td>{item.value?.dTS}</td> */}
                {paramsArr?.includes('lat') && <td>{(item?.value as unknown as { lat: string | undefined })?.lat}</td>}
                {paramsArr?.includes('nso') && <td>{(item?.value as unknown as { nso: string | undefined })?.nso}</td>}
                {paramsArr?.includes('long') && <td>{(item?.value as unknown as { long: string | undefined })?.long}</td>}
                {paramsArr?.includes('ewo') && <td>{(item?.value as unknown as { ewo: string | undefined })?.ewo}</td>}
                {paramsArr?.includes('alt') && <td>{(item?.value as unknown as { alt: string | undefined })?.alt}</td>}
                {paramsArr?.includes('sog') && <td>{(item?.value as unknown as { sog: string | undefined })?.sog}</td>}
                {paramsArr?.includes('cog') && <td>{(item?.value as unknown as { cog: string | undefined })?.cog}</td>}
                {paramsArr?.includes('hdop') && <td>{(item?.value as unknown as { hdop: string | undefined })?.hdop}</td>}
                {paramsArr?.includes('vdop') && <td>{(item?.value as unknown as { vdop: string | undefined })?.vdop}</td>}
                {paramsArr?.includes('pdop') && <td>{(item?.value as unknown as { pdop: string | undefined })?.pdop}</td>}
                {paramsArr?.includes('age') && <td>{(item?.value as unknown as { age: string | undefined })?.age}</td>}
                {paramsArr?.includes('temp') && <td>{(item?.value as unknown as { temp: string | undefined })?.temp}</td>}
                {paramsArr?.includes('rh') && <td>{(item?.value as unknown as { rh: string | undefined })?.rh}</td>}
                {paramsArr?.includes('sPM1') && <td>{(item?.value as unknown as { sPM1: string | undefined })?.sPM1}</td>}
                {paramsArr?.includes('sPM2') && <td>{(item?.value as unknown as { sPM2: string | undefined })?.sPM2}</td>}
                {paramsArr?.includes('sPM4') && <td>{(item?.value as unknown as { sPM4: string | undefined })?.sPM4}</td>}
                {paramsArr?.includes('sPM10') && <td>{(item?.value as unknown as { sPM10: string | undefined })?.sPM10}</td>}
                {paramsArr?.includes('sNPMp5') && <td>{(item?.value as unknown as { sNPMp5: string | undefined })?.sNPMp5}</td>}
                {paramsArr?.includes('sNPM1') && <td>{(item?.value as unknown as { sNPM1: string | undefined })?.sNPM1}</td>}
                {paramsArr?.includes('sNPM2') && <td>{(item?.value as unknown as { sNPM2: string | undefined })?.sNPM2}</td>}
                {paramsArr?.includes('sNPM4') && <td>{(item?.value as unknown as { sNPM4: string | undefined })?.sNPM4}</td>}
                {paramsArr?.includes('sNPM10') && <td>{(item?.value as unknown as { sNPM10: string | undefined })?.sNPM10}</td>}
                {paramsArr?.includes('sTPS') && <td>{(item?.value as unknown as { sTPS: string | undefined })?.sTPS}</td>}
                {paramsArr?.includes('sTemp') && <td>{(item?.value as unknown as { sTemp: string | undefined })?.sTemp}</td>}
                {paramsArr?.includes('sRh') && <td>{(item?.value as unknown as { sRh: string | undefined })?.sRh}</td>}
                {paramsArr?.includes('sVocI') && <td>{(item?.value as unknown as { sVocI: string | undefined })?.sVocI}</td>}
                {paramsArr?.includes('sNoxI') && <td>{(item?.value as unknown as { sNoxI: string | undefined })?.sNoxI}</td>}
                {paramsArr?.includes('aFanTacho') && <td>{(item?.value as unknown as { aFanTacho: string | undefined })?.aFanTacho}</td>}
                {paramsArr?.includes('gIR') && <td>{(item?.value as unknown as { gIR: string | undefined })?.gIR}</td>}
                {paramsArr?.includes('gLUM') && <td>{(item?.value as unknown as { gLUM: string | undefined })?.gLUM}</td>}
                {paramsArr?.includes('gUV') && <td>{(item?.value as unknown as { gUV: string | undefined })?.gUV}</td>}
                {paramsArr?.includes('pIDar') && <td>{(item?.value as unknown as { pIDar: string | undefined })?.pIDar}</td>}
                {paramsArr?.includes('aUT') && <td>{(item?.value as unknown as { aUT: string | undefined })?.aUT}</td>}
                {paramsArr?.includes('ax') && <td>{(item?.value as unknown as { ax: string | undefined })?.ax}</td>}
                {paramsArr?.includes('ay') && <td>{(item?.value as unknown as { ay: string | undefined })?.ay}</td>}
                {paramsArr?.includes('az') && <td>{(item?.value as unknown as { az: string | undefined })?.az}</td>}
                {paramsArr?.includes('gx') && <td>{(item?.value as unknown as { gx: string | undefined })?.gx}</td>}
                {paramsArr?.includes('gy') && <td>{(item?.value as unknown as { gy: string | undefined })?.gy}</td>}
                {paramsArr?.includes('gz') && <td>{(item?.value as unknown as { gz: string | undefined })?.gz}</td>}
                {paramsArr?.includes('accTemp') && <td>{(item?.value as unknown as { accTemp: string | undefined })?.accTemp}</td>}
                </tr>  
              )
            })}  
          
          </tbody>
        </table>    
      </div>
      <ToastContainer />
    </main>
  )
}

{/* <button className='basis-[50%] bg-slate-400 p-2 rounded-md text-white font-bold' onClick={()=> setCurrentPage(data.slice(0,15))}>STATIONARY ACTIVE<p>{sCount}/105</p></button>
          <button className='basis-[50%] bg-slate-400 p-2 rounded-md text-white font-bold' onClick={()=> setCurrentPage(data.slice(0,15))}>STATIONARY INACTIVE<p>{sCount}/105</p></button>
          <button className='basis-[50%] bg-orange-300 p-2 rounded-md text-white font-bold' onClick={()=> setCurrentPage(data.slice(105,120))}>MOBILE ACTIVE<p>{mCount}/70</p></button>
          <button className='basis-[50%] bg-orange-300 p-2 rounded-md text-white font-bold' onClick={()=> setCurrentPage(data.slice(105,120))}>MOBILE INACTIVE<p>{mCount}/70</p></button>
          <button className='basis-[50%] bg-orange-300 p-2 rounded-md text-white font-bold' onClick={()=> setCurrentPage(data.slice(105,120))}>LEFT MIRROR ACTIVE <p>{mCount}/70</p></button>
          <button className='basis-[50%] bg-orange-300 p-2 rounded-md text-white font-bold' onClick={()=> setCurrentPage(data.slice(105,120))}>LEFT MIRROR INACTIVE<p>{mCount}/70</p></button> */}