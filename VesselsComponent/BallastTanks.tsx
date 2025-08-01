'use client'
import { Alert, CardBody, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import themeStore from '@/app/zustandData/theme.zustand';
import colorStore from '@/app/zustandData/color.zustand';
import useStore from '@/app/hooks/useStore';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import { useSearchParams } from 'next/navigation';
import useAxios from '@/app/hooks/useAxios';
import { AxiosResponse } from 'axios';
import { GetBallastTanksResponse, Response } from '@/app/models/VesselsModel/statusTypes';
import TableSkeleton from '../../shared/TableSkeleton';
import moment from 'jalali-moment';

type ComponentState = {
    loading: boolean,
    ballastTanksItems: GetBallastTanksResponse[]
}

const BallastTanksComponent = (props: any) => {
    const { AxiosRequest } = useAxios()
    const themeMode = useStore(themeStore, (state) => state)
    const color = useStore(colorStore, (state) => state)
    const searchParams = useSearchParams()

    let ballastTanks = {
        ballastTanksItems: [],
        loading: true,
    }

    const [componentState, setComponentState] = useState<ComponentState>(ballastTanks)

    useEffect(() => {
        const GetBallastTanks = async () => {
            let url = `${process.env.NEXT_PUBLIC_API_URL}/Status/GetInformation/GetBallastTanks?asiaCode=${props.props}`;
            let method = 'get'
            let data = {};
            let response: AxiosResponse<Response<GetBallastTanksResponse[]>> = await AxiosRequest({ url, method, data, credentials: true })
            if (response) {
                setComponentState((state) => ({ ...state, loading: false }))
                if (
                    response.data.status == true && response.data.data.length > 0
                ) {
                    setComponentState((state) => ({ ...state, ballastTanksItems: response.data.data }))
                }
            }
        }
        GetBallastTanks()
    }, [props.props])

    return (
        <CardBody className='mx-auto relative rounded-lg overflow-auto p-0'  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <Alert
                icon={<NotInterestedIcon fontSize='small' sx={{ color: !themeMode ||themeMode?.stateMode ? '#fff3cd' : '#856404' }} />}
                className={!themeMode ||themeMode?.stateMode ? "rounded-md border-l-4 border-[#fff3cd] bg-[#fff3cd]/30 text-sm font-thin text-[#fff3cd] " : "rounded-md border-l-4 border-[#fff3cd] bg-[#fff3cd]/50 text-sm font-thin text-[#856404]"}
            >
                <Typography variant='paragraph' className='text-sm'  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Note! Please note that all lifting appliances already registered for the vessel is shown.</Typography>
            </Alert>
            <CardBody className='mx-auto relative rounded-lg overflow-auto p-0 mt-3 h-[65vh]'  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} >
                {componentState.loading == false ? <table className={`${!themeMode ||themeMode?.stateMode ? 'tableDark' : 'tableLight'} w-full relative text-center max-h-[62vh] `}>
                    <thead>
                        <tr className={!themeMode ||themeMode?.stateMode ? 'themeDark' : 'themeLight'}>
                            <th style={{ borderBottomColor: color?.color }}
                                className={`${!themeMode ||themeMode?.stateMode ? 'themeDark' : 'themeLight'} p-3 sticky top-0 border-b-2 `}
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className={`font-[700] text-[12px] p-1.5 leading-none ${!themeMode || themeMode?.stateMode ? 'lightText' : 'darkText'}`}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                >
                                    Identification
                                </Typography>
                            </th>
                            <th style={{ borderBottomColor: color?.color }}
                                className={`${!themeMode ||themeMode?.stateMode ? 'themeDark' : 'themeLight'} p-3 sticky top-0 border-b-2 `}
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className={`font-[700] text-[12px] p-1.5 leading-none ${!themeMode || themeMode?.stateMode ? 'lightText' : 'darkText'}`}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                >
                                    Initial Frame
                                </Typography>
                            </th>
                            <th style={{ borderBottomColor: color?.color }}
                                className={`${!themeMode ||themeMode?.stateMode ? 'themeDark' : 'themeLight'} p-3 sticky top-0 border-b-2 `}
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className={`font-[700] text-[12px] p-1.5 leading-none ${!themeMode || themeMode?.stateMode ? 'lightText' : 'darkText'}`}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                >
                                    Final Frame
                                </Typography>
                            </th>
                            <th style={{ borderBottomColor: color?.color }}
                                className={`${!themeMode ||themeMode?.stateMode ? 'themeDark' : 'themeLight'} p-3 sticky top-0 border-b-2 `}
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className={`font-[700] text-[12px] p-1.5 leading-none ${!themeMode || themeMode?.stateMode ? 'lightText' : 'darkText'}`}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                >
                                    Position
                                </Typography>
                            </th>
                            <th style={{ borderBottomColor: color?.color }}
                                className={`${!themeMode ||themeMode?.stateMode ? 'themeDark' : 'themeLight'} p-3 sticky top-0 border-b-2 `}
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className={`font-[700] text-[12px] p-1.5 leading-none ${!themeMode || themeMode?.stateMode ? 'lightText' : 'darkText'}`}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                >
                                    Last Survey
                                </Typography>
                            </th>
                            <th style={{ borderBottomColor: color?.color }}
                                className={`${!themeMode ||themeMode?.stateMode ? 'themeDark' : 'themeLight'} p-3 sticky top-0 border-b-2 `}
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className={`font-[700] text-[12px] p-1.5 leading-none ${!themeMode || themeMode?.stateMode ? 'lightText' : 'darkText'}`}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                >
                                    Protection
                                </Typography>
                            </th>
                            <th style={{ borderBottomColor: color?.color }}
                                className={`${!themeMode ||themeMode?.stateMode ? 'themeDark' : 'themeLight'} p-3 sticky top-0 border-b-2 `}
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className={`font-[700] text-[12px] p-1.5 leading-none ${!themeMode || themeMode?.stateMode ? 'lightText' : 'darkText'}`}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                >
                                    Coating Cond.
                                </Typography>
                            </th>
                            <th style={{ borderBottomColor: color?.color }}
                                className={`${!themeMode ||themeMode?.stateMode ? 'themeDark' : 'themeLight'} p-3 sticky top-0 border-b-2 `}
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className={`font-[700] text-[12px] p-1.5 leading-none ${!themeMode || themeMode?.stateMode ? 'lightText' : 'darkText'}`}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                >
                                    Annual Exam.
                                </Typography>
                            </th>
                        </tr>
                    </thead>
                    <tbody className={`statusTable divide-y divide-${!themeMode ||themeMode?.stateMode ? 'themeDark' : 'themeLight'}`}>
                        {componentState.ballastTanksItems.length > 0 && componentState.ballastTanksItems.map((item, index) => {
                            return (
                                <tr key={"ballasttanks" + index} className={`${index % 2 ? !themeMode ||themeMode?.stateMode ? 'breadDark' : 'breadLight' : !themeMode ||themeMode?.stateMode ? 'tableDark' : 'tableLight'} border-none hover:bg-blue-gray-50/30 hover:bg-opacity-75`} >
                                    <td style={{ width: "30%", minWidth: '200px' }} className='p-1'>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className={`${!themeMode || themeMode?.stateMode ? 'lightText' : 'darkText'} font-[EnRegular] text-[13px] p-0.5 `}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                        >
                                            {item.identification}
                                        </Typography>
                                    </td>
                                    <td style={{ width: "10%", minWidth: '100px' }} className='p-1'>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className={`${!themeMode || themeMode?.stateMode ? 'lightText' : 'darkText'} font-[EnRegular] whitespace-nowrap text-[13px] p-0.5 `}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                        >
                                            {item.initialFrame}
                                        </Typography>
                                    </td>
                                    <td style={{ width: "10%", minWidth: '100px' }} className='p-1'>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className={`${!themeMode || themeMode?.stateMode ? 'lightText' : 'darkText'} font-[EnRegular] text-[13px] p-0.5 `}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                        >
                                            {item.finalFrame}
                                        </Typography>
                                    </td>
                                    <td style={{ width: "10%", minWidth: '100px' }} className='p-1'>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className={`${!themeMode || themeMode?.stateMode ? 'lightText' : 'darkText'} font-[EnRegular] text-[13px] p-0.5 `}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                        >
                                            {item.position}
                                        </Typography>
                                    </td>
                                    <td style={{ width: "10%", minWidth: '100px' }} className='p-1'>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className={`${!themeMode || themeMode?.stateMode ? 'lightText' : 'darkText'} font-[EnRegular] text-[13px] p-0.5 `}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                        >
                                            {item.lastSurvey != '' ? moment(item.lastSurvey, 'YYYY-MM-DD').format('YYYY-MM-DD') : ''}
                                        </Typography>
                                    </td>
                                    <td style={{ width: "10%", minWidth: '100px' }} className='p-1'>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className={`${!themeMode || themeMode?.stateMode ? 'lightText' : 'darkText'} font-[EnRegular] text-[13px] p-0.5 `}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                        >
                                            {item.protection}
                                        </Typography>
                                    </td>
                                    <td style={{ width: "10%", minWidth: '100px' }} className='p-1'>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className={`${!themeMode || themeMode?.stateMode ? 'lightText' : 'darkText'} font-[EnRegular] text-[13px] p-0.5 `}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                        >
                                            {item.coatingCondition}
                                        </Typography>
                                    </td>
                                    <td style={{ width: "10%", minWidth: '100px' }} className='p-1'>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className={`${!themeMode || themeMode?.stateMode ? 'lightText' : 'darkText'} font-[EnRegular] text-[13px] p-0.5 `}  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                        >
                                            {item.annualExamination}
                                        </Typography>
                                    </td>

                                </tr>
                            )
                        })}
                    </tbody>
                </table> : <TableSkeleton />}
            </CardBody>
        </CardBody>
    )
}

export default BallastTanksComponent