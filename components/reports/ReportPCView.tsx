// 'use client';

// import useRegionReportData from '@/hooks/dataFetching/useRegionReportData';
// import selectedReportStore from '@/store/selectedReport.store';
// import { Spinner } from '@nextui-org/spinner';
// import { useEffect, useState } from 'react';
// import Drawer from '../CustomDrawer';

// export const ReportPCView = () => {
//     const [isOpen, setIsOpen] = useState(false);

//     const handleClose = () => {
//         setIsOpen(false);
//     };

//     const { selectedReport } = selectedReportStore();
//     const { RegionReportData, isRegionReportDataLoading } =
//         useRegionReportData(selectedReport);

//     useEffect(() => {
//         console.log(isRegionReportDataLoading);
//     }, [isRegionReportDataLoading]);

//     const handleOpen = () => {
//         setIsOpen(true);
//     };

//     useEffect(() => {
//         if (selectedReport) {
//             handleOpen();
//         }
//     }, [selectedReport]);

//     if (isRegionReportDataLoading) {
//         return (
//             <div className="w-7/12 h-full overflow-y-auto bg-white rounded-2xl p-6 shadow-md hidden md:inline">
//                 {selectedReport}
//                 <div className="flex-1 h-full flex flex-col justify-center">
//                     <Spinner
//                         className="mx-auto"
//                         label="Loading..."
//                         color="warning"
//                     />
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <>
//             <div className="w-7/12 h-full overflow-y-auto bg-white rounded-2xl p-6 shadow-md hidden md:inline">
//                 {selectedReport}
//                 <div
//                     className="notion-render"
//                     dangerouslySetInnerHTML={{ __html: RegionReportData! }}
//                 ></div>
//             </div>
//             <div className="md:hidden">
//                 <Drawer
//                     isOpen={isOpen}
//                     onClose={handleClose}
//                     title={selectedReport}
//                     content={
//                         isRegionReportDataLoading ? (
//                             <div className="flex justify-center items-center h-full">
//                                 <Spinner
//                                     className="mx-auto"
//                                     label="Loading..."
//                                     color="warning"
//                                 />
//                             </div>
//                         ) : (
//                             <div
//                                 dangerouslySetInnerHTML={{
//                                     __html: RegionReportData!,
//                                 }}
//                             />
//                         )
//                     }
//                 />
//             </div>
//         </>
//     );
// };

'use client';

import useRegionReportData from '@/hooks/dataFetching/useRegionReportData';
import selectedReportStore from '@/store/selectedReport.store';
import { Spinner } from '@nextui-org/spinner';
import { useEffect, useState } from 'react';
import Drawer from '../CustomDrawer';

export const ReportPCView = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [drawerData, setDrawerData] = useState<string | null>(null);
    const { selectedReport } = selectedReportStore();
    const { RegionReportData, isRegionReportDataLoading } =
        useRegionReportData(selectedReport);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleOpen = () => {
        setIsOpen(true);
        if (!drawerData && RegionReportData) {
            setDrawerData(RegionReportData);
        }
    };

    useEffect(() => {
        if (selectedReport) {
            handleOpen();
        }
    }, [selectedReport]);

    useEffect(() => {
        if (isRegionReportDataLoading) {
            setDrawerData(null);
        } else {
            setDrawerData(RegionReportData || null);
        }
    }, [isRegionReportDataLoading, RegionReportData]);

    if (isRegionReportDataLoading) {
        return (
            <div className="w-7/12 h-full overflow-y-auto bg-white rounded-2xl p-6 shadow-md hidden md:inline">
                {selectedReport}
                <div className="flex-1 h-full flex flex-col justify-center">
                    <Spinner
                        className="mx-auto"
                        label="Loading..."
                        color="warning"
                    />
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="w-7/12 h-full overflow-y-auto bg-white rounded-2xl p-6 shadow-md hidden md:inline">
                {selectedReport}
                <div
                    className="notion-render"
                    dangerouslySetInnerHTML={{ __html: RegionReportData! }}
                ></div>
            </div>
            <div className="md:hidden">
                <Drawer
                    isOpen={isOpen}
                    onClose={handleClose}
                    title={selectedReport}
                    content={
                        isRegionReportDataLoading ? (
                            <div className="flex justify-center items-center h-full">
                                <Spinner
                                    className="mx-auto"
                                    label="Loading..."
                                    color="warning"
                                />
                            </div>
                        ) : (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: drawerData!,
                                }}
                            />
                        )
                    }
                />
            </div>
        </>
    );
};
