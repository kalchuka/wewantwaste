import {getSkipTypes } from "../../../httpApis/skip";

export async function fetchSkipTypes() {
  const response = await getSkipTypes();
  const skiptypes = response.data;

  //I had to add the image key to each skiptype based on its size.. had to do this because the skiptypes are not being returned with the image.
  skiptypes.forEach((skiptype: any) => {

    // so i looked at the prototype to dertermine the image url to use
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

