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

function Charts() {
  const [selected,setSelected] = useState<string>();
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
    handleOk();
    handleMultipleOk();
    const inputValue = inputRef?.current?.value;
    console.log(inputValue);
    const devicesArr: string[] | undefined = inputRef?.current?.value.split(',');
    console.log(devicesArr);
    const colors = ["#800000","#FF0000","#FFA500","#FFFF00","#808000","#008000","#800080","#FF00FF","#00FF00","#008080","#00FFFF","#0000FF","#000080","#000000","#808080","#C0C0C0","#FFFFFF"]
    devicesArr?.map((item,index)=>{
      selectedDeviceData.push({deviceId:item,color:colors[index]})
    })
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
        'dPM2': 25.71,
        'dPM1': 21.21,
        'dPM10': 24.04,
        'rh': 44.19,
        'temp': 35.47,
        'srvtime': 1681142304959,
      },
      {
        'dPM2': 21.99,
        'dPM1': 29.66,
        'dPM10': 21.23,
        'rh': 45.37,
        'temp': 38.42,
        'srvtime': 1681143204957,
      },
      {
        'dPM2': 22.06,
        'dPM1': 29.67,
        'dPM10': 24.29,
        'rh': 47.54,
        'temp': 36.9,
        'srvtime': 1681144104961,
      },
      {
        'dPM2': 24.62,
        'dPM1': 17.19,
        'dPM10': 22.84,
        'rh': 48.76,
        'temp': 36.35,
        'srvtime': 1681145004958,
      },
      {
        'dPM2': 22.24,
        'dPM1': 25.78,
        'dPM10': 27.36,
        'rh': 50.03,
        'temp': 36.27,
        'srvtime': 1681145904958,
      },
      {
        'dPM2': 20.99,
        'dPM1': 19.54,
        'dPM10': 22.17,
        'rh': 50.24,
        'temp': 36.2,
        'srvtime': 1681146804973,
      },
      {
        'dPM2': 21.44,
        'dPM1': 20.1,
        'dPM10': 22.72,
        'rh': 50.54,
        'temp': 36.08,
        'srvtime': 1681147704974,
      },
      {
        'dPM2': 21.27,
        'dPM1': 19.81,
        'dPM10': 22.49,
        'rh': 50.84,
        'temp': 35.97,
        'srvtime': 1681148604971,
      },
    ],
  }]);
  type finalMinMaxType = {
    min: {
      dPM2: number,
      dPM1: number,
      rh: number,
      temp: number,
    },
    max: {
      dPM2: number,
      dPM1: number,
      rh: number,
      temp: number,
    },
  };
  const initialFinalMinMax: finalMinMaxType = {
    min: {
      dPM2: 0,
      dPM1: 0,
      rh: 0,
      temp: 0,
    },
    max: {
      dPM2: 0,
      dPM1: 0,
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
  const selectedDeviceData:Array<object> = [];
  const [isChartLoading, setIsChartLoading] = useState(false);
  const [timeFrame, setTimeFrame] = useState('15M');
  // const ChangeTimeFrame = (e:any) => {
  //   console.log(e.target.value);
  //   setTimeFrame(e.target.value);
  //   getChartData(e.target.value);x
  //   setIsChartLoading(true);
  // };
  const getChartData = async (time:string,devices:Array<string> | undefined) => {
    try {
      if (time == undefined) {
        time = '15M';
      }
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
                `http://localhost:3200/stale/filter?devices=${queryDevices}&filter=3H`,

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
          const date = new Date(timeStamps).toLocaleString('en-US', {
            timeZone: 'Asia/Kolkata',
            hour12: false,
          });
          console.log(date);
          let day;
          const timeInHours = date.split(',')[1].split(' ')[1];
          const timeFrames = timeInHours.split(':');
          const finalTime = timeFrames[0] + ':' + timeFrames[1];
          if (time=='3H' || time=='1D') {
            day=date.split(',')[0].split('/');
            item1.x_axis=day[1]+'/'+day[0]+'  '+finalTime;
          } else {
            item1.x_axis = finalTime;
          }
        });
      });
      const averageMindPM1:any[number] = [];
      const averageMindPM2:any[number] = [];
      const averageMinTemp:any[number] = [];
      const averageMinRh:any[number] = [];
      const averageMaxdPM1:any[number] = [];
      const averageMaxdPM2:any[number] = [];
      const averageMaxTemp:any[number] = [];
      const averageMaxRh:any[number] = [];
      reqData?.data.map((item:any) => {
        console.log('the item is here' + item);
        averageMindPM1.push(item.min.dPM1);
        averageMindPM2.push(item.min.dPM2);
        averageMinTemp.push(item.min.temp);
        averageMinRh.push(item.min.rh);
        averageMaxdPM1.push(item.max.dPM1);
        averageMaxdPM2.push(item.max.dPM2);
        averageMaxTemp.push(item.max.temp);
        averageMaxRh.push(item.max.rh);
      });

      const finalObj = {
        min: {
          dPM2: Math.min(averageMindPM2),
          dPM1: Math.min(averageMindPM1),
          rh: Math.min(averageMinRh),
          temp: Math.min(averageMinTemp),
        },
        max: {
          dPM2: Math.max(averageMaxdPM2),
          dPM1: Math.max(averageMaxdPM1),
          rh: Math.max(averageMaxRh),
          temp: Math.max(averageMaxTemp),
        },
      };
      setFinalMinMax(finalObj);
      console.log(finalMinMax);
      // setMinMax()
      // console.log(reqData.data.data[0]);
      // dispatch(comparisonAddChartData(reqData.data));
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
  
  const [alldeviceList] = useState(deviceList);
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
              <div key={item.dID} className={`w-full h-[10vh] bg-black rounded-md cursor-pointer`} onClick={()=>{setSelected(item.dID);if (inputRef?.current) {
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
                          }}
                          style={{backgroundColor: '#000000'}}
                        />
                        {'sPM4'}
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
      <ResponsiveContainer width="100%" height="80%">
                    <LineChart
                      width={500}
                      height={300}
                      data={
                        chartData?.length > 0 ?
                          chartData[0]?.data :
                          emptyChart
                      }
                      margin={{
                        top: 5,
                        right: 30,
                        left: 5,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="x_axis" allowDuplicatedCategory={false} interval={0}/>
                      <YAxis
                        domain={
                          chartData?.length > 0 ?
                            type1 ?
                              [
                                finalMinMax.min.dPM1 - 1,
                                finalMinMax.max.dPM1 + 1,
                              ] :
                              type2 ?
                              [
                                finalMinMax.min.temp - 1,
                                finalMinMax.max.temp + 1,
                              ] :
                              [finalMinMax.min.rh - 1, finalMinMax.max.rh + 1] :
                            [100, 200]
                        }
                        tickCount={7}
                      />
                      {<Tooltips labelClassName="dID" label={chartData[0]?.dID === undefined ? null:'dID'}/>}

                      {type1 &&
                        chartData.map((item:any, index:number) => (
                          
                          <Line
                            type="monotone"
                            data={item.data}
                            dataKey="sPM1"
                            stroke={"#000000"}
                            activeDot={{r: 8}}
                            strokeWidth={3}
                            key={item.data.dID}
                          />
                        ))}
                      {type2 &&
                        chartData.map((item:any, index:number) => (
                          <Line
                            type="monotone"
                            data={item.data}
                            dataKey="sPM2"
                            stroke={"#000000"}
                            strokeWidth={3}
                            key={item.data.dID}
                          />
                        ))}
                      {type3 &&
                        chartData.map((item:any, index:number) => (
                          <Line
                            type="monotone"
                            data={item.data}
                            dataKey="sPM10"
                            stroke={"#000000"}
                            strokeWidth={3}
                            key={item.data.dID}
                          />
                        ))}
                      {type4 &&
                        chartData.map((item:any, index:number) => (
                          <Line
                            type="monotone"
                            data={item.data}
                            dataKey="temp"
                            stroke={"#000000"}
                            strokeWidth={3}
                            key={item.data.dID}
                          />
                        ))}
                      {type5 &&
                        chartData.map((item:any, index:number) => (
                          <Line type="monotone" key={item.data.dID} dataKey="rh" stroke={"#000000"} strokeWidth={3} data={item.data} />
                        ))}
                    </LineChart>
                  </ResponsiveContainer>
                  <ToastContainer/>
    </div>
  )
}

export default Charts