'use client';

import useRegionReportData from '@/hooks/dataFetching/useRegionReportData';
import selectedReportStore from '@/store/selectedReport.store';
import { Spinner } from '@nextui-org/spinner';

export const ReportPCView = () => {
    const { selectedReport } = selectedReportStore();
    const { RegionReportData, isRegionReportDataLoading } =
        useRegionReportData(selectedReport);

    if (isRegionReportDataLoading) {
        return (
            <div className="w-7/12 h-full overflow-y-auto bg-white rounded-2xl p-6 shadow-md  hidden md:inline">
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
        <div className="w-7/12 h-full overflow-y-auto bg-white rounded-2xl p-6 shadow-md hidden md:inline">
            {selectedReport}
            <div
                className="notion-render"
                dangerouslySetInnerHTML={{ __html: RegionReportData! }}
            ></div>
        </div>
    );
};
