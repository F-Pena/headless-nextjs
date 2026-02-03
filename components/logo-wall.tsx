import { getClients } from '@/content/queries';
import Clients from './clients';

export default async function LogoWall() {
    const data = await getClients();
    const content = data.assetCollection.items;
    return <Clients content={content} />;
}