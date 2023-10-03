import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as Tooltips,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import SearchIcon from '../public/icons8-search.svg';
import {Spin} from 'antd';
import Logo from '../public/logo.png';
import Link from 'next/link';
import {Modal} from 'antd';
import {GrLinkNext} from 'react-icons/gr';
import { coloc4Devices, deviceList } from '@/data/deviceList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const colors = ["#800000","#FF0000","#FFA500","#FFFF00","#808000","#008000","#800080","#FF00FF","#00FF00","#008080","#00FFFF","#0000FF","#000080","#000000","#808080","#C0C0C0","#FFFFFF"]

function Charts() {
  // const [isChartLoading ,setIsChartLoading] = useState(false)
  const [selectedDevices,setSelectedDevices] = useState<Array<string>>();
  const [selectedMultiple,setSelectedMultiple] = useState<string>();
  const [individualDevice , setIndividualDevice] = useState(true);
  const [multipleDevice , setMultipleDevice] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [isMultipleModalOpen, setIsMultipleModalOpen] = useState(false);
  const showMultipleModal = () => {
    setIsMultipleModalOpen(true);
  };

  const handleMultipleOk = () => {
    setIsMultipleModalOpen(false);
  };

  const handleMultipleCancel = () => {
    setIsMultipleModalOpen(false);
  };
  const searchDevices = () =>{
    setIsChartLoading(true);
    handleOk();
    handleMultipleOk();
    const inputValue = inputRef?.current?.value;
    console.log(inputValue);
    const devicesArr: string[] | undefined = inputRef?.current?.value.split(',');
    console.log(devicesArr);
    
    devicesArr?.map((item,index)=>{
      selectedDeviceData.push({deviceId:item,color:colors[index]})
    })
    setSelectedDevices(devicesArr);
    getChartData('15M',devicesArr);

    // const searchedDevices:any[] = [];
    // devicesArr?.forEach((item1:string) => {
    //   data.forEach((item2) => {
    //     console.log(item1 == item2.dID)
    //     if (item1 == item2.dID) {
    //       searchedDevices.push(item2);
    //     }
    //   });
    // });
    // console.log(searchedDevices);
    // setCurrentPage(searchedDevices);
   }
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [chartData, setChartData] = useState<any>([{
    'status': 200,
    'dID': 'L14',
    'data': [
      {
        'sPM2': 25.71,
        'sPM1': 21.21,
        'dPM10': 24.04,
        'rh': 44.19,
        'temp': 35.47,
        'srvtime': 1681142304959,
      },
      {
        'sPM2': 21.99,
        'sPM1': 29.66,
        'sPM10': 21.23,
        'rh': 45.37,
        'temp': 38.42,
        'srvtime': 1681143204957,
      },
      {
        'sPM2': 22.06,
        'sPM1': 29.67,
        'sPM10': 24.29,
        'rh': 47.54,
        'temp': 36.9,
        'srvtime': 1681144104961,
      },
      {
        'sPM2': 24.62,
        'sPM1': 17.19,
        'sPM10': 22.84,
        'rh': 48.76,
        'temp': 36.35,
        'srvtime': 1681145004958,
      },
      {
        'sPM2': 22.24,
        'sPM1': 25.78,
        'sPM10': 27.36,
        'rh': 50.03,
        'temp': 36.27,
        'srvtime': 1681145904958,
      },
      {
        'sPM2': 20.99,
        'sPM1': 19.54,
        'sPM10': 22.17,
        'rh': 50.24,
        'temp': 36.2,
        'srvtime': 1681146804973,
      },
      {
        'sPM2': 21.44,
        'sPM1': 20.1,
        'sPM10': 22.72,
        'rh': 50.54,
        'temp': 36.08,
        'srvtime': 1681147704974,
      },
      {
        'sPM2': 21.27,
        'sPM1': 19.81,
        'sPM10': 22.49,
        'rh': 50.84,
        'temp': 35.97,
        'srvtime': 1681148604971,
      },
    ],
  },{
    'status': 200,
    'dID': 'L24',
    'data': [
      {
        'sPM2': 24.71,
        'sPM1': 22.21,
        'sPM10': 24.04,
        'rh': 44.19,
        'temp': 35.47,
        'srvtime': 1681142304959,
      },
      {
        'sPM2': 27.99,
        'sPM1': 27.66,
        'sPM10': 21.23,
        'rh': 45.37,
        'temp': 38.42,
        'srvtime': 1681143204957,
      },
      {
        'sPM2': 24.06,
        'sPM1': 23.67,
        'sPM10': 24.29,
        'rh': 47.54,
        'temp': 36.9,
        'srvtime': 1681144104961,
      },
      {
        'sPM2': 23.62,
        'sPM1': 36.19,
        'sPM10': 22.84,
        'rh': 48.76,
        'temp': 36.35,
        'srvtime': 1681145004958,
      },
      {
        'sPM2': 29.24,
        'sPM1': 25.78,
        'sPM10': 27.36,
        'rh': 50.03,
        'temp': 36.27,
        'srvtime': 1681145904958,
      },
      {
        'sPM2': 20.99,
        'sPM1': 19.54,
        'sPM10': 22.17,
        'rh': 50.24,
        'temp': 36.2,
        'srvtime': 1681146804973,
      },
      {
        'sPM2': 19.44,
        'sPM1': 20.1,
        'sPM10': 22.72,
        'rh': 50.54,
        'temp': 36.08,
        'srvtime': 1681147704974,
      },
      {
        'sPM2': 18.27,
        'sPM1': 19.81,
        'sPM10': 22.49,
        'rh': 50.84,
        'temp': 35.97,
        'srvtime': 1681148604971,
      },
    ],
  }]);
  type finalMinMaxType = {
    min: {
      sPM2: number,
      sPM1: number,
      sPM10: number,
      sPM4: number,
      rh: number,
      temp: number,
    },
    max: {
      sPM2: number,
      sPM1: number,
      sPM4: number,
      sPM10: number,
      rh: number,
      temp: number,
    },
  };
  const initialFinalMinMax: finalMinMaxType = {
    min: {
      sPM2: 0,
      sPM1: 0,
      sPM10: 0,
      sPM4: 0,
      rh: 0,
      temp: 0,
    },
    max: {
      sPM2: 0,
      sPM1: 0,
      sPM10: 0,
      sPM4: 0,
      rh: 0,
      temp: 0,
    },
  };
  const [finalMinMax, setFinalMinMax] = useState<finalMinMaxType>(initialFinalMinMax);
  const emptyChart = [
    {
      x_axis: '10:00',
    },
    {
      x_axis: '11:00',
    },
    {
      x_axis: '12:00',
    },
    {
      x_axis: '1:00',
    },
    {
      x_axis: '2:00',
    },
    {
      x_axis: '3:00',
    },
    {
      x_axis: '5:00',
    },
  ];
  const [type1, setType1] = useState(true);
  const [type2, setType2] = useState(false);
  const [type3, setType3] = useState(false);
  const [type4, setType4] = useState(false);
  const [type5, setType5] = useState(false);
  const [type6, setType6] = useState(false);
  const selectedDeviceData:Array<object> = [];
  const [isChartLoading, setIsChartLoading] = useState(false);
  const [timeFrame, setTimeFrame] = useState('15M');
  // const ChangeTimeFrame = (e:any) => {
  //   console.log(e.target.value);
  //   setTimeFrame(e.target.value);
  //   getChartData(e.target.value);x
  //   setIsChartLoading(true);
  // };
  const allSrvtimeValues = chartData.reduce((acc:any, set:any) => {
    return acc.concat(set.data.map((item:any) => item.srvtime));
  }, []);

  // Calculate the minimum and maximum srvtime values
  const minSrvtime = Math.min(...allSrvtimeValues);
  const maxSrvtime = Math.max(...allSrvtimeValues);
  const getChartData = async (time:string,devices:Array<string> | undefined) => {
    try {
      if (time == undefined) {
        time = '15M';
      }
      // let timeArr:Array<object> = [];
      console.log(time)
      // if(time==="1D"){
      //   const time=Date.now();
      //   for(let i=7;i>=0;i--){
      //     console.log(time-(86400000*i))
      //     timeArr.push({sPM1:null,sPM2:null,sPM4:null,sPM10:null,temp:null,rh:null,srvtime:(time-(86400000*i))})
      //   }
      //   console.log(timeArr);
      // }
      console.log(devices);
      let devicesString = '';
      devices?.map((item:any) => {
        console.log(item)
        devicesString += item + ';';
      });
      console.log(devicesString)
      const queryDevices = devicesString.substring(0, devicesString.length - 1);
      console.log(queryDevices);
      console.log(time);
      let chartData; let reqData;
      if (false) {
      } else {
        reqData = await axios
            .get(
                `http://localhost:3200/stale/filter?devices=${queryDevices}&filter=${time}`,

            )
            .then((value) => value.data);
      }
      console.log(reqData);
      reqData.data.map((item:any) => {
        item.data.map((item1:any) => {
          let timeStamps;
          if (true) {
            timeStamps = item1.srvtime;
          } else {
            timeStamps=item1.srvtime;
          }
          console.log(timeStamps);
          if(timeStamps!==undefined){const date = new Date(timeStamps).toLocaleString('en-US', {
            timeZone: 'Asia/Kolkata',
            hour12: false,
          });
          // console.log(date);
          let day;
          const timeInHours = date.split(',')[1].split(' ')[1];
          const timeFrames = timeInHours.split(':');
          const finalTime = timeFrames[0] + ':' + timeFrames[1];
          if (time=='3H' || time=='1D') {
            day=date.split(',')[0].split('/');
            item1.x_axis=day[1]+'/'+day[0]+'  '+finalTime;
          } else {
            item1.x_axis = finalTime;
          }}
        });
      });

      const averageMinsPM1:any[number] = [];
      const averageMinsPM2:any[number] = [];
      const averageMinsPM4:any[number] = [];
      const averageMinsPM10:any[number] = [];
      const averageMinTemp:any[number] = [];
      const averageMinRh:any[number] = [];
      const averageMaxsPM1:any[number] = [];
      const averageMaxsPM2:any[number] = [];
      const averageMaxsPM4:any[number] = [];
      const averageMaxsPM10:any[number] = [];
      const averageMaxTemp:any[number] = [];
      const averageMaxRh:any[number] = [];
      reqData?.data.map((item:any) => {
        console.log('the item is here' + item);
        averageMinsPM1.push(item.min.sPM1);
        averageMinsPM2.push(item.min.sPM2);
        averageMinsPM4.push(item.min.sPM4);
        averageMinsPM10.push(item.min.sPM10);
        averageMinTemp.push(item.min.temp);
        averageMinRh.push(item.min.rh);
        averageMaxsPM1.push(item.max.sPM1);
        averageMaxsPM2.push(item.max.sPM2);
        averageMaxsPM10.push(item.max.sPM10);
        averageMaxsPM4.push(item.max.sPM4);
        averageMaxTemp.push(item.max.temp);
        averageMaxRh.push(item.max.rh);
      });

      const finalObj = {
        min: {
          sPM2: Math.min(averageMinsPM2),
          sPM1: Math.min(averageMinsPM1),
          sPM10: Math.min(averageMinsPM10),
          sPM4: Math.min(averageMinsPM4),
          rh: Math.min(averageMinRh),
          temp: Math.min(averageMinTemp),
        },
        max: {
          sPM2: Math.max(averageMaxsPM2),
          sPM1: Math.max(averageMaxsPM1),
          sPM10: Math.max(averageMaxsPM10),
          sPM4: Math.max(averageMaxsPM4),
          rh: Math.max(averageMaxRh),
          temp: Math.max(averageMaxTemp),
        },
      };
      setFinalMinMax(finalObj);
      console.log(finalMinMax);
      // setMinMax()
      // console.log(reqData.data.data[0]);
      // dispatch(comparisonAddChartData(reqData.data));
      console.log(reqData.data);
      // interface chartEachPlot{
      //   srvtime:number | undefined
      // }
      // reqData.data.map((item1:any)=>{
      //   // console.log(timeArr)
      //   // item1.data = item1.data.concat(timeArr);
      //   // console.log(mergedArr);
      //   const arr=item1.data.sort((a: chartEachPlot, b: chartEachPlot) => {
      //     if (a.srvtime === undefined && b.srvtime === undefined) {
      //       return 0; // Both are null, consider them equal
      //     } else if (a.srvtime === undefined) {
      //       return 1; // 'a' is null, move it to the end
      //     } else if (b.srvtime === undefined) {
      //       return -1; // 'b' is null, move it to the end
      //     } else {
      //       return a.srvtime - b.srvtime; // Compare numeric values
      //     }
      //   });
      //   console.log(arr);
      // })
      // reqData.data.map((item1:any)=>{
      //   item1.data.map((item2:any)=>{
      //     item2.srvtime=Math.floor(item2.srvtime/100000);
      //   })
      // })
      console.log(reqData);
      setChartData(reqData.data);
    } catch (err) {
      console.log('something went wrong' + err);
    } finally {
      console.log('got the data');
      setIsChartLoading(false);
    }
  };
  const reachedMaximum = () =>{
    toast.error("You have already selected Maximum Number of Devices");
  }
  console.log("the value of min max is ",finalMinMax);
  const handleMultipleDevice =  (item:any)=>{
    if(!(selectedMultiple !== undefined && selectedMultiple?.split(",").includes(item.dID))){
      if (
        !(selectedMultiple !== undefined && selectedMultiple?.split(",").length > 10)
      ) {
        setSelectedMultiple((selectedMultiple) =>
          selectedMultiple === undefined
            ? item.dID
            : selectedMultiple + "," + item.dID
        );
        if (inputRef?.current) {
          inputRef.current.value =
            selectedMultiple === undefined
              ? item.dID
              : selectedMultiple + "," + item.dID;
        }
      } else {
        reachedMaximum();
      }
    }
  }
  const check =[{
    x_axis:9823749
  },{
    x_axis:98237459
  },{
    x_axis:9823769
  },{
    x_axis:9823779
  },{
    x_axis:9823789
  },{
    x_axis:9823799
  },{
    x_axis:9823849
  },{
    x_axis:9823879
  },{
    x_axis:9823889
  }]
  const [alldeviceList] = useState(coloc4Devices);
  console.log(chartData);
  const ChangeTimeFrame = (e:any) => {
    console.log(e.target.value);
    setTimeFrame(e.target.value);
    getChartData(e.target.value,selectedDevices);
    setIsChartLoading(true);
  };
  useEffect(()=>{
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  console.log("the value of selected multiple devices is ",selectedMultiple);
  return (
    <div className='w-[100vh] h-[100vh] flex flex-col'>
      {/* <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Devices</p>
      </Modal> */}
      <Modal title="Select Single Device" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
        <p>Devices</p>
        <div className="flex relative">
          <input type="text" className=' w-[90%] ml-4 text-lg input_field px-1 py-1' placeholder='Enter Device IDs' ref={inputRef}/>
          {/* <Image src={SearchIcon} alt="" className='absolute right-16 cursor-pointer top-1' width={30} onClick={searchDevices}/> */}
          <GrLinkNext className='absolute right-20 cursor-pointer top-1 w-10' onClick={searchDevices}/>
        </div>
        <div className="grid grid-cols-10 w-full gap-4 mt-4">
          {alldeviceList.map((item)=>{
            return (
              <div key={item.dID} className={`w-full h-[10vh] bg-black rounded-md cursor-pointer`} onClick={()=>{if (inputRef?.current) {
                inputRef.current.value = item.dID;
              }}}>
              </div>
            )
          })}
        </div>
      </Modal>
      <Modal title="Select Multiple Device" open={isMultipleModalOpen} onOk={handleMultipleOk} onCancel={handleMultipleCancel} width={1000}>
        <p>Devices</p>
        <div className="flex relative">
          <input type="text" className=' w-[90%] ml-4 text-lg input_field px-1 py-1' placeholder='Enter Device IDs' ref={inputRef} onChange={(e)=>setSelectedMultiple(e.currentTarget.value)}/>
          {/* <Image src={SearchIcon} alt="" className='absolute right-16 cursor-pointer top-1' width={30} onClick={searchDevices}/> */}
          <GrLinkNext className='absolute right-20 cursor-pointer top-2 w-10 h-' onClick={searchDevices}/>
        </div>
        <div className="grid grid-cols-10 w-full gap-4 mt-4">
          {alldeviceList.map((item)=>{
            return (
              <div key={item.dID} className={`w-full h-[10vh] bg-black rounded-md cursor-pointer`} onClick={()=>handleMultipleDevice(item)}>

              </div>
            )
          })}
        </div>
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
        <div className="basis-[23%]">
        
      </div>
    </div>
      {/* <div className="flex mt-[50px] relative">
          <input type="text" className=' w-[90%] ml-4 text-lg input_field px-1 py-1' placeholder='Enter Device IDs' ref={inputRef}/>
          <Image src={SearchIcon} alt="" className='absolute right-16 cursor-pointer top-1' width={30} onClick={searchDevices}/>
      </div> */}
      <div className="w-full flex flex-row p-2 mt-[50px]">
        <button className='bg-slate-400 text-white p-2 rounded-md' onClick={()=>{showModal();setIndividualDevice(true);setMultipleDevice(false)}}>INDIVIDUAL DEVICE</button>
        <button className='bg-slate-400 text-white p-2 rounded-md'onClick={()=>{showMultipleModal();setIndividualDevice(false);setMultipleDevice(true)}}>MULTIPLE DEVICE</button>
      </div>
      <Spin tip="Loading..." spinning={isChartLoading}>
      <select
                        name=""
                        id=""
                        value={timeFrame}
                        onChange={ChangeTimeFrame}
                      >
                        <option selected value="15M">
                        15 Minutes
                        </option>
                        <option value="1H">1 Hour</option>
                        <option value="3H">3 Hours</option>
                        <option value="1D">1 Day</option>
                      </select>
      <div className="w-full h-[90vh]">
      {multipleDevice && <div className='radiobtn_div'>
                      <label style={{display: 'flex', gap: '3px'}}>
                        <input
                          type="radio"
                          name="radio_btn"
                          className='first_checkbox'
                          checked={type1}
                          onChange={() => {
                            setType1(true);
                            setType2(false);
                            setType3(false);
                            setType4(false);
                            setType5(false);
                            setType6(false);
                          }}
                        />
                        {'sPM1'}
                      </label>
                      <label style={{display: 'flex', gap: '3px'}}>
                        <input
                          type="radio"
                          name="radio_btn"
                          onChange={() => {
                            setType2(true);
                            setType1(false);
                            setType3(false);
                            setType4(false);
                            setType5(false);
                            setType6(false);
                          }}
                          style={{backgroundColor: '#000000'}}
                        />
                        {'sPM2'}
                      </label><label style={{display: 'flex', gap: '3px'}}>
                        <input
                          type="radio"
                          name="radio_btn"
                          onChange={() => {
                            setType2(false);
                            setType1(false);
                            setType3(true);
                            setType4(false);
                            setType5(false);
                            setType6(false);
                          }}
                          style={{backgroundColor: '#000000'}}
                        />
                        {'sPM4'}
                      </label>
                      <label style={{display: 'flex', gap: '3px'}}>
                        <input
                          type="radio"
                          name="radio_btn"
                          checked={type6}
                          onChange={() => {
                            setType2(false);
                            setType1(false);
                            setType3(false);
                            setType4(false);
                            setType5(false);
                            setType6(true);
                          }}
                        />
                        {'sPM10'}
                      </label>
                      <label style={{display: 'flex', gap: '3px'}}>
                        <input
                          type="radio"
                          name="radio_btn"
                          onChange={() => {
                            setType2(false);
                            setType1(false);
                            setType3(false);
                            setType4(true);
                            setType5(false);
                            setType6(false);
                          }}
                          style={{backgroundColor: '#000000'}}
                        />
                        {'Temp'}
                      </label>
                      <label style={{display: 'flex', gap: '3px'}}>
                        <input
                          type="radio"
                          name="radio_btn"
                          onChange={() => {
                            setType3(false);
                            setType1(false);
                            setType2(false);
                            setType4(false);
                            setType5(true);
                            setType6(false);
                          }}
                        />
                        {'Humidity'}
                      </label>
                    </div>}
                    {individualDevice && <div className='radiobtn_div'>
                      <label style={{display: 'flex', gap: '3px'}}>
                        <input
                          type="checkbox"
                          name="radio_btn"
                          className='first_checkbox'
                          checked={type1}
                          onChange={() => {
                            setType1(!type1);
                          }}
                        />
                        {'sPM1'}
                      </label>
                      <label style={{display: 'flex', gap: '3px'}}>
                        <input
                          type="checkbox"
                          name="radio_btn"
                          checked={type2}
                          onChange={() => {
                            setType2(!type2);
                          }}
                          style={{backgroundColor: '#000000'}}
                        />
                        {'sPM2'}
                      </label><label style={{display: 'flex', gap: '3px'}}>
                        <input
                          type="checkbox"
                          name="radio_btn"
                          checked={type3}
                          onChange={() => {
                            setType3(!type3);
                          }}
                          style={{backgroundColor: '#000000'}}
                        />
                        {'sPM4'}
                      </label>
                      <label style={{display: 'flex', gap: '3px'}}>
                        <input
                          type="checkbox"
                          name="radio_btn"
                          checked={type6}
                          onChange={() => {
                            setType6(!type6);
                          }}
                        />
                        {'sPM10'}
                      </label>
                      <label style={{display: 'flex', gap: '3px'}}>
                        <input
                          type="checkbox"
                          name="radio_btn"
                          checked={type4}
                          onChange={() => {
                            setType4(!type4);
                          }}
                          style={{backgroundColor: '#000000'}}
                        />
                        {'Temp'}
                      </label>
                      <label style={{display: 'flex', gap: '3px'}}>
                        <input
                          type="checkbox"
                          name="radio_btn"
                          checked={type5}
                          onChange={() => {
                            setType5(!type5);
                          }}
                        />
                        {'Humidity'}
                      </label>
                      
                    </div>}
      <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      width={500}
                      height={300}
                      data={
                        // chartData?.length > 0 ?
                        //   chartData[0]?.data :
                          emptyChart
                        // check
                      }
                      margin={{
                        top: 5,
                        right: 30,
                        left: 5,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="srvtime" type="number"
          domain={['auto', 'auto']} allowDuplicatedCategory={false} angle={-45}/>
                      <YAxis
                        domain={
                          chartData?.length > 0 ?
                            type1 ?
                              [
                                finalMinMax.min.sPM1 - 1,
                                finalMinMax.max.sPM1 + 1,
                              ] :
                              type2 ?
                              [
                                finalMinMax.min.sPM2 - 1,
                                finalMinMax.max.sPM2 + 1,
                              ] :
                              type3 ?
                              [
                                finalMinMax.min.sPM4 - 1,
                                finalMinMax.max.sPM4 + 1,
                              ] :
                              type4 ?
                              [
                                finalMinMax.min.temp - 1,
                                finalMinMax.max.temp + 1,
                              ] :
                              type5 ?
                              [
                                finalMinMax.min.rh - 1,
                                finalMinMax.max.rh + 1,
                              ] :
                              [finalMinMax.min.sPM10 - 1, finalMinMax.max.sPM10 + 1] :
                            [100, 200]
                        }
                        tickCount={7}
                      />
                      {type1 &&
                        chartData.map((item:any, index:number) => (
                          <>
                          {/* <Tooltips labelClassName="dID" label={item?.dID === undefined ? null:'dID'} /> */}
                          <Line
                            type="monotone"
                            connectNulls
                            data={item.data}
                            dataKey="sPM1"
                            stroke={individualDevice?"#000000":colors[index]}
                            activeDot={{r: 8}}
                            strokeWidth={3}
                            key={individualDevice?"#000000":colors[index]}
                            label={(entry) => {
                              // Adjust the position of the tooltip for specific lines
                              if (entry.dataKey === "sPM1") {
                                return entry.value;
                              }
                              return null;
                            }}
                          />
                          </>
                        ))}
                      {type2 &&
                        chartData.map((item:any, index:number) => (
                          <Line
                            type="monotone"
                            data={item.data}
                            connectNulls
                            dataKey="sPM2"
                            stroke={individualDevice?"#000000":colors[index]}
                            strokeWidth={3}
                            key={individualDevice?"#000000":colors[index]}
                          />
                        ))}
                      {type3 &&
                        chartData.map((item:any, index:number) => (
                          <Line
                            type="monotone"
                            data={item.data}
                            connectNulls
                            dataKey="sPM4"
                            stroke={individualDevice?"#000000":colors[index]}
                            strokeWidth={3}
                            key={item.data.dID}
                          />
                        ))}
                      {type6 &&
                        chartData.map((item:any, index:number) => (
                          <Line
                            type="monotone"
                            data={item.data}
                            connectNulls
                            dataKey="sPM10"
                            stroke={individualDevice?"#000000":colors[index]}
                            strokeWidth={3}
                            key={item.data.dID}
                          />
                        ))}
                      {type4 &&
                        chartData.map((item:any, index:number) => (
                          <Line
                            type="monotone"
                            data={item.data}
                            connectNulls
                            dataKey="temp"
                            stroke={individualDevice?"#000000":colors[index]}
                            strokeWidth={3}
                            key={item.data.dID}
                          />
                        ))}
                      {type5 &&
                        chartData.map((item:any, index:number) => (
                          <Line type="monotone" connectNulls key={item.data.dID} dataKey="rh" stroke={individualDevice?"#000000":colors[index]} strokeWidth={3} data={item.data} />
                        ))}
                    </LineChart>
                  </ResponsiveContainer>
                  {/* <ResponsiveContainer width="100%" height="90%">
        <LineChart data={[]} margin={{ top: 5, right: 30, left: 5, bottom: 5 }}>
          
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis />
          {type1 &&
                        chartData.map((item:any, index:number) => (
                          <Line
                            type="monotone"
                            data={item.data}
                            connectNulls
                            dataKey="sPM1"
                            stroke={individualDevice?"#000000":colors[index]}
                            strokeWidth={3}
                            key={individualDevice?"#000000":colors[index]}
                          />
                        ))}
          {type2 &&
                        chartData.map((item:any, index:number) => (
                          <Line
                            type="monotone"
                            data={item.data}
                            connectNulls
                            dataKey="sPM2"
                            stroke={individualDevice?"#000000":colors[index]}
                            strokeWidth={3}
                            key={individualDevice?"#000000":colors[index]}
                          />
                        ))}
                        {type3 &&
                        chartData.map((item:any, index:number) => (
                          <Line
                            type="monotone"
                            data={item.data}
                            connectNulls
                            dataKey="sPM4"
                            stroke={individualDevice?"#000000":colors[index]}
                            strokeWidth={3}
                            key={individualDevice?"#000000":colors[index]}
                          />
                        ))}
                        {type6 &&
                        chartData.map((item:any, index:number) => (
                          <Line
                            type="monotone"
                            data={item.data}
                            connectNulls
                            dataKey="sPM10"
                            stroke={individualDevice?"#000000":colors[index]}
                            strokeWidth={3}
                            key={individualDevice?"#000000":colors[index]}
                          />
                        ))}
                        {type4 &&
                        chartData.map((item:any, index:number) => (
                          <Line
                            type="monotone"
                            data={item.data}
                            connectNulls
                            dataKey="temp"
                            stroke={individualDevice?"#000000":colors[index]}
                            strokeWidth={3}
                            key={individualDevice?"#000000":colors[index]}
                          />
                        ))}
                        {type5 &&
                        chartData.map((item:any, index:number) => (
                          <Line
                            type="monotone"
                            data={item.data}
                            connectNulls
                            dataKey="rh"
                            stroke={individualDevice?"#000000":colors[index]}
                            strokeWidth={3}
                            key={individualDevice?"#000000":colors[index]}
                          />
                        ))}
          {/* <XAxis
          dataKey="srvtime"
          type="number"
          domain={['auto', 'auto']} // Let Recharts calculate the domain
          // You can also specify a fixed domain like this:
          // domain={[startValue, endValue]}
          interval="preserveStartEnd" // This should help preserve the start and end values
          tickCount={8}
        /> */}
        {/* <XAxis
            dataKey="srvtime"
            type="number"
            domain={[minSrvtime, maxSrvtime]}
            // ticks={chartData[0].data.map((item:any) => item.srvtime)} // Use the X-axis values from the first data set
            // interval={8}
            tickCount={8}
          />
          <Tooltip/>
        </LineChart>
      </ResponsiveContainer> */} 
                  </div>
                  </Spin>
                  <ToastContainer/>
    </div>
  )
}

export default Charts