import MyanmarMap from '@/components/MyanmarMap';
import '@/styles/notion.css';
import { ReportPCView } from '@/components/reports/ReportPCView';

export default async function Reports() {
    return (
        <div className="w-full h-full bg-[#F2F8FE] rounded-2xl px-8 py-3 bg-lines flex flex-row md:justify-between justify-center items-center space-x-12">
            <div className="h-full flex flex-col justify-center">
                <MyanmarMap />
            </div>
            <ReportPCView />
        </div>
    );
}
