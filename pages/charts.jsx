import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as Tooltips,
  ResponsiveContainer,
} from 'recharts';

function Charts() {
  const [chartData, setChartData] = useState<any>();
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
  const selectedDeviceData = [{deviceId:"SG22",color:'#000000'}];
  const [isChartLoading, setIsChartLoading] = useState(false);
  const [timeFrame, setTimeFrame] = useState('15M');
  // const ChangeTimeFrame = (e:any) => {
  //   console.log(e.target.value);
  //   setTimeFrame(e.target.value);
  //   getChartData(e.target.value);
  //   setIsChartLoading(true);
  // };
  useEffect(()=>{
    const getChartData = async (time:string) => {
      try {
        if (time == undefined) {
          time = '15M';
        }
        // console.log(devicesStr);
        let devicesString = '';
        selectedDeviceData.map((item:any) => {
          devicesString += item.deviceId + ';';
        });
        const queryDevices = devicesString.substring(0, devicesString.length - 1);
        console.log(queryDevices);
        console.log(time);
        let chartData; let reqData;
        if (false) {
        } else {
          reqData = await axios
              .get(
                  `http://localhost:3200/stale/filter?devices=SG33;SG38&filter=3H`,
  
              )
              .then((value) => value.data);
        }
        console.log(reqData);
        reqData.data.map((item:any) => {
          item.data.map((item1:any) => {
            let timeStamps;
            if (true) {
              timeStamps = item1.srvtime - 19800000;
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
    getChartData('15M');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  return (
    <div>
      <ResponsiveContainer width="100%" height="100%">
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
                            dataKey="dPM1"
                            stroke={selectedDeviceData[index]?.color}
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
                            dataKey="dPM2"
                            stroke={selectedDeviceData[index].color}
                            strokeWidth={3}
                            key={item.data.dID}
                          />
                        ))}
                      {type3 &&
                        chartData.map((item:any, index:number) => (
                          <Line
                            type="monotone"
                            data={item.data}
                            dataKey="dPM10"
                            stroke={selectedDeviceData[index].color}
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
                            stroke={selectedDeviceData[index].color}
                            strokeWidth={3}
                            key={item.data.dID}
                          />
                        ))}
                      {type5 &&
                        chartData.map((item:any, index:number) => (
                          <Line type="monotone" key={item.data.dID} dataKey="rh" stroke={selectedDeviceData[index].color} strokeWidth={3} data={item.data} />
                        ))}
                    </LineChart>
                  </ResponsiveContainer>
    </div>
  )
}

export default Charts