'use server';

import { getPageByRegion, getPageContent, notionClient } from '@/lib/notion';
import { NotionRenderer } from '@notion-render/client';
import hljsPlugin from '@notion-render/hljs-plugin';
import bookmarkPlugin from '@notion-render/bookmark-plugin';

const fetchRegionReport = async (region: string) => {
    const regionData = await getPageByRegion(region);
    if (!regionData) {
        return null;
    }
    const content = await getPageContent(regionData?.id);
    const notionRenderer = new NotionRenderer({
        client: notionClient,
    });

    notionRenderer.use(hljsPlugin({}));
    notionRenderer.use(bookmarkPlugin(undefined));
    const html = await notionRenderer.render(...content);

    return html;
};

export default fetchRegionReport;
