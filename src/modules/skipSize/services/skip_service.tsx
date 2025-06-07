import {getSkipTypes } from "../../../httpApis/skip";

export async function fetchSkipTypes() {
  const response = await getSkipTypes();
  const skiptypes = response.data;

  //add a new key value to each object
  skiptypes.forEach((skiptype: any) => {
    switch(skiptype.size) {
      case 20:
      case 40:
        skiptype.image_url = "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/20-yarder-skip.jpg";
        break;
      case 4:
        skiptype.image_url = "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/4-yarder-skip.jpg";
        break;
      default:
        skiptype.image_url = "https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/5-yarder-skip.jpg";
        break;
    }
  });
  
  return   skiptypes
 ;
}

