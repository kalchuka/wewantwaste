import client from './apiclient';

export const getSkipTypes = () => client.get("api/skips/by-location?postcode=NR32&area=Lowestoft");

